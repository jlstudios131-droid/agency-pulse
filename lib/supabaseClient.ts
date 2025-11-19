import { createClient } from "@supabase/supabase-js";

// Garantir que as variáveis existem
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente Supabase para uso no BROWSER (componentes "use client")
 */
export function createSupabaseBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Cliente Supabase para uso em Server Actions / Server Components
 */
export function createSupabaseServerClient(accessToken: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
