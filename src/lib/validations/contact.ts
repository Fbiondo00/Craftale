import { z } from "zod";

/**
 * Validation schemas for contact and booking operations.
 * These schemas ensure data integrity for all contact form submissions.
 */

// Contact form schema
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().max(200, "Company name cannot exceed 200 characters").optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200, "Subject cannot exceed 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
  preferred_contact: z.enum(["email", "phone", "both"]).default("email"),
  newsletter_opt_in: z.boolean().default(false),
});

// Time slot booking schema
export const TimeSlotBookingSchema = z.object({
  slot_id: z.coerce.number().min(1, "Time slot selection is required"),
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/)
    .optional(),
  meeting_type: z.enum(["video", "phone", "in_person"]).default("video"),
  topic: z.string().min(5, "Please describe the meeting topic").max(500),
  additional_notes: z.string().max(1000).optional(),
  timezone: z.string().default("UTC"),
});

// Time slot query schema
export const TimeSlotQuerySchema = z.object({
  date_from: z.coerce.date().optional(),
  date_to: z.coerce.date().optional(),
  available_only: z.boolean().default(true),
  meeting_type: z.enum(["video", "phone", "in_person", "all"]).default("all"),
  duration_minutes: z.coerce.number().min(15).max(180).optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
});

// Newsletter subscription schema
export const NewsletterSubscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required").max(100).optional(),
  preferences: z
    .array(z.enum(["product_updates", "blog_posts", "case_studies", "promotions", "events"]))
    .default(["product_updates", "blog_posts"]),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive newsletters",
  }),
});

// Export parsed types
export type ContactForm = z.infer<typeof ContactFormSchema>;
export type TimeSlotBooking = z.infer<typeof TimeSlotBookingSchema>;
export type TimeSlotQuery = z.infer<typeof TimeSlotQuerySchema>;
export type NewsletterSubscription = z.infer<typeof NewsletterSubscriptionSchema>;
