import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { formatBookingDate } from "@/lib/booking/queries";
import { AcknowledgeButton } from "./acknowledge-button";

export function NewBookingsPanel({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <p className="text-sm text-muted">No new bookings awaiting acknowledgment.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b) => (
        <li
          key={b.id}
          className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-navy">{b.customerName}</p>
            <p className="text-sm text-muted">
              {formatBookingDate(b.inspectionDate)} ·{" "}
              {SLOT_LABELS[b.slot as BookingSlot]}
            </p>
            <p className="text-sm text-muted">{b.propertyAddress}</p>
            <p className="mt-1 text-xs text-muted">
              <a href={`tel:${b.customerPhone}`} className="text-accent">
                {b.customerPhone}
              </a>
              {" · "}
              <a href={`mailto:${b.customerEmail}`} className="text-accent">
                {b.customerEmail}
              </a>
            </p>
          </div>
          <AcknowledgeButton bookingId={b.id} />
        </li>
      ))}
    </ul>
  );
}
