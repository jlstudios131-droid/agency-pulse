"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClientForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await fetch("/api/clients/create", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (!res.ok) {
      const { error } = await res.json();
      setErrorMsg(error || "Something went wrong.");
      return;
    }

    router.push("/dashboard/clients");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-xl border max-w-xl"
    >
      {errorMsg && (
        <p className="text-red-600 mb-3 text-sm">{errorMsg}</p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          className="border rounded p-3 w-full"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="border rounded p-3 w-full"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          className="border rounded p-3 w-full"
          placeholder="+1 555 555 5555"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        disabled={loading}
        className="px-4 py-3 bg-black text-white rounded w-full"
      >
        {loading ? "Saving..." : "Create Client"}
      </button>
    </form>
  );
      }
