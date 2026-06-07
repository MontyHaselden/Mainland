"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { format, parseISO, addMonths, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { AVAILABILITY_COLORS, NZ_TIMEZONE } from "@/lib/booking/constants";
import { isBookableWeekday, isPastDate } from "@/lib/booking/availability";
import type {
  StaffCalendarDayDetail,
  StaffCalendarDaySummary,
  StaffCalendarMonthResponse,
} from "@/lib/booking/types";
import { StaffDayPanel } from "./staff-day-panel";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function cellClasses(
  day: StaffCalendarDaySummary,
  selected: boolean,
  past: boolean
) {
  if (past) {
    return "flex min-h-24 cursor-not-allowed flex-col items-center justify-center rounded-xl border border-border/60 bg-border/30 px-2 py-3 text-base font-semibold text-muted/45";
  }

  const colors = AVAILABILITY_COLORS[day.status];
  const blocked =
    day.morningBlocked || day.afternoonBlocked
      ? "ring-2 ring-red-400/60"
      : "";
  const selectedClass = selected
    ? "ring-2 ring-accent bg-accent/5"
    : "";
  const weekend = !isBookableWeekday(day.date) ? "opacity-50" : "";

  return `flex min-h-24 flex-col items-center justify-center rounded-xl border border-border bg-background px-2 py-3 text-base font-semibold transition-all hover:border-accent/40 hover:shadow-sm ${colors.bg}/10 ${blocked} ${selectedClass} ${weekend}`;
}

function selectRange(
  anchor: string,
  target: string,
  monthDays: StaffCalendarDaySummary[]
): string[] {
  const sorted = monthDays.map((d) => d.date).sort();
  const startIdx = sorted.indexOf(anchor);
  const endIdx = sorted.indexOf(target);
  if (startIdx === -1 || endIdx === -1) return [target];

  const [from, to] =
    startIdx < endIdx ? [startIdx, endIdx] : [endIdx, startIdx];
  return sorted
    .slice(from, to + 1)
    .filter((date) => !isPastDate(date));
}

export function StaffCalendar() {
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"));
  const [days, setDays] = useState<StaffCalendarDaySummary[]>([]);
  const [loadingMonth, setLoadingMonth] = useState(true);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [rangeAnchor, setRangeAnchor] = useState<string | null>(null);
  const [dayDetail, setDayDetail] = useState<StaffCalendarDayDetail | null>(
    null
  );
  const [loadingDay, setLoadingDay] = useState(false);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSummaries = useMemo(
    () =>
      days
        .filter((d) => selectedDates.includes(d.date))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [days, selectedDates]
  );

  const loadMonth = useCallback(async (targetMonth: string) => {
    setLoadingMonth(true);
    setError(null);
    try {
      const res = await fetch(`/api/staff/calendar?month=${targetMonth}`);
      if (!res.ok) throw new Error("Failed to load month");
      const data = (await res.json()) as StaffCalendarMonthResponse;
      setDays(data.days);
      setSelectedDates((prev) => prev.filter((d) => !isPastDate(d)));
    } catch {
      setError("Unable to load calendar.");
    } finally {
      setLoadingMonth(false);
    }
  }, []);

  const loadDay = useCallback(async (date: string) => {
    setLoadingDay(true);
    setError(null);
    try {
      const res = await fetch(`/api/staff/calendar?date=${date}`);
      if (!res.ok) throw new Error("Failed to load day");
      const data = (await res.json()) as StaffCalendarDayDetail;
      setDayDetail(data);
    } catch {
      setError("Unable to load day details.");
      setDayDetail(null);
    } finally {
      setLoadingDay(false);
    }
  }, []);

  useEffect(() => {
    loadMonth(month);
  }, [month, loadMonth]);

  useEffect(() => {
    if (selectedDates.length === 1) {
      loadDay(selectedDates[0]);
    } else {
      setDayDetail(null);
      setLoadingDay(false);
    }
  }, [selectedDates, loadDay]);

  function handleDayClick(
    date: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (isPastDate(date)) return;

    if (event.shiftKey && rangeAnchor) {
      const range = selectRange(rangeAnchor, date, days);
      setSelectedDates(range);
      return;
    }

    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      }
      return [...prev, date].sort();
    });
    setRangeAnchor(date);
  }

  function clearSelection() {
    setSelectedDates([]);
    setRangeAnchor(null);
    setDayDetail(null);
  }

  async function updateBlock(
    action: "block" | "unblock",
    scope: "morning" | "afternoon" | "full"
  ) {
    if (selectedDates.length === 0) return;

    const applicableDates = selectedSummaries
      .filter((day) => !isPastDate(day.date))
      .filter((day) => {
        if (action === "block") {
          if (scope === "morning")
            return !day.morningBooked && !day.morningBlocked;
          if (scope === "afternoon")
            return !day.afternoonBooked && !day.afternoonBlocked;
          return true;
        }
        if (scope === "morning") return day.morningBlocked;
        if (scope === "afternoon") return day.afternoonBlocked;
        return day.morningBlocked || day.afternoonBlocked;
      })
      .map((d) => d.date);

    if (applicableDates.length === 0) return;

    setActing(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/calendar/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates: applicableDates, action, scope }),
      });
      if (!res.ok) throw new Error("Failed to update");
      await loadMonth(month);
      if (selectedDates.length === 1) {
        await loadDay(selectedDates[0]);
      }
    } catch {
      setError("Unable to update availability.");
    } finally {
      setActing(false);
    }
  }

  const monthDate = parseISO(`${month}-01`);
  const label = format(monthDate, "MMMM yyyy");
  const firstDay = toZonedTime(monthDate, NZ_TIMEZONE).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const cells: (StaffCalendarDaySummary | null)[] = [
    ...Array(offset).fill(null),
    ...days,
  ];

  return (
    <div className="space-y-6">
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setMonth(format(subMonths(monthDate, 1), "yyyy-MM"))
                }
              >
                ←
              </Button>
              <h2 className="font-display text-2xl text-navy">{label}</h2>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setMonth(format(addMonths(monthDate, 1), "yyyy-MM"))
                }
              >
                →
              </Button>
            </div>
            {selectedDates.length > 0 && (
              <Button type="button" variant="secondary" onClick={clearSelection}>
                Clear selection ({selectedDates.length})
              </Button>
            )}
          </div>

          <p className="mb-4 text-xs text-muted">
            Click to toggle days · Shift+click for a range
          </p>

          <div className="mb-3 grid grid-cols-7 gap-2 text-center text-sm font-semibold text-muted">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {loadingMonth ? (
            <p className="py-16 text-center text-sm text-muted">
              Loading calendar…
            </p>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {cells.map((day, i) => {
                if (!day) {
                  return <div key={`empty-${i}`} />;
                }

                const dayNum = format(parseISO(day.date), "d");
                const past = isPastDate(day.date);
                const colors = AVAILABILITY_COLORS[day.status];
                const selected = selectedDates.includes(day.date);

                return (
                  <button
                    key={day.date}
                    type="button"
                    disabled={past}
                    onClick={(e) => handleDayClick(day.date, e)}
                    className={cellClasses(day, selected, past)}
                    title={past ? "Past dates cannot be changed" : undefined}
                  >
                    <span className={`text-lg ${past ? "text-muted/50" : "text-navy"}`}>
                      {dayNum}
                    </span>
                    {!past && (
                      <span
                        className={`mt-2 h-3 w-3 rounded-full ${colors.bg}`}
                        aria-hidden
                      />
                    )}
                    {!past && day.bookingCount > 0 && (
                      <span className="mt-1 text-xs font-medium text-muted">
                        {day.bookingCount} booked
                      </span>
                    )}
                    {!past &&
                      (day.morningBlocked || day.afternoonBlocked) && (
                        <span className="mt-1 text-xs font-medium text-red-700">
                          {day.morningBlocked && day.afternoonBlocked
                            ? "Blocked"
                            : day.morningBlocked
                              ? "AM blocked"
                              : "PM blocked"}
                        </span>
                      )}
                  </button>
                );
              })}
            </div>
          )}

          <ul className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--availability-green)]" />
              2 slots free
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--availability-orange)]" />
              1 slot free
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--availability-red)]" />
              Full / blocked
            </li>
          </ul>
        </section>

        <StaffDayPanel
          selectedDates={selectedDates}
          selectedSummaries={selectedSummaries}
          day={dayDetail}
          loading={loadingDay}
          acting={acting}
          onBlock={(scope) => updateBlock("block", scope)}
          onUnblock={(scope) => updateBlock("unblock", scope)}
          onClear={clearSelection}
        />
      </div>
    </div>
  );
}
