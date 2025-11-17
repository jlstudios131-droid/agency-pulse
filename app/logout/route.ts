import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL("/login", request.url); // cria URL absoluta

  const response = NextResponse.redirect(url.toString());

  // Remover cookies Supabase
  response.cookies.set("sb-access-token", "", { maxAge: 0 });
  response.cookies.set("sb-refresh-token", "", { maxAge: 0 });

  return response;
}
