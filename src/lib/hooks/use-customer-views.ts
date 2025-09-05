/**
 * Customer View Hooks
 * Custom React hooks for accessing customer-facing views
 * These hooks leverage the new v_ prefixed views for better performance
 * Note: Admin views are handled in a separate admin application
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type {
  PricingCatalog,
  ServiceAvailabilityMatrix,
  QuoteDetails,
  QuoteSelectedServices,
  TimeSlotAvailability,
  UserProfile,
} from '@/types/database-extended';

/**
 * Hook to fetch pricing catalog
 * Returns complete pricing structure with tiers and levels
 */
export function usePricingCatalog() {
  const [catalog, setCatalog] = useState<PricingCatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('v_pricing_catalog')
          .select('*')
          .order('tier_sort_order', { ascending: true })
          .order('level_sort_order', { ascending: true });

        if (error) throw error;
        setCatalog(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return { catalog, loading, error };
}

/**
 * Hook to fetch service availability matrix
 * Shows which services are available for each tier/level combination
 */
export function useServiceAvailabilityMatrix(
  tierId?: number,
  levelId?: number
) {
  const [matrix, setMatrix] = useState<ServiceAvailabilityMatrix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMatrix = async () => {
      try {
        const supabase = createClient();
        let query = supabase
          .from('v_service_availability_matrix')
          .select('*');

        if (tierId) {
          query = query.eq('tier_id', tierId);
        }
        if (levelId) {
          query = query.eq('level_id', levelId);
        }

        const { data, error } = await query
          .order('tier_sort_order', { ascending: true })
          .order('level_sort_order', { ascending: true })
          .order('service_category', { ascending: true });

        if (error) throw error;
        setMatrix(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatrix();
  }, [tierId, levelId]);

  return { matrix, loading, error };
}

/**
 * Hook to fetch quote details
 * Provides comprehensive information about quotes
 */
export function useQuoteDetails(userId?: string) {
  const [quotes, setQuotes] = useState<QuoteDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const supabase = createClient();
        let query = supabase
          .from('v_quote_details')
          .select('*');

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query
          .order('quote_created_at', { ascending: false });

        if (error) throw error;
        setQuotes(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [userId]);

  return { quotes, loading, error };
}

/**
 * Hook to fetch a single quote's details
 */
export function useSingleQuoteDetails(quoteId: number) {
  const [quote, setQuote] = useState<QuoteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!quoteId) return;

    const fetchQuote = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('v_quote_details')
          .select('*')
          .eq('quote_id', quoteId)
          .single();

        if (error) throw error;
        setQuote(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [quoteId]);

  return { quote, loading, error };
}

/**
 * Hook to fetch selected services for a quote
 * Returns breakdown of all services selected in a quote
 */
export function useQuoteSelectedServices(quoteId: number) {
  const [services, setServices] = useState<QuoteSelectedServices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!quoteId) return;

    const fetchServices = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('v_quote_selected_services')
          .select('*')
          .eq('quote_id', quoteId)
          .order('service_category', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [quoteId]);

  return { services, loading, error };
}

/**
 * Hook to fetch time slot availability
 * Shows available time slots and their utilization
 */
export function useTimeSlotAvailability() {
  const [slots, setSlots] = useState<TimeSlotAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('v_time_slot_availability')
          .select('*')
          .order('day_of_week', { ascending: true })
          .order('start_time', { ascending: true });

        if (error) throw error;
        setSlots(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  return { slots, loading, error };
}

/**
 * Hook to fetch user profile
 * Returns safe user profile data from users_profile table
 */
export function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('users_profile')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}

/**
 * Hook to update user profile
 * Updates the users_profile table with new data
 */
export function useUpdateUserProfile() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProfile = async (
    userId: string,
    updates: Partial<UserProfile>
  ) => {
    setUpdating(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('users_profile')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return { updateProfile, updating, error };
}

/**
 * Hook to get available services for a specific tier and level
 */
export function useAvailableServices(tierId: number, levelId: number) {
  const [services, setServices] = useState<ServiceAvailabilityMatrix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tierId || !levelId) return;

    const fetchServices = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('v_service_availability_matrix')
          .select('*')
          .eq('tier_id', tierId)
          .eq('level_id', levelId)
          .eq('is_available', true)
          .order('service_category', { ascending: true })
          .order('service_name', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [tierId, levelId]);

  return { services, loading, error };
}