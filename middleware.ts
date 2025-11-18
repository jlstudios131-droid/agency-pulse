import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie created by Supabase Auth Helpers (HttpOnly + Secure)
const AUTH_COOKIE = "sb-access-token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  const { pathname } = req.nextUrl;

  const isAuthenticated = Boolean(token);

  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  const isProtected = pathname.startsWith("/dashboard");

  // If authenticated → block access to login/signup
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If NOT authenticated → protect dashboard and private pages
  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/dashboard/:path*",
  ],
};
