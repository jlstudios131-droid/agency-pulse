import Card from "@/components/Card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Clientes ativos">12</Card>
      <Card title="Projetos em andamento">8</Card>
      <Card title="Receita mensal">€24.500</Card>
    </div>
  );
}
