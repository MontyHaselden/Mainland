"use client";

import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import type { CustomerPricingDisplay } from "@/lib/booking/pricing-rules-types";
import { formatFloorAreaDisplay } from "@/lib/booking/property-options";
import type { PropertyDetailsInput } from "@/lib/booking/types";
import type { CustomerFormValues } from "./customer-form";

type ConfirmStepProps = {
  date: string;
  slot: BookingSlot;
  property: PropertyDetailsInput;
  pricingDisplay: CustomerPricingDisplay;
  customer: CustomerFormValues;
  onConfirm: () => void;
  submitting: boolean;
};

function SummaryField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-background/80 px-3.5 py-2.5">
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
  property,
  pricingDisplay,
  customer,
  onConfirm,
  submitting,
}: ConfirmStepProps) {
  const dateLabel = format(parseISO(date), "EEEE, d MMMM yyyy");

  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="mb-3 shrink-0 text-sm text-muted">
        Review your booking request before submitting.
      </p>

      <div className="mb-3 shrink-0 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-accent">
          Inspection
        </p>
        <p className="font-display mt-1 text-lg leading-tight text-navy">
          {dateLabel}
        </p>
        <p className="mt-1 text-sm font-medium text-muted">
          {SLOT_LABELS[slot]} slot
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
        <div className="grid gap-2 sm:grid-cols-2">
          <SummaryField label="Address" value={property.streetAddress} />
          <SummaryField
            label="Location"
            value={`${property.suburb}, ${property.city}`}
          />
          <SummaryField
            label="Floor area"
            value={formatFloorAreaDisplay(property.floorAreaSqm)}
          />
          <SummaryField label="Decade built" value={property.decadeBuilt} />
          <SummaryField label="Property type" value={property.propertyType} />
          <SummaryField label="Storeys" value={property.storeys} />
          <SummaryField label="Pricing" value={pricingDisplay.headline} />
          <SummaryField label="Name" value={customer.customerName} />
          <SummaryField label="Email" value={customer.customerEmail} />
          <SummaryField label="Phone" value={customer.customerPhone} />
          {customer.notes ? (
            <SummaryField label="Notes" value={customer.notes} />
          ) : null}
        </div>
      </div>

      <Button
        type="button"
        className="mt-4 w-full shrink-0"
        onClick={onConfirm}
        disabled={submitting}
      >
        {submitting ? "Submitting…" : "Request Booking"}
      </Button>
    </div>
  );
}
