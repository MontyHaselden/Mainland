"use client";

import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { formatBookingDate } from "@/lib/booking/queries";
import { Button } from "@/components/ui/button";
import { AcknowledgeButton } from "./acknowledge-button";

type BookingDetailModalProps = {
  booking: Booking | null;
  onClose: () => void;
};

export function BookingDetailModal({
  booking,
  onClose,
}: BookingDetailModalProps) {
  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          variant="ghost"
          className="mb-4 -ml-2"
          onClick={onClose}
        >
          ← Back
        </Button>

        <h3 className="font-display text-2xl text-navy">
          {booking.customerName}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {formatBookingDate(booking.inspectionDate)} ·{" "}
          {SLOT_LABELS[booking.slot as BookingSlot]}
        </p>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-navy">Property</dt>
            <dd className="mt-1 text-muted">{booking.propertyAddress}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Contact</dt>
            <dd className="mt-1 text-muted">
              <a
                href={`tel:${booking.customerPhone}`}
                className="text-accent hover:underline"
              >
                {booking.customerPhone}
              </a>
              {" · "}
              <a
                href={`mailto:${booking.customerEmail}`}
                className="text-accent hover:underline"
              >
                {booking.customerEmail}
              </a>
            </dd>
          </div>
          {booking.agentName && (
            <div>
              <dt className="font-semibold text-navy">Agent</dt>
              <dd className="mt-1 text-muted">{booking.agentName}</dd>
            </div>
          )}
          {booking.notes && (
            <div>
              <dt className="font-semibold text-navy">Notes</dt>
              <dd className="mt-1 text-muted">{booking.notes}</dd>
            </div>
          )}
          <div>
            <dt className="font-semibold text-navy">Status</dt>
            <dd className="mt-1 text-muted">
              {booking.acknowledgedAt
                ? "Acknowledged by staff"
                : "Awaiting staff acknowledgment"}
            </dd>
          </div>
        </dl>

        {!booking.acknowledgedAt && (
          <div className="mt-6">
            <AcknowledgeButton bookingId={booking.id} />
          </div>
        )}
      </div>
    </div>
  );
}
