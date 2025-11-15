"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      let result;

      if (type === "signup") {
        result = await supabase.auth.signUp({
          email,
          password
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password
        });
      }

      if (result.error) {
        setErrorMsg(result.error.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setErrorMsg("Ocorreu um erro inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">
        {type === "signup" ? "Criar Conta" : "Entrar"}
      </h2>

      {errorMsg && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <input
        type="email"
        placeholder="Seu email"
        className="border p-3 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="border p-3 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="p-3 bg-black text-white rounded">
        {type === "signup" ? "Criar conta" : "Entrar"}
      </button>
    </form>
  );
      }
