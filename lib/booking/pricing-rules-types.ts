import type {
  DecadeBuilt,
  PropertyType,
  StoreyOption,
} from "./property-options";

export type ReviewFlag = string;

export type FloorAreaPricingSettings = {
  basePrice: number;
  baseIncludedFloorAreaM2: number;
  pricePerExtraM2: number;
  roundToNearest: number;
  minimumPrice: number;
  customQuoteThresholdM2: number;
};

export type DecadeRule = {
  decade: DecadeBuilt;
  adjustment: number;
  flag: string | null;
  pendingReview?: boolean;
};

export type StoreyRule = {
  storey: StoreyOption;
  adjustment: number;
  flag: string | null;
  customQuote?: boolean;
  pendingReview?: boolean;
};

export type PropertyTypeRule = {
  propertyType: PropertyType;
  adjustment: number;
  flag: string | null;
  customQuote?: boolean;
  pendingReview?: boolean;
};

export type PricingRulesConfig = {
  floorArea: FloorAreaPricingSettings;
  decadeRules: DecadeRule[];
  storeyRules: StoreyRule[];
  propertyTypeRules: PropertyTypeRule[];
};

export type PricingInput = {
  floorAreaSqm: number | null;
  decadeBuilt: DecadeBuilt;
  propertyType: PropertyType;
  storeys: StoreyOption;
};

export type CustomerPricingDisplay =
  | {
      kind: "estimated";
      price: number;
      headline: string;
      subtext: string;
    }
  | {
      kind: "custom_quote";
      headline: string;
      subtext: string;
    }
  | {
      kind: "pending";
      headline: string;
      subtext: string;
    };

export type PricingEvaluation = {
  estimatedPrice: number | null;
  customQuoteRequired: boolean;
  pricePending: boolean;
  reviewFlags: ReviewFlag[];
  customerDisplay: CustomerPricingDisplay;
};
