import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "mainland_staff_session";

async function verifyToken(token: string): Promise<boolean> {
  const secret = process.env.STAFF_SESSION_SECRET;
  if (!secret || secret.length < 32) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/staff")) {
    return NextResponse.next();
  }

  if (pathname === "/staff/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    const login = new URL("/staff/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/staff/:path*"],
};
