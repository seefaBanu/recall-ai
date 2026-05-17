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

export default function SummaryDashboard() {
  const [open, setOpen] = useState(false);
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

  // COLLAPSED STATE (ONLY ICON)
  if (!open) {
    return (
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br from-amber-400 to-yellow-500
            shadow-md
            flex items-center justify-center
            hover:scale-105 transition
          "
        >
          <Sparkles className="w-5 h-5 text-white" />
        </button>
      </div>
    );
  }

  // EXPANDED PANEL (INSIDE COLUMN ONLY)
  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="font-semibold text-gray-800">AI Summary</h2>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* TYPE BUTTONS */}
      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={() => generate("daily")}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-xl text-sm
            ${
              active === "daily"
                ? "bg-amber-100 text-amber-700"
                : "bg-white/60 text-gray-600"
            }
          `}
        >
          <CalendarDays className="w-4 h-4" />
          Daily Summary
        </button>

        <button
          onClick={() => generate("weekly")}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-xl text-sm
            ${
              active === "weekly"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-white/60 text-gray-600"
            }
          `}
        >
          <CalendarRange className="w-4 h-4" />
          Weekly Summary
        </button>

        <button
          onClick={() => generate("monthly")}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-xl text-sm
            ${
              active === "monthly"
                ? "bg-orange-100 text-orange-700"
                : "bg-white/60 text-gray-600"
            }
          `}
        >
          <Calendar className="w-4 h-4" />
          Monthly Summary
        </button>
      </div>

      {/* OUTPUT */}
      <div className="flex-1 overflow-y-auto pr-1">
        {loading ? (
          <div className="text-xs text-gray-400">Generating...</div>
        ) : summary[active] ? (
          <p className="text-sm text-gray-700 leading-6 whitespace-pre-line">
            {summary[active]}
          </p>
        ) : (
          <div className="text-xs text-gray-400">
            Click a summary type to generate insights
          </div>
        )}
      </div>
    </div>
  );
}
