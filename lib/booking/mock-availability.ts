import {
  eachDayOfInterval,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
} from "date-fns";
import { dayAvailabilityFromSlots, isBookableWeekday } from "./availability";
import type { BookingSlot } from "./constants";
import type { MonthAvailabilityResponse } from "./types";

/**
 * Deterministic demo availability for placeholder booking UI.
 * All dates are interpreted in Pacific/Auckland (NZ) via shared booking helpers.
 */

function hashDate(dateStr: string): number {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return h;
}

function mockBookedSlots(dateStr: string): BookingSlot[] {
  if (!isBookableWeekday(dateStr)) {
    return ["morning", "afternoon"];
  }

  const bucket = hashDate(dateStr) % 10;
  if (bucket <= 5) return [];
  if (bucket <= 7) return ["morning"];
  return ["morning", "afternoon"];
}

export function getMockMonthAvailability(
  month: string,
): MonthAvailabilityResponse {
  const monthStart = startOfMonth(parseISO(`${month}-01`));
  const monthEnd = endOfMonth(monthStart);

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(
    (d) => {
      const dateStr = format(d, "yyyy-MM-dd");
      return dayAvailabilityFromSlots(dateStr, mockBookedSlots(dateStr));
    },
  );

  return { month, days };
}
