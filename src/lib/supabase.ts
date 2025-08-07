import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
  console.warn('The app will run in demo mode with limited functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY && 
         import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';
};

// Database types
export interface Profile {
  id: string;
  role: 'customer' | 'barber' | 'admin';
  full_name: string;
  phone?: string;
  preferred_styles?: any;
  created_at: string;
  email?: string;
}

export interface Barber {
  id: string;
  user_id?: string;
  name: string;
  specialty: string;
  bio: string;
  experience_years: number;
  avatar_url?: string;
  is_active: boolean;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
  description?: string;
}

export interface Appointment {
  id: string;
  user_id?: string;
  barber_id: string;
  service_id: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  date: string;
  time_slot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  barber?: Barber;
  service?: Service;
  profile?: Profile;
}

export interface TimeSlot {
  id: string;
  barber_id: string;
  date: string;
  time: string;
  is_booked: boolean;
  appointment_id?: string;
}

export interface BarberAvailability {
  id: string;
  barber_id: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface LoyaltyPoints {
  id: string;
  user_id: string;
  points_balance: number;
  lifetime_points: number;
  tier: 'bronze' | 'silver' | 'gold';
}

export interface LoyaltyTransaction {
  id: string;
  user_id: string;
  appointment_id?: string;
  points: number;
  transaction_type: 'earned' | 'redeemed';
  description: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  gcs_url: string;
  title?: string;
  barber_id?: string;
  category?: string;
  is_featured: boolean;
  uploaded_at: string;
}

// Helper functions for auth
export const signUp = async (email: string, password: string, fullName: string, role: 'customer' | 'barber' = 'customer') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role
      }
    }
  });
  
  if (error) throw error;
  
  // Create profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        full_name: fullName,
        role,
        email
      });
    
    if (profileError) throw profileError;
  }
  
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data;
};