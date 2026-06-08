import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { sendStaffContactAlert } from "@/lib/email/brevo";

const bodySchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  phone: z.string().max(50).optional(),
  address: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your email and message." },
        { status: 400 },
      );
    }

    const db = getDb();
    const [message] = await db
      .insert(contactMessages)
      .values({
        email: parsed.data.email,
        message: parsed.data.message,
        phone: parsed.data.phone || null,
        address: parsed.data.address || null,
      })
      .returning();

    const emailResult = await sendStaffContactAlert(message);

    return NextResponse.json({
      message,
      emailWarning: !emailResult.ok ? emailResult.error : undefined,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again or call us." },
      { status: 500 },
    );
  }
}
