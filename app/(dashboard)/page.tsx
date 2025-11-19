import { redirect } from "next/navigation";
import { createClient, getAuthUser, getUserWorkspace, getWorkspacePlan } from "@/utils/supabase/server";
import Card from "@/components/Card";

export default async function DashboardPage() {
  const supabase = createClient();

  // 1. Fetch authenticated user (SSR)
  const user = await getAuthUser();
  if (!user) {
    redirect("/auth/login");
  }

  // 2. Fetch the user's workspace
  const workspaceMember = await getUserWorkspace();
  if (!workspaceMember) {
    redirect("/onboarding/create-workspace"); // Future onboarding step
  }

  // 3. Fetch the workspace subscription plan
  const plan = await getWorkspacePlan(); // "free", "pro", "agency"

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome back, {user.email}
      </h1>

      {/* Display current plan */}
      <div className="p-4 border rounded bg-gray-50">
        <p className="text-sm text-gray-700">
          <b>Current Plan:</b> {plan.toUpperCase()}
        </p>
      </div>

      {/* Example dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Active Clients">12</Card>
        <Card title="Ongoing Projects">8</Card>
        <Card title="Monthly Revenue">€24,500</Card>
      </div>
    </div>
  );
}
