import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Workspace name is required." }, { status: 400 });
    }

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Create workspace
    const { data: workspace, error: wsError } = await supabase
      .from("workspaces")
      .insert({
        name,
        owner_id: user.id,
      })
      .select()
      .single();

    if (wsError) {
      return NextResponse.json({ error: wsError.message }, { status: 400 });
    }

    // Add user as owner (workspace_members)
    const { error: memberError } = await supabase.from("workspace_members").insert({
      workspace_id: workspace.id,
      user_id: user.id,
      role: "owner",
    });

    if (memberError) {
      return NextResponse.json({ error: memberError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, workspace });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
      }
