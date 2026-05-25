"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-6">
      {/* CARD */}
      <div
        className="
          w-full max-w-md
          bg-card/80
          backdrop-blur-2xl
          border border-white/10
          shadow-2xl
          rounded-[28px]
          sm:rounded-[32px]
          p-6 sm:p-8
        "
      >
        {/* HEADER */}
        <div className="text-center mb-8 flex flex-col items-center">
          {/* LOGO */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4">
            <Image
              src="/recallai.png"
              alt="RecallAI Logo"
              width={56}
              height={56}
              className="object-contain w-12 h-12 sm:w-14 sm:h-14"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Sign In
          </h1>

          <p className="text-sm sm:text-[15px] text-foreground/60 mt-2 max-w-xs leading-relaxed">
            Continue to your RecallAI workspace
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* EMAIL */}
          <input
            className="
              w-full h-12 sm:h-13
              px-4
              rounded-2xl
              bg-background/60
              border border-border
              text-sm sm:text-[15px]
              outline-none
              transition
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
              w-full h-12 sm:h-13
              px-4
              rounded-2xl
              bg-background/60
              border border-border
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

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full h-12 sm:h-13
              rounded-2xl
              bg-primary
              text-primary-foreground
              hover:bg-primary/90
              shadow-lg shadow-primary/20
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
