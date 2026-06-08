import { NextResponse } from "next/server";
import { z } from "zod";
import { getStaffSession } from "@/lib/auth/session";
import { DEFAULT_PRICING_RULES } from "@/lib/booking/default-pricing-rules";
import {
  DECADES_BUILT,
  PROPERTY_TYPES,
  STOREY_OPTIONS,
} from "@/lib/booking/property-options";
import type { PricingRulesConfig } from "@/lib/booking/pricing-rules-types";
import {
  getPricingRulesConfig,
  savePricingRulesConfig,
} from "@/lib/booking/pricing-rules-queries";

const floorAreaSchema = z.object({
  basePrice: z.number().int().positive(),
  baseIncludedFloorAreaM2: z.number().int().nonnegative(),
  pricePerExtraM2: z.number().positive(),
  roundToNearest: z.number().int().positive(),
  minimumPrice: z.number().int().positive(),
  customQuoteThresholdM2: z.number().int().positive(),
});

const rulesSchema = z.object({
  floorArea: floorAreaSchema,
  decadeRules: z.array(
    z.object({
      decade: z.enum(DECADES_BUILT),
      adjustment: z.number().int().nonnegative(),
      flag: z.string().nullable(),
      pendingReview: z.boolean().optional(),
    }),
  ),
  storeyRules: z.array(
    z.object({
      storey: z.enum(STOREY_OPTIONS),
      adjustment: z.number().int().nonnegative(),
      flag: z.string().nullable(),
      customQuote: z.boolean().optional(),
      pendingReview: z.boolean().optional(),
    }),
  ),
  propertyTypeRules: z.array(
    z.object({
      propertyType: z.enum(PROPERTY_TYPES),
      adjustment: z.number().int().nonnegative(),
      flag: z.string().nullable(),
      customQuote: z.boolean().optional(),
      pendingReview: z.boolean().optional(),
    }),
  ),
});

export async function GET() {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rules = await getPricingRulesConfig();
    return NextResponse.json({ rules });
  } catch {
    return NextResponse.json({ rules: DEFAULT_PRICING_RULES });
  }
}

export async function PUT(request: Request) {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const parsed = rulesSchema.safeParse(json.rules ?? json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid pricing rules" }, { status: 400 });
    }

    await savePricingRulesConfig(parsed.data as PricingRulesConfig);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Save pricing rules error:", error);
    return NextResponse.json(
      { error: "Unable to save pricing rules" },
      { status: 500 },
    );
  }
}
