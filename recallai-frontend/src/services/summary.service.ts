import API_BASE_URL from "@/lib/api";

export async function getSummary(type: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/api/Summary/${type}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return res.text();
}