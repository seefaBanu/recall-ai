"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/services/notes.service";
import useAuth from "./useAuth";

export default function useNotes() {
  const { token, user, loading } = useAuth();

  const [notes, setNotes] = useState<any[]>([]);

  async function load() {
    // PREVENT EMPTY USER CALL
    if (!user?.email) return;

    const data = await getNotes(user.email);

    setNotes(data);
  }

  useEffect(() => {
    if (!loading && user?.email) {
      load();
    }
  }, [loading, user]);

  return { notes, reload: load };
}