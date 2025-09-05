export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          id: number
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          record_id: number | null
          table_name: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          id?: never
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: number | null
          table_name: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          id?: never
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: number | null
          table_name?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      applied_discounts: {
        Row: {
          applied_at: string | null
          discount_amount: number
          discount_id: number | null
          id: number
          quote_id: number | null
        }
        Insert: {
          applied_at?: string | null
          discount_amount: number
          discount_id?: number | null
          id?: never
          quote_id?: number | null
        }
        Update: {
          applied_at?: string | null
          discount_amount?: number
          discount_id?: number | null
          id?: never
          quote_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "applied_discounts_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "active_discounts_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applied_discounts_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "user_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "v_admin_quote_review_queue"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "v_contact_outreach_list"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "v_quote_details"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "v_quote_lifecycle"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "applied_discounts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: true
            referencedRelation: "v_quote_selected_services"
            referencedColumns: ["quote_id"]
          },
        ]
      }
      booked_slots: {
        Row: {
          booking_date: string
          confirmed: boolean | null
          created_at: string | null
          id: number
          quote_id: number | null
          time_slot_id: number | null
        }
        Insert: {
          booking_date: string
          confirmed?: boolean | null
          created_at?: string | null
          id?: never
          quote_id?: number | null
          time_slot_id?: number | null
        }
        Update: {
          booking_date?: string
          confirmed?: boolean | null
          created_at?: string | null
          id?: never
          quote_id?: number | null
          time_slot_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "user_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_review_queue"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_contact_outreach_list"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_details"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_lifecycle"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "booked_slots_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_selected_services"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "booked_slots_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booked_slots_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "v_time_slot_availability"
            referencedColumns: ["slot_id"]
          },
        ]
      }
      contact_preferences: {
        Row: {
          additional_notes: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: number
          language_preference: string | null
          metadata: Json | null
          preferred_date: string | null
          preferred_method: string
          preferred_time_slot_id: number | null
          quote_id: number | null
          timezone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_notes?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: never
          language_preference?: string | null
          metadata?: Json | null
          preferred_date?: string | null
          preferred_method: string
          preferred_time_slot_id?: number | null
          quote_id?: number | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_notes?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: never
          language_preference?: string | null
          metadata?: Json | null
          preferred_date?: string | null
          preferred_method?: string
          preferred_time_slot_id?: number | null
          quote_id?: number | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_preferences_preferred_time_slot_id_fkey"
            columns: ["preferred_time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_preferences_preferred_time_slot_id_fkey"
            columns: ["preferred_time_slot_id"]
            isOneToOne: false
            referencedRelation: "v_time_slot_availability"
            referencedColumns: ["slot_id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "user_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_review_queue"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_contact_outreach_list"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_details"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_lifecycle"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "contact_preferences_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_selected_services"
            referencedColumns: ["quote_id"]
          },
        ]
      }
      discounts: {
        Row: {
          applies_to: string
          applies_to_ids: Json | null
          code: string
          conditions: Json | null
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: number
          is_active: boolean | null
          max_discount_amount: number | null
          min_purchase_amount: number | null
          name: string
          starts_at: string | null
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
          user_id: string | null
          user_specific: boolean | null
        }
        Insert: {
          applies_to: string
          applies_to_ids?: Json | null
          code: string
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: never
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_purchase_amount?: number | null
          name: string
          starts_at?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          user_id?: string | null
          user_specific?: boolean | null
        }
        Update: {
          applies_to?: string
          applies_to_ids?: Json | null
          code?: string
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: never
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_purchase_amount?: number | null
          name?: string
          starts_at?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
          user_id?: string | null
          user_specific?: boolean | null
        }
        Relationships: []
      }
      optional_services: {
        Row: {
          base_price: number
          category: string
          created_at: string | null
          description: string | null
          excluded_from_levels: Json | null
          features: Json | null
          id: number
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          tier_restrictions: Json | null
          updated_at: string | null
        }
        Insert: {
          base_price: number
          category: string
          created_at?: string | null
          description?: string | null
          excluded_from_levels?: Json | null
          features?: Json | null
          id?: never
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          tier_restrictions?: Json | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string | null
          description?: string | null
          excluded_from_levels?: Json | null
          features?: Json | null
          id?: never
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          tier_restrictions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      persona_matcher_responses: {
        Row: {
          answers: Json
          confidence_score: number | null
          created_at: string | null
          id: number
          matched_level: string | null
          matched_tier: string | null
          metadata: Json | null
          questions: Json
          recommendations: Json | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          answers: Json
          confidence_score?: number | null
          created_at?: string | null
          id?: never
          matched_level?: string | null
          matched_tier?: string | null
          metadata?: Json | null
          questions: Json
          recommendations?: Json | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          answers?: Json
          confidence_score?: number | null
          created_at?: string | null
          id?: never
          matched_level?: string | null
          matched_tier?: string | null
          metadata?: Json | null
          questions?: Json
          recommendations?: Json | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pricing_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_journey_events: {
        Row: {
          browser: string | null
          created_at: string | null
          device_type: string | null
          event_data: Json | null
          event_type: string
          id: number
          ip_address: unknown | null
          page_path: string | null
          referrer: string | null
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          event_data?: Json | null
          event_type: string
          id?: never
          ip_address?: unknown | null
          page_path?: string | null
          referrer?: string | null
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          event_data?: Json | null
          event_type?: string
          id?: never
          ip_address?: unknown | null
          page_path?: string | null
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pricing_levels: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json | null
          id: number
          is_active: boolean | null
          level_code: string
          name: string
          original_price: number | null
          price: number
          sort_order: number | null
          tier_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: never
          is_active?: boolean | null
          level_code: string
          name: string
          original_price?: number | null
          price: number
          sort_order?: number | null
          tier_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: never
          is_active?: boolean | null
          level_code?: string
          name?: string
          original_price?: number | null
          price?: number
          sort_order?: number | null
          tier_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_levels_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "complete_pricing_view"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "pricing_levels_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_levels_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "pricing_levels_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_pricing_catalog"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "pricing_levels_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_quote_details"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "pricing_levels_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_service_availability_matrix"
            referencedColumns: ["tier_id"]
          },
        ]
      }
      pricing_tiers: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          target_audience: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_versions: {
        Row: {
          changed_by: string | null
          changes: Json
          created_at: string | null
          id: number
          quote_id: number | null
          version_number: number
        }
        Insert: {
          changed_by?: string | null
          changes: Json
          created_at?: string | null
          id?: never
          quote_id?: number | null
          version_number: number
        }
        Update: {
          changed_by?: string | null
          changes?: Json
          created_at?: string | null
          id?: never
          quote_id?: number | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "user_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_review_queue"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_contact_outreach_list"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_details"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_lifecycle"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "v_quote_selected_services"
            referencedColumns: ["quote_id"]
          },
        ]
      }
      time_slots: {
        Row: {
          created_at: string | null
          current_bookings: number | null
          day_of_week: number
          end_time: string
          id: number
          is_available: boolean | null
          max_bookings: number | null
          metadata: Json | null
          slot_duration: number | null
          slot_type: string | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_bookings?: number | null
          day_of_week: number
          end_time: string
          id?: never
          is_available?: boolean | null
          max_bookings?: number | null
          metadata?: Json | null
          slot_duration?: number | null
          slot_type?: string | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_bookings?: number | null
          day_of_week?: number
          end_time?: string
          id?: never
          is_available?: boolean | null
          max_bookings?: number | null
          metadata?: Json | null
          slot_duration?: number | null
          slot_type?: string | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_quotes: {
        Row: {
          admin_notes: string | null
          base_price: number
          contact_preferences: Json | null
          created_at: string | null
          discount_amount: number | null
          expires_at: string | null
          id: number
          level_id: number | null
          metadata: Json | null
          notes: string | null
          quote_number: string
          quote_sequence: number
          reviewed_at: string | null
          selected_services: Json | null
          services_price: number | null
          status: string | null
          submitted_at: string | null
          tax_amount: number | null
          tier_id: number | null
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          base_price?: number
          contact_preferences?: Json | null
          created_at?: string | null
          discount_amount?: number | null
          expires_at?: string | null
          id?: never
          level_id?: number | null
          metadata?: Json | null
          notes?: string | null
          quote_number: string
          quote_sequence?: never
          reviewed_at?: string | null
          selected_services?: Json | null
          services_price?: number | null
          status?: string | null
          submitted_at?: string | null
          tax_amount?: number | null
          tier_id?: number | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          base_price?: number
          contact_preferences?: Json | null
          created_at?: string | null
          discount_amount?: number | null
          expires_at?: string | null
          id?: never
          level_id?: number | null
          metadata?: Json | null
          notes?: string | null
          quote_number?: string
          quote_sequence?: never
          reviewed_at?: string | null
          selected_services?: Json | null
          services_price?: number | null
          status?: string | null
          submitted_at?: string | null
          tax_amount?: number | null
          tier_id?: number | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_quotes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "complete_pricing_view"
            referencedColumns: ["level_id"]
          },
          {
            foreignKeyName: "user_quotes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "pricing_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_quotes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["level_id"]
          },
          {
            foreignKeyName: "user_quotes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "v_pricing_catalog"
            referencedColumns: ["level_id"]
          },
          {
            foreignKeyName: "user_quotes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "v_quote_details"
            referencedColumns: ["level_id"]
          },
          {
            foreignKeyName: "user_quotes_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "v_service_availability_matrix"
            referencedColumns: ["level_id"]
          },
          {
            foreignKeyName: "user_quotes_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "complete_pricing_view"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "user_quotes_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_quotes_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_admin_quote_overview"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "user_quotes_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_pricing_catalog"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "user_quotes_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_quote_details"
            referencedColumns: ["tier_id"]
          },
          {
            foreignKeyName: "user_quotes_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "v_service_availability_matrix"
            referencedColumns: ["tier_id"]
          },
        ]
      }
      users_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_discounts_view: {
        Row: {
          applies_to: string | null
          applies_to_ids: Json | null
          code: string | null
          conditions: Json | null
          days_remaining: number | null
          description: string | null
          discount_type: string | null
          discount_value: number | null
          display_value: string | null
          expires_at: string | null
          id: number | null
          max_discount_amount: number | null
          min_purchase_amount: number | null
          name: string | null
          remaining_uses: number | null
          starts_at: string | null
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          applies_to?: string | null
          applies_to_ids?: Json | null
          code?: string | null
          conditions?: Json | null
          days_remaining?: never
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          display_value?: never
          expires_at?: string | null
          id?: number | null
          max_discount_amount?: number | null
          min_purchase_amount?: number | null
          name?: string | null
          remaining_uses?: never
          starts_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          applies_to?: string | null
          applies_to_ids?: Json | null
          code?: string | null
          conditions?: Json | null
          days_remaining?: never
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          display_value?: never
          expires_at?: string | null
          id?: number | null
          max_discount_amount?: number | null
          min_purchase_amount?: number | null
          name?: string | null
          remaining_uses?: never
          starts_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: []
      }
      complete_pricing_view: {
        Row: {
          available_services: Json | null
          available_services_count: number | null
          discount_percentage: number | null
          level_code: string | null
          level_id: number | null
          level_name: string | null
          level_original_price: number | null
          level_price: number | null
          tier_id: number | null
          tier_name: string | null
          tier_slug: string | null
        }
        Relationships: []
      }
      persona_insights_view: {
        Row: {
          anonymous_users: number | null
          avg_confidence: number | null
          matched_level: string | null
          matched_tier: string | null
          max_confidence: number | null
          min_confidence: number | null
          recommendation_frequency: Json | null
          registered_users: number | null
          response_count: number | null
        }
        Relationships: []
      }
      persona_matcher_analytics: {
        Row: {
          avg_confidence: number | null
          matched_level: string | null
          matched_tier: string | null
          most_common_match: string | null
          registered_user_percentage: number | null
          response_count: number | null
          unique_sessions: number | null
        }
        Relationships: []
      }
      pricing_funnel_analytics: {
        Row: {
          conversion_rate: number | null
          date: string | null
          level_selections: number | null
          page_views: number | null
          quotes_created: number | null
          quotes_submitted: number | null
          service_selections: number | null
          tier_selections: number | null
          total_sessions: number | null
        }
        Relationships: []
      }
      quote_analytics_summary: {
        Row: {
          accepted_quotes: number | null
          avg_quote_value: number | null
          date: string | null
          draft_quotes: number | null
          submitted_quotes: number | null
          total_quotes: number | null
          total_revenue: number | null
          unique_users: number | null
        }
        Relationships: []
      }
      quote_statistics_view: {
        Row: {
          acceptance_rate: number | null
          accepted_count: number | null
          avg_hours_to_submit: number | null
          avg_quote_value: number | null
          draft_count: number | null
          expired_count: number | null
          max_quote_value: number | null
          min_quote_value: number | null
          rejected_count: number | null
          submitted_count: number | null
          total_accepted_value: number | null
          total_quotes: number | null
          under_review_count: number | null
          unique_users: number | null
        }
        Relationships: []
      }
      quote_status_analytics: {
        Row: {
          avg_hours_in_status: number | null
          avg_value: number | null
          count: number | null
          last_created: string | null
          percentage: number | null
          status: string | null
          total_value: number | null
        }
        Relationships: []
      }
      service_categories_view: {
        Row: {
          category: string | null
          service_count: number | null
          services: Json | null
        }
        Relationships: []
      }
      service_popularity_view: {
        Row: {
          accepted_count: number | null
          actual_revenue: number | null
          base_price: number | null
          category: string | null
          id: number | null
          name: string | null
          potential_revenue: number | null
          selection_count: number | null
          selection_rate: number | null
          slug: string | null
        }
        Relationships: []
      }
      tier_comparison_view: {
        Row: {
          levels: Json | null
          target_audience: string | null
          tier_description: string | null
          tier_name: string | null
          tier_slug: string | null
        }
        Relationships: []
      }
      tier_performance_view: {
        Row: {
          accepted_quotes: number | null
          avg_quote_value: number | null
          level_breakdown: Json | null
          tier_name: string | null
          tier_slug: string | null
          total_quotes: number | null
          total_revenue: number | null
        }
        Relationships: []
      }
      time_slot_availability_view: {
        Row: {
          available_capacity: number | null
          available_slots: number | null
          current_bookings: number | null
          day_name: string | null
          day_of_week: number | null
          slot_type: string | null
          total_capacity: number | null
          total_slots: number | null
          utilization_rate: number | null
        }
        Relationships: []
      }
      user_journey_funnel_view: {
        Row: {
          added_services_count: number | null
          created_quote_count: number | null
          level_selection_rate: number | null
          overall_conversion_rate: number | null
          quote_creation_rate: number | null
          quote_submission_rate: number | null
          selected_level_count: number | null
          selected_tier_count: number | null
          submitted_quote_count: number | null
          tier_selection_rate: number | null
          total_sessions: number | null
          viewed_pricing_count: number | null
        }
        Relationships: []
      }
      v_admin_quote_overview: {
        Row: {
          admin_notes: string | null
          base_price_eur: number | null
          contact_preferences: Json | null
          customer_notes: string | null
          discount_amount_eur: number | null
          is_editable: boolean | null
          is_expired: boolean | null
          level_code: string | null
          level_id: number | null
          level_name: string | null
          preferred_contact_method: string | null
          quote_created_at: string | null
          quote_expires_at: string | null
          quote_id: number | null
          quote_number: string | null
          quote_reviewed_at: string | null
          quote_status: string | null
          quote_submitted_at: string | null
          quote_updated_at: string | null
          selected_services: Json | null
          service_count: number | null
          services_price_eur: number | null
          tax_amount_eur: number | null
          tier_id: number | null
          tier_name: string | null
          tier_slug: string | null
          total_price_eur: number | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: []
      }
      v_admin_quote_review_queue: {
        Row: {
          action_needed: string | null
          created_at: string | null
          days_until_expiry: number | null
          expires_at: string | null
          hours_since_submission: number | null
          level_code: string | null
          level_name: string | null
          priority: number | null
          quote_id: number | null
          quote_number: string | null
          status: string | null
          submitted_at: string | null
          tier_name: string | null
          total_price_eur: number | null
          user_email: string | null
          user_full_name: string | null
        }
        Relationships: []
      }
      v_contact_outreach_list: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          days_since_activity: number | null
          language_preference: string | null
          outreach_priority: string | null
          preferred_contact_method: string | null
          preferred_date: string | null
          quote_created_at: string | null
          quote_expires_at: string | null
          quote_id: number | null
          quote_number: string | null
          quote_status: string | null
          quote_submitted_at: string | null
          timezone: string | null
          user_email: string | null
          user_full_name: string | null
          user_phone: string | null
        }
        Relationships: []
      }
      v_executive_dashboard: {
        Row: {
          abandoned_drafts: number | null
          avg_quote_value_this_month: number | null
          quote_growth_rate: number | null
          quotes_pending_review: number | null
          quotes_this_month: number | null
          quotes_under_review: number | null
          revenue_growth_rate: number | null
          revenue_this_month: number | null
          total_quotes_all_time: number | null
          total_revenue_all_time: number | null
          unique_users_this_month: number | null
        }
        Relationships: []
      }
      v_persona_matcher_analysis: {
        Row: {
          acceptance_rate: number | null
          avg_confidence_score: number | null
          matched_level: string | null
          matched_tier: string | null
          matched_tier_quotes: number | null
          quote_creation_rate: number | null
          quotes_accepted: number | null
          quotes_created: number | null
          quotes_submitted: number | null
          tier_match_accuracy: number | null
          total_matches: number | null
        }
        Relationships: []
      }
      v_pricing_catalog: {
        Row: {
          level_code: string | null
          level_created_at: string | null
          level_description: string | null
          level_discount_percentage: number | null
          level_features: Json | null
          level_id: number | null
          level_is_active: boolean | null
          level_name: string | null
          level_original_price_eur: number | null
          level_price_eur: number | null
          level_sort_order: number | null
          level_updated_at: string | null
          tier_description: string | null
          tier_id: number | null
          tier_is_active: boolean | null
          tier_name: string | null
          tier_slug: string | null
          tier_sort_order: number | null
          tier_target_audience: string | null
        }
        Relationships: []
      }
      v_pricing_funnel_analysis: {
        Row: {
          created_quote: number | null
          day: string | null
          entered_contact: number | null
          level_selection_rate: number | null
          overall_conversion_rate: number | null
          quote_creation_rate: number | null
          quote_submission_rate: number | null
          selected_level: number | null
          selected_services: number | null
          selected_tier: number | null
          service_selection_rate: number | null
          submitted_quote: number | null
          tier_selection_rate: number | null
          total_sessions: number | null
          viewed_pricing: number | null
        }
        Relationships: []
      }
      v_pricing_system_summary: {
        Row: {
          accepted_quotes: number | null
          active_discounts: number | null
          active_levels: number | null
          active_services: number | null
          active_tiers: number | null
          active_users_30d: number | null
          available_time_slots: number | null
          avg_accepted_quote_eur: number | null
          draft_quotes: number | null
          submitted_quotes: number | null
          total_discounts_applied_eur: number | null
          total_persona_matches: number | null
          total_quotes: number | null
          total_revenue_eur: number | null
          total_sessions: number | null
          total_users: number | null
          upcoming_bookings: number | null
        }
        Relationships: []
      }
      v_quote_details: {
        Row: {
          admin_notes: string | null
          base_price_eur: number | null
          contact_preferences: Json | null
          customer_notes: string | null
          days_until_expiry: number | null
          discount_amount_eur: number | null
          is_editable: boolean | null
          is_expired: boolean | null
          level_code: string | null
          level_id: number | null
          level_name: string | null
          preferred_contact_method: string | null
          preferred_contact_time: string | null
          quote_created_at: string | null
          quote_expires_at: string | null
          quote_id: number | null
          quote_number: string | null
          quote_reviewed_at: string | null
          quote_status: string | null
          quote_submitted_at: string | null
          quote_updated_at: string | null
          selected_services: Json | null
          service_count: number | null
          services_price_eur: number | null
          tax_amount_eur: number | null
          tier_id: number | null
          tier_name: string | null
          tier_slug: string | null
          total_price_eur: number | null
          user_email: string | null
          user_full_name: string | null
          user_id: string | null
          user_phone: string | null
        }
        Relationships: []
      }
      v_quote_lifecycle: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          days_since_creation: number | null
          expires_at: string | null
          hours_in_draft: number | null
          hours_in_review: number | null
          hours_in_submitted: number | null
          quote_id: number | null
          quote_number: string | null
          rejected_at: string | null
          reviewed_at: string | null
          status: string | null
          submitted_at: string | null
          total_hours_to_decision: number | null
        }
        Relationships: []
      }
      v_quote_selected_services: {
        Row: {
          quote_id: number | null
          quote_number: string | null
          quote_status: string | null
          service_category: string | null
          service_description: string | null
          service_features: Json | null
          service_id: number | null
          service_name: string | null
          service_price_eur: number | null
          service_slug: string | null
        }
        Relationships: []
      }
      v_revenue_analysis: {
        Row: {
          acceptance_rate: number | null
          accepted_quotes: number | null
          avg_discount_when_used_eur: number | null
          avg_quote_value_eur: number | null
          avg_services_per_quote: number | null
          expired_quotes: number | null
          level_code: string | null
          level_name: string | null
          month: string | null
          potential_revenue_eur: number | null
          realized_revenue_eur: number | null
          rejected_quotes: number | null
          tier_name: string | null
          tier_slug: string | null
          total_discounts_given_eur: number | null
          total_quotes: number | null
          total_services_revenue_eur: number | null
        }
        Relationships: []
      }
      v_service_adoption_analysis: {
        Row: {
          acceptance_rate_when_selected: number | null
          potential_revenue_eur: number | null
          realized_revenue_eur: number | null
          selection_rate: number | null
          service_category: string | null
          service_id: number | null
          service_name: string | null
          service_price_eur: number | null
          service_slug: string | null
          times_in_accepted_quotes: number | null
          times_selected: number | null
          unique_users: number | null
        }
        Relationships: []
      }
      v_service_availability_matrix: {
        Row: {
          effective_price_eur: number | null
          is_available: boolean | null
          is_included_in_level: boolean | null
          level_code: string | null
          level_id: number | null
          level_name: string | null
          service_category: string | null
          service_description: string | null
          service_features: Json | null
          service_id: number | null
          service_name: string | null
          service_price_eur: number | null
          service_slug: string | null
          tier_id: number | null
          tier_name: string | null
          tier_slug: string | null
        }
        Relationships: []
      }
      v_time_slot_availability: {
        Row: {
          available_spots: number | null
          current_bookings: number | null
          day_name: string | null
          duration_minutes: number | null
          end_time: string | null
          max_bookings: number | null
          slot_id: number | null
          start_time: string | null
          utilization_rate: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      apply_discount_to_quote: {
        Args: { p_quote_id: number; p_discount_code: string }
        Returns: Json
      }
      assign_admin_role: {
        Args: { p_user_id: string; p_role?: string }
        Returns: Json
      }
      book_time_slot: {
        Args: { p_slot_id: number; p_date: string; p_quote_id: number }
        Returns: Json
      }
      calculate_discount_amount: {
        Args: {
          p_discount_type: string
          p_discount_value: number
          p_base_amount: number
        }
        Returns: number
      }
      calculate_quote_total: {
        Args: {
          p_base_price: number
          p_services_price: number
          p_discount_amount: number
          p_tax_rate?: number
        }
        Returns: Json
      }
      calculate_quote_totals: {
        Args: {
          p_level_id: number
          p_service_ids: Json
          p_discount_amount?: number
        }
        Returns: Json
      }
      cleanup_test_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      expire_old_quotes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_sample_quotes: {
        Args: { p_count?: number }
        Returns: undefined
      }
      get_available_time_slots: {
        Args: { p_date?: string; p_slot_type?: string }
        Returns: {
          slot_id: number
          slot_date: string
          start_time: string
          end_time: string
          available_spots: number
        }[]
      }
      get_user_journey_summary: {
        Args: { p_session_id: string }
        Returns: {
          total_events: number
          total_time_seconds: number
          steps_completed: number[]
          last_step: number
          has_quote: boolean
          abandoned: boolean
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_quote_editable: {
        Args: { p_quote_id: number }
        Returns: boolean
      }
      is_slot_available: {
        Args: { p_slot_id: number; p_date: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      track_analytics_event: {
        Args: {
          p_session_id: string
          p_event_type: string
          p_event_data?: Json
          p_page_path?: string
        }
        Returns: undefined
      }
      track_pricing_event: {
        Args: {
          p_user_id: string
          p_session_id: string
          p_event_type: string
          p_event_data?: Json
          p_step_number?: number
          p_time_spent?: number
          p_quote_id?: number
        }
        Returns: number
      }
      validate_discount: {
        Args: {
          p_code: string
          p_quote_id?: number
          p_tier_id?: number
          p_purchase_amount?: number
        }
        Returns: Json
      }
    }
    Enums: {
      user_role: "customer" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      user_role: ["customer", "admin", "super_admin"],
    },
  },
} as const
