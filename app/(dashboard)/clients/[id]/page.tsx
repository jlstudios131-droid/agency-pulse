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
  const { data: workspaceMember, error: wsError } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .single();

  if (wsError || !workspaceMember) {
    return <div>Erro: nenhum workspace encontrado.</div>;
  }

  const workspaceId = workspaceMember.workspace_id;

  // 3. Buscar o cliente, verificando workspace
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", params.id)
    .eq("workspace_id", workspaceId) // Proteção importante
    .single();

  if (clientError || !client) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Cliente não encontrado ou você não tem acesso.
      </div>
    );
  }

  // 4. Renderização
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{client.name}</h1>

        <Link
          href={`/clients/${client.id}/edit`}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Editar
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card: Informações */}
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

        {/* Card: Projetos */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Projetos</h2>
          <p className="text-gray-600">
            Nesta secção iremos listar projetos associados ao cliente.
          </p>
        </div>

        {/* Card: Finanças */}
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
