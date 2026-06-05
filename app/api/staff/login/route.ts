import { NextResponse } from "next/server";
import { z } from "zod";
import { loginStaff } from "@/lib/auth/staff";
import { setStaffSessionCookie } from "@/lib/auth/session";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = await loginStaff(parsed.data.email, parsed.data.password);
    if (!token) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await setStaffSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Staff login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
