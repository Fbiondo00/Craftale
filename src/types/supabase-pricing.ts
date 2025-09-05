/**
 * Supabase Pricing Database Types
 * Auto-generated from database schema
 */

export interface Database {
  public: {
    Tables: {
      pricing_tiers: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          target_audience: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          target_audience?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          target_audience?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      pricing_levels: {
        Row: {
          id: string;
          tier_id: string;
          level_code: 'A' | 'B' | 'C';
          name: string;
          price: number;
          original_price: number | null;
          description: string | null;
          features: string[];
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tier_id: string;
          level_code: 'A' | 'B' | 'C';
          name: string;
          price: number;
          original_price?: number | null;
          description?: string | null;
          features?: string[];
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tier_id?: string;
          level_code?: 'A' | 'B' | 'C';
          name?: string;
          price?: number;
          original_price?: number | null;
          description?: string | null;
          features?: string[];
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      optional_services: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          category: string;
          base_price: number;
          features: string[];
          excluded_from_levels: string[];
          tier_restrictions: string[];
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          category: string;
          base_price: number;
          features?: string[];
          excluded_from_levels?: string[];
          tier_restrictions?: string[];
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          category?: string;
          base_price?: number;
          features?: string[];
          excluded_from_levels?: string[];
          tier_restrictions?: string[];
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_quotes: {
        Row: {
          id: string;
          user_id: string;
          quote_number: string;
          tier_id: string | null;
          level_id: string | null;
          selected_services: string[];
          base_price: number;
          services_price: number;
          discount_amount: number;
          tax_amount: number;
          total_price: number;
          status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'expired';
          expires_at: string | null;
          submitted_at: string | null;
          reviewed_at: string | null;
          contact_preferences: ContactPreference | null;
          notes: string | null;
          admin_notes: string | null;
          metadata: QuoteMetadata;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quote_number?: string;
          tier_id?: string | null;
          level_id?: string | null;
          selected_services?: string[];
          base_price?: number;
          services_price?: number;
          discount_amount?: number;
          tax_amount?: number;
          total_price?: number;
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'expired';
          expires_at?: string | null;
          submitted_at?: string | null;
          reviewed_at?: string | null;
          contact_preferences?: ContactPreference | null;
          notes?: string | null;
          admin_notes?: string | null;
          metadata?: QuoteMetadata;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quote_number?: string;
          tier_id?: string | null;
          level_id?: string | null;
          selected_services?: string[];
          base_price?: number;
          services_price?: number;
          discount_amount?: number;
          tax_amount?: number;
          total_price?: number;
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'expired';
          expires_at?: string | null;
          submitted_at?: string | null;
          reviewed_at?: string | null;
          contact_preferences?: ContactPreference | null;
          notes?: string | null;
          admin_notes?: string | null;
          metadata?: QuoteMetadata;
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_versions: {
        Row: {
          id: string;
          quote_id: string;
          version_number: number;
          changes: Record<string, any>;
          changed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_id: string;
          version_number: number;
          changes: Record<string, any>;
          changed_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote_id?: string;
          version_number?: number;
          changes?: Record<string, any>;
          changed_by?: string | null;
          created_at?: string;
        };
      };
      discounts: {
        Row: {
          id: string;
          code: string | null;
          name: string;
          description: string | null;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          applies_to: 'all' | 'tier' | 'level' | 'service';
          applies_to_ids: string[];
          usage_limit: number | null;
          usage_count: number;
          user_specific: boolean;
          user_id: string | null;
          starts_at: string;
          expires_at: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code?: string | null;
          name: string;
          description?: string | null;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          applies_to: 'all' | 'tier' | 'level' | 'service';
          applies_to_ids?: string[];
          usage_limit?: number | null;
          usage_count?: number;
          user_specific?: boolean;
          user_id?: string | null;
          starts_at?: string;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string | null;
          name?: string;
          description?: string | null;
          discount_type?: 'percentage' | 'fixed';
          discount_value?: number;
          applies_to?: 'all' | 'tier' | 'level' | 'service';
          applies_to_ids?: string[];
          usage_limit?: number | null;
          usage_count?: number;
          user_specific?: boolean;
          user_id?: string | null;
          starts_at?: string;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      applied_discounts: {
        Row: {
          id: string;
          quote_id: string;
          discount_id: string;
          discount_amount: number;
          applied_at: string;
        };
        Insert: {
          id?: string;
          quote_id: string;
          discount_id: string;
          discount_amount: number;
          applied_at?: string;
        };
        Update: {
          id?: string;
          quote_id?: string;
          discount_id?: string;
          discount_amount?: number;
          applied_at?: string;
        };
      };
      time_slots: {
        Row: {
          id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          slot_duration: number;
          max_bookings: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          slot_duration?: number;
          max_bookings?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          slot_duration?: number;
          max_bookings?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_preferences: {
        Row: {
          id: string;
          quote_id: string;
          preferred_date: string;
          time_slot_id: string;
          priority: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_id: string;
          preferred_date: string;
          time_slot_id: string;
          priority: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote_id?: string;
          preferred_date?: string;
          time_slot_id?: string;
          priority?: number;
          notes?: string | null;
          created_at?: string;
        };
      };
      booked_slots: {
        Row: {
          id: string;
          time_slot_id: string;
          booking_date: string;
          quote_id: string;
          confirmed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          time_slot_id: string;
          booking_date: string;
          quote_id: string;
          confirmed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          time_slot_id?: string;
          booking_date?: string;
          quote_id?: string;
          confirmed?: boolean;
          created_at?: string;
        };
      };
      pricing_config: {
        Row: {
          id: string;
          key: string;
          value: any;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: any;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: any;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pricing_journey_events: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string;
          quote_id: string | null;
          event_type: string;
          event_data: Record<string, any>;
          step_number: number | null;
          time_spent_seconds: number | null;
          user_agent: string | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id: string;
          quote_id?: string | null;
          event_type: string;
          event_data?: Record<string, any>;
          step_number?: number | null;
          time_spent_seconds?: number | null;
          user_agent?: string | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string;
          quote_id?: string | null;
          event_type?: string;
          event_data?: Record<string, any>;
          step_number?: number | null;
          time_spent_seconds?: number | null;
          user_agent?: string | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };
      persona_matcher_responses: {
        Row: {
          id: string;
          user_id: string | null;
          quote_id: string | null;
          session_id: string;
          step_type: 'tier_selection' | 'level_selection';
          questions: PersonaQuestion[];
          recommendation: string | null;
          completed: boolean;
          abandoned_at_question: number | null;
          total_time_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          quote_id?: string | null;
          session_id: string;
          step_type: 'tier_selection' | 'level_selection';
          questions?: PersonaQuestion[];
          recommendation?: string | null;
          completed?: boolean;
          abandoned_at_question?: number | null;
          total_time_seconds?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          quote_id?: string | null;
          session_id?: string;
          step_type?: 'tier_selection' | 'level_selection';
          questions?: PersonaQuestion[];
          recommendation?: string | null;
          completed?: boolean;
          abandoned_at_question?: number | null;
          total_time_seconds?: number | null;
          created_at?: string;
        };
      };
    };
    Views: {
      pricing_funnel_analytics: {
        Row: {
          date: string;
          total_sessions: number;
          reached_step_1: number;
          reached_step_2: number;
          reached_step_3: number;
          reached_step_4: number;
          quotes_created: number;
        };
      };
      persona_matcher_analytics: {
        Row: {
          step_type: string;
          total_attempts: number;
          completed: number;
          abandoned: number;
          avg_time_seconds: number;
          avg_abandon_question: number;
        };
      };
      quote_status_analytics: {
        Row: {
          status: string;
          count: number;
          avg_value: number;
          total_value: number;
        };
      };
    };
    Functions: {
      generate_quote_number: {
        Args: Record<string, never>;
        Returns: string;
      };
      calculate_quote_totals: {
        Args: {
          p_base_price: number;
          p_services_price: number;
          p_discount_amount: number;
          p_tax_rate?: number;
        };
        Returns: {
          subtotal: number;
          tax_amount: number;
          total_price: number;
        };
      };
      validate_discount: {
        Args: {
          p_code: string;
          p_user_id: string;
          p_tier_id?: string;
          p_level_id?: string;
          p_service_ids?: string[];
        };
        Returns: {
          is_valid: boolean;
          discount_id: string | null;
          discount_type: string | null;
          discount_value: number | null;
          message: string;
        };
      };
      apply_discount_to_quote: {
        Args: {
          p_quote_id: string;
          p_discount_code: string;
        };
        Returns: {
          success: boolean;
          message: string;
          discount_amount: number;
        };
      };
      get_available_time_slots: {
        Args: {
          p_start_date: string;
          p_end_date: string;
        };
        Returns: {
          slot_date: string;
          slot_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          duration: number;
          available_spots: number;
        }[];
      };
      book_time_slot: {
        Args: {
          p_quote_id: string;
          p_slot_id: string;
          p_date: string;
        };
        Returns: {
          success: boolean;
          message: string;
        };
      };
      track_pricing_event: {
        Args: {
          p_user_id?: string;
          p_session_id: string;
          p_event_type: string;
          p_event_data?: Record<string, any>;
          p_step_number?: number;
          p_time_spent?: number;
          p_quote_id?: string;
        };
        Returns: string;
      };
      get_user_journey_summary: {
        Args: {
          p_session_id: string;
        };
        Returns: {
          total_events: number;
          total_time_seconds: number;
          steps_completed: number[];
          last_step: number;
          has_quote: boolean;
          abandoned: boolean;
        };
      };
    };
  };
}

// Helper Types
export interface ContactPreference {
  time_windows: TimeWindow[];
  preferred_contact_method?: 'phone' | 'email' | 'whatsapp';
  notes?: string;
}

export interface TimeWindow {
  date: string;
  time_slot_id: string;
  priority: number;
}

export interface QuoteMetadata {
  persona_matcher_responses?: Record<string, any>;
  journey_tracking?: {
    source?: string;
    utm_params?: Record<string, string>;
    referrer?: string;
  };
  user_preferences?: Record<string, any>;
  ab_test_variant?: string;
}

export interface PersonaQuestion {
  question: string;
  answer: any;
  time_spent: number;
}

// API Response Types
export interface TierWithLevels {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  target_audience: string | null;
  levels: PricingLevel[];
}

export interface PricingLevel {
  id: string;
  level_code: 'A' | 'B' | 'C';
  name: string;
  price: number;
  original_price: number | null;
  features: string[];
}

export interface OptionalServiceWithAvailability {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  features: string[];
  included: boolean;
  available: boolean;
}

export interface UpgradeRecommendation {
  current_total: number;
  upgrade_option: {
    level_id: string;
    level_name: string;
    price: number;
    additional_features: string[];
    savings: number;
  } | null;
}

export interface QuoteSummary {
  id: string;
  quote_number: string;
  status: string;
  total_price: number;
  created_at: string;
  expires_at: string | null;
  tier_name?: string;
  level_name?: string;
}

export interface AvailableTimeSlot {
  date: string;
  slots: {
    id: string;
    start_time: string;
    end_time: string;
    available: boolean;
  }[];
}

// Event Types
export type PricingEventType =
  | 'page_view'
  | 'step_viewed'
  | 'tier_selected'
  | 'level_selected'
  | 'service_added'
  | 'service_removed'
  | 'discount_applied'
  | 'quote_saved'
  | 'quote_submitted'
  | 'persona_matcher_started'
  | 'persona_matcher_completed'
  | 'persona_matcher_abandoned'
  | 'upgrade_suggested'
  | 'upgrade_accepted'
  | 'time_slot_selected';
