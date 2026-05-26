"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import API_BASE_URL from "@/lib/api";
import { Sparkles, Shield, Brain } from "lucide-react";

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
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4 py-6">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* glow */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[140px] rounded-full" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full" />

        {/* grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:55px_55px]" />
      </div>

      {/* ================= CARD ================= */}
      <div
        className="
          relative z-10
          w-full max-w-md
          bg-background/70
          backdrop-blur-2xl
          border border-white/10
          shadow-2xl shadow-primary/10
          rounded-[32px]
          p-6 sm:p-8
        "
      >
        {/* ================= HEADER ================= */}
        <div className="text-center mb-8 flex flex-col items-center">
          {/* LOGO FIX (VISIBLE ON ALL SCREENS) */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
            <Image
              src="/recallai.png"
              alt="RecallAI Logo"
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to RecallAI
          </h1>

          <p className="text-sm sm:text-[15px] text-foreground/60 mt-2 max-w-xs">
            Start your intelligent workspace
          </p>
        </div>

        {/* ================= FORM ================= */}
        <div className="space-y-4">
          {/* EMAIL */}
          <input
            className="
              w-full h-12 sm:h-14
              px-4
              rounded-2xl
              bg-background/60
              border border-white/10
              text-sm
              outline-none
              placeholder:text-foreground/40
              focus:border-primary/40
              focus:ring-4 focus:ring-primary/10
            "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            className="
              w-full h-12 sm:h-14
              px-4
              rounded-2xl
              bg-background/60
              border border-white/10
              text-sm
              outline-none
              placeholder:text-foreground/40
              focus:border-primary/40
              focus:ring-4 focus:ring-primary/10
            "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ERROR */}
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="
              w-full h-12 sm:h-14
              rounded-2xl
              bg-primary
              text-primary-foreground
              font-semibold
              shadow-xl shadow-primary/20
              hover:opacity-90
              transition
              disabled:opacity-60
            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        {/* ================= FEATURES (MOBILE FRIENDLY) ================= */}

        {/* ================= FOOTER ================= */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          <p className="text-sm text-foreground/60">Already have an account?</p>

          <Link
            href="/login"
            className="text-sm font-semibold text-primary hover:opacity-80 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
