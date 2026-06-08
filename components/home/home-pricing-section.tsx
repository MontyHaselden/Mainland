import Link from "next/link";
import { ScrollToBookingLink } from "@/components/home/scroll-to-booking-link";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";

export function HomePricingSection() {
  return (
    <section
      className="border-b border-border bg-navy-deep text-white"
      aria-labelledby="home-pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="home-pricing-heading"
            className="font-display text-3xl sm:text-4xl"
          >
            Check Availability &amp; Pricing
          </h2>
          <p className="font-display mt-6 text-4xl text-white sm:text-5xl">
            Building Inspections From ${INSPECTION_FROM_PRICE}
          </p>
          <p className="mt-6 text-lg text-white/80">
            View live availability, select your inspection type and book online in
            minutes. No waiting for callbacks. No obligation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ScrollToBookingLink className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-8 font-semibold text-white transition-colors hover:bg-accent-light">
              Check Dates &amp; Pricing
            </ScrollToBookingLink>
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View standard pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
