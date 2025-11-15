"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const menu = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Clientes", href: "/dashboard/clients" },
    { label: "Projetos", href: "/dashboard/projects" },
    { label: "Configurações", href: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-6 flex flex-col justify-between">
      <nav className="flex flex-col gap-3">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded-md transition ${
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="text-red-600 hover:opacity-80 text-sm mt-10"
      >
        {loading ? "Saindo..." : "Sair"}
      </button>
    </aside>
  );
            }
