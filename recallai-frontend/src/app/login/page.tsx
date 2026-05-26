"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, BrainCircuit, ShieldCheck } from "lucide-react";

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
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4 py-6">
      {/* ================= BACKGROUND ================= */}

      {/* BIG CENTER GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 blur-[140px] rounded-full" />

      {/* TOP SHAPE */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-primary/10 blur-[120px] rounded-full" />

      {/* BOTTOM SHAPE */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />

      {/* GRID */}
      <div
        className="
          absolute inset-0 opacity-[0.04]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:55px_55px]
        "
      />

      {/* FLOATING CARDS */}
      <div className="hidden lg:block absolute top-28 left-20 animate-pulse">
        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-background/70 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            <div>
              <p className="text-sm font-medium">AI Summary</p>
              <p className="text-xs text-foreground/50">Generated instantly</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-28 right-20 animate-pulse">
        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-background/70 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-primary" />
            </div>

            <div>
              <p className="text-sm font-medium">Smart Notes</p>
              <p className="text-xs text-foreground/50">Organized workspace</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOGIN CARD ================= */}

      <div
        className="
          relative z-10
          w-full max-w-md
          bg-background/70
          backdrop-blur-2xl
          border border-white/10
          shadow-2xl shadow-primary/10
          rounded-[30px]
          sm:rounded-[36px]
          p-6 sm:p-8
        "
      >
        {/* HEADER */}
        <div className="text-center mb-8 flex flex-col items-center">
          {/* LOGO FIX */}
          <div
            className="
              relative
              w-20 h-20 sm:w-24 sm:h-24
              flex items-center justify-center
              rounded-3xl
              bg-primary/10
              border border-primary/20
              shadow-lg shadow-primary/10
              mb-5
            "
          >
            <Image
              src="/recallai.png"
              alt="RecallAI Logo"
              fill
              priority
              className="object-contain p-3"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Welcome Back
          </h1>

          <p className="text-sm sm:text-[15px] text-foreground/60 mt-3 max-w-xs leading-relaxed">
            Sign in to continue to your RecallAI workspace
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* EMAIL */}
          <input
            className="
              w-full h-12 sm:h-14
              px-4
              rounded-2xl
              bg-background/60
              border border-white/10
              text-sm sm:text-[15px]
              outline-none
              transition
              placeholder:text-foreground/40
              focus:border-primary/40
              focus:ring-4 focus:ring-primary/10
            "
            placeholder="Email address"
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
              text-sm sm:text-[15px]
              outline-none
              transition
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
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full h-12 sm:h-14
              rounded-2xl
              bg-primary
              text-primary-foreground
              hover:bg-primary/90
              shadow-xl shadow-primary/20
              font-semibold
              text-sm sm:text-[15px]
              transition
              disabled:opacity-70
            "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center flex-wrap">
          <p className="text-sm text-foreground/60">Don’t have an account?</p>

          <Link
            href="/register"
            className="
              text-sm
              font-semibold
              text-primary
              hover:opacity-80
              transition
            "
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
