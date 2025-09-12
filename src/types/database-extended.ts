/**
 * Extended Database Types
 * These types extend the auto-generated database types with additional
 * helper types and API response types
 */
import type { Database } from "@/types/database.types";

// Re-export the Database type for convenience
export type { Database };

// Table row types (using the new generated types)
export type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];
export type PricingLevel = Database["public"]["Tables"]["pricing_levels"]["Row"];
export type OptionalService = Database["public"]["Tables"]["optional_services"]["Row"];
export type UserQuote = Database["public"]["Tables"]["user_quotes"]["Row"];
export type Discount = Database["public"]["Tables"]["discounts"]["Row"];
export type AppliedDiscount = Database["public"]["Tables"]["applied_discounts"]["Row"];
export type TimeSlot = Database["public"]["Tables"]["time_slots"]["Row"];
export type ContactPreference = Database["public"]["Tables"]["contact_preferences"]["Row"];
export type BookedSlot = Database["public"]["Tables"]["booked_slots"]["Row"];
export type PricingConfig = Database["public"]["Tables"]["pricing_config"]["Row"];
export type PricingJourneyEvent = Database["public"]["Tables"]["pricing_journey_events"]["Row"];
export type PersonaMatcherResponse = Database["public"]["Tables"]["persona_matcher_responses"]["Row"];
export type UserProfile = Database["public"]["Tables"]["users_profile"]["Row"];

// New comprehensive view types (v_ prefixed views) - Customer facing only
export type PricingCatalog = Database["public"]["Views"]["v_pricing_catalog"]["Row"];
export type QuoteDetails = Database["public"]["Views"]["v_quote_details"]["Row"];
export type QuoteSelectedServices = Database["public"]["Views"]["v_quote_selected_services"]["Row"];
export type ServiceAvailabilityMatrix = Database["public"]["Views"]["v_service_availability_matrix"]["Row"];
export type TimeSlotAvailability = Database["public"]["Views"]["v_time_slot_availability"]["Row"];

// Admin view types (exported for type safety but not used in this app)
export type AdminQuoteOverview = Database["public"]["Views"]["v_admin_quote_overview"]["Row"];
export type AdminQuoteReviewQueue = Database["public"]["Views"]["v_admin_quote_review_queue"]["Row"];
export type ContactOutreachList = Database["public"]["Views"]["v_contact_outreach_list"]["Row"];
export type ExecutiveDashboard = Database["public"]["Views"]["v_executive_dashboard"]["Row"];
export type PersonaMatcherAnalysis = Database["public"]["Views"]["v_persona_matcher_analysis"]["Row"];
export type PricingFunnelAnalysis = Database["public"]["Views"]["v_pricing_funnel_analysis"]["Row"];
export type PricingSystemSummary = Database["public"]["Views"]["v_pricing_system_summary"]["Row"];
export type QuoteLifecycle = Database["public"]["Views"]["v_quote_lifecycle"]["Row"];
export type RevenueAnalysis = Database["public"]["Views"]["v_revenue_analysis"]["Row"];
export type ServiceAdoptionAnalysis = Database["public"]["Views"]["v_service_adoption_analysis"]["Row"];

// Legacy view types (for backward compatibility if needed)
export type ActiveDiscountsView = Database["public"]["Views"]["active_discounts_view"]["Row"];
export type CompletePricingView = Database["public"]["Views"]["complete_pricing_view"]["Row"];
export type PersonaInsightsView = Database["public"]["Views"]["persona_insights_view"]["Row"];
export type PersonaMatcherAnalyticsView = Database["public"]["Views"]["persona_matcher_analytics"]["Row"];
export type PricingFunnelAnalyticsView = Database["public"]["Views"]["pricing_funnel_analytics"]["Row"];
export type QuoteAnalyticsSummary = Database["public"]["Views"]["quote_analytics_summary"]["Row"];
export type QuoteStatisticsView = Database["public"]["Views"]["quote_statistics_view"]["Row"];
export type QuoteStatusAnalytics = Database["public"]["Views"]["quote_status_analytics"]["Row"];
export type ServiceCategoriesView = Database["public"]["Views"]["service_categories_view"]["Row"];
export type ServicePopularityView = Database["public"]["Views"]["service_popularity_view"]["Row"];
export type TierComparisonView = Database["public"]["Views"]["tier_comparison_view"]["Row"];
export type TierPerformanceView = Database["public"]["Views"]["tier_performance_view"]["Row"];
export type TimeSlotAvailabilityView = Database["public"]["Views"]["time_slot_availability_view"]["Row"];
export type UserJourneyFunnelView = Database["public"]["Views"]["user_journey_funnel_view"]["Row"];

// Helper types for JSONB fields
export interface ContactPreferenceData {
  time_windows: TimeWindow[];
  preferred_contact_method?: "phone" | "email" | "whatsapp";
  notes?: string;
}

export interface TimeWindow {
  date: string;
  time_slot_id: number;
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
  discount_code?: string;
}

export interface PersonaQuestion {
  question: string;
  answer: any;
  time_spent: number;
}

// API Response Types - adjusted for new number IDs
export interface TierWithLevels {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  target_audience: string | null;
  levels: PricingLevelSimplified[];
}

export interface PricingLevelSimplified {
  id: number;
  level_code: string;
  name: string;
  price: string;
  original_price: string | null;
  features: any; // JSONB type
}

export interface OptionalServiceWithAvailability {
  id: number;
  name: string;
  description: string | null;
  category: string;
  price: string | number;
  features: any[]; // JSONB array type
  included: boolean;
  available: boolean;
}

export interface UpgradeRecommendation {
  current_total: number;
  upgrade_option: {
    level_id: number;
    level_name: string;
    price: number;
    additional_features: string[];
    savings: number;
  } | null;
}

export interface QuoteSummary {
  id: number;
  quote_number: string;
  status: string;
  total_price: string;
  created_at: string;
  expires_at: string | null;
  tier_name?: string;
  level_name?: string;
}

export interface AvailableTimeSlot {
  date: string;
  slots: {
    id: number;
    start_time: string;
    end_time: string;
    available: boolean;
  }[];
}

// Event Types
export type PricingEventType =
  | "page_view"
  | "step_viewed"
  | "tier_selected"
  | "level_selected"
  | "service_added"
  | "service_removed"
  | "discount_applied"
  | "quote_saved"
  | "quote_submitted"
  | "persona_matcher_started"
  | "persona_matcher_completed"
  | "persona_matcher_abandoned"
  | "upgrade_suggested"
  | "upgrade_accepted"
  | "time_slot_selected";

// Insert and Update types (for convenience)
export type PricingTierInsert = Database["public"]["Tables"]["pricing_tiers"]["Insert"];
export type PricingLevelInsert = Database["public"]["Tables"]["pricing_levels"]["Insert"];
export type OptionalServiceInsert = Database["public"]["Tables"]["optional_services"]["Insert"];
export type UserQuoteInsert = Database["public"]["Tables"]["user_quotes"]["Insert"];
export type UserQuoteUpdate = Database["public"]["Tables"]["user_quotes"]["Update"];
export type DiscountInsert = Database["public"]["Tables"]["discounts"]["Insert"];
export type AppliedDiscountInsert = Database["public"]["Tables"]["applied_discounts"]["Insert"];
export type UserProfileInsert = Database["public"]["Tables"]["users_profile"]["Insert"];
export type UserProfileUpdate = Database["public"]["Tables"]["users_profile"]["Update"];

// Function return types
export type ValidateDiscountResult = Database["public"]["Functions"]["validate_discount"]["Returns"];
export type CalculateQuoteTotalsResult = Database["public"]["Functions"]["calculate_quote_totals"]["Returns"];
