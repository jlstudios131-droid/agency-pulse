import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">AgencyPulse</h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Um dashboard moderno para agências monitorarem clientes, projetos e métricas — tudo em um só lugar.
      </p>
      <Link href="/login" className="px-6 py-3 bg-black text-white rounded">
        Entrar
      </Link>
    </main>
  );
}
