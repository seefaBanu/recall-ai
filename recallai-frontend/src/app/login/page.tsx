"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-md
          bg-white/80 backdrop-blur-xl
          border border-white/40
          shadow-2xl shadow-black/5
          rounded-[32px]
          p-8
        "
      >
        {/* LOGO */}
        <div className="flex items-center justify-center mb-8">
          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-amber-400 to-yellow-500
              flex items-center justify-center
              shadow-lg
            "
          >
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to RecallAI
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* EMAIL */}
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              className="
                w-full h-12 pl-11 pr-4
                rounded-2xl
                border border-gray-200
                bg-white
                outline-none
                transition-all
                focus:ring-4 focus:ring-amber-100
                focus:border-amber-400
              "
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              className="
                w-full h-12 pl-11 pr-4
                rounded-2xl
                border border-gray-200
                bg-white
                outline-none
                transition-all
                focus:ring-4 focus:ring-amber-100
                focus:border-amber-400
              "
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="
                text-sm text-red-500
                bg-red-50
                border border-red-100
                rounded-xl
                px-3 py-2
              "
            >
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full h-12
              rounded-2xl
              bg-gradient-to-r from-amber-400 to-yellow-500
              hover:from-amber-500 hover:to-yellow-500
              text-white font-semibold
              transition-all
              shadow-lg shadow-amber-200/50
              disabled:opacity-50
              flex items-center justify-center gap-2
            "
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">Don’t have an account?</p>

          <button
            onClick={() => router.push("/register")}
            className="
              text-sm font-medium
              text-amber-600 hover:text-amber-700
              transition
            "
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
