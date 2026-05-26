"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import API_BASE_URL from "@/lib/api";
import { useSession } from "next-auth/react";

export default function NotesList({ activeNoteId, setActiveNoteId }: any) {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<any[]>([]);

  const token = (session as any)?.accessToken;

  // =========================
  // FETCH NOTES
  // =========================
  async function fetchNotes() {
    try {
      if (!token) return;

      const res = await fetch(`${API_BASE_URL}/api/Notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.warn("Failed to fetch notes:", res.status);
        setNotes([]);
        return;
      }

      const text = await res.text();
      if (!text) {
        setNotes([]);
        return;
      }

      const data = JSON.parse(text);

      const sorted = data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setNotes(sorted);
    } catch (err) {
      console.error(err);
    }
  }

  // =========================
  // LOAD WHEN READY
  // =========================
  useEffect(() => {
    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status, token]);

  // reload after save/delete
  useEffect(() => {
    const handler = () => fetchNotes();
    window.addEventListener("notes-updated", handler);

    return () => window.removeEventListener("notes-updated", handler);
  }, [token]);

  // =========================
  // CREATE NOTE
  // =========================
  function createNote() {
    setActiveNoteId("draft");
  }

  // =========================
  // GROUPING
  // =========================
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

  // =========================
  // UI
  // =========================
  function renderNotes(list: any[]) {
    return list.map((n) => (
      <div
        key={n.id}
        onClick={() => setActiveNoteId(n.id)}
        className={`
          p-3 rounded-2xl cursor-pointer border mb-2 transition
          ${
            activeNoteId === n.id
              ? "bg-primary/20 border-primary"
              : "hover:bg-primary/10 border-transparent"
          }
        `}
      >
        <div className="font-medium truncate text-foreground">
          {n.title || "Untitled"}
        </div>
        <div className="text-xs text-foreground/60 truncate">
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
          <h2 className="font-semibold text-foreground">Notes</h2>
          <p className="text-xs text-foreground/50">Workspace</p>
        </div>

        <button
          onClick={createNote}
          className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* =========================
        SKELETON LOADING
    ========================= */}
      {status === "loading" && (
        <div className="space-y-3 pr-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-3 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
            >
              <div className="h-3 w-2/3 bg-gray-300/30 rounded mb-2" />
              <div className="h-2 w-full bg-gray-300/20 rounded mb-1" />
              <div className="h-2 w-4/5 bg-gray-300/20 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* =========================
        EMPTY STATE
    ========================= */}
      {status === "authenticated" && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-foreground/40">
          <p className="text-sm">No notes yet</p>
          <p className="text-xs">Click + to create your first note</p>
        </div>
      )}

      {/* =========================
        NOTES LIST
    ========================= */}
      {status === "authenticated" && notes.length > 0 && (
        <div className="flex-1 overflow-y-auto pr-2">
          {groupedNotes.today.length > 0 && (
            <section className="mb-5">
              <h3 className="text-xs text-foreground/50 mb-2">Today</h3>
              {renderNotes(groupedNotes.today)}
            </section>
          )}

          {groupedNotes.last7Days.length > 0 && (
            <section className="mb-5">
              <h3 className="text-xs text-foreground/50 mb-2">
                Previous 7 Days
              </h3>
              {renderNotes(groupedNotes.last7Days)}
            </section>
          )}

          {Object.entries(groupedNotes.monthly).map(([month, items]) => (
            <section key={month} className="mb-5">
              <h3 className="text-xs text-foreground/50 mb-2">{month}</h3>
              {renderNotes(items)}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
