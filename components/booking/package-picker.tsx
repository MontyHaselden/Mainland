"use client";

import Link from "next/link";
import type { StandardPricingTier } from "@/lib/pricing/standard-inspections";
import { STANDARD_PRICING_TIERS } from "@/lib/pricing/standard-inspections";

type PackagePickerProps = {
  selectedTier: StandardPricingTier | null;
  onSelect: (tier: StandardPricingTier) => void;
};

export function PackagePicker({ selectedTier, onSelect }: PackagePickerProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="mb-3 shrink-0 text-sm text-muted">
        Select your floor area pricing tier. All packages include drone roof
        photography, moisture testing, thermal imaging, and a Spectora report.
      </p>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
        {STANDARD_PRICING_TIERS.map((tier) => {
          if (tier.customQuote) {
            return (
              <div
                key={tier.sizeLabel}
                className="rounded-xl border border-border bg-background/60 px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy">{tier.sizeLabel}</p>
                    <p className="mt-1 text-sm text-muted">{tier.description}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-muted">
                    Custom quote
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-accent-light"
                >
                  Contact us for pricing →
                </Link>
              </div>
            );
          }

          const isSelected = selectedTier?.sizeLabel === tier.sizeLabel;

          return (
            <button
              key={tier.sizeLabel}
              type="button"
              onClick={() => onSelect(tier)}
              className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${
                isSelected
                  ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                  : "border-border bg-background hover:border-accent/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-navy">{tier.sizeLabel}</p>
                    {tier.badge ? (
                      <span className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 text-xs font-medium text-accent">
                        {tier.badge}
                      </span>
                    ) : null}
                    {tier.startingFrom ? (
                      <span className="text-xs font-medium text-muted">
                        Starting from
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted">{tier.description}</p>
                </div>
                <p className="font-display shrink-0 text-2xl text-navy">
                  ${tier.price}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
