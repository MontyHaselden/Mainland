import { NextResponse } from "next/server";
import { DEFAULT_PRICING_RULES } from "@/lib/booking/default-pricing-rules";
import { getPricingRulesConfig } from "@/lib/booking/pricing-rules-queries";

export async function GET() {
  try {
    const rules = await getPricingRulesConfig();
    return NextResponse.json({ rules });
  } catch {
    return NextResponse.json({ rules: DEFAULT_PRICING_RULES });
  }
}
