"use client";

import { Bookmark, LayoutGrid, Briefcase, Calendar } from "lucide-react";

export default function SavedSummaryCards({ metrics, activeCategory, onSelectCategory }) {
  const cards = [
    {
      id: "all",
      label: "Total Saved",
      count: metrics.total,
      icon: Bookmark,
      color: "text-[#159B72] dark:text-[#20D39B]",
      bg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/80",
    },
    {
      id: "projects",
      label: "Projects",
      count: metrics.projects,
      icon: LayoutGrid,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/80",
    },
    {
      id: "opportunities",
      label: "Opportunities",
      count: metrics.opportunities,
      icon: Briefcase,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/80",
    },
    {
      id: "events",
      label: "Events",
      count: metrics.events,
      icon: Calendar,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/80",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-4 sm:my-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeCategory === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectCategory(card.id)}
            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
              isSelected
                ? "bg-white dark:bg-[#06241F] border-emerald-500 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                : "bg-white dark:bg-[#041D18] border-[#D8E8E2] dark:border-[#10372F] hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F]">
                {card.label}
              </span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${card.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${card.color}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                {card.count}
              </span>
              <span className="text-[11px] font-medium text-[#658278] dark:text-[#789991]">
                {card.count === 1 ? "item" : "items"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
