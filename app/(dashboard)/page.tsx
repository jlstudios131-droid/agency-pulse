import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Card from "@/components/Card";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  // Secure SSR user fetch
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not authenticated → server redirect (no flicker)
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Welcome back, {user.email}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Active Clients">12</Card>
        <Card title="Ongoing Projects">8</Card>
        <Card title="Monthly Revenue">€24,500</Card>
      </div>
    </div>
  );
}
