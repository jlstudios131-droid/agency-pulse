export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      {children}
    </main>
  );
}
