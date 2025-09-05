/**
 * Central export for all validation schemas.
 * Import from here to ensure consistent validation across the application.
 */

// Quote validations
export {
  QuoteDraftSchema,
  QuoteSubmissionSchema,
  ApplyDiscountSchema,
  QuoteUpdateSchema,
  QuoteFilterSchema,
  QuoteIdSchema,
  type QuoteDraft,
  type QuoteSubmission,
  type ApplyDiscount,
  type QuoteUpdate,
  type QuoteFilter,
  type QuoteId,
} from './quote'

// Pricing validations
export {
  PricingTierSelectionSchema,
  OptionalServiceSelectionSchema,
  UpgradeCheckSchema,
  PriceCalculationSchema,
  DiscountValidationSchema,
  PricingQuerySchema,
  ServiceAvailabilitySchema,
  BulkPricingUpdateSchema,
  PricingComparisonSchema,
  type PricingTierSelection,
  type OptionalServiceSelection,
  type UpgradeCheck,
  type PriceCalculation,
  type DiscountValidation,
  type PricingQuery,
  type ServiceAvailability,
  type BulkPricingUpdate,
  type PricingComparison,
} from './pricing'

// Contact validations
export {
  ContactFormSchema,
  TimeSlotBookingSchema,
  TimeSlotQuerySchema,
  NewsletterSubscriptionSchema,
  type ContactForm,
  type TimeSlotBooking,
  type TimeSlotQuery,
  type NewsletterSubscription,
} from './contact'

// Common validations and utilities
export {
  emailSchema,
  phoneSchema,
  urlSchema,
  uuidSchema,
  PaginationSchema,
  DateRangeSchema,
  FileUploadSchema,
  AddressSchema,
  SearchQuerySchema,
  IdParamSchema,
  NumericIdParamSchema,
  SlugParamSchema,
  StatusSchema,
  PrioritySchema,
  validateFormData,
  safeParse,
  type Pagination,
  type DateRange,
  type FileUpload,
  type Address,
  type SearchQuery,
  type Status,
  type Priority,
} from './common'