"use client";

import { Sparkles, ArrowRight, Check, CheckCircle2, ShieldCheck } from "lucide-react";
import { HOW_IT_WORKS_RULES } from "./campusAIData";

export default function HowCampusAIWorks({ onLearnMore }) {
  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            How Campus AI Works
          </h2>
        </div>

        <button
          type="button"
          onClick={onLearnMore}
          className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 flex items-center gap-1 transition-colors"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Rules Checklist */}
      <div className="space-y-2.5 pt-1">
        {HOW_IT_WORKS_RULES.map((item) => (
          <div key={item.id} className="flex items-start gap-2.5 text-xs">
            <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <div className="flex-1 leading-snug">
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                {item.title}
              </span>
              {item.detail && (
                <span className="text-[#658278] dark:text-[#789991] block text-[11px] mt-0.5">
                  {item.detail}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
