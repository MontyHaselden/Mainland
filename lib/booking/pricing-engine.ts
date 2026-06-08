import { DEFAULT_PRICING_RULES } from "./default-pricing-rules";
import type {
  CustomerPricingDisplay,
  FloorAreaPricingSettings,
  PricingEvaluation,
  PricingInput,
  PricingRulesConfig,
  ReviewFlag,
} from "./pricing-rules-types";

function uniqueFlags(flags: (ReviewFlag | null | undefined)[]): ReviewFlag[] {
  const seen = new Set<ReviewFlag>();
  const result: ReviewFlag[] = [];
  for (const flag of flags) {
    if (flag && !seen.has(flag)) {
      seen.add(flag);
      result.push(flag);
    }
  }
  return result;
}

export function roundPrice(
  price: number,
  roundToNearest: number,
): number {
  return Math.round(price / roundToNearest) * roundToNearest;
}

export function calculateFloorAreaPrice(
  floorAreaSqm: number,
  settings: FloorAreaPricingSettings,
): number | "custom_quote" {
  if (floorAreaSqm >= settings.customQuoteThresholdM2) {
    return "custom_quote";
  }

  const extraSqm = Math.max(
    0,
    floorAreaSqm - settings.baseIncludedFloorAreaM2,
  );
  const raw = settings.basePrice + extraSqm * settings.pricePerExtraM2;
  const rounded = roundPrice(raw, settings.roundToNearest);
  return Math.max(rounded, settings.minimumPrice);
}

export function evaluatePricing(
  input: PricingInput,
  rules: PricingRulesConfig = DEFAULT_PRICING_RULES,
): PricingEvaluation {
  const decadeRule = rules.decadeRules.find((r) => r.decade === input.decadeBuilt);
  const storeyRule = rules.storeyRules.find((r) => r.storey === input.storeys);
  const typeRule = rules.propertyTypeRules.find(
    (r) => r.propertyType === input.propertyType,
  );

  const floorAreaCustomQuote =
    input.floorAreaSqm != null &&
    input.floorAreaSqm >= rules.floorArea.customQuoteThresholdM2;

  const customQuoteRequired = Boolean(
    floorAreaCustomQuote ||
      storeyRule?.customQuote ||
      typeRule?.customQuote,
  );

  const pricePending = Boolean(
    !customQuoteRequired &&
      (input.floorAreaSqm == null ||
        decadeRule?.pendingReview ||
        storeyRule?.pendingReview ||
        typeRule?.pendingReview),
  );

  let estimatedPrice: number | null = null;

  if (!customQuoteRequired && !pricePending && input.floorAreaSqm != null) {
    const floorPrice = calculateFloorAreaPrice(
      input.floorAreaSqm,
      rules.floorArea,
    );

    if (floorPrice === "custom_quote") {
      return buildEvaluation({
        estimatedPrice: null,
        customQuoteRequired: true,
        pricePending: false,
        reviewFlags: uniqueFlags([
          decadeRule?.flag,
          storeyRule?.flag,
          typeRule?.flag,
          "Custom Quote Required",
        ]),
      });
    }

    const adjustments =
      (decadeRule?.adjustment ?? 0) +
      (storeyRule?.adjustment ?? 0) +
      (typeRule?.adjustment ?? 0);

    estimatedPrice = roundPrice(
      floorPrice + adjustments,
      rules.floorArea.roundToNearest,
    );
    estimatedPrice = Math.max(estimatedPrice, rules.floorArea.minimumPrice);
  }

  const reviewFlags = uniqueFlags([
    decadeRule?.flag,
    storeyRule?.flag,
    typeRule?.flag,
    pricePending ? "Price pending review" : null,
    customQuoteRequired ? "Custom Quote Required" : null,
  ]);

  return buildEvaluation({
    estimatedPrice,
    customQuoteRequired,
    pricePending,
    reviewFlags,
  });
}

function buildEvaluation({
  estimatedPrice,
  customQuoteRequired,
  pricePending,
  reviewFlags,
}: {
  estimatedPrice: number | null;
  customQuoteRequired: boolean;
  pricePending: boolean;
  reviewFlags: ReviewFlag[];
}): PricingEvaluation {
  let customerDisplay: CustomerPricingDisplay;

  if (customQuoteRequired) {
    customerDisplay = {
      kind: "custom_quote",
      headline: "Custom quote required",
      subtext:
        "This property may require additional inspection time. Submit your details and we'll confirm pricing.",
    };
  } else if (pricePending) {
    customerDisplay = {
      kind: "pending",
      headline: "Price pending review",
      subtext:
        "Submit your booking request and Mainland Building Inspections will confirm the correct price.",
    };
  } else if (estimatedPrice != null) {
    customerDisplay = {
      kind: "estimated",
      price: estimatedPrice,
      headline: `Estimated inspection price: $${estimatedPrice}`,
      subtext:
        "Final confirmation is subject to property details, access and inspection complexity.",
    };
  } else {
    customerDisplay = {
      kind: "pending",
      headline: "Price pending review",
      subtext:
        "Submit your booking request and Mainland Building Inspections will confirm the correct price.",
    };
  }

  return {
    estimatedPrice,
    customQuoteRequired,
    pricePending,
    reviewFlags,
    customerDisplay,
  };
}

export function parseReviewFlags(json: string | null): ReviewFlag[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    return Array.isArray(parsed) ? (parsed as ReviewFlag[]) : [];
  } catch {
    return [];
  }
}
