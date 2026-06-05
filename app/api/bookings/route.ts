import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { getStaffSession } from "@/lib/auth/session";
import { bookings } from "@/lib/db/schema";
import {
  BOOKING_SLOTS,
  type BookingSlot,
} from "@/lib/booking/constants";
import {
  getMonthAvailability,
  isBookableWeekday,
  isPastDate,
  isSlotAvailable,
} from "@/lib/booking/availability";
import {
  sendCustomerConfirmation,
  sendStaffNewBookingAlert,
} from "@/lib/email/brevo";

const bodySchema = z.object({
  inspectionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.enum(BOOKING_SLOTS),
  customerName: z.string().min(2).max(255),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6).max(50),
  propertyAddress: z.string().min(5),
  notes: z.string().optional(),
  agentName: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking details" },
        { status: 400 }
      );
    }

    const { inspectionDate, slot, ...customer } = parsed.data;

    if (!isBookableWeekday(inspectionDate)) {
      return NextResponse.json(
        { error: "Inspections are available Monday to Saturday only." },
        { status: 400 }
      );
    }

    if (isPastDate(inspectionDate)) {
      return NextResponse.json(
        { error: "Cannot book a date in the past." },
        { status: 400 }
      );
    }

    const month = inspectionDate.slice(0, 7);
    const { days } = await getMonthAvailability(month);
    const day = days.find((d) => d.date === inspectionDate);
    if (!day || !isSlotAvailable(day, slot as BookingSlot)) {
      return NextResponse.json(
        { error: "That slot is no longer available. Please choose another." },
        { status: 409 }
      );
    }

    const db = getDb();
    let booking;
    try {
      [booking] = await db
        .insert(bookings)
        .values({
          inspectionDate,
          slot,
          status: "confirmed",
          ...customer,
        })
        .returning();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("unique") || message.includes("duplicate")) {
        return NextResponse.json(
          { error: "That slot was just booked. Please choose another." },
          { status: 409 }
        );
      }
      throw err;
    }

    const emailResults = await Promise.all([
      sendCustomerConfirmation(booking),
      sendStaffNewBookingAlert(booking),
    ]);

    const emailWarnings = emailResults
      .filter((r) => !r.ok)
      .map((r) => (!r.ok ? r.error : ""));

    return NextResponse.json({
      booking,
      emailWarnings: emailWarnings.length ? emailWarnings : undefined,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Unable to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(bookings)
      .orderBy(bookings.inspectionDate);
    return NextResponse.json({ bookings: rows });
  } catch (error) {
    console.error("List bookings error:", error);
    return NextResponse.json(
      { error: "Unable to load bookings" },
      { status: 500 }
    );
  }
}
