"use client";

import { useState } from "react";
import { getSummary } from "@/services/summary.service";
import useAuth from "./useAuth";

export default function useSummary() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<any>({});

  async function generate(type: string, query?: string) {
    if (!token) return;

    setLoading(true);

    try {
      const data = await getSummary(type, token, query);

      setSummary((prev: any) => ({
        ...prev,
        [type]: data,
      }));
    } finally {
      setLoading(false);
    }
  }

  return { summary, loading, generate };
}