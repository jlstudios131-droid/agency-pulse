import { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account — AgencyPulse",
  description: "Create your secure AgencyPulse account.",
};

export const dynamic = "force-static";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <AuthForm type="signup" />
      </div>
    </div>
  );
}
