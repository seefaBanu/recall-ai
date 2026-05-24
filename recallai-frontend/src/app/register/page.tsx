"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text);
        return;
      }

      router.push("/login");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#FAFAF9]">
      <div className="w-80 space-y-4 bg-white p-6 rounded-2xl shadow">
        <h1 className="text-xl font-semibold text-center">Create Account</h1>

        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-xl"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full
           bg-primary text-primary-foreground hover:bg-primary-600
            p-3
            rounded-xl
            font-medium
          "
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full text-sm text-gray-500"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}
