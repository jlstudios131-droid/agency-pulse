import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "sb-access-token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read Supabase auth token (HttpOnly, Secure)
  const accessToken = req.cookies.get(AUTH_COOKIE)?.value;
  const isAuthenticated = Boolean(accessToken);

  // Auth pages
  const isAuthPage =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup") ||
    pathname.startsWith("/auth/reset-password") ||
    pathname.startsWith("/auth/verify");

  // Protected app routes
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Logged users cannot access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Guests cannot access protected pages
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
    "/auth/verify",
    "/dashboard/:path*",
  ],
};
