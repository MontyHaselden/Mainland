"use client";

import { format, parseISO, addMonths, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { AVAILABILITY_COLORS, NZ_TIMEZONE } from "@/lib/booking/constants";
import {
  isBookableWeekday,
  isPastDate,
} from "@/lib/booking/availability";
import type { DayAvailability } from "@/lib/booking/types";

type DateCalendarProps = {
  month: string;
  days: DayAvailability[];
  loading: boolean;
  selectedDate: string | null;
  onMonthChange: (month: string) => void;
  onSelectDate: (date: string) => void;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DateCalendar({
  month,
  days,
  loading,
  onMonthChange,
  onSelectDate,
}: DateCalendarProps) {
  const monthDate = parseISO(`${month}-01`);
  const label = format(monthDate, "MMMM yyyy");

  function prevMonth() {
    onMonthChange(format(subMonths(monthDate, 1), "yyyy-MM"));
  }

  function nextMonth() {
    onMonthChange(format(addMonths(monthDate, 1), "yyyy-MM"));
  }

  const firstDay = toZonedTime(monthDate, NZ_TIMEZONE).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: (DayAvailability | null)[] = [
    ...Array(offset).fill(null),
    ...days,
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={prevMonth}>
          ←
        </Button>
        <span className="font-semibold text-navy">{label}</span>
        <Button type="button" variant="ghost" onClick={nextMonth}>
          →
        </Button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted">Loading calendar…</p>
      ) : (
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} />;
            }
            const bookable =
              isBookableWeekday(day.date) &&
              !isPastDate(day.date) &&
              day.status !== "red";
            const colors = AVAILABILITY_COLORS[day.status];
            const dayNum = format(parseISO(day.date), "d");

            return (
              <button
                key={day.date}
                type="button"
                disabled={!bookable}
                onClick={() => bookable && onSelectDate(day.date)}
                title={bookable ? colors.label : "Unavailable"}
                className={`flex min-h-11 flex-col items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  bookable
                    ? "bg-background text-navy hover:ring-2 hover:ring-accent/40"
                    : "cursor-not-allowed text-muted/40"
                }`}
              >
                <span>{dayNum}</span>
                {isBookableWeekday(day.date) && !isPastDate(day.date) && (
                  <span
                    className={`mt-1 h-2 w-2 rounded-full ${colors.bg}`}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--availability-green)]" />
          2 slots
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--availability-orange)]" />
          1 slot
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--availability-red)]" />
          Full
        </li>
      </ul>
    </div>
  );
}
