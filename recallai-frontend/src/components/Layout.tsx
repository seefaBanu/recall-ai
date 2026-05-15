"use client";

import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { BrainCircuit, Moon, Sun } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAF9]
        dark:bg-[#0B0B0F]
        transition-colors
      "
    >
      {/* TOP BAR (Notion + Apple hybrid) */}
      <header
        className="
          sticky top-0 z-50
          backdrop-blur-xl
          bg-white/70 dark:bg-black/40
          border-b border-amber-100 dark:border-white/10
        "
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-10 h-10
                rounded-2xl
                bg-gradient-to-br
                from-amber-400
                to-yellow-500
                flex items-center justify-center
                shadow-md
              "
            >
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>

            <div className="leading-tight">
              <h1 className="font-bold text-gray-800 dark:text-white">
                RecallAI
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI Productivity Companion
              </p>
            </div>
          </div>

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center gap-3">
            {/* STATUS BADGE */}
            <div
              className="
                hidden md:flex
                px-3 py-1
                rounded-full
                bg-amber-50 dark:bg-white/10
                border border-amber-100 dark:border-white/10
                text-xs text-gray-600 dark:text-gray-300
              "
            >
              AI Workspace
            </div>

            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setDark(!dark)}
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-xl
                bg-white dark:bg-white/10
                border border-amber-100 dark:border-white/10
                hover:scale-105
                transition
              "
            >
              {dark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
