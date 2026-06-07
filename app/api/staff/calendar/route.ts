import { NextResponse } from "next/server";
import { z } from "zod";
import { getStaffSession } from "@/lib/auth/session";
import {
  getStaffCalendarDay,
  getStaffCalendarMonth,
} from "@/lib/booking/staff-calendar";

const monthSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/),
});

const dateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET(request: Request) {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const date = searchParams.get("date");

    if (date) {
      const parsed = dateSchema.safeParse({ date });
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid date" }, { status: 400 });
      }
      const data = await getStaffCalendarDay(parsed.data.date);
      return NextResponse.json(data);
    }

    const parsed = monthSchema.safeParse({ month });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Provide month=YYYY-MM or date=YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const data = await getStaffCalendarMonth(parsed.data.month);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Staff calendar error:", error);
    return NextResponse.json(
      { error: "Unable to load calendar" },
      { status: 500 }
    );
  }
}
