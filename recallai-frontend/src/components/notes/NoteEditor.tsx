"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/lib/api";

export default function NoteEditor({ activeNoteId }: any) {
  const [note, setNote] = useState<any>(null);

  async function loadNote() {
    if (!activeNoteId) return;

    const res = await fetch(`${API_BASE_URL}/api/Notes/${activeNoteId}`);
    const data = await res.json();
    setNote(data);
  }

  async function updateNote(updated: any) {
    await fetch(`${API_BASE_URL}/api/Notes/${activeNoteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  }

  useEffect(() => {
    loadNote();
  }, [activeNoteId]);

  if (!activeNoteId) {
    return <div className="p-4 text-gray-400">Select a note</div>;
  }

  return (
    <div className="p-4 space-y-3">

      <input
        value={note?.title || ""}
        onChange={(e) => {
          const updated = { ...note, title: e.target.value };
          setNote(updated);
          updateNote(updated);
        }}
        className="w-full p-3 border rounded-xl"
      />

      <textarea
        value={note?.content || ""}
        onChange={(e) => {
          const updated = { ...note, content: e.target.value };
          setNote(updated);
          updateNote(updated);
        }}
        className="w-full h-[70vh] p-3 border rounded-xl"
      />
    </div>
  );
}