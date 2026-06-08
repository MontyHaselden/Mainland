import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { pricingRules } from "@/lib/db/schema";
import { DEFAULT_PRICING_RULES } from "./default-pricing-rules";
import { normalizePricingRulesConfig } from "./pricing-rules-normalize";
import type { PricingRulesConfig } from "./pricing-rules-types";

const DEFAULT_RULES_ID = "default";

export async function getPricingRulesConfig(): Promise<PricingRulesConfig> {
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(pricingRules)
      .where(eq(pricingRules.id, DEFAULT_RULES_ID))
      .limit(1);

    if (!row) return DEFAULT_PRICING_RULES;

    return normalizePricingRulesConfig(JSON.parse(row.rules));
  } catch {
    return DEFAULT_PRICING_RULES;
  }
}

export async function savePricingRulesConfig(
  config: PricingRulesConfig,
): Promise<void> {
  const db = getDb();
  const rulesJson = JSON.stringify(config);

  await db
    .insert(pricingRules)
    .values({
      id: DEFAULT_RULES_ID,
      rules: rulesJson,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: pricingRules.id,
      set: {
        rules: rulesJson,
        updatedAt: new Date(),
      },
    });
}
