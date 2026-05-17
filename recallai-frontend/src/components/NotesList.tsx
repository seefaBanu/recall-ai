"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import API_BASE_URL from "@/lib/api";

export default function NotesList({ activeNoteId, setActiveNoteId }: any) {
  const [notes, setNotes] = useState<any[]>([]);

  async function fetchNotes() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/Notes`);
      const data = await res.json();

      const sorted = data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setNotes(sorted);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchNotes();

    const handler = () => fetchNotes();
    window.addEventListener("notes-updated", handler);

    return () => window.removeEventListener("notes-updated", handler);
  }, []);

  // CREATE DRAFT ONLY (NO API CALL)
  function createNote() {
    setActiveNoteId("draft");
  }

  const groupedNotes = useMemo(() => {
    const today: any[] = [];
    const last7Days: any[] = [];
    const monthly: Record<string, any[]> = {};

    const now = new Date();

    notes.forEach((note) => {
      const created = new Date(note.createdAt);

      const diffDays =
        (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        today.push(note);
      } else if (diffDays <= 7) {
        last7Days.push(note);
      } else {
        const monthKey = created.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        if (!monthly[monthKey]) monthly[monthKey] = [];
        monthly[monthKey].push(note);
      }
    });

    return { today, last7Days, monthly };
  }, [notes]);

  function renderNotes(list: any[]) {
    return list.map((n) => (
      <div
        key={n.id}
        onClick={() => setActiveNoteId(n.id)}
        className={`
          p-3 rounded-2xl cursor-pointer border mb-2
          ${
            activeNoteId === n.id
              ? "bg-amber-100 border-amber-300"
              : "bg-white/60 hover:bg-white border-transparent"
          }
        `}
      >
        <div className="font-medium truncate">{n.title || "Untitled"}</div>
        <div className="text-xs text-gray-500 truncate">
          {n.content || "Empty"}
        </div>
      </div>
    ));
  }

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-gray-700">Notes</h2>
          <p className="text-xs text-gray-400">Workspace</p>
        </div>

        {/* NEW NOTE */}
        <button
          onClick={createNote}
          className="h-10 w-10 rounded-xl bg-amber-400 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto pr-2">
        {groupedNotes.today.length > 0 && (
          <section className="mb-5">
            <h3 className="text-xs text-gray-400 mb-2">Today</h3>
            {renderNotes(groupedNotes.today)}
          </section>
        )}

        {groupedNotes.last7Days.length > 0 && (
          <section className="mb-5">
            <h3 className="text-xs text-gray-400 mb-2">Previous 7 Days</h3>
            {renderNotes(groupedNotes.last7Days)}
          </section>
        )}

        {Object.entries(groupedNotes.monthly).map(([month, items]) => (
          <section key={month} className="mb-5">
            <h3 className="text-xs text-gray-400 mb-2">{month}</h3>
            {renderNotes(items)}
          </section>
        ))}
      </div>
    </div>
  );
}
