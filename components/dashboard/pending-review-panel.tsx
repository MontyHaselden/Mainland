"use client";

import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { parseReviewFlags } from "@/lib/booking/pricing-engine";
import { formatFloorAreaDisplay } from "@/lib/booking/property-options";
import { BOOKING_STATUS_LABELS } from "@/lib/booking/status";
import { formatBookingDate } from "@/lib/booking/queries";

type PendingReviewPanelProps = {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
};

function displayPrice(booking: Booking): string {
  if (booking.finalPrice != null) return `$${booking.finalPrice}`;
  if (booking.estimatedPrice != null) return `$${booking.estimatedPrice} (est.)`;
  return "Pending review";
}

export function PendingReviewPanel({
  bookings,
  onSelectBooking,
}: PendingReviewPanelProps) {
  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted">No bookings awaiting review.</p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {bookings.map((booking) => {
        const flags = parseReviewFlags(booking.reviewFlags);
        return (
          <li key={booking.id}>
            <button
              type="button"
              onClick={() => onSelectBooking(booking)}
              className="w-full py-4 text-left transition-colors hover:bg-background/60"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-navy">
                    {booking.customerName}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {booking.propertyAddress}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                  {BOOKING_STATUS_LABELS[
                    booking.status as keyof typeof BOOKING_STATUS_LABELS
                  ] ?? booking.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {formatBookingDate(booking.inspectionDate)} ·{" "}
                {SLOT_LABELS[booking.slot as BookingSlot]}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <span>
                  Floor:{" "}
                  {formatFloorAreaDisplay(
                    booking.floorAreaSqm,
                    booking.floorAreaBand,
                  )}
                </span>
                <span>Age: {booking.decadeBuilt ?? "—"}</span>
                <span>Type: {booking.propertyType ?? "—"}</span>
                <span>Storeys: {booking.storeys ?? "—"}</span>
                <span>{displayPrice(booking)}</span>
              </div>
              {flags.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {flags.map((flag) => (
                    <li
                      key={flag}
                      className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-navy"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs text-accent">
                Review &amp; respond →
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
