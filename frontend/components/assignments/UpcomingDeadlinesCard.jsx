"use client";

import { Calendar, ArrowUpRight } from "lucide-react";
import { UPCOMING_DEADLINES } from "./assignmentsData";

export default function UpcomingDeadlinesCard({ onSelectAssignment }) {
  const getPriorityBadge = (priorityType, label) => {
    if (priorityType === "high") {
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/30">
          {label}
        </span>
      );
    }
    if (priorityType === "medium") {
      return (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/30">
          {label}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30">
        {label}
      </span>
    );
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Upcoming Deadlines
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Deadlines List */}
      <div className="space-y-2">
        {UPCOMING_DEADLINES.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectAssignment && onSelectAssignment(item.title)}
            className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/50 hover:bg-emerald-50/60 dark:hover:bg-[#082A24] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10.5px] font-medium text-[#658278] dark:text-[#789991] block truncate">
                  {item.dueText}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              {getPriorityBadge(item.priorityType, item.priority)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
