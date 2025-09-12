import { z } from "zod";

/**
 * Validation schemas for pricing-related operations.
 * These schemas ensure data integrity for pricing calculations and service selections.
 */

// Pricing tier selection schema
export const PricingTierSelectionSchema = z.object({
  tier_id: z.coerce.number().min(1, "Tier selection is required"),
  level_id: z.coerce.number().min(1, "Level selection is required"),
});

// Optional service selection schema
export const OptionalServiceSelectionSchema = z.object({
  tier_id: z.coerce.number().min(1),
  level_id: z.coerce.number().min(1),
  service_ids: z.array(z.coerce.number().min(1)).min(0).max(20, "Cannot select more than 20 services"),
});

// Upgrade check schema
export const UpgradeCheckSchema = z.object({
  current_tier_id: z.coerce.number().min(1),
  current_level_id: z.coerce.number().min(1),
  target_tier_id: z.coerce.number().min(1),
  target_level_id: z.coerce.number().min(1),
  include_services: z.boolean().default(false),
});

// Price calculation request schema
export const PriceCalculationSchema = z.object({
  tier_id: z.coerce.number().min(1),
  level_id: z.coerce.number().min(1),
  selected_services: z.array(z.coerce.number()).default([]),
  discount_code: z.string().optional(),
  billing_period: z.enum(["monthly", "quarterly", "annual"]).default("monthly"),
});

// Discount validation schema
export const DiscountValidationSchema = z.object({
  code: z.string().min(3, "Discount code is too short").max(50, "Discount code is too long").toUpperCase(),
  tier_id: z.coerce.number().min(1).optional(),
  amount: z.coerce.number().min(0).optional(),
});

// Pricing query schema
export const PricingQuerySchema = z.object({
  include_tiers: z.boolean().default(true),
  include_levels: z.boolean().default(true),
  include_services: z.boolean().default(false),
  include_features: z.boolean().default(false),
  tier_ids: z.array(z.coerce.number()).optional(),
  active_only: z.boolean().default(true),
});

// Service availability schema
export const ServiceAvailabilitySchema = z.object({
  service_id: z.coerce.number().min(1),
  tier_id: z.coerce.number().min(1),
  level_id: z.coerce.number().min(1),
});

// Bulk pricing update schema (admin)
export const BulkPricingUpdateSchema = z.object({
  updates: z
    .array(
      z.object({
        tier_id: z.coerce.number().min(1),
        level_id: z.coerce.number().min(1),
        new_price: z.coerce.number().min(0),
        effective_date: z.coerce.date().optional(),
      }),
    )
    .min(1)
    .max(50, "Cannot update more than 50 prices at once"),
  reason: z.string().min(1, "Reason for price update is required").max(500),
  notify_customers: z.boolean().default(false),
});

// Pricing comparison schema
export const PricingComparisonSchema = z.object({
  tier_ids: z
    .array(z.coerce.number().min(1))
    .min(2, "At least 2 tiers required for comparison")
    .max(5, "Cannot compare more than 5 tiers"),
  level_id: z.coerce.number().min(1),
  include_features: z.boolean().default(true),
  include_pricing: z.boolean().default(true),
});

// Export parsed types
export type PricingTierSelection = z.infer<typeof PricingTierSelectionSchema>;
export type OptionalServiceSelection = z.infer<typeof OptionalServiceSelectionSchema>;
export type UpgradeCheck = z.infer<typeof UpgradeCheckSchema>;
export type PriceCalculation = z.infer<typeof PriceCalculationSchema>;
export type DiscountValidation = z.infer<typeof DiscountValidationSchema>;
export type PricingQuery = z.infer<typeof PricingQuerySchema>;
export type ServiceAvailability = z.infer<typeof ServiceAvailabilitySchema>;
export type BulkPricingUpdate = z.infer<typeof BulkPricingUpdateSchema>;
export type PricingComparison = z.infer<typeof PricingComparisonSchema>;
