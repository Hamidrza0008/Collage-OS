"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp, Info } from "lucide-react";

export default function TeacherInstructions({ instructions }) {
  const [expanded, setExpanded] = useState(false);

  if (!instructions || instructions.length === 0) return null;

  // Show 4 by default if more than 4
  const visibleInstructions = expanded ? instructions : instructions.slice(0, 4);
  const hasMore = instructions.length > 4;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Teacher Instructions & Guidelines
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Direct recommendations from the course faculty
          </p>
        </div>
      </div>

      {/* Instructions List */}
      <ul className="space-y-2.5">
        {visibleInstructions.map((inst, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-xs text-[#35574C] dark:text-[#C5DCD4] leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
            <span className="flex-1">{inst}</span>
          </li>
        ))}
      </ul>

      {/* Expand / Collapse toggle */}
      {hasMore && (
        <div className="pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#20D39B] hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <span>{expanded ? "Show Less Guidelines" : `Show More (+${instructions.length - 4} items)`}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
