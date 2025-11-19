"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const name = String(form.get("name"));
    const email = String(form.get("email"));
    const phone = String(form.get("phone"));

    const res = await fetch("/api/clients/create", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erro ao criar cliente");
      setLoading(false);
      return;
    }

    router.push("/clients");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Adicionar Novo Cliente</h1>

      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block font-semibold">Nome *</label>
          <input
            name="name"
            required
            className="w-full border rounded p-2"
            placeholder="Ex: João Dias"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded p-2"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <label className="block font-semibold">Telefone</label>
          <input
            name="phone"
            className="w-full border rounded p-2"
            placeholder="+244 999 999 999"
          />
        </div>

        <button
          disabled={loading}
          className="bg-black text-white p-2 rounded w-full"
        >
          {loading ? "A criar..." : "Criar Cliente"}
        </button>
      </form>
    </div>
  );
            }
