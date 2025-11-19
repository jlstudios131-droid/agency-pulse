import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function WorkspacePage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  // Garantir user SSR
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !workspace) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">
          Workspace não encontrado.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">{workspace.name}</h1>

      <p className="text-gray-700 mb-2">
        <strong>ID:</strong> {workspace.id}
      </p>

      <p className="text-gray-700">
        <strong>Criado em:</strong>{" "}
        {new Date(workspace.created_at).toLocaleString("pt-PT")}
      </p>
    </div>
  );
}
