import API_BASE_URL from "@/lib/api";
import { fetcher } from "@/lib/fetcher";

// =========================
// GET ALL NOTES
// =========================
export async function getNotes(token?: string) {
  const res = await fetch(`${API_BASE_URL}/api/Notes`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    return [];
  }

  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

// =========================
// GET SINGLE NOTE
// =========================
export async function getNote(id: number, token?: string) {
  const res = await fetch(`${API_BASE_URL}/api/Notes/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) return null;

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// =========================
// CREATE NOTE
// =========================
export async function createNote(data: any, token?: string) {
  const res = await fetch(`${API_BASE_URL}/api/Notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create note");

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// =========================
// UPDATE NOTE
// =========================
export async function updateNote(
  id: number,
  data: any,
  token?: string
) {
  const res = await fetch(`${API_BASE_URL}/api/Notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update note");

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}