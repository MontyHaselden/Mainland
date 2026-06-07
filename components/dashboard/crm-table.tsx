"use client";

import { useMemo, useState } from "react";
import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { formatBookingDate } from "@/lib/booking/queries";
export function CrmTable({
  bookings,
  onSelectBooking,
}: {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return bookings;
    return bookings.filter(
      (b) =>
        b.customerName.toLowerCase().includes(q) ||
        b.customerEmail.toLowerCase().includes(q) ||
        b.propertyAddress.toLowerCase().includes(q) ||
        b.inspectionDate.includes(q)
    );
  }, [bookings, query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search name, email, address, date…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-base"
      />
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-background text-xs font-semibold uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Slot</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Ack</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.id}
                className="cursor-pointer border-t border-border hover:bg-background/80"
                onClick={() => onSelectBooking?.(b)}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatBookingDate(b.inspectionDate)}
                </td>
                <td className="px-4 py-3">
                  {SLOT_LABELS[b.slot as BookingSlot]}
                </td>
                <td className="px-4 py-3">{b.customerName}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-muted">
                  {b.propertyAddress}
                </td>
                <td className="px-4 py-3">
                  {b.acknowledgedAt ? (
                    <span className="text-xs text-muted">Done</span>
                  ) : (
                    <span className="text-xs font-medium text-amber-700">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
