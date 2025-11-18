"use server";

import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function signupAction(
  prevState: { error: string; success: boolean },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation (security)
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email.", success: false };
  }

  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters.", success: false };
  }

  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message, success: false };
  }

  // User created successfully → must verify email
  return { error: "", success: true };
}
