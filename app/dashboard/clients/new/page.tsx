// app/dashboard/clients/new/page.tsx
import CreateClientForm from "@/components/clients/CreateClientForm";

export default function NewClientPage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">New Client</h1>
      <CreateClientForm />
    </div>
  );
}
