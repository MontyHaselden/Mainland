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
    <div className="flex h-full flex-col">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <Button type="button" variant="ghost" onClick={prevMonth}>
          ←
        </Button>
        <span className="font-semibold text-navy">{label}</span>
        <Button type="button" variant="ghost" onClick={nextMonth}>
          →
        </Button>
      </div>

      <div className="mb-1.5 grid shrink-0 grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {loading ? (
        <p className="flex flex-1 items-center justify-center text-sm text-muted">
          Loading calendar…
        </p>
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-7 gap-1.5 content-start">
          {cells.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} />;
            }
            const showAvailability =
              isBookableWeekday(day.date) && !isPastDate(day.date);
            const bookable = showAvailability && day.status !== "red";
            const colors = AVAILABILITY_COLORS[day.status];
            const dayNum = format(parseISO(day.date), "d");

            let cellClass =
              "flex min-h-11 items-center justify-center rounded-lg text-sm font-semibold transition-all ";
            if (showAvailability) {
              cellClass += `${colors.bg} text-white `;
              cellClass += bookable
                ? "hover:brightness-110 hover:ring-2 hover:ring-white/40"
                : "cursor-not-allowed opacity-85";
            } else if (isPastDate(day.date)) {
              cellClass += "cursor-default bg-border/50 text-muted/50";
            } else {
              cellClass += "cursor-default text-muted/35";
            }

            return (
              <button
                key={day.date}
                type="button"
                disabled={!bookable}
                onClick={() => bookable && onSelectDate(day.date)}
                title={showAvailability ? colors.label : "Unavailable"}
                className={cellClass}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      )}

      <ul className="mt-3 flex shrink-0 flex-wrap gap-4 text-xs text-muted">
        <li className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-[var(--availability-green)]" />
          2 slots
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-[var(--availability-orange)]" />
          1 slot
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-[var(--availability-red)]" />
          Full
        </li>
      </ul>
    </div>
  );
}
