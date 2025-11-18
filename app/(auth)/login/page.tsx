import { loginAction } from "./loginAction";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        action={loginAction}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-xl font-semibold mb-4">Sign in to your account</h1>

        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border p-3 rounded mb-4"
          placeholder="you@example.com"
        />

        <label className="text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border p-3 rounded mb-6"
          placeholder="••••••••"
        />

        {/* Error returned from loginAction (if any) */}
        {/* Server Actions return data only when NOT redirecting */}
        {/* We capture that using the experimental useFormStatus soon */}

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Sign In
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          <a className="underline" href="/auth/forgot-password">
            Forgot your password?
          </a>
        </p>
      </form>
    </div>
  );
      }
