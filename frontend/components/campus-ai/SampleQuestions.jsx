"use client";

import { Lightbulb, ChevronRight } from "lucide-react";
import { SAMPLE_QUESTIONS } from "./campusAIData";

export default function SampleQuestions({ onSelectQuestion }) {
  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 shadow-xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Lightbulb className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
          Sample Questions
        </h2>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-[#D8E8E2]/60 dark:divide-[#16463D]/60 pt-1">
        {SAMPLE_QUESTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectQuestion(item.question)}
            className="w-full text-left py-2 px-1 flex items-center justify-between text-xs text-[#36594C] dark:text-[#B5CCC5] hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 rounded-lg transition-colors group cursor-pointer"
          >
            <span className="font-normal group-hover:translate-x-0.5 transition-transform line-clamp-1 pr-2">
              › {item.question}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
