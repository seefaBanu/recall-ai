"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Moon, Sun, LogOut, UserCircle2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Layout({ children }: any) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
        <div className="relative">
          {/* Teal glow background layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent" />

          <div className="relative max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                <Image
                  src="/logo2.png"
                  alt="RecallAI Logo"
                  width={30}
                  height={0}
                  className="object-contain"
                />{" "}
              </div>

              <div>
                <h1 className="font-semibold text-foreground">RecallAI</h1>
                <p className="text-xs text-foreground/60">Workspace</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              {/* THEME TOGGLE */}
              <button
                onClick={() => setDark(!dark)}
                className="w-10 h-10 rounded-xl bg-background/60 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary/10 transition"
              >
                {dark ? (
                  <Sun className="w-4 h-4 text-primary" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </button>

              {/* USER MENU */}
              {status === "loading" ? null : session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/60 border border-white/10 backdrop-blur-md hover:bg-primary/10 transition"
                  >
                    <UserCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">
                      {session.user.email}
                    </span>
                  </button>

                  {/* DROPDOWN */}
                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-background/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-3 py-2 text-xs text-foreground/60 border-b border-white/10">
                        Signed in as
                        <div className="text-foreground truncate">
                          {session.user.email}
                        </div>
                      </div>

                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-foreground/60">Not signed in</div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto p-3">{children}</main>
    </div>
  );
}
