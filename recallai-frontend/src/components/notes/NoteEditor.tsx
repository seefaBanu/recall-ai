"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import API_BASE_URL from "@/lib/api";
import { useSession } from "next-auth/react";
import NextAuth from "next-auth";

export default function NoteEditor({ activeNoteId }: any) {
  const [note, setNote] = useState<any>(null);
  const saveTimeout = useRef<any>(null);
  const { data: session } = useSession();

  // LOAD NOTE
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
      const res = await fetch(`${API_BASE_URL}/api/Notes`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!res.ok) {
        console.log("Failed to fetch notes", await res.text());
        return;
      }

      const data = await res.json();

      const found = data.find((n: any) => n.id === activeNoteId);
      setNote(found || null);
    }

    load();
  }, [activeNoteId]);

  // AUTO SAVE
  useEffect(() => {
    if (!note) return;

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      try {
        const hasContent = note.title.trim() || note.content.trim();

        if (!hasContent) return;

        // CREATE FIRST TIME
        if (note.isDraft && note.content.trim()) {
          const res = await fetch(`${API_BASE_URL}/api/Notes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
              title: note.title || "Untitled",
              content: note.content,
            }),
          });

          if (!res.ok) {
            console.error("Create note failed", await res.text());
            return;
          }

          const created = await res.json();
          setNote((prev: any) => ({
            ...prev,
            isDraft: false,
            id: created.id,
          }));

          window.dispatchEvent(new Event("notes-updated"));
          return;
        }

        // UPDATE EXISTING
        if (!note.isDraft && note.id) {
          await fetch(`${API_BASE_URL}/api/Notes/${note.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
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
  }, [note]);

  async function deleteNote() {
    if (!note?.id) return;

    await fetch(`${API_BASE_URL}/api/Notes/${note.id}`, {
      method: "DELETE",
    });

    window.dispatchEvent(new Event("notes-updated"));
    setNote(null);
  }

  if (!activeNoteId) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a note
      </div>
    );
  }

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* TOP */}
      <div className="flex justify-end mb-4">
        {!note.isDraft && (
          <button
            onClick={deleteNote}
            className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center"
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
        className="text-3xl font-bold outline-none bg-transparent mb-4"
      />

      {/* CONTENT */}
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        placeholder="Start writing..."
        className="flex-1 resize-none outline-none bg-transparent font-light text-text-primary"
      />
    </div>
  );
}
