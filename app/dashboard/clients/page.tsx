// app/dashboard/clients/page.tsx
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function ClientsPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="p-6">Redirecting...</div>;
  }

  const { data: member } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  const workspaceId = member?.workspace_id ?? null;

  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name, email, phone, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Clients fetch error:", error);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Link
          href="/dashboard/clients/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          New Client
        </Link>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clients) && clients.length > 0 ? (
              clients.map((c: any) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.email ?? "—"}</td>
                  <td className="px-4 py-3">{c.phone ?? "—"}</td>
                  <td className="px-4 py-3">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/clients/${c.id}`} className="text-sm mr-3 underline">View</Link>
                    <Link href={`/dashboard/clients/${c.id}/edit`} className="text-sm underline">Edit</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No clients yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
