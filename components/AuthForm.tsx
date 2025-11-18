"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const schema = z.object({
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long."),
});

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const validation = schema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMsg(validation.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      let result;

      if (type === "signup") {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) {
        setErrorMsg(result.error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
        {type === "signup" ? "Create Account" : "Sign In"}
      </h2>

      {errorMsg && (
        <p className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
          {errorMsg}
        </p>
      )}

      <input
        type="email"
        placeholder="Email address"
        className="border p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        className="p-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : type === "signup"
          ? "Create Account"
          : "Sign In"}
      </button>
    </form>
  );
      }
