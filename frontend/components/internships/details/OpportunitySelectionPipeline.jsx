"use client";

import { GitCommit, CheckCircle2, Clock, Calendar } from "lucide-react";

export default function OpportunitySelectionPipeline({ selectionProcess = [] }) {
  if (!selectionProcess || selectionProcess.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 transition-all">
      <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2 mb-4">
        <GitCommit className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
        <span>Hiring & Selection Stages</span>
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8E8E2] dark:before:bg-[#16463D]">
        {selectionProcess.map((stage) => {
          const isCurrent = stage.status === "current";
          const isDone = stage.status === "completed";

          return (
            <div key={stage.step} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isDone
                    ? "bg-[#159B72] border-[#159B72] text-white"
                    : isCurrent
                    ? "bg-[#DDF4EB] border-[#159B72] text-[#159B72] animate-pulse"
                    : "bg-white dark:bg-[#06241F] border-gray-300 dark:border-gray-700 text-gray-500"
                }`}
              >
                <span className="text-[10px] font-bold">{stage.step}</span>
              </div>

              {/* Stage Content */}
              <div className="bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] p-3 rounded-xl">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {stage.name}
                  </h4>
                  {stage.date && (
                    <span className="text-[11px] font-mono text-[#658278] dark:text-[#789991] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {stage.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
