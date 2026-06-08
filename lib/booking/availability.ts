import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { and, gte, inArray, lte } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getBlockedSlotsForRange, isSlotBlocked } from "./blocks";
import {
  BOOKING_SLOTS,
  NZ_TIMEZONE,
  type AvailabilityStatus,
  type BookingSlot,
} from "./constants";
import { SLOT_HOLDING_STATUSES } from "./status";
import type { DayAvailability, MonthAvailabilityResponse } from "./types";

export function getNzNow(): Date {
  return toZonedTime(new Date(), NZ_TIMEZONE);
}

export function formatNzDate(date: Date): string {
  return format(toZonedTime(date, NZ_TIMEZONE), "yyyy-MM-dd");
}

export function isBookableWeekday(dateStr: string): boolean {
  const d = toZonedTime(parseISO(dateStr), NZ_TIMEZONE);
  const day = d.getDay();
  return day >= 1 && day <= 6;
}

export function isPastDate(dateStr: string): boolean {
  const today = formatNzDate(getNzNow());
  return dateStr < today;
}

function statusFromBookedCount(count: number): AvailabilityStatus {
  if (count === 0) return "green";
  if (count === 1) return "orange";
  return "red";
}

function applyBlocksToDayAvailability(
  day: DayAvailability,
  blockedSlots: BookingSlot[]
): DayAvailability {
  const morningBlocked = isSlotBlocked(blockedSlots, "morning");
  const afternoonBlocked = isSlotBlocked(blockedSlots, "afternoon");
  const morningAvailable = day.morningAvailable && !morningBlocked;
  const afternoonAvailable = day.afternoonAvailable && !afternoonBlocked;

  const unavailableCount =
    (!morningAvailable ? 1 : 0) + (!afternoonAvailable ? 1 : 0);

  let status: AvailabilityStatus = "green";
  if (unavailableCount === 1) status = "orange";
  if (unavailableCount >= 2) status = "red";

  return {
    ...day,
    morningAvailable,
    afternoonAvailable,
    status,
  };
}

export function dayAvailabilityFromSlots(
  date: string,
  bookedSlots: BookingSlot[]
): DayAvailability {
  const morningAvailable = !bookedSlots.includes("morning");
  const afternoonAvailable = !bookedSlots.includes("afternoon");
  return {
    date,
    morningAvailable,
    afternoonAvailable,
    status: statusFromBookedCount(bookedSlots.length),
    bookedSlots,
  };
}

export async function getMonthAvailability(
  month: string
): Promise<MonthAvailabilityResponse> {
  const monthStart = startOfMonth(parseISO(`${month}-01`));
  const monthEnd = endOfMonth(monthStart);
  const startStr = format(monthStart, "yyyy-MM-dd");
  const endStr = format(monthEnd, "yyyy-MM-dd");

  const db = getDb();
  const rows = await db
    .select({
      inspectionDate: bookings.inspectionDate,
      slot: bookings.slot,
    })
    .from(bookings)
    .where(
      and(
        gte(bookings.inspectionDate, startStr),
        lte(bookings.inspectionDate, endStr),
        inArray(bookings.status, SLOT_HOLDING_STATUSES),
      ),
    );

  const byDate = new Map<string, BookingSlot[]>();
  for (const row of rows) {
    const date = row.inspectionDate;
    const slots = byDate.get(date) ?? [];
    if (BOOKING_SLOTS.includes(row.slot as BookingSlot)) {
      slots.push(row.slot as BookingSlot);
    }
    byDate.set(date, slots);
  }

  const blockedByDate = await getBlockedSlotsForRange(startStr, endStr);

  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const days: DayAvailability[] = daysInMonth.map((d) => {
    const dateStr = format(d, "yyyy-MM-dd");
    const booked = byDate.get(dateStr) ?? [];
    const blocked = blockedByDate.get(dateStr) ?? [];
    const day = dayAvailabilityFromSlots(dateStr, booked);
    return applyBlocksToDayAvailability(day, blocked);
  });

  return { month, days };
}

export function isSlotAvailable(
  day: DayAvailability,
  slot: BookingSlot
): boolean {
  if (!isBookableWeekday(day.date)) return false;
  if (isPastDate(day.date)) return false;
  return slot === "morning" ? day.morningAvailable : day.afternoonAvailable;
}
