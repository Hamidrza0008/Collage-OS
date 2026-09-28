"use client";

import { Bookmark, LayoutGrid, Briefcase, Calendar, Bell } from "lucide-react";

export default function SavedSummaryMetrics({
  counts = {},
  activeCategory = "all",
  onSelectCategory,
}) {
  const metrics = [
    {
      id: "all",
      label: "Total Saved",
      count: counts.all || 0,
      icon: Bookmark,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 dark:bg-emerald-400/10",
      borderColor: "border-emerald-500/20 dark:border-emerald-400/20",
    },
    {
      id: "project",
      label: "Projects",
      count: counts.project || 0,
      icon: LayoutGrid,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10 dark:bg-purple-400/10",
      borderColor: "border-purple-500/20 dark:border-purple-400/20",
    },
    {
      id: "opportunity",
      label: "Opportunities",
      count: counts.opportunity || 0,
      icon: Briefcase,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
      borderColor: "border-blue-500/20 dark:border-blue-400/20",
    },
    {
      id: "event",
      label: "Events",
      count: counts.event || 0,
      icon: Calendar,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-400/10",
      borderColor: "border-amber-500/20 dark:border-amber-400/20",
    },
    {
      id: "notice",
      label: "Notices",
      count: counts.notice || 0,
      icon: Bell,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-500/10 dark:bg-rose-400/10",
      borderColor: "border-rose-500/20 dark:border-rose-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
      {metrics.map((m) => {
        const Icon = m.icon;
        const isActive = activeCategory === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelectCategory(m.id)}
            className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
              isActive
                ? "bg-[#FFFFFF] dark:bg-[#072F27] border-emerald-500 dark:border-emerald-400 shadow-sm ring-2 ring-emerald-500/20"
                : "bg-[#FFFFFF] dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 hover:bg-[#F9FCFA] dark:hover:bg-[#082E27] shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-[#55786B] dark:text-[#8FAFA4] uppercase tracking-wider truncate">
                {m.label}
              </span>
              <div className={`w-6 h-6 rounded-lg ${m.bgColor} ${m.borderColor} border flex items-center justify-center shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
              {m.count}
            </div>
          </button>
        );
      })}
    </div>
  );
}
