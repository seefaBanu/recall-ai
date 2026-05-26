"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Layout from "@/components/layout/Layout";
import NotesList from "@/components/notes/NotesList";
import NoteEditor from "@/components/notes/NoteEditor";
import SummaryPanel from "@/components/ai/SummaryPanel";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const [activeNoteId, setActiveNoteId] = useState<any>(null);
  const [aiOpen, setAiOpen] = useState(false);

  // 📱 MOBILE VIEW STATE
  const [mobileView, setMobileView] = useState<"list" | "editor" | "summary">(
    "list",
  );

  // AUTH REDIRECT
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Layout mobileView={mobileView} setMobileView={setMobileView}>
      <div className="h-[calc(100vh-5rem)] md:grid md:grid-cols-12 md:gap-3">
        {/* ================= MOBILE VIEW ================= */}

        <div className="md:hidden h-full relative">
          {/* NOTES LIST */}
          {mobileView === "list" && (
            <NotesList
              activeNoteId={activeNoteId}
              setActiveNoteId={(id: any) => {
                setActiveNoteId(id);
                setMobileView("editor");
              }}
            />
          )}

          {/* NOTE EDITOR */}
          {mobileView === "editor" && (
            <NoteEditor
              activeNoteId={activeNoteId}
              onBack={() => setMobileView("list")}
            />
          )}

          {/* SUMMARY PANEL */}
          {mobileView === "summary" && (
            <SummaryPanel
              aiOpen={true}
              setAiOpen={() => setMobileView("list")}
            />
          )}

          {/* ALWAYS MOUNT FLOATING BUTTON */}
          {mobileView !== "summary" && (
            <SummaryPanel
              aiOpen={false}
              setAiOpen={() => setMobileView("summary")}
            />
          )}
        </div>
        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden md:contents">
          {/* LEFT */}
          <div className="col-span-3 border-r border-foreground/10 pr-2 overflow-y-auto">
            <NotesList
              activeNoteId={activeNoteId}
              setActiveNoteId={setActiveNoteId}
            />
          </div>

          {/* MIDDLE */}
          <div
            className={`overflow-y-auto px-4 ${
              aiOpen ? "col-span-6" : "col-span-8"
            }`}
          >
            <NoteEditor activeNoteId={activeNoteId} />
          </div>

          {/* RIGHT */}
          <div
            className={`overflow-y-auto ${
              aiOpen
                ? "col-span-3 border-l border-foreground/10 pl-3"
                : "col-span-1 flex justify-center"
            }`}
          >
            <SummaryPanel aiOpen={aiOpen} setAiOpen={setAiOpen} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
