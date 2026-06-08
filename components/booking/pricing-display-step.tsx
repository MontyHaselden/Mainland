"use client";

import { Button } from "@/components/ui/button";
import type { CustomerPricingDisplay } from "@/lib/booking/pricing-rules-types";

type PricingDisplayStepProps = {
  display: CustomerPricingDisplay;
  onContinue: () => void;
};

export function PricingDisplayStep({
  display,
  onContinue,
}: PricingDisplayStepProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="mb-4 shrink-0 text-sm text-muted">
        Based on the property details you provided:
      </p>
      <div className="flex flex-1 flex-col justify-center rounded-2xl border border-accent/20 bg-accent/5 px-6 py-8 text-center">
        <p className="font-display text-2xl text-navy sm:text-3xl">
          {display.headline}
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
          {display.subtext}
        </p>
      </div>
      <Button type="button" className="mt-6 w-full shrink-0" onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}
