"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Moon, Sun } from "lucide-react";

export default function Layout({ children }: any) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0B0B0F] transition-colors">
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/40 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="font-bold text-gray-800 dark:text-white">
                RecallAI
              </h1>
              <p className="text-xs text-gray-500">Workspace</p>
            </div>
          </div>

          {/* THEME */}
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 border flex items-center justify-center"
          >
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3">{children}</main>
    </div>
  );
}
