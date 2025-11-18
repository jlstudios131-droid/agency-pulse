"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    setLoading(false);

    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-40"
      disabled={loading}
    >
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}
