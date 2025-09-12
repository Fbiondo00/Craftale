"use server";

// Server Actions for optional services
// These use direct parameters instead of FormData for cleaner data fetching
import { createClient } from "@/lib/supabase/server";
import type { OptionalServiceWithAvailability } from "@/types/database-extended";

// Server Action to get optional services for a specific tier and level
// Uses direct parameters for type safety when called from Client Components
export async function getOptionalServices(tierId?: string | number, levelId?: string | number) {
  const result: {
    success: boolean;
    services: OptionalServiceWithAvailability[];
    servicesByCategory: Record<string, OptionalServiceWithAvailability[]>;
    error?: string;
  } = {
    success: true,
    services: [],
    servicesByCategory: {},
  };

  try {
    if (!tierId || !levelId) {
      return result;
    }

    const supabase = await createClient();

    // Fetch all active services
    const { data: services, error } = await supabase
      .from("optional_services")
      .select("*")
      .eq("is_active", true)
      .order("category")
      .order("sort_order");

    if (error) {
      console.error("Error fetching optional services:", error);
      throw error;
    }

    // Filter and enhance services based on tier/level
    const enhancedServices: OptionalServiceWithAvailability[] = (services || []).map((service: any) => {
      // Check if service is already included in selected level
      const included =
        levelId &&
        Array.isArray(service.excluded_from_levels) &&
        service.excluded_from_levels.includes(levelId.toString());

      // Check if service is available for selected tier
      const available =
        !tierId ||
        !Array.isArray(service.tier_restrictions) ||
        service.tier_restrictions.length === 0 ||
        service.tier_restrictions.includes(tierId.toString());

      return {
        id: service.id,
        name: service.name,
        description: service.description,
        category: service.category,
        price: service.base_price,
        features: Array.isArray(service.features)
          ? service.features.map((f: any) => (typeof f === "string" ? f : f.text || String(f)))
          : [],
        included: !!included,
        available,
      };
    });

    // Group services by category
    const servicesByCategory = enhancedServices.reduce(
      (acc, service) => {
        if (!acc[service.category]) {
          acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
      },
      {} as Record<string, OptionalServiceWithAvailability[]>,
    );

    result.services = enhancedServices;
    result.servicesByCategory = servicesByCategory;
    return result;
  } catch (error) {
    console.error("Error in getOptionalServicesAction:", error);
    result.success = false;
    result.error = "Failed to fetch optional services";
    result.services = [];
    result.servicesByCategory = {};
    return result;
  }
}

// Alias for backward compatibility
export const getOptionalServicesAction = getOptionalServices;
