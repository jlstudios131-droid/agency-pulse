import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4 flex flex-col justify-between">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/clients">Clientes</Link>
        <Link href="/dashboard/projects">Projetos</Link>
        <Link href="/dashboard/settings">Configurações</Link>
      </nav>

      <a
        href="/logout"
        className="mt-10 text-red-600 underline text-sm"
      >
        Sair
      </a>
    </aside>
  );
}
