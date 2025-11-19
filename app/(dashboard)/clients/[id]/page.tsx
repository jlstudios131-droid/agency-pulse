import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ClientDetails({ params }: { params: { id: string } }) {
  const supabase = createClient();

  // 1. Obter o usuário autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Não autenticado</div>;

  // 2. Obter o workspace do user
  const { data: workspaceMember } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .single();

  if (!workspaceMember) {
    return <div>Nenhum workspace encontrado.</div>;
  }

  // 3. Buscar o cliente específico
  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", params.id)
    .eq("workspace_id", workspaceMember.workspace_id)
    .single();

  if (error || !client) {
    return <div>Cliente não encontrado.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{client.name}</h1>

        <Link
          href={`/clients/${client.id}/edit`}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Editar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card: Informações do Cliente */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Informações</h2>

          <div className="space-y-2 text-gray-700">
            {client.email && <p><b>Email:</b> {client.email}</p>}
            {client.phone && <p><b>Telefone:</b> {client.phone}</p>}
            {client.company && <p><b>Empresa:</b> {client.company}</p>}
            {client.website && <p><b>Website:</b> {client.website}</p>}
          </div>
        </div>

        {/* Card: Notas */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Notas</h2>
          <p className="text-gray-600">
            Aqui futuramente iremos adicionar: notas internas, histórico, atividade, etc.
          </p>
        </div>

        {/* Card: Projetos associados */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Projetos</h2>
          <p className="text-gray-600">
            Nesta secção iremos listar projetos associados ao cliente.
          </p>
        </div>

        {/* Card: Faturas / Finanças */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Faturas & Pagamentos</h2>
          <p className="text-gray-600">
            Aqui futuramente adicionaremos o módulo financeiro.
          </p>
        </div>

      </div>
    </div>
  );
    }
