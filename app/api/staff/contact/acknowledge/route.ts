import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { getStaffSession } from "@/lib/auth/session";

const bodySchema = z.object({
  messageId: z.string().uuid(),
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
      .update(contactMessages)
      .set({ acknowledgedAt: new Date() })
      .where(eq(contactMessages.id, parsed.data.messageId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ message: updated });
  } catch (error) {
    console.error("Contact acknowledge error:", error);
    return NextResponse.json(
      { error: "Unable to acknowledge message" },
      { status: 500 },
    );
  }
}
