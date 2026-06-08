import { evaluatePricing } from "@/lib/booking/pricing-engine";
import { DEFAULT_PRICING_RULES } from "@/lib/booking/default-pricing-rules";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";

export const STANDARD_INSPECTION_INTRO =
  "All standard building inspections include a comprehensive visual, non-invasive inspection and an interactive digital report.";

export const STANDARD_INSPECTION_INCLUSIONS = [
  "Licensed Building Practitioner",
  "Interactive Spectora Report",
  "Moisture Testing",
  "Thermal Imaging Observations",
  "Drone Roof Photography",
  "Interior & Exterior Inspection",
  "Roof Inspection where accessible",
  "Photographic Defect Reporting",
  "Maintenance Recommendations",
  "Fast Turnaround",
] as const;

export type StandardPricingTier = {
  sizeLabel: string;
  price: number | null;
  description: string;
  startingFrom?: boolean;
  badge?: string;
  customQuote?: boolean;
};

function examplePrice(sqm: number): number | null {
  return evaluatePricing(
    {
      floorAreaSqm: sqm,
      decadeBuilt: "2020s",
      propertyType: "Standalone house",
      storeys: "Single storey",
    },
    DEFAULT_PRICING_RULES,
  ).estimatedPrice;
}

export const STANDARD_PRICING_INTRO =
  "Pricing scales smoothly with floor area — from $499 for homes up to 130m², with a modest per-square-metre rate above that. No harsh price jumps between size bands.";

export const STANDARD_PRICING_TIERS: StandardPricingTier[] = [
  {
    sizeLabel: "Up to 130m²",
    price: INSPECTION_FROM_PRICE,
    startingFrom: true,
    description:
      "Suitable for smaller homes, townhouses and investment properties. A comprehensive visual inspection with an interactive report highlighting defects, maintenance concerns and moisture risks.",
  },
  {
    sizeLabel: "150m²",
    price: examplePrice(150),
    badge: "Most common",
    description:
      "Ideal for most family homes. Includes a detailed assessment of the property's condition, photographs and practical recommendations.",
  },
  {
    sizeLabel: "185m²",
    price: examplePrice(185),
    description:
      "Designed for typical family homes with moderate floor area. Provides a thorough overview of visible defects and future maintenance requirements.",
  },
  {
    sizeLabel: "220m²",
    price: examplePrice(220),
    description:
      "Comprehensive inspection of larger homes requiring additional inspection time and detailed photographic documentation.",
  },
  {
    sizeLabel: "280m²",
    price: examplePrice(280),
    description:
      "Suitable for executive homes and larger floor plans requiring additional inspection and reporting time.",
  },
  {
    sizeLabel: "360m²",
    price: examplePrice(360),
    description:
      "Premium inspection service for large residential properties with detailed findings and recommendations.",
  },
  {
    sizeLabel: "400m²+",
    price: null,
    customQuote: true,
    description: "Please contact us for pricing.",
  },
];

export const COMPLIANCE_NOTE =
  "Inspections are visual and non-invasive and completed in general accordance with NZS 4306:2005 Residential Property Inspection principles.";

export const PRICING_NOTE =
  "Pricing applies to standard residential homes constructed on concrete slab foundations. Final confirmation is subject to property details, access and inspection complexity.";
