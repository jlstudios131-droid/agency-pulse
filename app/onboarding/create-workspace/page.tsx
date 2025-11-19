"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!workspaceName.trim()) {
      setErrorMsg("Workspace name is required.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/workspaces/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: workspaceName }),
    });

    const json = await res.json();

    if (!res.ok) {
      setErrorMsg(json.error || "Unexpected error.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-xl font-bold mb-3">Create your workspace</h1>
        <p className="text-sm text-gray-600 mb-4">
          This will be the main workspace where you organize clients, projects, and your team.
        </p>

        {errorMsg && <p className="text-red-600 text-sm mb-2">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Workspace name"
          className="w-full border p-3 rounded mb-3"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Creating..." : "Create Workspace"}
        </button>
      </form>
    </div>
  );
      }
