"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./loginAction";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        action={formAction}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-xl font-semibold mb-4">Sign in to your account</h1>

        {state.error && (
          <p className="text-red-600 text-sm mb-3">{state.error}</p>
        )}

        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border p-3 rounded mb-4"
          placeholder="you@example.com"
        />

        <label className="text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border p-3 rounded mb-6"
          placeholder="••••••••"
        />

        <SubmitButton />

        <p className="text-sm text-gray-600 mt-4 text-center">
          <a className="underline" href="/auth/forgot-password">
            Forgot your password?
          </a>
        </p>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white p-3 rounded disabled:opacity-40"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}
