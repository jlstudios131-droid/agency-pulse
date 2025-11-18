"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signupAction } from "./signupAction";

const initialState = {
  error: "",
  success: false,
};

export default function SignupPage() {
  const [state, formAction] = useFormState(signupAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        action={formAction}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-xl font-semibold mb-4">Create your account</h1>

        {state.error && (
          <p className="text-red-600 text-sm mb-3">{state.error}</p>
        )}

        {state.success && (
          <p className="text-green-600 text-sm mb-3">
            Account created! Please check your email to verify your account.
          </p>
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
          minLength={6}
          className="w-full border p-3 rounded mb-6"
          placeholder="••••••••"
        />

        <SubmitButton />
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
      {pending ? "Creating account..." : "Create Account"}
    </button>
  );
      }
