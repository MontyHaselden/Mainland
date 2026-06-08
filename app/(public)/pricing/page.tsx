import type { Metadata } from "next";
import { StandardPricingCta } from "@/components/pricing/standard-pricing-cta";
import { StandardPricingGrid } from "@/components/pricing/standard-pricing-grid";
import { StandardPricingHero } from "@/components/pricing/standard-pricing-hero";
import { StandardPricingInclusions } from "@/components/pricing/standard-pricing-inclusions";
import { StandardPricingNotes } from "@/components/pricing/standard-pricing-notes";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";

export const metadata: Metadata = {
  title: "Standard Building Inspection Pricing",
  description: `Transparent pricing for standard residential building inspections in Christchurch and Canterbury. From $${INSPECTION_FROM_PRICE}. Includes Spectora reports, thermal imaging, drone roof photography, and LBP inspection.`,
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <StandardPricingHero />
      <StandardPricingInclusions />
      <StandardPricingGrid />
      <StandardPricingNotes />
      <StandardPricingCta />
    </>
  );
}
