import { getSession } from "next-auth/react";

export async function fetcher(url: string, options: any = {}) {
  const session = await getSession();

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-user-id": session?.user?.email || "",
      ...options.headers,
    },
  });
}