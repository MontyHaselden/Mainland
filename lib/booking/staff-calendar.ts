import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { and, asc, eq, gte, lte } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getBlockedSlotsForRange, isSlotBlocked } from "./blocks";
import {
  BOOKING_SLOTS,
  type AvailabilityStatus,
  type BookingSlot,
} from "./constants";
import type {
  StaffCalendarDayDetail,
  StaffCalendarDaySummary,
  StaffCalendarMonthResponse,
} from "./types";
function summaryFromParts(
  date: string,
  bookedSlots: BookingSlot[],
  blockedSlots: BookingSlot[]
): StaffCalendarDaySummary {
  const morningBooked = bookedSlots.includes("morning");
  const afternoonBooked = bookedSlots.includes("afternoon");
  const morningBlocked = isSlotBlocked(blockedSlots, "morning");
  const afternoonBlocked = isSlotBlocked(blockedSlots, "afternoon");
  const morningAvailable = !morningBooked && !morningBlocked;
  const afternoonAvailable = !afternoonBooked && !afternoonBlocked;

  const unavailableCount =
    (morningBooked || morningBlocked ? 1 : 0) +
    (afternoonBooked || afternoonBlocked ? 1 : 0);

  let status: AvailabilityStatus = "green";
  if (unavailableCount === 1) status = "orange";
  if (unavailableCount >= 2) status = "red";

  return {
    date,
    morningBooked,
    afternoonBooked,
    morningBlocked,
    afternoonBlocked,
    morningAvailable,
    afternoonAvailable,
    status,
    bookingCount: bookedSlots.length,
  };
}

export async function getStaffCalendarMonth(
  month: string
): Promise<StaffCalendarMonthResponse> {
  const monthStart = startOfMonth(parseISO(`${month}-01`));
  const monthEnd = endOfMonth(monthStart);
  const startStr = format(monthStart, "yyyy-MM-dd");
  const endStr = format(monthEnd, "yyyy-MM-dd");

  const db = getDb();
  const [bookingRows, blockedByDate] = await Promise.all([
    db
      .select({
        inspectionDate: bookings.inspectionDate,
        slot: bookings.slot,
      })
      .from(bookings)
      .where(
        and(
          gte(bookings.inspectionDate, startStr),
          lte(bookings.inspectionDate, endStr)
        )
      ),
    getBlockedSlotsForRange(startStr, endStr),
  ]);

  const bookingsByDate = new Map<string, BookingSlot[]>();
  for (const row of bookingRows) {
    const slots = bookingsByDate.get(row.inspectionDate) ?? [];
    if (BOOKING_SLOTS.includes(row.slot as BookingSlot)) {
      slots.push(row.slot as BookingSlot);
    }
    bookingsByDate.set(row.inspectionDate, slots);
  }

  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const days = daysInMonth.map((d) => {
    const dateStr = format(d, "yyyy-MM-dd");
    const booked = bookingsByDate.get(dateStr) ?? [];
    const blocked = blockedByDate.get(dateStr) ?? [];
    return summaryFromParts(dateStr, booked, blocked);
  });

  return { month, days };
}

export async function getStaffCalendarDay(
  date: string
): Promise<StaffCalendarDayDetail> {
  const db = getDb();
  const [bookingRows, blockedByDate] = await Promise.all([
    db
      .select()
      .from(bookings)
      .where(eq(bookings.inspectionDate, date))
      .orderBy(asc(bookings.slot)),
    getBlockedSlotsForRange(date, date),
  ]);

  const bookedSlots = bookingRows
    .map((row) => row.slot)
    .filter((slot): slot is BookingSlot =>
      BOOKING_SLOTS.includes(slot as BookingSlot)
    );
  const blocked = blockedByDate.get(date) ?? [];
  const summary = summaryFromParts(date, bookedSlots, blocked);

  return {
    ...summary,
    bookings: bookingRows.map((row) => ({
      id: row.id,
      slot: row.slot as BookingSlot,
      customerName: row.customerName,
      customerEmail: row.customerEmail,
      customerPhone: row.customerPhone,
      propertyAddress: row.propertyAddress,
      notes: row.notes,
      agentName: row.agentName,
      acknowledgedAt: row.acknowledgedAt?.toISOString() ?? null,
    })),
  };
}
