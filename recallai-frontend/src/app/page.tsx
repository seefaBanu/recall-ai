"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Layout from "@/components/layout/Layout";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import SummaryPanel from "@/components/SummaryPanel";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeNoteId, setActiveNoteId] = useState<any>(null);
  const [aiOpen, setAiOpen] = useState(false);

  // ✅ SAFE REDIRECT (NO server redirect bug)
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
    <Layout>
      <div className="h-[calc(100vh-5rem)] grid grid-cols-12 gap-3">
        {/* LEFT */}
        <div className="col-span-3 border-r pr-2 overflow-y-auto">
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
              ? "col-span-3 border-l pl-3"
              : "col-span-1 flex justify-center"
          }`}
        >
          <SummaryPanel aiOpen={aiOpen} setAiOpen={setAiOpen} />
        </div>
      </div>
    </Layout>
  );
}
