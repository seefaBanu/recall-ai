"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Check, X, Plus, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

interface Note {
  id: number;
  title: string;
  content: string;
}
import API_BASE_URL from "@/lib/api";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [loading, setLoading] = useState(false);

  async function fetchNotes() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/Notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function createNote() {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      await fetch(`${API_BASE_URL}/api/Notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      setTitle("");
      setContent("");
      fetchNotes();
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id: number) {
    await fetch(`${API_BASE_URL}/api/Notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    fetchNotes();
  }

  function startEdit(note: Note) {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  async function updateNote(id: number) {
    if (!editTitle.trim() || !editContent.trim()) return;

    setLoading(true);

    try {
      await fetch(`${API_BASE_URL}/api/Notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      setEditingId(null);
      setEditTitle("");
      setEditContent("");
      fetchNotes();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <h2 className="text-3xl font-bold text-gray-900">Smart Notes</h2>
        </div>

        <p className="text-gray-500 mt-1">
          Capture ideas, tasks, and thoughts instantly
        </p>
      </div>

      {/* CREATE NOTE */}
      <div
        className="
          bg-white/70
          backdrop-blur-xl
          border border-white/40
          rounded-3xl
          p-5 md:p-6
          shadow-sm
          space-y-4
        "
      >
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            bg-white
            border border-gray-200
            rounded-2xl
            p-4
            outline-none
            focus:ring-2 focus:ring-amber-400
          "
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            w-full
            bg-white
            border border-gray-200
            rounded-2xl
            p-4
            h-32
            outline-none
            focus:ring-2 focus:ring-amber-400
          "
        />

        <button
          onClick={createNote}
          disabled={loading || !title.trim() || !content.trim()}
          className="
            flex items-center gap-2
            px-5 py-3
            rounded-2xl
            bg-amber-400
            text-black
            font-medium
            hover:bg-amber-500
            transition
            disabled:opacity-40
          "
        >
          <Plus className="w-5 h-5" />
          {loading ? "Creating..." : "Create Note"}
        </button>
      </div>

      {/* NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="
              bg-white/70
              backdrop-blur-xl
              border border-white/40
              rounded-3xl
              p-5
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            {editingId === note.id ? (
              <div className="space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="
                    w-full
                    border border-gray-200
                    rounded-2xl
                    p-3
                    focus:ring-2 focus:ring-amber-400
                    outline-none
                  "
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="
                    w-full
                    border border-gray-200
                    rounded-2xl
                    p-3
                    h-24
                    focus:ring-2 focus:ring-amber-400
                    outline-none
                  "
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => updateNote(note.id)}
                    className="flex-1 bg-amber-400 rounded-2xl h-11 flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-black" />
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-200 rounded-2xl h-11 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {note.title}
                  </h3>

                  <p className="text-gray-600 mt-2">{note.content}</p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => startEdit(note)}
                    className="
                      flex-1
                      bg-amber-100
                      rounded-2xl
                      h-11
                      flex items-center justify-center
                      hover:bg-amber-200
                      transition
                    "
                  >
                    <Pencil className="w-4 h-4 text-amber-700" />
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="
                      flex-1
                      bg-red-100
                      rounded-2xl
                      h-11
                      flex items-center justify-center
                      hover:bg-red-200
                      transition
                    "
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
