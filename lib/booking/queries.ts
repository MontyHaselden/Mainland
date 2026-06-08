import { and, asc, desc, eq, gte, lte } from "drizzle-orm";
import { addDays, format, parseISO } from "date-fns";
import { getDb } from "@/lib/db";
import { bookings, type Booking } from "@/lib/db/schema";
import { formatNzDate, getNzNow } from "./availability";

export async function getAllBookings(): Promise<Booking[]> {
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .orderBy(asc(bookings.inspectionDate), asc(bookings.slot));
}

export async function getPendingReviewBookings(): Promise<Booking[]> {
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.status, "pending_review"))
    .orderBy(desc(bookings.createdAt));
}

export async function getUnacknowledgedBookings(): Promise<Booking[]> {
  return getPendingReviewBookings();
}

export async function getTodayBookings(): Promise<Booking[]> {
  const today = formatNzDate(getNzNow());
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.inspectionDate, today))
    .orderBy(asc(bookings.slot));
}

export async function getUpcomingBookings(days = 30): Promise<Booking[]> {
  const today = formatNzDate(getNzNow());
  const end = format(addDays(getNzNow(), days), "yyyy-MM-dd");
  const db = getDb();
  return db
    .select()
    .from(bookings)
    .where(
      and(
        gte(bookings.inspectionDate, today),
        lte(bookings.inspectionDate, end)
      )
    )
    .orderBy(asc(bookings.inspectionDate), asc(bookings.slot));
}

export function groupBookingsByDate(
  list: Booking[]
): Record<string, Booking[]> {
  return list.reduce<Record<string, Booking[]>>((acc, b) => {
    const key = b.inspectionDate;
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});
}

export function formatBookingDate(dateStr: string): string {
  return format(parseISO(dateStr), "EEE d MMM yyyy");
}
