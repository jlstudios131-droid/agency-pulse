import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/clients">Clientes</Link>
        <Link href="/dashboard/projects">Projetos</Link>
        <Link href="/dashboard/settings">Configurações</Link>
      </nav>
    </aside>
  );
}
