"use client";

import { Folder, User, Users, Heart, ArrowRight } from "lucide-react";

export default function ProjectStatsCard({ onViewAll, stats }) {
  // Use provided stats or realistic reference numbers
  const displayStats = [
    {
      id: "total-projects",
      label: "Total Projects",
      value: stats?.totalProjects ?? 48,
      icon: Folder,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/40",
    },
    {
      id: "my-projects",
      label: "My Projects",
      value: stats?.myProjects ?? 12,
      icon: User,
      iconBg: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
      border: "border-teal-100 dark:border-teal-900/40",
    },
    {
      id: "total-teams",
      label: "Total Teams",
      value: stats?.totalTeams ?? 28,
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/40",
    },
    {
      id: "total-likes",
      label: "Total Likes",
      value: stats?.totalLikes ?? 156,
      icon: Heart,
      iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-900/40",
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-xs transition-colors">
      {/* Header: Title + View All */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Project Stats
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2x2 Mini Stat Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {displayStats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl border ${item.border} bg-[#F7FBF9] dark:bg-[#082A24] flex items-center gap-2.5 transition-all`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-[17px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                  {item.value}
                </span>
                <span className="text-[10.5px] font-medium text-[#658278] dark:text-[#789991] leading-tight truncate">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
