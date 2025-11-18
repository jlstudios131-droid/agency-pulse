import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Extract the token parameters from the URL fragment
  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");

  // If no tokens → redirect to login
  if (!access_token || !refresh_token) {
    return NextResponse.redirect("/auth/login");
  }

  const supabase = createRouteHandlerClient({ cookies });

  // Set the session in Supabase
  await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  // Redirect authenticated user to dashboard
  return NextResponse.redirect("/dashboard");
}
