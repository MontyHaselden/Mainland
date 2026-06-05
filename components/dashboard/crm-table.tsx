"use client";

import { useMemo, useState } from "react";
import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { formatBookingDate } from "@/lib/booking/queries";
import { AcknowledgeButton } from "./acknowledge-button";

export function CrmTable({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

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
                onClick={() => setSelected(b)}
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
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  {b.acknowledgedAt ? (
                    <span className="text-xs text-muted">Done</span>
                  ) : (
                    <AcknowledgeButton bookingId={b.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-4 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-xl text-navy">
              {selected.customerName}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="font-semibold">When</dt>
                <dd className="text-muted">
                  {formatBookingDate(selected.inspectionDate)} ·{" "}
                  {SLOT_LABELS[selected.slot as BookingSlot]}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Property</dt>
                <dd className="text-muted">{selected.propertyAddress}</dd>
              </div>
              <div>
                <dt className="font-semibold">Contact</dt>
                <dd className="text-muted">
                  {selected.customerPhone} · {selected.customerEmail}
                </dd>
              </div>
              {selected.agentName && (
                <div>
                  <dt className="font-semibold">Agent</dt>
                  <dd className="text-muted">{selected.agentName}</dd>
                </div>
              )}
              {selected.notes && (
                <div>
                  <dt className="font-semibold">Notes</dt>
                  <dd className="text-muted">{selected.notes}</dd>
                </div>
              )}
            </dl>
            {!selected.acknowledgedAt && (
              <div className="mt-6">
                <AcknowledgeButton bookingId={selected.id} />
              </div>
            )}
            <button
              type="button"
              className="mt-4 text-sm text-muted hover:text-navy"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
