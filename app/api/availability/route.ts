import { NextResponse } from "next/server";
import { z } from "zod";
import { getMonthAvailability } from "@/lib/booking/availability";

const querySchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      month: searchParams.get("month"),
    });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid month. Use YYYY-MM." },
        { status: 400 }
      );
    }

    const data = await getMonthAvailability(parsed.data.month);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json(
      { error: "Unable to load availability" },
      { status: 500 }
    );
  }
}
