import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export function createClient() {
  return createServerComponentClient({ cookies });
}

// Fetch the authenticated user (server-side)
export async function getAuthUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Fetch the workspace of the authenticated user
export async function getUserWorkspace() {
  const supabase = createClient();
  const user = await getAuthUser();

  if (!user) return null;

  const { data: workspaceMember } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .single();

  return workspaceMember;
}

// Fetch the current subscription plan for the user's workspace
export async function getWorkspacePlan() {
  const supabase = createClient();
  const workspaceMember = await getUserWorkspace();

  if (!workspaceMember) return "free"; // default

  const { data } = await supabase
    .from("subscriptions")
    .select("plan_type")
    .eq("workspace_id", workspaceMember.workspace_id)
    .eq("is_active", true)
    .maybeSingle();

  return data?.plan_type ?? "free";
}
