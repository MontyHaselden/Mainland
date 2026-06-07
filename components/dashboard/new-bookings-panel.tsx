"use client";

import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { formatBookingDate } from "@/lib/booking/queries";
import { AcknowledgeButton } from "./acknowledge-button";

type NewBookingsPanelProps = {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
};

export function NewBookingsPanel({
  bookings,
  onSelectBooking,
}: NewBookingsPanelProps) {
  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted">
        No new bookings awaiting acknowledgment.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b) => (
        <li
          key={b.id}
          className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <button
            type="button"
            onClick={() => onSelectBooking?.(b)}
            className="min-w-0 flex-1 text-left"
          >
            <p className="font-semibold text-navy">{b.customerName}</p>
            <p className="text-sm text-muted">
              {formatBookingDate(b.inspectionDate)} ·{" "}
              {SLOT_LABELS[b.slot as BookingSlot]}
            </p>
            <p className="text-sm text-muted">{b.propertyAddress}</p>
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <AcknowledgeButton bookingId={b.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
