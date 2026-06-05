import { NextResponse } from "next/server";
import { clearStaffSessionCookie } from "@/lib/auth/session";

export async function POST() {
  await clearStaffSessionCookie();
  return NextResponse.json({ ok: true });
}
