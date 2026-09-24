"use client";

import {
  Milestone,
  CheckCircle2,
  Clock,
  CircleDashed,
  Sparkles,
} from "lucide-react";

export default function ProjectRoadmap({ roadmap = [] }) {
  if (!roadmap || roadmap.length === 0) return null;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case "in progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-500/20">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>In Progress</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#8BAEA3] border border-gray-200/60 dark:border-[#10372F]">
            <CircleDashed className="w-3 h-3" />
            <span>Upcoming</span>
          </span>
        );
    }
  };

  return (
    <section
      aria-label="Project Roadmap"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Milestone className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Project Roadmap &amp; Milestones
          </h2>
          <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
            Product iterations and release milestones
          </p>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-[#D8E8E2] dark:border-[#10372F] ml-2.5 sm:ml-4 py-1">
        {roadmap.map((item, idx) => {
          const isCompleted = item.status?.toLowerCase() === "completed";
          const isInProgress = item.status?.toLowerCase() === "in progress";

          return (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#06241F] transition-transform group-hover:scale-110 ${
                  isCompleted
                    ? "bg-[#159B72] text-white"
                    : isInProgress
                    ? "bg-amber-500 text-white animate-pulse"
                    : "bg-gray-200 dark:bg-[#10372F] text-gray-500 dark:text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white dark:bg-[#06241F]" />
                )}
              </div>

              {/* Milestone Box */}
              <div className="p-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] space-y-2 hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#159B72] dark:text-[#20D39B] font-mono">
                      {item.phase}
                    </span>
                    <span className="text-xs text-[#658278] dark:text-[#8BAEA3]">&bull;</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.date && (
                      <span className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">
                        {item.date}
                      </span>
                    )}
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                <p className="text-xs text-[#4C6B61] dark:text-[#CBD5E1] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
