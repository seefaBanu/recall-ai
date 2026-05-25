"use client";

import { useState } from "react";
import {
  Sparkles,
  CalendarDays,
  CalendarRange,
  Calendar,
  X,
} from "lucide-react";

import useSummary from "@/hooks/useSummary";

export default function SummaryPanel({ aiOpen, setAiOpen }: any) {
  const { summary, loading, generate } = useSummary();
  const [active, setActive] = useState("daily");

  function handleGenerate(type: string) {
    setActive(type);
    generate(type);
  }

  // =========================
  // COLLAPSED STATE
  // =========================
  if (!aiOpen) {
    return (
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setAiOpen(true)}
          className="
            w-10 h-10 rounded-xl
            bg-primary
            flex items-center justify-center
            shadow-md hover:scale-105 transition
          "
        >
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    );
  }

  // =========================
  // EXPANDED STATE
  // =========================
  return (
    <div className="h-full flex flex-col bg-background/60 backdrop-blur-xl rounded-2xl p-3 border border-foreground/10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">AI Summary</h2>
        </div>

        <button
          onClick={() => setAiOpen(false)}
          className="w-8 h-8 rounded-lg bg-background border border-foreground/10 flex items-center justify-center hover:bg-primary/10 transition"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-2 mb-4 px-1">
        <button
          onClick={() => handleGenerate("daily")}
          className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
            active === "daily"
              ? "bg-primary/20 text-primary"
              : "bg-background hover:bg-primary/10 text-foreground/70"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          Daily Summary
        </button>

        <button
          onClick={() => handleGenerate("weekly")}
          className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
            active === "weekly"
              ? "bg-primary/20 text-primary"
              : "bg-background hover:bg-primary/10 text-foreground/70"
          }`}
        >
          <CalendarRange className="w-4 h-4" />
          Weekly Summary
        </button>

        <button
          onClick={() => handleGenerate("monthly")}
          className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
            active === "monthly"
              ? "bg-primary/20 text-primary"
              : "bg-background hover:bg-primary/10 text-foreground/70"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Monthly Summary
        </button>
      </div>

      {/* OUTPUT */}
      <div className="flex-1 overflow-y-auto px-1">
        {loading ? (
          <div className="flex justify-center py-10 text-sm text-foreground/50">
            Generating insights...
          </div>
        ) : summary?.[active] ? (
          <p className="text-sm text-foreground/80 whitespace-pre-line leading-6">
            {summary[active]}
          </p>
        ) : (
          <p className="text-sm text-foreground/40 text-center py-10">
            No insights yet
          </p>
        )}
      </div>
    </div>
  );
}
