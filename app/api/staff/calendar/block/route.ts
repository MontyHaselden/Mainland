import { NextResponse } from "next/server";
import { z } from "zod";
import { getStaffSession } from "@/lib/auth/session";
import {
  blockFullDay,
  blockSlot,
  unblockFullDay,
  unblockSlot,
} from "@/lib/booking/blocks";
import { isPastDate } from "@/lib/booking/availability";
import { BOOKING_SLOTS } from "@/lib/booking/constants";

const bodySchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).min(1).optional(),
    action: z.enum(["block", "unblock"]),
    scope: z.enum(["morning", "afternoon", "full"]),
    note: z.string().max(500).optional(),
  })
  .refine((data) => data.date || (data.dates && data.dates.length > 0), {
    message: "Provide date or dates",
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

    const { date, dates, action, scope, note } = parsed.data;
    const targetDates = (dates ?? (date ? [date] : [])).filter(
      (d) => !isPastDate(d)
    );

    if (targetDates.length === 0) {
      return NextResponse.json(
        { error: "Cannot change availability for past dates." },
        { status: 400 }
      );
    }

    for (const targetDate of targetDates) {
      if (action === "block") {
        if (scope === "full") {
          await blockFullDay(targetDate, note);
        } else if (BOOKING_SLOTS.includes(scope)) {
          await blockSlot(targetDate, scope, note);
        }
      } else if (scope === "full") {
        await unblockFullDay(targetDate);
      } else if (BOOKING_SLOTS.includes(scope)) {
        await unblockSlot(targetDate, scope);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Staff calendar block error:", error);
    return NextResponse.json(
      { error: "Unable to update availability" },
      { status: 500 }
    );
  }
}
