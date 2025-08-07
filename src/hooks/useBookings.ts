import { useState, useEffect } from 'react';
import { supabase, Barber, Service, Appointment, TimeSlot } from '../lib/supabase';

export const useBookings = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch barbers
  const fetchBarbers = async () => {
    try {
      const { data, error } = await supabase
        .from('barbers')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      setBarbers(data || []);
    } catch (err: any) {
      console.error('Error fetching barbers:', err);
      setError('Failed to load barbers');
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price');
      
      if (error) throw error;
      setServices(data || []);
    } catch (err: any) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    }
  };

  // Get available time slots for a barber on a specific date
  const getAvailableSlots = async (barberId: string, date: string): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('time')
        .eq('barber_id', barberId)
        .eq('date', date)
        .eq('is_booked', false)
        .order('time');
      
      if (error) throw error;
      return data?.map(slot => slot.time) || [];
    } catch (err) {
      console.error('Error fetching available slots:', err);
      return [];
    }
  };

  // Get next available slot for a barber
  const getNextAvailableSlot = async (barberId: string): Promise<{ date: string, time: string } | null> => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('time_slots')
        .select('date, time')
        .eq('barber_id', barberId)
        .eq('is_booked', false)
        .gte('date', today)
        .order('date, time')
        .limit(1);
      
      if (error) throw error;
      return data?.[0] || null;
    } catch (err) {
      console.error('Error fetching next available slot:', err);
      return null;
    }
  };

  // Create a new appointment
  const createAppointment = async (appointmentData: {
    barber_id: string;
    service_id: string;
    date: string;
    time_slot: string;
    user_id?: string;
    guest_name?: string;
    guest_email?: string;
    guest_phone?: string;
    notes?: string;
  }): Promise<Appointment | null> => {
    setLoading(true);
    setError(null);
    
    try {
      // First, check if the slot is still available
      const { data: existingSlot, error: slotError } = await supabase
        .from('time_slots')
        .select('is_booked')
        .eq('barber_id', appointmentData.barber_id)
        .eq('date', appointmentData.date)
        .eq('time', appointmentData.time_slot)
        .single();

      if (slotError && slotError.code !== 'PGRST116') {
        throw slotError;
      }

      if (existingSlot?.is_booked) {
        throw new Error('This time slot is no longer available');
      }

      // Create the appointment
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select('*, barber:barbers(*), service:services(*)')
        .single();

      if (appointmentError) throw appointmentError;

      // Mark the time slot as booked
      const { error: updateSlotError } = await supabase
        .from('time_slots')
        .update({ 
          is_booked: true, 
          appointment_id: appointment.id 
        })
        .eq('barber_id', appointmentData.barber_id)
        .eq('date', appointmentData.date)
        .eq('time', appointmentData.time_slot);

      if (updateSlotError) {
        console.error('Error updating time slot:', updateSlotError);
        // Don't throw here as appointment was already created
      }

      return appointment;
    } catch (err: any) {
      console.error('Error creating appointment:', err);
      setError(err.message || 'Failed to create appointment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on mount
  useEffect(() => {
    fetchBarbers();
    fetchServices();
  }, []);

  return {
    barbers,
    services,
    loading,
    error,
    fetchBarbers,
    fetchServices,
    getAvailableSlots,
    getNextAvailableSlot,
    createAppointment,
  };
};