import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getStaffSession } from "@/lib/auth/session";
import {
  DECADES_BUILT,
  PROPERTY_TYPES,
  STOREY_OPTIONS,
} from "@/lib/booking/property-options";
import { evaluatePricing } from "@/lib/booking/pricing-engine";
import { getPricingRulesConfig } from "@/lib/booking/pricing-rules-queries";
import { sendCustomerConfirmation } from "@/lib/email/brevo";

const updateSchema = z.object({
  action: z
    .enum([
      "confirm_price",
      "confirm_booking",
      "complete",
      "cancel",
      "save",
    ])
    .optional(),
  status: z
    .enum([
      "pending_review",
      "price_confirmed",
      "booking_confirmed",
      "completed",
      "cancelled",
      "confirmed",
    ])
    .optional(),
  adminFloorAreaSqm: z.number().int().positive().max(2000).nullable().optional(),
  adminDecadeBuilt: z.enum(DECADES_BUILT).optional(),
  adminPropertyType: z.enum(PROPERTY_TYPES).optional(),
  adminStoreys: z.enum(STOREY_OPTIONS).optional(),
  finalPrice: z.number().int().positive().nullable().optional(),
  adminNotes: z.string().nullable().optional(),
  reviewFlags: z.array(z.string()).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

function resolveAdminFloorAreaSqm(
  booking: typeof bookings.$inferSelect,
  override?: number | null,
): number | null {
  if (override !== undefined) return override;
  return (
    booking.adminFloorAreaSqm ??
    booking.exactFloorAreaSqm ??
    booking.floorAreaSqm
  );
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const json = await request.json();
    const parsed = updateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const db = getDb();
    const [existing] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const data = parsed.data;
    const updates: Record<string, unknown> = {};

    if (data.adminFloorAreaSqm !== undefined) {
      updates.adminFloorAreaSqm = data.adminFloorAreaSqm;
    }
    if (data.adminDecadeBuilt !== undefined) {
      updates.adminDecadeBuilt = data.adminDecadeBuilt;
    }
    if (data.adminPropertyType !== undefined) {
      updates.adminPropertyType = data.adminPropertyType;
    }
    if (data.adminStoreys !== undefined) {
      updates.adminStoreys = data.adminStoreys;
    }
    if (data.finalPrice !== undefined) {
      updates.finalPrice = data.finalPrice;
    }
    if (data.adminNotes !== undefined) {
      updates.adminNotes = data.adminNotes;
    }
    if (data.reviewFlags !== undefined) {
      updates.reviewFlags = JSON.stringify(data.reviewFlags);
    }

    const shouldRecalculate =
      data.adminFloorAreaSqm !== undefined ||
      data.adminDecadeBuilt !== undefined ||
      data.adminPropertyType !== undefined ||
      data.adminStoreys !== undefined;

    if (shouldRecalculate && data.finalPrice === undefined) {
      const rules = await getPricingRulesConfig();
      const evaluation = evaluatePricing(
        {
          floorAreaSqm: resolveAdminFloorAreaSqm(existing, data.adminFloorAreaSqm),
          decadeBuilt:
            (data.adminDecadeBuilt ??
              existing.adminDecadeBuilt ??
              existing.decadeBuilt ??
              "Unsure") as (typeof DECADES_BUILT)[number],
          propertyType:
            (data.adminPropertyType ??
              existing.adminPropertyType ??
              existing.propertyType ??
              "Other") as (typeof PROPERTY_TYPES)[number],
          storeys:
            (data.adminStoreys ??
              existing.adminStoreys ??
              existing.storeys ??
              "Unsure") as (typeof STOREY_OPTIONS)[number],
        },
        rules,
      );
      updates.estimatedPrice = evaluation.estimatedPrice;
      if (data.reviewFlags === undefined) {
        updates.reviewFlags = JSON.stringify(evaluation.reviewFlags);
      }
    }

    switch (data.action) {
      case "confirm_price":
        updates.status = "price_confirmed";
        break;
      case "confirm_booking":
        updates.status = "booking_confirmed";
        updates.acknowledgedAt = new Date();
        break;
      case "complete":
        updates.status = "completed";
        break;
      case "cancel":
        updates.status = "cancelled";
        break;
      default:
        if (data.status) updates.status = data.status;
    }

    const [updated] = await db
      .update(bookings)
      .set(updates)
      .where(eq(bookings.id, id))
      .returning();

    if (
      data.action === "confirm_booking" &&
      updated.status === "booking_confirmed"
    ) {
      await sendCustomerConfirmation(updated);
    }

    return NextResponse.json({ booking: updated });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Unable to update booking" },
      { status: 500 },
    );
  }
}
