import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getStaffSession } from "@/lib/auth/session";

const bodySchema = z.object({
  bookingId: z.string().uuid(),
});

export async function POST(request: Request) {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const db = getDb();
    const [updated] = await db
      .update(bookings)
      .set({ acknowledgedAt: new Date() })
      .where(eq(bookings.id, parsed.data.bookingId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking: updated });
  } catch (error) {
    console.error("Acknowledge error:", error);
    return NextResponse.json({ error: "Unable to acknowledge" }, { status: 500 });
  }
}
