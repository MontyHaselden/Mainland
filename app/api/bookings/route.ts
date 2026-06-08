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
  DECADES_BUILT,
  PROPERTY_TYPES,
  STOREY_OPTIONS,
} from "@/lib/booking/property-options";
import { evaluatePricing } from "@/lib/booking/pricing-engine";
import { getPricingRulesConfig } from "@/lib/booking/pricing-rules-queries";
import {
  sendCustomerBookingRequestReceived,
  sendStaffNewBookingAlert,
} from "@/lib/email/brevo";

const bodySchema = z.object({
  inspectionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.enum(BOOKING_SLOTS),
  customerName: z.string().min(2).max(255),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6).max(50),
  propertyAddress: z.string().min(5),
  propertySuburb: z.string().min(2).max(255),
  propertyCity: z.string().min(2).max(255),
  floorAreaSqm: z.number().int().positive().max(2000).nullable(),
  decadeBuilt: z.enum(DECADES_BUILT),
  propertyType: z.enum(PROPERTY_TYPES),
  storeys: z.enum(STOREY_OPTIONS),
  estimatedPrice: z.number().int().positive().nullable().optional(),
  reviewFlags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking details" },
        { status: 400 },
      );
    }

    const { inspectionDate, slot, reviewFlags, estimatedPrice, ...fields } =
      parsed.data;

    if (!isBookableWeekday(inspectionDate)) {
      return NextResponse.json(
        { error: "Inspections are available Monday to Saturday only." },
        { status: 400 },
      );
    }

    if (isPastDate(inspectionDate)) {
      return NextResponse.json(
        { error: "Cannot book a date in the past." },
        { status: 400 },
      );
    }

    const month = inspectionDate.slice(0, 7);
    const { days } = await getMonthAvailability(month);
    const day = days.find((d) => d.date === inspectionDate);
    if (!day || !isSlotAvailable(day, slot as BookingSlot)) {
      return NextResponse.json(
        { error: "That slot is no longer available. Please choose another." },
        { status: 409 },
      );
    }

    const rules = await getPricingRulesConfig();
    const evaluation = evaluatePricing(
      {
        floorAreaSqm: fields.floorAreaSqm,
        decadeBuilt: fields.decadeBuilt,
        propertyType: fields.propertyType,
        storeys: fields.storeys,
      },
      rules,
    );

    const db = getDb();
    let booking;
    try {
      [booking] = await db
        .insert(bookings)
        .values({
          inspectionDate,
          slot,
          status: "pending_review",
          ...fields,
          estimatedPrice: estimatedPrice ?? evaluation.estimatedPrice,
          reviewFlags: JSON.stringify(
            reviewFlags ?? evaluation.reviewFlags,
          ),
          notes: fields.notes ?? null,
        })
        .returning();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("unique") || message.includes("duplicate")) {
        return NextResponse.json(
          { error: "That slot was just booked. Please choose another." },
          { status: 409 },
        );
      }
      throw err;
    }

    const [staffEmailResult, customerEmailResult] = await Promise.all([
      sendStaffNewBookingAlert(booking),
      sendCustomerBookingRequestReceived(booking),
    ]);

    const emailWarnings = [
      !staffEmailResult.ok ? staffEmailResult.error : null,
      !customerEmailResult.ok ? customerEmailResult.error : null,
    ].filter(Boolean);

    return NextResponse.json({
      booking,
      emailWarning:
        emailWarnings.length > 0 ? emailWarnings.join("; ") : undefined,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Unable to create booking" },
      { status: 500 },
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
      { status: 500 },
    );
  }
}
