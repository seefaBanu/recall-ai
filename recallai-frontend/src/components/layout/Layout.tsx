"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Moon, Sun, LogOut, UserCircle2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Layout({ children }: any) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

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

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <button
              onClick={() => setDark(!dark)}
              className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 border flex items-center justify-center"
            >
              {dark ? <Sun /> : <Moon />}
            </button>

            {/* USER MENU */}
            {status === "loading" ? null : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <UserCircle2 className="w-5 h-5 text-gray-700 dark:text-white" />
                  <span className="text-sm text-gray-700 dark:text-white">
                    {session.user.email}
                  </span>
                </button>

                {/* DROPDOWN */}
                {open && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#111] border dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="px-3 py-2 text-xs text-gray-500 border-b dark:border-white/10">
                      Signed in as
                      <div className="text-gray-800 dark:text-white truncate">
                        {session.user.email}
                      </div>
                    </div>

                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full px-3 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Not signed in</div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3">{children}</main>
    </div>
  );
}
