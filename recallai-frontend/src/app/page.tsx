"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import SummaryPanel from "@/components/SummaryPanel";

export default function Home() {
  const [activeNoteId, setActiveNoteId] = useState<any>(null);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <Layout>
      <div className="h-[calc(100vh-5rem)] grid grid-cols-12 gap-3 transition-all duration-300">
        {/* LEFT */}
        <div className="col-span-3 border-r border-gray-200 pr-2 overflow-y-auto">
          <NotesList
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
          />
        </div>

        {/* MIDDLE (DYNAMIC WIDTH) */}
        <div
          className={`
            overflow-y-auto px-4 transition-all duration-300
            ${aiOpen ? "col-span-6" : "col-span-8"}
          `}
        >
          <NoteEditor activeNoteId={activeNoteId} />
        </div>

        {/* RIGHT AI PANEL (DYNAMIC WIDTH) */}
        <div
          className={`
            overflow-y-auto border-l border-gray-200 pl-3
            transition-all duration-300
            ${aiOpen ? "col-span-3" : "col-span-1"}
          `}
        >
          <SummaryPanel
            activeNoteId={activeNoteId}
            aiOpen={aiOpen}
            setAiOpen={setAiOpen}
          />
        </div>
      </div>
    </Layout>
  );
}
