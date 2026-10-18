"use client";

import React from "react";
import Link from "next/link";
import { Zap, Users, FileText, TrendingUp, LayoutGrid } from "lucide-react";

export default function ClassesQuickActions() {
  const actions = [
    {
      label: "Take Attendance",
      icon: Users,
      href: "/faculty/attendance",
    },
    {
      label: "Pending Assignments",
      icon: FileText,
      href: "/faculty/assignments",
    },
    {
      label: "Upload Marks",
      icon: TrendingUp,
      href: "/faculty/marks",
    },
    {
      label: "View All Classes",
      icon: LayoutGrid,
      href: "#assigned-classes",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.label}
              href={act.href}
              className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F2ED] dark:border-[#10372F] hover:border-[#159B72]/40 hover:bg-[#E6F7F0]/40 dark:hover:bg-[#0C382D]/40 transition-all flex flex-col items-start gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] leading-tight transition-colors">
                {act.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
