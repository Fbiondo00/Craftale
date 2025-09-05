import { z } from 'zod'

/**
 * Common validation schemas and utilities used across the application.
 */

// Common field validators
export const emailSchema = z.string().email('Please enter a valid email address')

export const phoneSchema = z.string().regex(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  'Please enter a valid phone number'
)

export const urlSchema = z.string().url('Please enter a valid URL')

export const uuidSchema = z.string().uuid('Invalid ID format')

// Pagination schema
export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sort_by: z.string().optional(),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
})

// Date range schema
export const DateRangeSchema = z.object({
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
}).refine(data => data.end_date >= data.start_date, {
  message: 'End date must be after start date',
  path: ['end_date'],
})

// File upload schema
export const FileUploadSchema = z.object({
  filename: z.string().min(1),
  size: z.number().max(10 * 1024 * 1024, 'File size cannot exceed 10MB'),
  type: z.string(),
  content: z.string().optional(), // Base64 encoded content
})

// Address schema
export const AddressSchema = z.object({
  street: z.string().min(1, 'Street address is required').max(200),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(2).max(50).optional(),
  postal_code: z.string().min(3).max(20),
  country: z.string().min(2).max(100),
})

// Search query schema
export const SearchQuerySchema = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  filters: z.record(z.string(), z.any()).optional(),
  pagination: PaginationSchema.optional(),
})

// ID parameter schema
export const IdParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
})

// Numeric ID parameter schema
export const NumericIdParamSchema = z.object({
  id: z.coerce.number().min(1, 'Valid ID is required'),
})

// Slug parameter schema
export const SlugParamSchema = z.object({
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
})

// Status schema (reusable)
export const StatusSchema = z.enum([
  'active',
  'inactive',
  'pending',
  'approved',
  'rejected',
  'archived',
])

// Priority schema
export const PrioritySchema = z.enum(['low', 'medium', 'high', 'urgent'])

// Validation helpers
export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  formData: FormData
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const rawData: Record<string, any> = {}
  
  formData.forEach((value, key) => {
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2)
      if (!rawData[cleanKey]) {
        rawData[cleanKey] = []
      }
      rawData[cleanKey].push(value)
    } else {
      rawData[key] = value
    }
  })
  
  const result = schema.safeParse(rawData)
  
  if (result.success) {
    return { success: true, data: result.data }
  }
  
  return { success: false, errors: result.error }
}

// Create a safe parse function that returns formatted errors
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean
  data?: T
  error?: string
  fieldErrors?: Record<string, string[]>
} {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
    }
  }
  
  return {
    success: false,
    error: 'Validation failed',
    fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
  }
}

// Export types
export type Pagination = z.infer<typeof PaginationSchema>
export type DateRange = z.infer<typeof DateRangeSchema>
export type FileUpload = z.infer<typeof FileUploadSchema>
export type Address = z.infer<typeof AddressSchema>
export type SearchQuery = z.infer<typeof SearchQuerySchema>
export type Status = z.infer<typeof StatusSchema>
export type Priority = z.infer<typeof PrioritySchema>