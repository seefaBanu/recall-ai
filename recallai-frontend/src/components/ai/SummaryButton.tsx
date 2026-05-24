"use client";

import { Sparkles } from "lucide-react";

export default function SummaryButton({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center"
    >
      <Sparkles className="w-5 h-5 text-white" />
    </button>
  );
}