"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AvailableTimeSlot } from "@/types/database-extended";
import { z } from "zod";

// Standardized action state type
export type ActionState =
  | { success: true; data: any }
  | { success: false; message: string; errors?: Record<string, string[]> };

// Validation schemas
const GetTimeSlotsSchema = z.object({
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

const BookSlotSchema = z.object({
  quote_id: z.union([z.string(), z.number()]).transform(val => parseInt(val.toString(), 10)),
  slot_id: z.union([z.string(), z.number()]).transform(val => parseInt(val.toString(), 10)),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

// Get available time slots for a date range
export async function getTimeSlotsAction(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  try {
    const supabase = await createClient();

    // Parse and validate form data
    const rawData = {
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
    };

    const validation = GetTimeSlotsSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const { start_date, end_date } = validation.data;

    // Get booking window configuration
    const { data: config } = await supabase
      .from("pricing_config")
      .select("config_key, config_value")
      .in("config_key", ["min_advance_booking_days", "max_advance_booking_days"]);

    const minDays = Number(config?.find(c => c.config_key === "min_advance_booking_days")?.config_value || 2);
    const maxDays = Number(config?.find(c => c.config_key === "max_advance_booking_days")?.config_value || 14);

    // Validate dates are within allowed window
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + minDays);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + maxDays);

    const requestedStart = new Date(start_date);
    const requestedEnd = new Date(end_date);

    if (requestedStart < minDate || requestedEnd > maxDate) {
      return {
        success: false,
        message: `Dates must be between ${minDays} and ${maxDays} days from today. Valid range: ${minDate.toISOString().split("T")[0]} to ${maxDate.toISOString().split("T")[0]}`,
      };
    }

    // Get available time slots for each date in the range
    const dates: string[] = [];
    const current = new Date(start_date);
    const end = new Date(end_date);

    while (current <= end) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    // Fetch slots for all dates
    const slotsPromises = dates.map(date =>
      supabase.rpc("get_available_time_slots", {
        p_date: date,
        p_slot_type: "contact",
      }),
    );

    const results = await Promise.all(slotsPromises);
    const slots = results.flatMap((result, index) =>
      result.data
        ? result.data.map((slot: any) => ({
            ...slot,
            slot_date: dates[index],
          }))
        : [],
    );

    const error = results.find(r => r.error)?.error;

    if (error) {
      console.error("Error fetching time slots:", error);
      throw error;
    }

    // Group slots by date
    const slotsByDate = (slots || []).reduce((acc: Record<string, any[]>, slot: any) => {
      const date = slot.slot_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        id: slot.slot_id,
        start_time: slot.start_time,
        end_time: slot.end_time,
        available: slot.available_spots > 0,
      });
      return acc;
    }, {});

    // Transform to AvailableTimeSlot format
    const availableSlots: AvailableTimeSlot[] = Object.entries(slotsByDate).map(([date, slots]) => ({
      date,
      slots: (slots as any[]).sort((a: any, b: any) => a.start_time.localeCompare(b.start_time)),
    }));

    return {
      success: true,
      data: {
        slots: availableSlots,
        booking_window: {
          min_advance_days: minDays,
          max_advance_days: maxDays,
          min_date: minDate.toISOString().split("T")[0],
          max_date: maxDate.toISOString().split("T")[0],
        },
      },
    };
  } catch (error) {
    console.error("Error in getTimeSlotsAction:", error);
    return {
      success: false,
      message: "Failed to fetch time slots",
    };
  }
}

// Book a time slot
export async function bookSlotAction(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    // Parse and validate form data
    const rawData = {
      quote_id: formData.get("quote_id"),
      slot_id: formData.get("slot_id"),
      date: formData.get("date"),
    };

    const validation = BookSlotSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const { quote_id, slot_id, date } = validation.data;

    console.log("=== BOOK SLOT ACTION ===");
    console.log("User:", user.email || user.id);
    console.log("Quote ID:", quote_id);
    console.log("Slot ID:", slot_id);
    console.log("Date:", date);

    // Book the time slot using database function
    const { data, error } = await supabase
      .rpc("book_time_slot", {
        p_quote_id: quote_id,
        p_slot_id: slot_id,
        p_date: date,
      })
      .single();

    if (error) {
      console.error("Error booking time slot:", error);
      return {
        success: false,
        message: "Failed to book time slot",
      };
    }

    const bookingResult = data as { success: boolean; message?: string };

    if (!bookingResult.success) {
      return {
        success: false,
        message: bookingResult.message || "Failed to book time slot",
      };
    }

    // Save contact preference
    const { error: prefError } = await supabase.from("contact_preferences").insert({
      user_id: user.id,
      quote_id: quote_id,
      preferred_method: "video", // Default to video call
      preferred_time_slot_id: slot_id,
      preferred_date: date,
    });

    if (prefError) {
      console.error("Error saving contact preference:", prefError);
    }

    // Revalidate any affected pages
    revalidatePath("/pricing");
    revalidatePath("/quotes");

    return {
      success: true,
      data: {
        message: bookingResult.message || "Time slot booked successfully",
      },
    };
  } catch (error) {
    console.error("Error in bookSlotAction:", error);
    return {
      success: false,
      message: "Failed to book slot",
    };
  }
}

// Get default time slots (for initial load)
export async function getDefaultTimeSlotsAction(): Promise<ActionState> {
  try {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() + 2); // Default to 2 days from now
    const endDate = new Date();
    endDate.setDate(today.getDate() + 9); // Show a week of slots

    // Create FormData with default dates
    const formData = new FormData();
    formData.set("start_date", startDate.toISOString().split("T")[0]);
    formData.set("end_date", endDate.toISOString().split("T")[0]);

    // Use the existing action
    return await getTimeSlotsAction(null, formData);
  } catch (error) {
    console.error("Error in getDefaultTimeSlotsAction:", error);
    return {
      success: false,
      message: "Failed to fetch default time slots",
    };
  }
}
