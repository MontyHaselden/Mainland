"use client";

import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import type {
  StaffCalendarDayDetail,
  StaffCalendarDaySummary,
} from "@/lib/booking/types";

type StaffDayPanelProps = {
  selectedDates: string[];
  selectedSummaries: StaffCalendarDaySummary[];
  day: StaffCalendarDayDetail | null;
  loading: boolean;
  acting: boolean;
  onBlock: (scope: "morning" | "afternoon" | "full") => void;
  onUnblock: (scope: "morning" | "afternoon" | "full") => void;
  onClear: () => void;
};

function SlotCard({
  slot,
  booked,
  blocked,
  booking,
}: {
  slot: BookingSlot;
  booked: boolean;
  blocked: boolean;
  booking?: StaffCalendarDayDetail["bookings"][number];
}) {
  let state = "Available";
  let stateClass = "text-emerald-700 bg-emerald-50 border-emerald-200";

  if (blocked) {
    state = "Blocked";
    stateClass = "text-red-800 bg-red-50 border-red-200";
  } else if (booked) {
    state = "Booked";
    stateClass = "text-amber-900 bg-amber-50 border-amber-200";
  }

  return (
    <div className={`rounded-xl border p-4 ${stateClass}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{SLOT_LABELS[slot]}</h3>
        <span className="text-xs font-medium uppercase tracking-wide">
          {state}
        </span>
      </div>
      {booking && (
        <div className="mt-3 space-y-1 text-sm">
          <p className="font-medium">{booking.customerName}</p>
          <p>{booking.propertyAddress}</p>
          <p>
            <a href={`tel:${booking.customerPhone}`} className="underline">
              {booking.customerPhone}
            </a>
            {" · "}
            <a href={`mailto:${booking.customerEmail}`} className="underline">
              {booking.customerEmail}
            </a>
          </p>
          {booking.agentName && <p>Agent: {booking.agentName}</p>}
          {booking.notes && <p className="text-muted">{booking.notes}</p>}
        </div>
      )}
    </div>
  );
}

function BulkSummary({ summaries }: { summaries: StaffCalendarDaySummary[] }) {
  const totalBookings = summaries.reduce((n, d) => n + d.bookingCount, 0);
  const blockableMorning = summaries.filter(
    (d) => !d.morningBooked && !d.morningBlocked
  ).length;
  const blockableAfternoon = summaries.filter(
    (d) => !d.afternoonBooked && !d.afternoonBlocked
  ).length;
  const unblockableMorning = summaries.filter((d) => d.morningBlocked).length;
  const unblockableAfternoon = summaries.filter((d) => d.afternoonBlocked).length;
  const fullyBlocked = summaries.filter(
    (d) => d.morningBlocked && d.afternoonBlocked
  ).length;

  const sorted = [...summaries].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0]?.date;
  const last = sorted[sorted.length - 1]?.date;
  const rangeLabel =
    first && last
      ? first === last
        ? format(parseISO(first), "d MMM yyyy")
        : `${format(parseISO(first), "d MMM")} – ${format(parseISO(last), "d MMM yyyy")}`
      : "";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        {summaries.length} days selected · {rangeLabel}
        {totalBookings > 0
          ? ` · ${totalBookings} booking${totalBookings === 1 ? "" : "s"} across selection`
          : ""}
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-border bg-background px-3 py-2">
          <p className="font-medium text-navy">Morning</p>
          <p className="text-muted">
            {blockableMorning} can block · {unblockableMorning} blocked
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background px-3 py-2">
          <p className="font-medium text-navy">Afternoon</p>
          <p className="text-muted">
            {blockableAfternoon} can block · {unblockableAfternoon} blocked
          </p>
        </div>
      </div>
      {fullyBlocked > 0 && (
        <p className="text-xs text-muted">
          {fullyBlocked} day{fullyBlocked === 1 ? "" : "s"} fully blocked.
        </p>
      )}
    </div>
  );
}

export function StaffDayPanel({
  selectedDates,
  selectedSummaries,
  day,
  loading,
  acting,
  onBlock,
  onUnblock,
  onClear,
}: StaffDayPanelProps) {
  const isBulk = selectedDates.length > 1;

  if (selectedDates.length === 0) {
    return (
      <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
        <p className="font-display text-xl text-navy">Select days</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Click dates to select one or many. Hold Shift and click to select a
          range. Use the panel to view bookings or block availability.
        </p>
      </div>
    );
  }

  if (!isBulk && (loading || !day)) {
    return (
      <div className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-border bg-surface p-8">
        <p className="text-sm text-muted">Loading day…</p>
      </div>
    );
  }

  const blockableMorning = selectedSummaries.filter(
    (d) => !d.morningBooked && !d.morningBlocked
  ).length;
  const blockableAfternoon = selectedSummaries.filter(
    (d) => !d.afternoonBooked && !d.afternoonBlocked
  ).length;
  const unblockableMorning = selectedSummaries.filter(
    (d) => d.morningBlocked
  ).length;
  const unblockableAfternoon = selectedSummaries.filter(
    (d) => d.afternoonBlocked
  ).length;
  const allFullyBlocked =
    selectedSummaries.length > 0 &&
    selectedSummaries.every((d) => d.morningBlocked && d.afternoonBlocked);
  const anyNotFullyBlocked = selectedSummaries.some(
    (d) => !(d.morningBlocked && d.afternoonBlocked)
  );

  const morningBooking = day?.bookings.find((b) => b.slot === "morning");
  const afternoonBooking = day?.bookings.find((b) => b.slot === "afternoon");
  const fullyBlocked =
    day &&
    day.morningBlocked &&
    day.afternoonBlocked &&
    !day.bookingCount;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-navy">
            {isBulk
              ? `${selectedDates.length} days selected`
              : day
                ? format(parseISO(day.date), "EEEE d MMMM yyyy")
                : "Selected day"}
          </h2>
          {!isBulk && day && (
            <p className="mt-1 text-sm text-muted">
              {day.bookingCount} booking{day.bookingCount === 1 ? "" : "s"}
              {fullyBlocked ? " · Day blocked" : ""}
            </p>
          )}
        </div>
        <Button type="button" variant="ghost" onClick={onClear}>
          Clear
        </Button>
      </div>

      {isBulk ? (
        <div className="mt-6">
          <BulkSummary summaries={selectedSummaries} />
        </div>
      ) : (
        day && (
          <div className="mt-6 space-y-4">
            <SlotCard
              slot="morning"
              booked={day.morningBooked}
              blocked={day.morningBlocked}
              booking={morningBooking}
            />
            <SlotCard
              slot="afternoon"
              booked={day.afternoonBooked}
              blocked={day.afternoonBlocked}
              booking={afternoonBooking}
            />
          </div>
        )
      )}

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-navy">
          {isBulk ? "Apply to all selected days" : "Manage availability"}
        </p>
        <div className="flex flex-wrap gap-2">
          {blockableMorning > 0 && (
            <Button
              type="button"
              variant="secondary"
              disabled={acting}
              onClick={() => onBlock("morning")}
            >
              Block morning{isBulk ? ` (${blockableMorning})` : ""}
            </Button>
          )}
          {unblockableMorning > 0 && (
            <Button
              type="button"
              variant="secondary"
              disabled={acting}
              onClick={() => onUnblock("morning")}
            >
              Unblock morning{isBulk ? ` (${unblockableMorning})` : ""}
            </Button>
          )}
          {blockableAfternoon > 0 && (
            <Button
              type="button"
              variant="secondary"
              disabled={acting}
              onClick={() => onBlock("afternoon")}
            >
              Block afternoon{isBulk ? ` (${blockableAfternoon})` : ""}
            </Button>
          )}
          {unblockableAfternoon > 0 && (
            <Button
              type="button"
              variant="secondary"
              disabled={acting}
              onClick={() => onUnblock("afternoon")}
            >
              Unblock afternoon{isBulk ? ` (${unblockableAfternoon})` : ""}
            </Button>
          )}
          {anyNotFullyBlocked && (
            <Button
              type="button"
              variant="primary"
              disabled={acting}
              onClick={() => onBlock("full")}
            >
              Block full day{isBulk ? ` (${selectedDates.length})` : ""}
            </Button>
          )}
          {allFullyBlocked && (
            <Button
              type="button"
              variant="primary"
              disabled={acting}
              onClick={() => onUnblock("full")}
            >
              Unblock full day{isBulk ? ` (${selectedDates.length})` : ""}
            </Button>
          )}
        </div>
        <p className="text-xs text-muted">
          {isBulk
            ? "Actions skip days where a slot is already booked. Shift+click to select a range."
            : "Booked slots cannot be blocked. Blocked slots are hidden from the public booking calendar."}
        </p>
      </div>
    </div>
  );
}
