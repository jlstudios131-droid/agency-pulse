import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function Navbar() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full border-b bg-white p-4 flex justify-between items-center">
      <Link href="/" className="font-semibold text-lg">
        AgencyPulse
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/signup">Create Account</Link>
          </>
        ) : (
          <>
            <span className="text-gray-600 text-sm">{user.email}</span>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
      }
