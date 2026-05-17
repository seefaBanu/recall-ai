"use client";

import { useState } from "react";
import {
  Sparkles,
  CalendarDays,
  CalendarRange,
  Calendar,
  X,
} from "lucide-react";
import API_BASE_URL from "@/lib/api";

export default function SummaryPanel({ aiOpen, setAiOpen }: any) {
  const [summary, setSummary] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("daily");

  async function generate(type: string) {
    setLoading(true);
    setActive(type);

    try {
      const res = await fetch(`${API_BASE_URL}/api/Summary/${type}`, {
        method: "POST",
      });

      const data = await res.text();

      setSummary((prev: any) => ({
        ...prev,
        [type]: data,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // COLLAPSED STATE (ICON ONLY)
  if (!aiOpen) {
    return (
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setAiOpen(true)}
          className="
            w-10 h-10 rounded-xl
            bg-gradient-to-br from-amber-400 to-yellow-500
            flex items-center justify-center
            shadow-md hover:scale-105 transition
          "
        >
          <Sparkles className="w-5 h-5 text-white" />
        </button>
      </div>
    );
  }

  // EXPANDED STATE
  return (
    <div className="h-full flex flex-col bg-white/40 backdrop-blur-xl rounded-2xl p-3">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="font-semibold text-gray-800">AI Summary</h2>
        </div>

        <button
          onClick={() => setAiOpen(false)}
          className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* TYPE BUTTONS */}
      <div className="flex flex-col gap-2 mb-4 px-1">
        <button
          onClick={() => generate("daily")}
          className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
            active === "daily"
              ? "bg-amber-100 text-amber-700"
              : "bg-white/60 text-gray-600 hover:bg-white"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          Daily Summary
        </button>

        <button
          onClick={() => generate("weekly")}
          className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
            active === "weekly"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-white/60 text-gray-600 hover:bg-white"
          }`}
        >
          <CalendarRange className="w-4 h-4" />
          Weekly Summary
        </button>

        <button
          onClick={() => generate("monthly")}
          className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
            active === "monthly"
              ? "bg-orange-100 text-orange-700"
              : "bg-white/60 text-gray-600 hover:bg-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Monthly Summary
        </button>
      </div>

      {/* OUTPUT */}
      <div className="flex-1 overflow-y-auto px-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-10 h-10 border-2 border-amber-300 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-gray-400">Generating insights...</p>
          </div>
        ) : summary[active] ? (
          <div className="space-y-3">
            {/* AI LABEL */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              AI Generated Insight
            </div>

            {/* CONTENT */}
            <p className="text-sm text-gray-700 leading-6 whitespace-pre-line">
              {summary[active]}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 px-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>

            <p className="text-sm font-medium text-gray-700">No insights yet</p>

            <div className="text-xs text-gray-400 mt-1 leading-relaxed">
              Click a summary type to generate insights
              <br />
              and understand your productivity patterns
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
