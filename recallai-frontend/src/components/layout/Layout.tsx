"use client";

import { LogOut, UserCircle2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* TOP BAR */}
      <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">RecallAI</h1>
          <p className="text-xs text-gray-400">AI Productivity Companion</p>
        </div>

        {session ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100"
            >
              <UserCircle2 className="w-6 h-6" />
              <span className="text-sm">{session.user?.email}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 flex gap-2"
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
      </header>

      <main>{children}</main>
    </div>
  );
}
