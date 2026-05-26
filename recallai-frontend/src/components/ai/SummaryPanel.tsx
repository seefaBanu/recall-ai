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
  // FLOATING BUTTON (FIXED)
  // =========================
  const FloatingButton = (
    <button
      onClick={() => setAiOpen(true)}
      className="
        fixed bottom-6 right-6
        md:bottom-8 md:right-8

        z-[99999]

        w-14 h-14
        rounded-2xl

        bg-primary
        flex items-center justify-center

        shadow-2xl
        hover:scale-105 active:scale-95
        transition
      "
    >
      <Sparkles className="w-5 h-5 text-primary-foreground" />
    </button>
  );

  // =========================
  // CLOSED STATE
  // =========================
  if (!aiOpen) {
    return FloatingButton;
  }

  // =========================
  // OPEN STATE
  // =========================
  return (
    <>
      {/* keep button mounted but hidden */}
      <div className="hidden">{FloatingButton}</div>

      {/* PANEL */}
      <div className="h-full flex flex-col bg-background/70 backdrop-blur-xl rounded-2xl p-3 border border-foreground/10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">AI Summary</h2>
          </div>

          <button
            onClick={() => setAiOpen(false)}
            className="w-8 h-8 rounded-lg bg-background border flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-2 mb-4">
          <button
            onClick={() => handleGenerate("daily")}
            className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
              active === "daily"
                ? "bg-primary/20 text-primary"
                : "bg-background text-foreground/70"
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
                : "bg-background text-foreground/70"
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
                : "bg-background text-foreground/70"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Monthly Summary
          </button>
        </div>

        {/* OUTPUT */}
        <div className="flex-1 overflow-y-auto pr-1">
          {loading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 w-3/4 bg-gray-300/30 rounded" />
              <div className="h-3 w-2/3 bg-gray-300/20 rounded" />
              <div className="h-3 w-5/6 bg-gray-300/20 rounded" />
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
    </>
  );
}
