-- Heritage x Culture Barbershop Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('customer', 'barber', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE loyalty_tier AS ENUM ('bronze', 'silver', 'gold');
CREATE TYPE transaction_type AS ENUM ('earned', 'redeemed');

-- 1. Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'customer',
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  preferred_styles JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Barbers table
CREATE TABLE barbers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT,
  experience_years INTEGER DEFAULT 0,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  barber_id UUID NOT NULL REFERENCES barbers(id),
  service_id UUID NOT NULL REFERENCES services(id),
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  date DATE NOT NULL,
  time_slot TIME NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Barber Availability table
CREATE TABLE barber_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(barber_id, day_of_week)
);

-- 6. Time Slots table
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT false,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(barber_id, date, time)
);

-- 7. Loyalty Points table
CREATE TABLE loyalty_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  points_balance INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  tier loyalty_tier DEFAULT 'bronze',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 8. Loyalty Transactions table
CREATE TABLE loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  points INTEGER NOT NULL,
  transaction_type transaction_type NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Gallery Images table
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gcs_url TEXT NOT NULL,
  title TEXT,
  barber_id UUID REFERENCES barbers(id) ON DELETE SET NULL,
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_barber_id ON appointments(barber_id);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_time_slots_barber_date ON time_slots(barber_id, date);
CREATE INDEX idx_time_slots_is_booked ON time_slots(is_booked);
CREATE INDEX idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX idx_barber_availability_barber_id ON barber_availability(barber_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Barbers policies
CREATE POLICY "Barbers are viewable by everyone" ON barbers
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify barbers" ON barbers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Services policies
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM barbers
      WHERE barbers.id = appointments.barber_id
      AND barbers.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create appointments" ON appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own appointments" ON appointments
  FOR UPDATE USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM barbers
      WHERE barbers.id = appointments.barber_id
      AND barbers.user_id = auth.uid()
    )
  );

-- Time slots policies
CREATE POLICY "Time slots are viewable by everyone" ON time_slots
  FOR SELECT USING (true);

CREATE POLICY "Barbers can manage own time slots" ON time_slots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM barbers
      WHERE barbers.id = time_slots.barber_id
      AND barbers.user_id = auth.uid()
    )
  );

-- Loyalty points policies
CREATE POLICY "Users can view own loyalty points" ON loyalty_points
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage loyalty points" ON loyalty_points
  FOR ALL USING (true);

-- Loyalty transactions policies
CREATE POLICY "Users can view own transactions" ON loyalty_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Gallery images policies
CREATE POLICY "Gallery images are viewable by everyone" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage gallery" ON gallery_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Functions

-- Function to update loyalty tier based on points
CREATE OR REPLACE FUNCTION update_loyalty_tier()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lifetime_points >= 1000 THEN
    NEW.tier = 'gold';
  ELSIF NEW.lifetime_points >= 500 THEN
    NEW.tier = 'silver';
  ELSE
    NEW.tier = 'bronze';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_loyalty_tier_trigger
  BEFORE UPDATE ON loyalty_points
  FOR EACH ROW
  EXECUTE FUNCTION update_loyalty_tier();

-- Function to generate time slots for a barber
CREATE OR REPLACE FUNCTION generate_time_slots(
  p_barber_id UUID,
  p_date DATE
)
RETURNS VOID AS $$
DECLARE
  v_day_of_week INTEGER;
  v_start_time TIME;
  v_end_time TIME;
  v_current_time TIME;
BEGIN
  -- Get day of week (0 = Sunday, 6 = Saturday)
  v_day_of_week := EXTRACT(DOW FROM p_date);
  
  -- Get barber's availability for this day
  SELECT start_time, end_time INTO v_start_time, v_end_time
  FROM barber_availability
  WHERE barber_id = p_barber_id
    AND day_of_week = v_day_of_week
    AND is_available = true;
  
  -- If barber is available this day, generate slots
  IF v_start_time IS NOT NULL THEN
    v_current_time := v_start_time;
    
    WHILE v_current_time < v_end_time LOOP
      INSERT INTO time_slots (barber_id, date, time)
      VALUES (p_barber_id, p_date, v_current_time)
      ON CONFLICT (barber_id, date, time) DO NOTHING;
      
      -- Increment by 30 minutes
      v_current_time := v_current_time + INTERVAL '30 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to handle barber departure (reassign appointments)
CREATE OR REPLACE FUNCTION reassign_barber_appointments(
  p_departing_barber_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  v_new_barber_id UUID;
  v_updated_count INTEGER;
BEGIN
  -- Find an active barber to reassign to
  SELECT id INTO v_new_barber_id
  FROM barbers
  WHERE is_active = true
    AND id != p_departing_barber_id
  ORDER BY RANDOM()
  LIMIT 1;
  
  -- Update future appointments
  UPDATE appointments
  SET barber_id = v_new_barber_id,
      notes = COALESCE(notes, '') || ' [Reassigned from previous barber]'
  WHERE barber_id = p_departing_barber_id
    AND date >= CURRENT_DATE
    AND status IN ('pending', 'confirmed');
  
  GET DIAGNOSTICS v_updated_count = ROW_COUNT;
  
  -- Mark barber as inactive
  UPDATE barbers
  SET is_active = false
  WHERE id = p_departing_barber_id;
  
  RETURN v_updated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate loyalty points for an appointment
CREATE OR REPLACE FUNCTION calculate_loyalty_points(
  p_service_price DECIMAL
)
RETURNS INTEGER AS $$
BEGIN
  -- 10 points per $10 spent
  RETURN FLOOR(p_service_price / 10) * 10;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create loyalty account when user signs up
CREATE OR REPLACE FUNCTION create_loyalty_account()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'customer' THEN
    INSERT INTO loyalty_points (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_loyalty_account_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_loyalty_account();

-- Insert default services
INSERT INTO services (name, price, duration_minutes, description) VALUES
  ('Scissor Cut', 75, 45, 'Premium scissor cut with consultation'),
  ('Buzz Cut', 60, 30, 'Professional buzz cut with line up'),
  ('Buzz Cut & Beard', 75, 45, 'Buzz cut with beard shaping'),
  ('Scissor Cut & Beard', 85, 60, 'Full service cut and beard grooming'),
  ('Beard Shaping', 50, 30, 'Professional beard trim and shaping'),
  ('Signature Haircut', 60, 45, 'Our signature style haircut'),
  ('Hot Towel Shave', 80, 45, 'Traditional hot towel shave experience'),
  ('Full Service', 85, 60, 'Complete grooming package');

-- Insert default barbers (these will need to be linked to actual user accounts later)
INSERT INTO barbers (name, specialty, bio, experience_years, rating) VALUES
  ('Franco Nguyen', 'Scissor Cuts & Fades', 'Master of precision cuts with an eye for modern styling and classic techniques.', 8, 5.0),
  ('Zeus The Barber', 'Beard Grooming & Shaves', 'Legendary beard artist known for transformative grooming and hot towel shaves.', 12, 5.0),
  ('Dgatti (Daniel)', 'Signature Cuts', 'Creative stylist specializing in contemporary cuts and personalized consultations.', 6, 4.9),
  ('Marcus Rodriguez', 'Buzz Cuts & Fades', 'Precision specialist with expertise in military cuts and modern fade techniques.', 5, 4.8),
  ('Anthony Chen', 'Classic Cuts', 'Traditional barber with mastery in timeless styles and gentleman''s grooming.', 10, 4.9),
  ('Rico Santos', 'Modern Styling', 'Trendsetter known for innovative cuts and contemporary styling techniques.', 7, 4.9),
  ('David Park', 'Full Service', 'Complete grooming expert offering comprehensive barbering and styling services.', 9, 5.0),
  ('Tommy Wilson', 'Creative Cuts', 'Young talent bringing fresh perspectives and artistic flair to every cut.', 4, 4.8);