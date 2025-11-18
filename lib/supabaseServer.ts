import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Creates a Supabase client for server-side components (RSC + SSR).
 * Uses secure HttpOnly cookies automatically.
 */
export function createSupabaseServerClient() {
  return createServerComponentClient({
    cookies,
  });
}
