import { createClient } from "@/lib/supabase/server";

export async function calculateQuoteTotals(quoteId: string | number): Promise<{
  basePrice: number;
  servicesPrice: number;
  discountAmount: number;
  taxAmount: number;
  totalPrice: number;
}> {
  console.log("=== CALCULATE QUOTE TOTALS - Start ===");
  console.log("Quote ID:", quoteId);

  const supabase = await createClient();

  // Get current user for safety check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Authentication required");
  }

  // Get quote details - ensure it belongs to the current user
  const { data: quote, error: quoteError } = await supabase
    .from("user_quotes")
    .select("*, pricing_levels(*)")
    .eq("id", Number(quoteId))
    .eq("user_id", user.id) // Add user_id filter for safety
    .single();

  if (quoteError || !quote) {
    console.error("Quote fetch error:", quoteError);
    throw new Error("Quote not found");
  }

  // Get tier name for logging
  let tierInfo = null;
  if (quote.tier_id) {
    const { data: tierData } = await supabase
      .from("pricing_tiers")
      .select("name, slug")
      .eq("id", quote.tier_id)
      .single();
    tierInfo = tierData;
  }

  console.log("Quote Data:", {
    quote_number: quote.quote_number,
    tier: tierInfo ? `${tierInfo.name} (${tierInfo.slug})` : "Not selected",
    level: quote.pricing_levels
      ? `${quote.pricing_levels.name} - Level ${quote.pricing_levels.level_code}`
      : "Not selected",
    base_price: quote.pricing_levels?.price || 0,
    selected_services_count: Array.isArray(quote.selected_services) ? quote.selected_services.length : 0,
    status: quote.status,
  });

  // Get services prices
  const selectedServiceIds = Array.isArray(quote.selected_services)
    ? quote.selected_services.map((id: any) => Number(id))
    : [];

  const { data: services, error: servicesError } = await supabase
    .from("optional_services")
    .select("id, name, base_price, category")
    .in("id", selectedServiceIds);

  if (servicesError) {
    throw servicesError;
  }

  const basePrice = Number(quote.pricing_levels?.price || 0);
  const servicesPrice = (services || []).reduce((sum, s) => sum + Number(s.base_price), 0);

  // Log services with names
  const servicesList =
    services?.map(s => ({
      name: s.name,
      category: s.category,
      price: s.base_price,
    })) || [];

  console.log("Services Data:", {
    selected_count: selectedServiceIds.length,
    services: servicesList.length > 0 ? servicesList : "None selected",
    total_services_price: servicesPrice,
  });

  // Get tax rate from config
  const { data: taxConfig, error: taxError } = await supabase
    .from("pricing_config")
    .select("config_value")
    .eq("config_key", "tax_rate")
    .single();

  if (taxError) {
    console.error("Error fetching tax rate:", taxError);
  }

  const taxRate = Number(taxConfig?.config_value || 22);
  const subtotal = basePrice + servicesPrice - Number(quote.discount_amount || 0);
  const taxAmount = subtotal * (taxRate / 100);
  const totalPrice = subtotal + taxAmount;

  console.log("=== CALCULATE QUOTE TOTALS - Price Breakdown ===");
  console.log(`Base Price (${quote.pricing_levels?.name || "No level"}): €${basePrice}`);
  console.log(`Services Price (${servicesList.length} services): €${servicesPrice}`);
  console.log(`Discount: €${Number(quote.discount_amount || 0)}`);
  console.log(`Subtotal: €${subtotal}`);
  console.log(`Tax (${taxRate}%): €${taxAmount.toFixed(2)}`);
  console.log(`TOTAL: €${totalPrice.toFixed(2)}`);

  // Update quote with calculated totals - ensure it belongs to the current user
  const { error: updateError } = await supabase
    .from("user_quotes")
    .update({
      base_price: basePrice,
      services_price: servicesPrice,
      tax_amount: taxAmount,
      total_price: totalPrice,
      updated_at: new Date().toISOString(),
    })
    .eq("id", Number(quoteId))
    .eq("user_id", user.id); // Add user_id filter for safety

  if (updateError) {
    console.error("Error updating quote totals:", updateError);
  } else {
    console.log("=== CALCULATE QUOTE TOTALS - Update Complete ===");
    console.log(`Quote ${quote.quote_number} updated successfully`);
  }

  const result = {
    basePrice,
    servicesPrice,
    discountAmount: Number(quote.discount_amount || 0),
    taxAmount,
    totalPrice,
  };

  console.log("=== CALCULATE QUOTE TOTALS - Final Result ===");
  console.log(JSON.stringify(result, null, 2));

  return result;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function calculateServicesSavings(
  selectedServices: { price: number }[],
  upgradePrice: number,
  currentLevelPrice: number,
): number {
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const currentTotal = currentLevelPrice + servicesTotal;
  return currentTotal - upgradePrice;
}
