"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import API_BASE_URL from "@/lib/api";

export default function NotesList({ activeNoteId, setActiveNoteId }: any) {
  const [notes, setNotes] = useState<any[]>([]);

  async function fetchNotes() {
    const res = await fetch(`${API_BASE_URL}/api/Notes`);
    const data = await res.json();

    const sorted = data.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    setNotes(sorted);
  }

  async function createNote() {
    const res = await fetch(`${API_BASE_URL}/api/Notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Untitled", content: "" }),
    });

    const newNote = await res.json();
    await fetchNotes();
    setActiveNoteId(newNote.id);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between p-3">
        <p className="font-semibold text-gray-700">Notes</p>

        <button
          onClick={createNote}
          className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {notes.map((n) => (
          <div
            key={n.id}
            onClick={() => setActiveNoteId(n.id)}
            className={`p-3 rounded-xl cursor-pointer border transition ${
              activeNoteId === n.id
                ? "bg-amber-100 border-amber-300"
                : "hover:bg-gray-100 border-transparent"
            }`}
          >
            <p className="font-medium text-sm truncate">{n.title}</p>
            <p className="text-xs text-gray-500 truncate">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
