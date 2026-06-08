import {
  COMPLIANCE_NOTE,
  PRICING_NOTE,
} from "@/lib/pricing/standard-inspections";

export function StandardPricingNotes() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6 lg:p-8">
            <h2 className="font-display text-lg text-navy">Compliance</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {COMPLIANCE_NOTE}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 lg:p-8">
            <h2 className="font-display text-lg text-navy">Pricing scope</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {PRICING_NOTE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
