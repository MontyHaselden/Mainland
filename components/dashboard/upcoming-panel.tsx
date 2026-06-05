import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import {
  formatBookingDate,
  groupBookingsByDate,
} from "@/lib/booking/queries";
import { formatNzDate, getNzNow } from "@/lib/booking/availability";

export function UpcomingPanel({ bookings }: { bookings: Booking[] }) {
  const today = formatNzDate(getNzNow());
  const future = bookings.filter((b) => b.inspectionDate > today);
  const grouped = groupBookingsByDate(future);

  const dates = Object.keys(grouped).sort();
  if (dates.length === 0) {
    return (
      <p className="text-sm text-muted">No upcoming inspections in the next 30 days.</p>
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
              <li
                key={b.id}
                className="rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span className="font-medium">
                  {SLOT_LABELS[b.slot as BookingSlot]}
                </span>
                <span className="text-muted"> — {b.customerName}</span>
                <p className="text-xs text-muted truncate">{b.propertyAddress}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
