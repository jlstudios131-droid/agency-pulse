"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setStatus(error.message);
        setLoading(false);
        return;
      }

      setStatus("Password updated successfully.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setStatus("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-xl font-semibold mb-4">Set New Password</h1>

        {status && (
          <p className="text-sm mb-3 text-blue-600">{status}</p>
        )}

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-3 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded disabled:opacity-40"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
      }
