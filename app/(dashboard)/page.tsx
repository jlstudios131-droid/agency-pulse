import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Card from "@/components/Card";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  // Load authenticated user from cookies (SSR)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // SSR redirect → no flash, no client flicker
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Welcome back, {session.user.email}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Active Clients">12</Card>
        <Card title="Ongoing Projects">8</Card>
        <Card title="Monthly Revenue">€24,500</Card>
      </div>
    </div>
  );
}
