"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Info } from "lucide-react";
import { GRADE_SCALE } from "./gradeCardData";

export default function GradeScaleLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs overflow-hidden transition-colors">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-[#F7FBF9] dark:hover:bg-[#06241F] transition-colors cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#E8F1ED] dark:bg-[#10372F] text-[#0B3024] dark:text-[#F1FAF6]">
            <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Institutional 10-Point Grade System & Point Scale
            </h3>
            <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
              Standardized evaluation metrics for degree credit computation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 hidden sm:inline">
            {isExpanded ? "Collapse Guide" : "View Scale Guide"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#5C786E] dark:text-[#8AA89F]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#5C786E] dark:text-[#8AA89F]" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9]/60 dark:bg-[#041D18]/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mt-3">
            {GRADE_SCALE.map((item) => (
              <div
                key={item.grade}
                className="p-2.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-black border ${item.badgeClass}`}>
                    {item.grade}
                  </span>
                  <span className="text-xs font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                    {item.gradePoint} pts
                  </span>
                </div>
                <div className="mt-1.5">
                  <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] font-medium block mt-0.5">
                    {item.range}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#658278] dark:text-[#789991]">
            <Info className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              SGPA = Σ (Course Credit × Grade Point) / Σ Course Credits. Backlogs do not earn credit points.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
