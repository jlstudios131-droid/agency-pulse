import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Supabase client for client-side components.
 * Uses secure cookies automatically (HttpOnly + Secure).
 */
export function createSupabaseBrowserClient() {
  return createClientComponentClient({
    cookies: {
      get(name: string) {
        if (typeof document === "undefined") return null;
        const match = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? match[2] : null;
      },
    },
  });
}
