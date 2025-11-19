// app/api/clients/create/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();

    // Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    // Check workspace
    const { data: member } = await supabase
      .from("workspace_members")
      .select("workspace_id")
      .eq("user_id", user.id)
      .single();

    if (!member) {
      return NextResponse.json(
        { error: "Workspace not found." },
        { status: 404 }
      );
    }

    const workspaceId = member.workspace_id;

    // Read body (JSON)
    const { name, email, phone } = await req.json();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Client name is required." },
        { status: 400 }
      );
    }

    // Insert client
    const { error } = await supabase.from("clients").insert({
      name,
      email,
      phone,
      workspace_id: workspaceId,
    });

    if (error) {
      console.error("Client insert error:", error);
      return NextResponse.json(
        { error: "Could not create client." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Client create error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
        }
