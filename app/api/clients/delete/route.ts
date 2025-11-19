import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const { client_id } = await req.json();

  if (!client_id) {
    return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
  }

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get user's workspace
  const { data: member } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .single();

  if (!member) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 403 });
  }

  // Check if client belongs to workspace
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("id", client_id)
    .eq("workspace_id", member.workspace_id)
    .single();

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  // Delete
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", client_id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
      }
