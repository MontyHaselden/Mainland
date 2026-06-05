import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";

export function TodayPanel({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted">No inspections scheduled for today.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {bookings.map((b) => (
        <li
          key={b.id}
          className="rounded-xl border border-border bg-background p-4"
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
          <div className="mt-2 flex gap-3 text-sm">
            <a href={`tel:${b.customerPhone}`} className="text-accent font-medium">
              Call
            </a>
            <a
              href={`mailto:${b.customerEmail}`}
              className="text-accent font-medium"
            >
              Email
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
