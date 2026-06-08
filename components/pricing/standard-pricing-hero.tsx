import { STANDARD_INSPECTION_INTRO } from "@/lib/pricing/standard-inspections";
import { INSPECTION_FROM_PRICE } from "@/lib/seo/business";

export function StandardPricingHero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Standard building inspections
          </p>
          <h1 className="font-display mt-3 text-4xl text-navy sm:text-5xl">
            Standard Building Inspection Pricing
          </h1>
          <p className="mt-6 text-lg text-muted">{STANDARD_INSPECTION_INTRO}</p>
          <p className="font-display mt-8 text-4xl text-navy sm:text-5xl">
            From ${INSPECTION_FROM_PRICE}
          </p>
          <p className="mt-2 text-sm text-muted">
            Transparent pricing based on total floor area
          </p>
        </div>
      </div>
    </section>
  );
}
