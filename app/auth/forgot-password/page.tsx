"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-reset-email", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setStatus("If this email exists, a reset link has been sent.");
    } catch (error) {
      setStatus("Unexpected error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-xl font-semibold mb-3">Reset Password</h1>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email and we'll send you a reset link.
        </p>

        {status && (
          <p className="text-sm mb-3 text-blue-600">{status}</p>
        )}

        <input
          type="email"
          className="w-full border p-3 rounded mb-3"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded disabled:opacity-40"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
        }
