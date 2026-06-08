import type { PricingRulesConfig } from "./pricing-rules-types";

export const DEFAULT_PRICING_RULES: PricingRulesConfig = {
  floorArea: {
    basePrice: 499,
    baseIncludedFloorAreaM2: 130,
    pricePerExtraM2: 1.2,
    roundToNearest: 10,
    minimumPrice: 499,
    customQuoteThresholdM2: 400,
  },
  decadeRules: [
    { decade: "2020s", adjustment: 0, flag: null },
    { decade: "2010s", adjustment: 0, flag: null },
    {
      decade: "2000s",
      adjustment: 0,
      flag: "Possible weathertightness / detailing review",
    },
    { decade: "1990s", adjustment: 30, flag: "Weathertightness-era review" },
    { decade: "1980s", adjustment: 30, flag: "Older home review" },
    { decade: "1970s", adjustment: 50, flag: "Older home review" },
    { decade: "1960s", adjustment: 70, flag: "Older home review" },
    { decade: "Pre-1960", adjustment: 100, flag: "High complexity review" },
    {
      decade: "Unsure",
      adjustment: 0,
      flag: "Admin must confirm age",
      pendingReview: true,
    },
  ],
  storeyRules: [
    { storey: "Single storey", adjustment: 0, flag: null },
    { storey: "Two storey", adjustment: 40, flag: null },
    {
      storey: "Three storey+",
      adjustment: 0,
      flag: "Custom Quote Required",
      customQuote: true,
    },
    {
      storey: "Unsure",
      adjustment: 0,
      flag: "Admin review",
      pendingReview: true,
    },
  ],
  propertyTypeRules: [
    { propertyType: "Standalone house", adjustment: 0, flag: null },
    { propertyType: "Townhouse", adjustment: 0, flag: null },
    { propertyType: "Unit", adjustment: 0, flag: null },
    {
      propertyType: "Lifestyle property",
      adjustment: 0,
      flag: "Custom Quote Required",
      customQuote: true,
    },
    {
      propertyType: "Other",
      adjustment: 0,
      flag: "Admin review",
      pendingReview: true,
    },
  ],
};
