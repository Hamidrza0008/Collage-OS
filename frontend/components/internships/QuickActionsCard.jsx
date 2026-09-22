"use client";

import {
  Briefcase,
  Trophy,
  ClipboardList,
  Bookmark,
  FileText,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function QuickActionsCard({ onAction, onViewAll }) {
  const actions = [
    {
      id: "apply-internship",
      label: "Apply for Internship",
      icon: Briefcase,
    },
    {
      id: "register-hackathon",
      label: "Register for Hackathon",
      icon: Trophy,
    },
    {
      id: "my-applications",
      label: "My Applications",
      icon: ClipboardList,
    },
    {
      id: "saved-opportunities",
      label: "Saved Opportunities",
      icon: Bookmark,
    },
    {
      id: "resume-builder",
      label: "Resume Builder",
      icon: FileText,
    },
    {
      id: "career-resources",
      label: "Career Resources",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Quick Actions
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
