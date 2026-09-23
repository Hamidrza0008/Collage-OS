"use client";

import { Edit3, Users, Compass, BarChart2 } from "lucide-react";

export default function QuickActionsCard({
  onOpenComposer,
  onOpenJoinGroups,
  onExploreStudents,
  onFilterPolls,
}) {
  const actions = [
    {
      label: "Create Post",
      icon: Edit3,
      onClick: () => onOpenComposer && onOpenComposer("text"),
    },
    {
      label: "Join Groups",
      icon: Users,
      onClick: () => onOpenJoinGroups && onOpenJoinGroups(),
    },
    {
      label: "Explore Students",
      icon: Compass,
      onClick: () => onExploreStudents && onExploreStudents(),
    },
    {
      label: "Campus Polls",
      icon: BarChart2,
      onClick: () => onFilterPolls && onFilterPolls(),
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 sm:p-4.5 shadow-xs">
      <h3 className="text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-2.5 mt-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              type="button"
              onClick={act.onClick}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#031A16] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 hover:border-emerald-500/40 transition-all text-left group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
