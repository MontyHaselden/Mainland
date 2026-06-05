"use client";

import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";

type ConfirmStepProps = {
  date: string;
  slot: BookingSlot;
  form: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    propertyAddress: string;
    notes: string;
    agentName: string;
  };
  onBack: () => void;
  onConfirm: () => void;
  submitting: boolean;
};

export function ConfirmStep({
  date,
  slot,
  form,
  onBack,
  onConfirm,
  submitting,
}: ConfirmStepProps) {
  const dateLabel = format(parseISO(date), "EEEE, d MMMM yyyy");

  return (
    <div>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-navy">Date</dt>
          <dd className="text-muted">{dateLabel}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Slot</dt>
          <dd className="text-muted">{SLOT_LABELS[slot]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Name</dt>
          <dd className="text-muted">{form.customerName}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Contact</dt>
          <dd className="text-muted">
            {form.customerEmail} · {form.customerPhone}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Property</dt>
          <dd className="text-muted">{form.propertyAddress}</dd>
        </div>
        {form.agentName && (
          <div>
            <dt className="font-semibold text-navy">Agent</dt>
            <dd className="text-muted">{form.agentName}</dd>
          </div>
        )}
        {form.notes && (
          <div>
            <dt className="font-semibold text-navy">Notes</dt>
            <dd className="text-muted">{form.notes}</dd>
          </div>
        )}
      </dl>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={onConfirm}
          disabled={submitting}
        >
          {submitting ? "Confirming…" : "Confirm booking"}
        </Button>
      </div>
    </div>
  );
}
