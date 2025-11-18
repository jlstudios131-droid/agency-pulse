import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supabase Auth cookies
const ACCESS_TOKEN = "sb-access-token";
const REFRESH_TOKEN = "sb-refresh-token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Tokens HttpOnly criados pelo Supabase
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;

  // Consideramos autenticado se tiver qualquer um desses
  const isAuthenticated = Boolean(accessToken || refreshToken);

  // Páginas públicas de autenticação
  const isAuthPage =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup") ||
    pathname.startsWith("/auth/reset-password") ||
    pathname.startsWith("/auth/verify") ||
    pathname.startsWith("/auth/logout");

  // Rotas protegidas do dashboard
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Usuários autenticados NÃO devem ver páginas de login, signup, etc.
  if (isAuthenticated && isAuthPage && !pathname.startsWith("/auth/logout")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Guests NÃO podem aceder rotas protegidas
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
    "/auth/logout",
    "/dashboard/:path*",
  ],
};
