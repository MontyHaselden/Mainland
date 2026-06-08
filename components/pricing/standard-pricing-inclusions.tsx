import { STANDARD_INSPECTION_INCLUSIONS } from "@/lib/pricing/standard-inspections";

export function StandardPricingInclusions() {
  return (
    <section className="bg-surface" aria-labelledby="pricing-inclusions-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <h2
          id="pricing-inclusions-heading"
          className="font-display text-2xl text-navy sm:text-3xl"
        >
          All inspections include
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {STANDARD_INSPECTION_INCLUSIONS.map((item) => (
            <li key={item} className="flex gap-3 text-muted">
              <span className="mt-0.5 font-semibold text-accent">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
