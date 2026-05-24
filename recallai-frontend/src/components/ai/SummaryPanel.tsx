"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import API_BASE_URL from "@/lib/api";

export default function SummaryPanel() {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState<any>({});
  const [active, setActive] = useState("daily");

  async function generate(type: string) {
    setActive(type);

    const res = await fetch(`${API_BASE_URL}/api/Summary/${type}`, {
      method: "POST",
    });

    const data = await res.text();

    setSummary((prev: any) => ({
      ...prev,
      [type]: data,
    }));
  }

  if (!open) {
    return (
      <div className="flex justify-end p-3">
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex justify-between mb-3">
        <p className="font-semibold">AI Summary</p>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="flex gap-2 mb-3">
        {["daily", "weekly", "monthly"].map((t) => (
          <button
            key={t}
            onClick={() => generate(t)}
            className={`px-2 py-1 text-xs rounded-lg ${
              active === t ? "bg-amber-100" : "bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto text-sm text-gray-700">
        {summary[active] || "Generate a summary"}
      </div>
    </div>
  );
}
