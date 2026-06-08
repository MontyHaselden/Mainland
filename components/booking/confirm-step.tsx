"use client";

import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import type { StandardPricingTier } from "@/lib/pricing/standard-inspections";

type ConfirmStepProps = {
  date: string;
  slot: BookingSlot;
  tier: StandardPricingTier;
  form: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    propertyAddress: string;
    notes: string;
    agentName: string;
  };
  onConfirm: () => void;
  submitting: boolean;
};

function SummaryField({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border/80 bg-background/80 px-3.5 py-2.5 ${className}`}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium leading-snug text-navy">{value}</p>
    </div>
  );
}

export function ConfirmStep({
  date,
  slot,
  tier,
  form,
  onConfirm,
  submitting,
}: ConfirmStepProps) {
  const dateLabel = format(parseISO(date), "EEEE, d MMMM yyyy");

  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="mb-3 shrink-0 text-sm text-muted">
        Check everything looks right, then confirm your booking.
      </p>

      <div className="mb-3 shrink-0 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-accent">
          Inspection
        </p>
        <p className="font-display mt-1 text-lg leading-tight text-navy">
          {dateLabel}
        </p>
        <p className="mt-1 text-sm font-medium text-muted">
          {SLOT_LABELS[slot]} slot · {tier.sizeLabel}
          {tier.price != null ? ` · $${tier.price}` : ""}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
        <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-muted">
          Your details
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <SummaryField label="Name" value={form.customerName} />
          <SummaryField label="Property" value={form.propertyAddress} />
          <SummaryField label="Email" value={form.customerEmail} />
          <SummaryField label="Phone" value={form.customerPhone} />
          {form.agentName && (
            <SummaryField label="Agent" value={form.agentName} />
          )}
          {form.notes && (
            <SummaryField
              label="Notes"
              value={form.notes}
              className="sm:col-span-2"
            />
          )}
        </div>
      </div>

      <Button
        type="button"
        className="mt-4 w-full shrink-0"
        onClick={onConfirm}
        disabled={submitting}
      >
        {submitting ? "Confirming…" : "Confirm booking"}
      </Button>
    </div>
  );
}
