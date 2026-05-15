"use client";

import { useState } from "react";
import {
  Sparkles,
  CalendarDays,
  CalendarRange,
  Calendar,
  Clock3,
} from "lucide-react";
import API_BASE_URL from "@/lib/api";

export default function SummaryDashboard() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("daily");

  async function generate(type: string) {
    if (loading) return;

    setLoading(true);
    setSummary("");
    setActiveType(type);

    try {
      const res = await fetch(`${API_BASE_URL}/api/Summary/${type}`, {
        method: "POST",
      });

      if (!res.ok) {
        setSummary("Unable to generate insights right now.");
        return;
      }

      const data = await res.text();
      setSummary(data);
    } catch {
      setSummary("Something went wrong while generating insights.");
    } finally {
      setLoading(false);
    }
  }

  const buttonStyle =
    "flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 border border-amber-200/50 backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98]";

  return (
    <div className="mt-14 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-amber-500" />

            <h2
              className="
                text-4xl font-bold tracking-tight
                bg-gradient-to-r
                from-amber-500
                to-yellow-600
                bg-clip-text
                text-transparent
              "
            >
              AI Insights
            </h2>
          </div>

          <p className="text-gray-500 mt-2 text-base">
            Intelligent summaries generated from your activity and notes
          </p>
        </div>

        {/* MAIN BUTTON */}
        <button
          onClick={() => generate("daily")}
          disabled={loading}
          className="
            px-6 py-3
            rounded-2xl
            bg-gradient-to-r from-amber-400 to-yellow-500
            text-white
            shadow-lg shadow-amber-200
            hover:shadow-xl
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            disabled:opacity-40
          "
        >
          {loading && activeType === "daily"
            ? "Generating..."
            : "Generate Summary"}
        </button>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3">
        {/* DAILY */}
        <button
          onClick={() => generate("daily")}
          className={`${buttonStyle} ${
            activeType === "daily"
              ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
              : "bg-white/60 text-gray-700"
          }`}
        >
          <Clock3 className="w-4 h-4" />
          Daily
        </button>

        {/* WEEKLY */}
        <button
          onClick={() => generate("weekly")}
          className={`${buttonStyle} ${
            activeType === "weekly"
              ? "bg-yellow-500 text-white shadow-lg shadow-yellow-200"
              : "bg-white/60 text-gray-700"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          Weekly
        </button>

        {/* MONTHLY */}
        <button
          onClick={() => generate("monthly")}
          className={`${buttonStyle} ${
            activeType === "monthly"
              ? "bg-amber-600 text-white shadow-lg shadow-amber-300"
              : "bg-white/60 text-gray-700"
          }`}
        >
          <CalendarRange className="w-4 h-4" />
          Monthly
        </button>

        {/* YEARLY */}
        <button
          onClick={() => generate("yearly")}
          className={`${buttonStyle} ${
            activeType === "yearly"
              ? "bg-yellow-600 text-white shadow-lg shadow-yellow-300"
              : "bg-white/60 text-gray-700"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Yearly
        </button>
      </div>

      {/* OUTPUT */}
      <div className="min-h-[260px]">
        {loading ? (
          <div
            className="
              bg-white/60
              backdrop-blur-2xl
              border border-amber-100
              rounded-3xl
              p-10
              shadow-xl
              flex flex-col items-center justify-center
              text-center
            "
          >
            <div className="relative w-14 h-14 mb-5">
              <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              AI is analyzing your productivity
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Generating insights from your notes...
            </p>
          </div>
        ) : summary ? (
          <div
            className="
              bg-white/60
              backdrop-blur-2xl
              border border-amber-100
              rounded-3xl
              p-8
              shadow-xl
              hover:shadow-2xl
              transition-all
            "
          >
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-amber-500" />

              <h3 className="font-semibold text-lg text-gray-800">
                AI Generated Insight
              </h3>
            </div>

            <p className="text-gray-700 leading-8 text-[16px] whitespace-pre-line">
              {summary}
            </p>
          </div>
        ) : (
          <div
            className="
              bg-white/40
              backdrop-blur-2xl
              border border-dashed border-amber-200
              rounded-3xl
              p-14
              text-center
            "
          >
            <div className="flex justify-center mb-4">
              <Sparkles className="w-10 h-10 text-amber-400" />
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No Insights Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Generate an AI summary to visualize your productivity journey
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
