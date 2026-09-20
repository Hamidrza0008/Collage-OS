"use client";

import { Megaphone, FileText, Users, Calendar, ArrowUpRight } from "lucide-react";
import { LATEST_UPDATES } from "./noticesData";

export default function LatestUpdatesCard({ onSelectUpdate, onViewAll }) {
  const getIcon = (type) => {
    switch (type) {
      case "important":
        return (
          <div className="w-7 h-7 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
            <Megaphone className="w-3.5 h-3.5 transform -rotate-12" />
          </div>
        );
      case "exam":
        return (
          <div className="w-7 h-7 rounded-lg bg-blue-100/80 dark:bg-blue-950/60 flex items-center justify-center shrink-0 text-blue-700 dark:text-blue-400">
            <FileText className="w-3.5 h-3.5" />
          </div>
        );
      case "placement":
        return (
          <div className="w-7 h-7 rounded-lg bg-purple-100/80 dark:bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-400">
            <Users className="w-3.5 h-3.5" />
          </div>
        );
      case "event":
        return (
          <div className="w-7 h-7 rounded-lg bg-amber-100/80 dark:bg-amber-950/60 flex items-center justify-center shrink-0 text-amber-700 dark:text-amber-400">
            <Calendar className="w-3.5 h-3.5" />
          </div>
        );
      case "general":
      default:
        return (
          <div className="w-7 h-7 rounded-lg bg-rose-100/80 dark:bg-rose-950/60 flex items-center justify-center shrink-0 text-rose-700 dark:text-rose-400">
            <FileText className="w-3.5 h-3.5" />
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Latest Updates
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Rows */}
      <div className="space-y-2">
        {LATEST_UPDATES.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectUpdate(item.title)}
            className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/40 dark:bg-[#041D18]/50 hover:bg-emerald-50/60 dark:hover:bg-[#082A24] transition-all cursor-pointer group"
          >
            {getIcon(item.categoryType)}
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <span className="text-[10.5px] font-medium text-[#658278] dark:text-[#789991] block">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
