"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import API_BASE_URL from "@/lib/api";
import { useSession } from "next-auth/react";

export default function NoteEditor({ activeNoteId, onBack }: any) {
  const [note, setNote] = useState<any>(null);
  const saveTimeout = useRef<any>(null);
  const { data: session } = useSession();

  const token = (session as any)?.accessToken;

  // =========================
  // LOAD NOTE
  // =========================
  useEffect(() => {
    if (!activeNoteId) {
      setNote(null);
      return;
    }

    if (activeNoteId === "draft") {
      setNote({
        id: null,
        title: "",
        content: "",
        isDraft: true,
      });
      return;
    }

    async function load() {
      if (!token) return;

      try {
        setNote(null); // 🔥 triggers skeleton state

        const res = await fetch(`${API_BASE_URL}/api/Notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const found = data.find((n: any) => n.id === activeNoteId);

        setNote(found || null);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [activeNoteId, token]);

  // =========================
  // AUTO SAVE
  // =========================
  useEffect(() => {
    if (!note || !token) return;

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      try {
        const hasContent = note.title?.trim() || note.content?.trim();
        if (!hasContent) return;

        // CREATE
        if (note.isDraft && note.content.trim()) {
          const res = await fetch(`${API_BASE_URL}/api/Notes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: note.title || "Untitled",
              content: note.content,
            }),
          });

          if (!res.ok) return;

          const created = await res.json();

          setNote((prev: any) => ({
            ...prev,
            isDraft: false,
            id: created.id,
          }));

          window.dispatchEvent(new Event("notes-updated"));
          return;
        }

        // UPDATE
        if (!note.isDraft && note.id) {
          await fetch(`${API_BASE_URL}/api/Notes/${note.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: note.title,
              content: note.content,
            }),
          });
        }
      } catch (err) {
        console.error(err);
      }
    }, 800);

    return () => clearTimeout(saveTimeout.current);
  }, [note, token]);

  // =========================
  // DELETE
  // =========================
  async function deleteNote() {
    if (!note?.id || !token) return;

    await fetch(`${API_BASE_URL}/api/Notes/${note.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.dispatchEvent(new Event("notes-updated"));
    setNote(null);

    if (onBack) onBack();
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!activeNoteId) {
    return (
      <div className="h-full flex items-center justify-center text-foreground/40">
        Select a note
      </div>
    );
  }

  // =========================
  // SKELETON LOADING (PRO UX)
  // =========================
  if (activeNoteId && !note) {
    return (
      <div className="h-full flex flex-col animate-pulse space-y-4">
        <div className="h-6 w-24 bg-gray-300/30 rounded" />
        <div className="h-10 w-2/3 bg-gray-300/20 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-full bg-gray-300/20 rounded" />
          <div className="h-3 w-5/6 bg-gray-300/20 rounded" />
          <div className="h-3 w-4/6 bg-gray-300/20 rounded" />
        </div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="h-full flex flex-col">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        {/* BACK (mobile only) */}
        <button
          onClick={onBack}
          className="md:hidden flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* DELETE */}
        {!note.isDraft && (
          <button
            onClick={deleteNote}
            className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center hover:bg-red-200 transition"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        )}
      </div>

      {/* TITLE */}
      <input
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Untitled"
        className="text-3xl font-bold outline-none bg-transparent mb-4 text-foreground placeholder:text-foreground/30"
      />

      {/* CONTENT */}
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        placeholder="Start writing..."
        className="flex-1 resize-none outline-none bg-transparent text-foreground/80 placeholder:text-foreground/30 leading-6"
      />
    </div>
  );
}
