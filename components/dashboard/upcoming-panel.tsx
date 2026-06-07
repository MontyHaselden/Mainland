"use client";

import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import {
  formatBookingDate,
  groupBookingsByDate,
} from "@/lib/booking/queries";
import { formatNzDate, getNzNow } from "@/lib/booking/availability";

type UpcomingPanelProps = {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
};

export function UpcomingPanel({
  bookings,
  onSelectBooking,
}: UpcomingPanelProps) {
  const today = formatNzDate(getNzNow());
  const future = bookings.filter((b) => b.inspectionDate > today);
  const grouped = groupBookingsByDate(future);

  const dates = Object.keys(grouped).sort();
  if (dates.length === 0) {
    return (
      <p className="text-sm text-muted">
        No upcoming inspections in the next 30 days.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {dates.map((date) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-navy">
            {formatBookingDate(date)}
          </h3>
          <ul className="mt-2 space-y-2">
            {grouped[date].map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => onSelectBooking?.(b)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:border-accent/40 hover:bg-background"
                >
                  <span className="font-medium">
                    {SLOT_LABELS[b.slot as BookingSlot]}
                  </span>
                  <span className="text-muted"> — {b.customerName}</span>
                  <p className="truncate text-xs text-muted">
                    {b.propertyAddress}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
