import type { Metadata } from "next";
import { HomeAreasSection } from "@/components/home/home-areas-section";
import { HomeBookingSection } from "@/components/home/home-booking-section";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomePricingSection } from "@/components/home/home-pricing-section";
import { HomeReviewsSection } from "@/components/home/home-reviews-section";
import { HomeWhySection } from "@/components/home/home-why-section";
import { HeroExperience } from "@/components/hero/hero-experience";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";

export const metadata: Metadata = {
  title: "Christchurch & Canterbury Building Inspections",
  description: `Premium pre-purchase building inspections in Christchurch and Canterbury. Interactive Spectora reports, drone roof inspections, thermal imaging. Book online from $${INSPECTION_FROM_PRICE}.`,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroExperience />
      <HomePricingSection />
      <HomeBookingSection />
      <HomeWhySection />
      <HomeReviewsSection />
      <HomeAreasSection />
      <HomeFinalCta />
    </>
  );
}
