"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { AVAILABILITY_COLORS, NZ_TIMEZONE } from "@/lib/booking/constants";
import {
  isBookableWeekday,
  isPastDate,
} from "@/lib/booking/availability";
import type { DayAvailability } from "@/lib/booking/types";

type DateCalendarProps = {
  currentMonth: string;
  nextMonth: string;
  currentDays: DayAvailability[];
  nextDays: DayAvailability[];
  loading: boolean;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function monthLabel(month: string): string {
  return format(parseISO(`${month}-01`), "MMMM yyyy");
}

function MonthGrid({
  month,
  days,
  selectedDate,
  onSelectDate,
}: {
  month: string;
  days: DayAvailability[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}) {
  const monthDate = parseISO(`${month}-01`);
  const firstDay = toZonedTime(monthDate, NZ_TIMEZONE).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: (DayAvailability | null)[] = [
    ...Array(offset).fill(null),
    ...days,
  ];

  return (
    <div>
      <p className="mb-2 text-center text-sm font-semibold text-navy sm:mb-3">
        {monthLabel(month)}
      </p>
      <div className="mb-1.5 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (!day) {
            return <div key={`empty-${month}-${i}`} />;
          }

          const showAvailability =
            isBookableWeekday(day.date) && !isPastDate(day.date);
          const bookable = showAvailability && day.status !== "red";
          const colors = AVAILABILITY_COLORS[day.status];
          const dayNum = format(parseISO(day.date), "d");
          const isSelected = selectedDate === day.date;

          let cellClass =
            "flex min-h-11 items-center justify-center rounded-lg text-sm font-semibold transition-all ";
          if (showAvailability) {
            cellClass += `${colors.bg} text-white `;
            cellClass += bookable
              ? "hover:brightness-110 hover:ring-2 hover:ring-white/40"
              : "cursor-not-allowed opacity-85";
            if (isSelected) {
              cellClass += " ring-2 ring-navy ring-offset-2 ";
            }
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
    </div>
  );
}

export function DateCalendar({
  currentMonth,
  nextMonth,
  currentDays,
  nextDays,
  loading,
  selectedDate,
  onSelectDate,
}: DateCalendarProps) {
  const [mobileTab, setMobileTab] = useState<"current" | "next">("current");

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted">Loading calendar…</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex shrink-0 gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => setMobileTab("current")}
          className={`min-h-10 flex-1 rounded-lg border px-3 text-sm font-semibold transition-colors ${
            mobileTab === "current"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted"
          }`}
        >
          This month
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("next")}
          className={`min-h-10 flex-1 rounded-lg border px-3 text-sm font-semibold transition-colors ${
            mobileTab === "next"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted"
          }`}
        >
          Next month
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="hidden gap-6 sm:grid sm:grid-cols-2">
          <MonthGrid
            month={currentMonth}
            days={currentDays}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
          <MonthGrid
            month={nextMonth}
            days={nextDays}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
        </div>

        <div className="sm:hidden">
          {mobileTab === "current" ? (
            <MonthGrid
              month={currentMonth}
              days={currentDays}
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
            />
          ) : (
            <MonthGrid
              month={nextMonth}
              days={nextDays}
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
            />
          )}
        </div>
      </div>

      <ul className="mt-3 flex shrink-0 flex-wrap gap-4 text-xs text-muted">
        <li className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-[var(--availability-green)]" />
          Available
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-[var(--availability-orange)]" />
          Limited
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-md bg-[var(--availability-red)]" />
          Booked out
        </li>
      </ul>
      <p className="mt-2 shrink-0 text-xs text-muted">
        All times NZ (Pacific/Auckland) · Monday to Saturday
      </p>
    </div>
  );
}
