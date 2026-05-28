import API_BASE_URL from "@/lib/api";

export async function getSummary(
  type: string,
  token: string,
  query?: string
) {
  const url = query
    ? `${API_BASE_URL}/api/Summary/${type}?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/api/Summary/${type}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.text();
}