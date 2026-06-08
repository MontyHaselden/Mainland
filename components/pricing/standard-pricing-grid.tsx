import Link from "next/link";
import { STANDARD_PRICING_TIERS } from "@/lib/pricing/standard-inspections";

export function StandardPricingGrid() {
  return (
    <section className="bg-background" aria-labelledby="pricing-tiers-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <h2
          id="pricing-tiers-heading"
          className="font-display text-2xl text-navy sm:text-3xl"
        >
          Pricing by floor area
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Select the tier that matches your property size. Every standard
          inspection includes the full scope listed above.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STANDARD_PRICING_TIERS.map((tier) => (
            <article
              key={tier.sizeLabel}
              className={`relative flex h-full flex-col rounded-2xl border bg-surface p-6 lg:p-8 ${
                tier.badge
                  ? "border-accent/40 ring-1 ring-accent/20"
                  : tier.startingFrom
                    ? "border-accent/25"
                    : "border-border"
              }`}
            >
              {tier.badge ? (
                <span className="absolute -top-3 left-6 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {tier.badge}
                </span>
              ) : null}
              {tier.startingFrom ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Starting from
                </p>
              ) : null}
              <h3 className="font-display mt-1 text-xl text-navy">
                {tier.sizeLabel}
              </h3>
              {tier.customQuote ? (
                <p className="font-display mt-4 text-2xl text-navy">
                  Custom Quote Required
                </p>
              ) : (
                <p className="font-display mt-4 text-4xl text-navy">
                  ${tier.price}
                </p>
              )}
              <p className="mt-4 flex-1 text-sm text-muted">
                {tier.description}
              </p>
              {tier.customQuote ? (
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-4 text-sm font-semibold text-navy transition-colors hover:border-accent/40 hover:text-accent"
                >
                  Contact us
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
