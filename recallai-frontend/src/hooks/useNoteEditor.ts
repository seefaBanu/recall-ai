"use client";

import { useEffect, useState } from "react";
import { getNote, updateNote } from "@/services/notes.service";
import useAuth from "./useAuth";

export default function useNoteEditor(activeNoteId: number | null) {
  const { token, loading } = useAuth();
  const [note, setNote] = useState<any>(null);

  // =========================
  // LOAD NOTE
  // =========================
  async function load() {
    if (!activeNoteId) return;
    if (!token) return;

    try {
      const data = await getNote(activeNoteId, token);
      setNote(data);
    } catch (err) {
      console.error("Failed to load note:", err);
    }
  }

  // =========================
  // SAVE NOTE
  // =========================
  async function save(updated: any) {
    if (!activeNoteId) return;
    if (!token) return;

    try {
      await updateNote(activeNoteId, updated, token);

      // optional: notify list to refresh
      window.dispatchEvent(new Event("notes-updated"));
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  }

  // =========================
  // RELOAD WHEN READY
  // =========================
  useEffect(() => {
    if (!loading && token && activeNoteId) {
      load();
    }
  }, [activeNoteId, token, loading]);

  return { note, setNote, save };
}