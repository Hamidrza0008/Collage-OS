"use client";

import { Megaphone, ArrowUpRight } from "lucide-react";
import { ACADEMIC_NOTICES } from "./academicsData";

export default function AcademicNoticesCard() {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Notices & Announcements
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Notice List */}
      <div className="divide-y divide-gray-100 dark:divide-[#10372F]/60">
        {ACADEMIC_NOTICES.map((notice) => (
          <div
            key={notice.id}
            className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-200/80 dark:group-hover:bg-emerald-900/60 transition-colors">
              <Megaphone className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                {notice.title}
              </h3>
              <span className="text-[10.5px] font-medium text-[#658278] dark:text-[#789991] mt-0.5 block">
                {notice.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
