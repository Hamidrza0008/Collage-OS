"use client";

import { Target, CheckCircle2, Compass } from "lucide-react";

export default function AssignmentOverview({ overview }) {
  if (!overview) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Assignment Overview
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Core objective and expected delivery outcomes
          </p>
        </div>
      </div>

      {/* Overview Description */}
      <p className="text-xs sm:text-sm text-[#35574C] dark:text-[#C5DCD4] leading-relaxed">
        {overview.description}
      </p>

      {/* Goal Callout Box */}
      {overview.goal && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/60 dark:bg-[#05211B] border border-emerald-100 dark:border-[#10372F] flex items-start gap-3">
          <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-[#20D39B] flex items-center justify-center shrink-0 mt-0.5">
            <Target className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-emerald-900 dark:text-[#20D39B] uppercase tracking-wider block">
              Assignment Goal
            </span>
            <p className="text-xs text-[#0B3024] dark:text-[#E2F1EC] font-medium leading-relaxed">
              {overview.goal}
            </p>
          </div>
        </div>
      )}

      {/* Expected Outcomes */}
      {overview.expectedOutcomes && overview.expectedOutcomes.length > 0 && (
        <div className="pt-2">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2.5">
            Expected Outcomes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {overview.expectedOutcomes.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0 mt-0.5" />
                <span className="text-xs text-[#35574C] dark:text-[#C5DCD4] leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
