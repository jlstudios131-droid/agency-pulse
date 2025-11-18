"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSent(true);
    } catch (err) {
      setErrorMsg("Unexpected error, try again.");
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

        {errorMsg && (
          <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
        )}

        {sent ? (
          <p className="text-green-600 text-sm">
            If this email exists, a reset link was sent.
          </p>
        ) : (
          <>
            <input
              type="email"
              className="w-full border p-3 rounded mb-3"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-black text-white p-3 rounded"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </>
        )}
      </form>
    </div>
  );
        }
