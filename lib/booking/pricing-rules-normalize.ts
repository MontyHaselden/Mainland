import { DEFAULT_PRICING_RULES } from "./default-pricing-rules";
import type { PricingRulesConfig } from "./pricing-rules-types";

function isDynamicPricingConfig(value: unknown): value is PricingRulesConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as PricingRulesConfig;
  return (
    config.floorArea != null &&
    typeof config.floorArea.basePrice === "number" &&
    Array.isArray(config.decadeRules) &&
    Array.isArray(config.storeyRules) &&
    Array.isArray(config.propertyTypeRules)
  );
}

/** Upgrades legacy band-based JSON stored in the database. */
export function normalizePricingRulesConfig(
  raw: unknown,
): PricingRulesConfig {
  if (isDynamicPricingConfig(raw)) {
    return {
      ...DEFAULT_PRICING_RULES,
      ...raw,
      floorArea: {
        ...DEFAULT_PRICING_RULES.floorArea,
        ...raw.floorArea,
      },
    };
  }

  return DEFAULT_PRICING_RULES;
}
