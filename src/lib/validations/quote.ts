import { z } from "zod";

/**
 * Validation schemas for quote-related operations.
 * These schemas ensure data integrity for all quote mutations.
 */

// Quote draft schema
export const QuoteDraftSchema = z.object({
  tier_id: z.coerce.number().min(1, "Tier is required"),
  level_id: z.coerce.number().min(1).nullable().optional(),
  selected_services: z.array(z.coerce.number()).optional().default([]),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").nullable().optional(),
});

// Quote submission schema
export const QuoteSubmissionSchema = z.object({
  quote_id: z.coerce.number().min(1, "Quote ID is required"),
  company_name: z.string().min(1, "Company name is required").max(200),
  contact_name: z.string().min(1, "Contact name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine(val => !val || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val), {
      message: "Invalid phone number",
    })
    .optional(),
  project_description: z
    .string()
    .min(10, "Please provide more project details")
    .max(5000, "Description cannot exceed 5000 characters"),
  timeline: z.enum(["immediate", "1_month", "3_months", "6_months", "flexible"]),
  budget_confirmed: z.boolean(),
});

// Discount application schema
export const ApplyDiscountSchema = z.object({
  quote_id: z.coerce.number().min(1),
  discount_code: z
    .string()
    .min(3, "Discount code is too short")
    .max(50, "Discount code is too long")
    .toUpperCase()
    .refine(val => /^[A-Z0-9_-]+$/.test(val), { message: "Invalid discount code format" }),
});

// Quote update schema
export const QuoteUpdateSchema = z.object({
  quote_id: z.coerce.number().min(1),
  tier_id: z.coerce.number().min(1).optional(),
  level_id: z.coerce.number().min(1).optional(),
  selected_services: z.array(z.coerce.number()).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(["draft", "submitted", "approved", "rejected", "expired"]).optional(),
});

// Quote filter schema (for queries)
export const QuoteFilterSchema = z.object({
  status: z.enum(["draft", "submitted", "approved", "rejected", "expired", "all"]).optional(),
  user_id: z.string().optional(),
  date_from: z.coerce.date().optional(),
  date_to: z.coerce.date().optional(),
  tier_id: z.coerce.number().optional(),
  level_id: z.coerce.number().optional(),
  limit: z.coerce.number().min(1).max(100).default(10),
  offset: z.coerce.number().min(0).default(0),
});

// Quote ID schema
export const QuoteIdSchema = z.object({
  id: z.coerce.number().min(1, "Valid quote ID is required"),
});

// Export parsed types
export type QuoteDraft = z.infer<typeof QuoteDraftSchema>;
export type QuoteSubmission = z.infer<typeof QuoteSubmissionSchema>;
export type ApplyDiscount = z.infer<typeof ApplyDiscountSchema>;
export type QuoteUpdate = z.infer<typeof QuoteUpdateSchema>;
export type QuoteFilter = z.infer<typeof QuoteFilterSchema>;
export type QuoteId = z.infer<typeof QuoteIdSchema>;
