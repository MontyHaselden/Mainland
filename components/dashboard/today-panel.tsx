"use client";

import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";

type TodayPanelProps = {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
};

export function TodayPanel({ bookings, onSelectBooking }: TodayPanelProps) {
  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted">No inspections scheduled for today.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {bookings.map((b) => (
        <li key={b.id}>
          <button
            type="button"
            onClick={() => onSelectBooking?.(b)}
            className="w-full rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-accent/40"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-navy">
                {SLOT_LABELS[b.slot as BookingSlot]}
              </p>
              {!b.acknowledgedAt && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  New
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-medium">{b.customerName}</p>
            <p className="text-sm text-muted">{b.propertyAddress}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
