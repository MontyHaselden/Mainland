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

export const STANDARD_PRICING_TIERS: StandardPricingTier[] = [
  {
    sizeLabel: "0–149m²",
    price: INSPECTION_FROM_PRICE,
    startingFrom: true,
    description:
      "Suitable for smaller homes, townhouses and investment properties. A comprehensive visual inspection with an interactive report highlighting defects, maintenance concerns and moisture risks.",
  },
  {
    sizeLabel: "150–199m²",
    price: 549,
    badge: "Most common",
    description:
      "Ideal for most family homes. Includes a detailed assessment of the property's condition, photographs and practical recommendations.",
  },
  {
    sizeLabel: "200–249m²",
    price: 599,
    description:
      "Designed for larger homes requiring additional inspection time. Provides a thorough overview of visible defects and future maintenance requirements.",
  },
  {
    sizeLabel: "250–299m²",
    price: 649,
    description:
      "Comprehensive inspection of substantial residential properties with detailed reporting and photographic documentation.",
  },
  {
    sizeLabel: "300–349m²",
    price: 699,
    description:
      "Suitable for executive homes and larger floor plans requiring additional inspection and reporting time.",
  },
  {
    sizeLabel: "350–399m²",
    price: 749,
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
  "Pricing applies to standard residential homes constructed on concrete slab foundations.";
