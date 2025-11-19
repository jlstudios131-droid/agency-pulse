"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/workspaces/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erro ao criar workspace.");
      setLoading(false);
      return;
    }

    // Redirect para o workspace criado
    router.push(`/workspaces/${data.workspace.id}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4 text-gray-900">
          Criar novo Workspace
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nome do Workspace
          </label>

          <input
            type="text"
            placeholder="Ex: Marketing Team"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "A criar..." : "Criar workspace"}
          </button>
        </form>
      </div>
    </div>
  );
          }
