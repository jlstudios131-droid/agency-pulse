import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email." },
        { status: 400 }
      );
    }

    // 🔥 Em breve: validar email na BD + gerar token + enviar email
    console.log("REQUEST: Password reset email sent to:", email);

    return NextResponse.json(
      { message: "If this email exists, a reset link has been sent." },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
