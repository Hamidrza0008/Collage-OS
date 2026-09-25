"use client";

import {
  FileText,
  Clock,
  Video,
  Award,
  XCircle,
} from "lucide-react";

export default function ApplicationsMetrics({
  metrics = { total: 0, active: 0, interviews: 0, selected: 0, closed: 0 },
  activeTab,
  onSelectTab,
}) {
  const CARDS = [
    {
      id: "all",
      label: "Total Applications",
      count: metrics.total,
      subtext: "All submissions",
      icon: FileText,
      accent: "text-blue-600 dark:text-blue-400",
      bgPill: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    },
    {
      id: "active",
      label: "In Progress / Active",
      count: metrics.active,
      subtext: "Under review or testing",
      icon: Clock,
      accent: "text-amber-600 dark:text-amber-400",
      bgPill: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    {
      id: "interviews",
      label: "Interviews",
      count: metrics.interviews,
      subtext: "Live rounds scheduled",
      icon: Video,
      accent: "text-purple-600 dark:text-purple-400",
      bgPill: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    },
    {
      id: "selected",
      label: "Offers / Selected",
      count: metrics.selected,
      subtext: "Offers & finalists",
      icon: Award,
      accent: "text-emerald-600 dark:text-emerald-400",
      bgPill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      id: "rejected",
      label: "Closed / Rejected",
      count: metrics.closed,
      subtext: "Archived & concluded",
      icon: XCircle,
      accent: "text-rose-600 dark:text-rose-400",
      bgPill: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    },
  ];

  return (
    <section aria-label="Application Summary Metrics" className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const isSelected = activeTab === card.id;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectTab && onSelectTab(card.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-2xs group relative ${
                isSelected
                  ? "bg-white dark:bg-[#06241F] border-[#159B72] dark:border-[#20D39B] ring-2 ring-[#159B72]/20 dark:ring-[#20D39B]/20"
                  : "bg-white/80 dark:bg-[#06241F]/80 border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/50 hover:bg-white dark:hover:bg-[#06241F]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${card.bgPill}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#06241F] dark:text-white">
                  {card.count}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#06241F] dark:text-[#D8E8E2] line-clamp-1 block">
                  {card.label}
                </span>
                <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 line-clamp-1 block">
                  {card.subtext}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
