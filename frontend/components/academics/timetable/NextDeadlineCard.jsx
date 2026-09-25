"use client";

import Link from "next/link";
import { FileText, Bell, Clock, ArrowRight } from "lucide-react";

export default function NextDeadlineCard({ deadlineItem, onSelectItem }) {
  if (!deadlineItem) return null;

  const isAssignment = deadlineItem.type === "assignment";
  const Icon = isAssignment ? FileText : Bell;
  const targetHref = isAssignment
    ? `/student/assignments/${deadlineItem.id}`
    : `/student/notices/${deadlineItem.id}`;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Pending Deadline
          </h2>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
          {deadlineItem.priority || "Action Required"}
        </span>
      </div>

      {/* Body */}
      <div className="p-3.5 rounded-xl border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/50 dark:bg-[#061824]/50 space-y-2.5">
        <div>
          <span className="text-[10px] font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wide">
            {deadlineItem.subjectCode || "ACADEMIC"}
          </span>
          <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
            {deadlineItem.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#5C786E] dark:text-[#8AA89F]">
          <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            {deadlineItem.timeDisplay || deadlineItem.date}
          </span>
        </div>

        {/* Footer actions */}
        <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/50 flex items-center justify-between">
          <Link
            href={targetHref}
            className="text-xs font-semibold text-sky-800 dark:text-sky-300 hover:underline flex items-center gap-1"
          >
            <span>{isAssignment ? "View Assignment" : "View Notice"}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={() => onSelectItem(deadlineItem)}
            className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:text-sky-700 cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}
