import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = createClient();

  // 1. Obter a sessão
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Não autenticado</div>;
  }

  // 2. Obter o workspace onde esse user é membro
  const { data: workspaceMember } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .single();

  // Caso não tenha workspace
  if (!workspaceMember) {
    return <div>Nenhum workspace associado.</div>;
  }

  // 3. Buscar os clientes desse workspace
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .eq("workspace_id", workspaceMember.workspace_id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <Link
          href="/clients/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Novo Cliente
        </Link>
      </div>

      {!clients || clients.length === 0 ? (
        <div className="text-gray-500">Nenhum cliente encontrado.</div>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="block p-4 border rounded hover:bg-gray-100"
            >
              <div className="font-semibold">{client.name}</div>
              {client.email && (
                <div className="text-sm text-gray-600">{client.email}</div>
              )}
              {client.phone && (
                <div className="text-sm text-gray-600">{client.phone}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
              }
