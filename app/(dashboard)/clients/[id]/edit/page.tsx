"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/utils/supabase/client";

export default function EditClientPage({ params }: { params: { id: string } }) {
  const supabase = createBrowserClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    notes: "",
  });

  // Carregar dados do cliente
  useEffect(() => {
    const loadClient = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: member } = await supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("user_id", user.id)
        .single();

      if (!member) return;

      const { data } = await supabase
        .from("clients")
        .select("*")
        .eq("id", params.id)
        .eq("workspace_id", member.workspace_id)
        .single();

      if (data) {
        setClient(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          company: data.company || "",
          website: data.website || "",
          notes: data.notes || "",
        });
      }

      setLoading(false);
    };

    loadClient();
  }, []);

  const updateClient = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("clients")
      .update(form)
      .eq("id", params.id);

    setLoading(false);

    if (!error) {
      router.push(`/clients/${params.id}`);
    }
  };

  if (loading) return <p className="p-6">A carregar...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>

      <form onSubmit={updateClient} className="space-y-4">
        <div>
          <label className="block">Nome</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block">Email</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block">Telefone</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block">Empresa</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div>
          <label className="block">Website</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>

        <div>
          <label className="block">Notas</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "A guardar..." : "Guardar alterações"}
        </button>
      </form>
    </div>
  );
               }
