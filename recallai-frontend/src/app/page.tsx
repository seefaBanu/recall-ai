"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Brain, Search, LayoutGrid, Zap, Moon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ================= TOP BAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-background/70">
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

          <div className="relative max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                <Image
                  src="/logo2.png"
                  alt="RecallAI Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>

              <div className="leading-tight">
                <h1 className="font-semibold text-foreground">RecallAI</h1>
                <p className="text-xs text-foreground/60">AI Note Workspace</p>
              </div>
            </div>

            {/* NAV */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
              <a href="#home" className="hover:text-primary transition">
                Home
              </a>

              <a href="#features" className="hover:text-primary transition">
                Features
              </a>

              <a href="#about" className="hover:text-primary transition">
                About
              </a>
            </nav>

            {/* BUTTON */}
            <Link
              href="/login"
              className="
                px-4 py-2 rounded-xl
                bg-primary text-primary-foreground
                hover:opacity-90 transition
                shadow-lg shadow-primary/20
                text-sm font-medium
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative max-w-6xl mx-auto px-4 pt-24 pb-20"
      >
        {/* BACKGROUND DECORATIONS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* BIG GLOW */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/20 blur-[160px] rounded-full" />

          {/* TOP LEFT SHAPE */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

          {/* TOP RIGHT SHAPE */}
          <div className="absolute top-32 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

          {/* BOTTOM SHAPE */}
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[140px]" />

          {/* GRID */}
          <div
            className="
              absolute inset-0
              opacity-[0.04]
              bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
              bg-[size:60px_60px]
            "
          />
        </div>

        <div className="relative text-center">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Smart Note Taking <br />
            Enhanced with AI
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/70 leading-8">
            RecallAI helps you write notes, organize ideas, and generate
            intelligent summaries with a clean AI-powered workspace built for
            productivity.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="
                px-6 py-3 rounded-2xl
                bg-primary text-primary-foreground
                font-medium shadow-xl shadow-primary/20
                hover:scale-[1.02] transition
              "
            >
              Start Free
            </Link>

            <Link
              href="/login"
              className="
                px-6 py-3 rounded-2xl
                border border-foreground/10
                bg-background/60 backdrop-blur-xl
                hover:bg-primary/10 transition
              "
            >
              Login
            </Link>
          </div>

          {/* APP PREVIEW */}
          <div className="mt-24 relative">
            <div
              className="
                max-w-5xl mx-auto
                rounded-[36px]
                border border-white/10
                bg-background/60
                backdrop-blur-2xl
                shadow-2xl shadow-primary/10
                overflow-hidden
              "
            >
              {/* TOP BAR */}
              <div className="h-14 border-b border-white/10 flex items-center px-5 gap-2 bg-background/40">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* CONTENT */}
              <div className="grid md:grid-cols-3 min-h-[420px]">
                {/* SIDEBAR */}
                <div className="border-r border-white/10 p-5 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`
                        p-4 rounded-2xl border
                        ${
                          i === 1
                            ? "bg-primary/15 border-primary/30"
                            : "bg-background/40 border-white/5"
                        }
                      `}
                    >
                      <div className="h-3 w-24 bg-foreground/20 rounded mb-2" />
                      <div className="h-2 w-full bg-foreground/10 rounded" />
                    </div>
                  ))}
                </div>

                {/* EDITOR */}
                <div className="md:col-span-2 p-8">
                  <div className="h-6 w-52 bg-foreground/20 rounded mb-6" />

                  <div className="space-y-4">
                    <div className="h-3 bg-foreground/10 rounded w-full" />
                    <div className="h-3 bg-foreground/10 rounded w-[90%]" />
                    <div className="h-3 bg-foreground/10 rounded w-[95%]" />
                    <div className="h-3 bg-foreground/10 rounded w-[80%]" />

                    <div className="pt-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 text-primary text-sm">
                        <Sparkles className="w-4 h-4" />
                        AI Summary Generated
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful AI Features
          </h2>

          <p className="mt-4 text-foreground/70">
            Everything you need to organize your ideas smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "AI Summaries",
              desc: "Generate daily, weekly and monthly intelligent summaries from your notes instantly.",
            },
            {
              icon: Brain,
              title: "Smart Memory",
              desc: "Recall important ideas faster with AI-powered note understanding.",
            },
            {
              icon: Search,
              title: "Instant Search",
              desc: "Search your thoughts like a personal knowledge engine.",
            },
            {
              icon: LayoutGrid,
              title: "Organized Workspace",
              desc: "Beautiful workspace for structured thinking and productivity.",
            },
            {
              icon: Zap,
              title: "Fast & Lightweight",
              desc: "Minimal, responsive and optimized for modern workflows.",
            },
            {
              icon: Moon,
              title: "Dark Mode",
              desc: "Elegant light and dark themes with customizable colors.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                p-6 rounded-3xl
                border border-white/10
                bg-background/60
                backdrop-blur-xl
                hover:border-primary/30
                hover:bg-primary/5
                transition
              "
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              <p className="text-sm text-foreground/70 leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="p-10 rounded-[40px] bg-primary/10 border border-primary/20 backdrop-blur-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for focused productivity
          </h2>

          <p className="text-foreground/70 leading-8 max-w-3xl mx-auto">
            RecallAI combines note-taking and AI-powered summaries into a clean,
            modern workspace that helps you stay organized and productive.
          </p>

          <div className="mt-8">
            <Link
              href="/register"
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-2xl
                bg-primary text-primary-foreground
                font-medium
                hover:scale-[1.02]
                transition
              "
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>© 2026 RecallAI. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-primary transition">
              Privacy
            </a>

            <a href="#" className="hover:text-primary transition">
              Terms
            </a>

            <a
              href="https://github.com"
              className="hover:text-primary transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
