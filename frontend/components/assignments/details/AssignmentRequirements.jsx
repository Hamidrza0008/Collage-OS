"use client";

import { CheckSquare, Layers, Check } from "lucide-react";

export default function AssignmentRequirements({ requirements, requiredStack }) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <CheckSquare className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Submission Checklist & Requirements
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Mandatory criteria evaluated by the grading rubric
          </p>
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {(requirements || []).map((req, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] leading-snug">
              {req}
            </span>
          </div>
        ))}
      </div>

      {/* Required Tech Stack */}
      {requiredStack && requiredStack.length > 0 && (
        <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider shrink-0">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
            <span>Required Stack:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {requiredStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-[#082A24] text-emerald-800 dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-900/60 shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
