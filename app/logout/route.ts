import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("/login");

  // Remove Supabase cookies
  response.cookies.set("sb-access-token", "", { maxAge: 0 });
  response.cookies.set("sb-refresh-token", "", { maxAge: 0 });

  return response;
}
