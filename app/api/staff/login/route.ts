import { NextResponse } from "next/server";
import { z } from "zod";
import { loginStaff } from "@/lib/auth/staff";
import {
  COOKIE_NAME,
  isStaffSessionSecretConfigured,
  staffSessionCookieOptions,
} from "@/lib/auth/session";

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

    if (!isStaffSessionSecretConfigured()) {
      console.error("Staff login error: STAFF_SESSION_SECRET is missing or too short");
      return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }

    const token = await loginStaff(parsed.data.email, parsed.data.password);
    if (!token) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, token, staffSessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Staff login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
