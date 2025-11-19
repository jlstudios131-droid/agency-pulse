"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteClientButton({ clientId }: { clientId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteClient = async () => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    setLoading(true);

    const res = await fetch("/api/clients/delete", {
      method: "POST",
      body: JSON.stringify({ client_id: clientId }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      router.push("/clients");
    } else {
      alert("Error deleting client.");
    }
  };

  return (
    <button
      onClick={deleteClient}
      disabled={loading}
      className="bg-red-600 text-white px-3 py-2 rounded"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
