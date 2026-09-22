"use client";

import {
  FolderPlus,
  Compass,
  User,
  Users,
  Heart,
  Lightbulb,
} from "lucide-react";

export default function ProjectQuickActionsCard({
  onAction,
}) {
  const actions = [
    {
      id: "create-project",
      label: "Create Project",
      icon: FolderPlus,
    },
    {
      id: "browse-all",
      label: "Browse All",
      icon: Compass,
    },
    {
      id: "my-projects",
      label: "My Projects",
      icon: User,
    },
    {
      id: "my-team",
      label: "My Team",
      icon: Users,
    },
    {
      id: "view-liked",
      label: "View Liked",
      icon: Heart,
    },
    {
      id: "project-ideas",
      label: "Project Ideas",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-xs transition-colors">
      <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight mb-3">
        Quick Actions
      </h2>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-2 gap-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => onAction(act.id)}
              className="p-2.5 rounded-xl border border-[#D8E8E2]/80 dark:border-[#16463D]/80 bg-[#F7FBF9] dark:bg-[#082A24] hover:bg-[#DDF4EB] dark:hover:bg-[#0D4436] hover:border-[#159B72]/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/70 flex items-center justify-center text-[#159B72] dark:text-[#20D39B] group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[#0B3024] dark:text-[#E2F1EC] leading-tight">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
