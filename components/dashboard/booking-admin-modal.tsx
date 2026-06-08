"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Booking } from "@/lib/db/schema";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { parseReviewFlags } from "@/lib/booking/pricing-engine";
import {
  DECADES_BUILT,
  formatFloorAreaDisplay,
  PROPERTY_TYPES,
  STOREY_OPTIONS,
} from "@/lib/booking/property-options";
import { BOOKING_STATUS_LABELS } from "@/lib/booking/status";
import { formatBookingDate } from "@/lib/booking/queries";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

type BookingAdminModalProps = {
  booking: Booking | null;
  onClose: () => void;
};

function resolveFloorAreaSqm(booking: Booking, override: string): number | null {
  if (override) return Number(override);
  return (
    booking.adminFloorAreaSqm ??
    booking.exactFloorAreaSqm ??
    booking.floorAreaSqm
  );
}

export function BookingAdminModal({ booking, onClose }: BookingAdminModalProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [adminFloorAreaSqm, setAdminFloorAreaSqm] = useState("");
  const [adminDecadeBuilt, setAdminDecadeBuilt] = useState("");
  const [adminPropertyType, setAdminPropertyType] = useState("");
  const [adminStoreys, setAdminStoreys] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  if (!booking) return null;

  const flags = parseReviewFlags(booking.reviewFlags);
  const customerFloorArea = formatFloorAreaDisplay(
    booking.floorAreaSqm,
    booking.floorAreaBand,
  );
  const effectiveDecade =
    adminDecadeBuilt || booking.adminDecadeBuilt || booking.decadeBuilt || "";
  const effectiveType =
    adminPropertyType || booking.adminPropertyType || booking.propertyType || "";
  const effectiveStoreys =
    adminStoreys || booking.adminStoreys || booking.storeys || "";

  async function patchBooking(body: Record<string, unknown>) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/staff/bookings/${booking!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Update failed");
        return;
      }
      router.refresh();
      onClose();
    } catch {
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  }

  function buildSavePayload() {
    const sqmValue = adminFloorAreaSqm
      ? Number(adminFloorAreaSqm)
      : resolveFloorAreaSqm(booking!, adminFloorAreaSqm);

    return {
      action: "save",
      adminFloorAreaSqm: adminFloorAreaSqm ? sqmValue : booking!.adminFloorAreaSqm,
      adminDecadeBuilt: adminDecadeBuilt || booking!.adminDecadeBuilt || undefined,
      adminPropertyType: adminPropertyType || booking!.adminPropertyType || undefined,
      adminStoreys: adminStoreys || booking!.adminStoreys || undefined,
      finalPrice: finalPrice ? Number(finalPrice) : booking!.finalPrice,
      adminNotes: adminNotes || booking!.adminNotes,
    };
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button type="button" variant="ghost" className="mb-4 -ml-2" onClick={onClose}>
          ← Close
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-navy">
              {booking.customerName}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {formatBookingDate(booking.inspectionDate)} ·{" "}
              {SLOT_LABELS[booking.slot as BookingSlot]}
            </p>
          </div>
          <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-navy">
            {BOOKING_STATUS_LABELS[
              booking.status as keyof typeof BOOKING_STATUS_LABELS
            ] ?? booking.status}
          </span>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-navy">Property</dt>
            <dd className="mt-1 text-muted">{booking.propertyAddress}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Contact</dt>
            <dd className="mt-1 text-muted">
              <a href={`tel:${booking.customerPhone}`} className="text-accent">
                {booking.customerPhone}
              </a>
              <br />
              <a href={`mailto:${booking.customerEmail}`} className="text-accent">
                {booking.customerEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Customer submitted</dt>
            <dd className="mt-1 text-muted">
              {customerFloorArea} · {booking.decadeBuilt}
              <br />
              {booking.propertyType} · {booking.storeys}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Estimated price</dt>
            <dd className="mt-1 text-muted">
              {booking.estimatedPrice != null
                ? `$${booking.estimatedPrice}`
                : "Pending"}
            </dd>
          </div>
        </dl>

        {flags.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              Review flags
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {flags.map((flag) => (
                <li
                  key={flag}
                  className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs text-amber-950"
                >
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {booking.notes && (
          <div className="mt-4 rounded-lg border border-border bg-background p-4 text-sm text-muted">
            <p className="font-semibold text-navy">Customer notes</p>
            <p className="mt-1 whitespace-pre-wrap">{booking.notes}</p>
          </div>
        )}

        <div className="mt-6 space-y-4 border-t border-border pt-6">
          <p className="text-sm font-semibold text-navy">Admin overrides</p>
          <p className="text-xs text-muted">
            Updating property details will recalculate the estimated price unless
            you set a final price manually.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="admin-sqm">Floor area (m²)</Label>
              <Input
                id="admin-sqm"
                type="number"
                placeholder={
                  resolveFloorAreaSqm(booking, "")?.toString() ?? "e.g. 185"
                }
                value={adminFloorAreaSqm}
                onChange={(e) => setAdminFloorAreaSqm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="admin-decade">Decade built</Label>
              <select
                id="admin-decade"
                className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                value={effectiveDecade}
                onChange={(e) => setAdminDecadeBuilt(e.target.value)}
              >
                <option value="">— Customer: {booking.decadeBuilt} —</option>
                {DECADES_BUILT.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="admin-type">Property type</Label>
              <select
                id="admin-type"
                className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                value={effectiveType}
                onChange={(e) => setAdminPropertyType(e.target.value)}
              >
                <option value="">— Customer: {booking.propertyType} —</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="admin-storeys">Storeys</Label>
              <select
                id="admin-storeys"
                className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                value={effectiveStoreys}
                onChange={(e) => setAdminStoreys(e.target.value)}
              >
                <option value="">— Customer: {booking.storeys} —</option>
                {STOREY_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="final-price">Final price ($)</Label>
              <Input
                id="final-price"
                type="number"
                placeholder={
                  booking.finalPrice?.toString() ??
                  booking.estimatedPrice?.toString() ??
                  ""
                }
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="admin-notes">Admin notes</Label>
            <Textarea
              id="admin-notes"
              rows={3}
              placeholder={booking.adminNotes ?? ""}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={saving}
            onClick={() =>
              patchBooking({ ...buildSavePayload(), action: "confirm_price" })
            }
          >
            Confirm price
          </Button>
          <Button
            type="button"
            disabled={saving}
            onClick={() =>
              patchBooking({ ...buildSavePayload(), action: "confirm_booking" })
            }
          >
            Confirm booking
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={saving}
            onClick={() => patchBooking({ ...buildSavePayload(), action: "save" })}
          >
            Save changes
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={saving}
            onClick={() => patchBooking({ action: "complete" })}
          >
            Mark completed
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={saving}
            onClick={() => patchBooking({ action: "cancel" })}
          >
            Cancel booking
          </Button>
          <a
            href={`mailto:${booking.customerEmail}?subject=${encodeURIComponent("Your Mainland Building Inspection")}`}
            className="inline-flex min-h-10 items-center rounded-lg border border-border px-4 text-sm font-semibold text-navy hover:border-accent/40"
          >
            Email customer
          </a>
        </div>
      </div>
    </div>
  );
}
