"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to continue</p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            className="w-full h-12 px-4 rounded-2xl border"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full h-12 px-4 rounded-2xl border"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-amber-400 text-white font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">Don’t have an account?</p>

          {/* ✅ FIX: use Link */}
          <Link
            href="/register"
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
