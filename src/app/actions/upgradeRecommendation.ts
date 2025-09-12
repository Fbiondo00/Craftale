"use server";

import { createClient } from "@/lib/supabase/server";
import type { UpgradeRecommendation } from "@/types/database-extended";
import { z } from "zod";

// Standardized action state type
export type ActionState =
  | { success: true; data: { recommendation: UpgradeRecommendation | null } }
  | { success: false; message: string; errors?: Record<string, string[]> };

// Validation schema
const CheckUpgradeSchema = z.object({
  level_id: z.union([z.string(), z.number()]).transform(val => Number(val)),
  selected_services: z
    .array(z.union([z.string(), z.number()]))
    .transform(arr => arr.map(val => Number(val)))
    .optional()
    .default([]),
});

// Check for upgrade recommendations
export async function checkUpgradeAction(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  try {
    // Parse and validate form data
    const rawData = {
      level_id: formData.get("level_id"),
      selected_services: formData.getAll("selected_services"),
    };

    const validation = CheckUpgradeSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const { level_id, selected_services } = validation.data;

    console.log("=== CHECK UPGRADE ACTION ===");
    console.log("Level ID:", level_id);
    console.log("Selected Services:", selected_services?.length || 0, "services");

    const supabase = await createClient();

    // Get current level details
    const { data: currentLevel, error: levelError } = await supabase
      .from("pricing_levels")
      .select("*, pricing_tiers(*)")
      .eq("id", level_id)
      .single();

    if (levelError || !currentLevel || !currentLevel.tier_id) {
      console.error("Error fetching current level:", levelError);
      return {
        success: false,
        message: "Level not found",
      };
    }

    // Get selected services details
    const { data: services, error: servicesError } = await supabase
      .from("optional_services")
      .select("id, base_price")
      .in("id", selected_services || []);

    if (servicesError) {
      console.error("Error fetching services:", servicesError);
      throw servicesError;
    }

    // Calculate current total
    const servicesTotal = (services || []).reduce((sum, s) => sum + Number(s.base_price), 0);
    const currentTotal = Number(currentLevel.price) + servicesTotal;

    // Get next level in same tier
    const nextLevelCode = currentLevel.level_code === "A" ? "B" : currentLevel.level_code === "B" ? "C" : null;

    if (!nextLevelCode) {
      return {
        success: true,
        data: {
          recommendation: {
            current_total: currentTotal,
            upgrade_option: null,
          },
        },
      };
    }

    // Get next level details
    const { data: nextLevel, error: nextError } = await supabase
      .from("pricing_levels")
      .select("*")
      .eq("tier_id", currentLevel.tier_id)
      .eq("level_code", nextLevelCode)
      .eq("is_active", true)
      .single();

    if (nextError || !nextLevel) {
      return {
        success: true,
        data: {
          recommendation: {
            current_total: currentTotal,
            upgrade_option: null,
          },
        },
      };
    }

    // Calculate savings
    const upgradeCost = Number(nextLevel.price);
    const savings = currentTotal - upgradeCost;

    // Only recommend if savings > €300 or 15% of current total
    if (savings < 300 && savings < currentTotal * 0.15) {
      return {
        success: true,
        data: {
          recommendation: {
            current_total: currentTotal,
            upgrade_option: null,
          },
        },
      };
    }

    const recommendation: UpgradeRecommendation = {
      current_total: currentTotal,
      upgrade_option: {
        level_id: nextLevel.id,
        level_name: nextLevel.name,
        price: upgradeCost,
        additional_features: (Array.isArray(nextLevel.features) ? (nextLevel.features as string[]) : []).filter(
          f => !(Array.isArray(currentLevel.features) ? (currentLevel.features as string[]) : []).includes(f as string),
        ),
        savings,
      },
    };

    return {
      success: true,
      data: { recommendation },
    };
  } catch (error) {
    console.error("Error in checkUpgradeAction:", error);
    return {
      success: false,
      message: "Failed to check upgrade options",
    };
  }
}

// Direct server function for server components
export async function checkUpgradeRecommendation(
  levelId: string | number,
  selectedServices: (string | number)[] = [],
): Promise<UpgradeRecommendation | null> {
  const formData = new FormData();
  formData.set("level_id", levelId.toString());
  selectedServices.forEach(service => {
    formData.append("selected_services", service.toString());
  });

  const result = await checkUpgradeAction(null, formData);
  return result.success ? result.data.recommendation : null;
}
