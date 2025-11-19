"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Criar o cliente supabase no lado do browser
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    router.push("/auth/login");

    setLoading(false);
  };

  return (
    <header className="w-full flex items-center justify-between bg-white border-b p-4 shadow-sm">
      <h1 className="text-xl font-bold">AgencyPulse</h1>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Saindo..." : "Logout"}
      </button>
    </header>
  );
}
