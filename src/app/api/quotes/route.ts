import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { QuoteSummary } from "@/types/database-extended";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query
    let query = supabase
      .from("user_quotes")
      .select(
        `
        id,
        quote_number,
        status,
        total_price,
        created_at,
        expires_at,
        pricing_tiers (
          name
        ),
        pricing_levels (
          name,
          level_code
        )
      `,
        { count: "exact" },
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply status filter if provided
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: quotes, error, count } = await query;

    if (error) {
      console.error("Error fetching quotes:", error);
      throw error;
    }

    // Transform to QuoteSummary format
    const quoteSummaries: QuoteSummary[] = (quotes || []).map((quote: any) => ({
      id: quote.id,
      quote_number: quote.quote_number,
      status: quote.status,
      total_price: quote.total_price,
      created_at: quote.created_at,
      expires_at: quote.expires_at,
      tier_name: quote.pricing_tiers?.name,
      level_name: quote.pricing_levels?.name,
    }));

    return NextResponse.json({
      quotes: quoteSummaries,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
