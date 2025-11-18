export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow border text-center">
        <h1 className="text-xl font-semibold mb-3">Verify your email</h1>

        <p className="text-gray-600 text-sm mb-4">
          We sent you a verification link.  
          Please check your inbox to activate your account.
        </p>

        <a
          href="/auth/login"
          className="text-sm underline text-gray-900"
        >
          Back to login
        </a>
      </div>
    </div>
  );
}
