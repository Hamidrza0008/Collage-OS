"use client";

import {
  Calendar,
  CheckSquare,
  FileUp,
  Award,
  LayoutGrid,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

const ACTIONS = [
  { label: "View Timetable", icon: Calendar, href: "/student/academics/timetable" },
  { label: "Mark Attendance", icon: CheckSquare, href: "/student/academics" },
  { label: "Submit Assignment", icon: FileUp, href: "/student/assignments" },
  { label: "Check Marks", icon: Award, href: "/student/academics/grade-card" },
  { label: "Explore Projects", icon: LayoutGrid, href: "/student/projects" },
  { label: "Find Internships", icon: Briefcase, href: "/student/internships" },
];

export default function QuickActions() {
  return (
    <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs space-y-2">
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Actions
        </h2>
      </div>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link
              key={idx}
              href={action.href}
              className="p-2 rounded-lg bg-[#F7FBF9] dark:bg-[#031A16] hover:bg-[#DDF3EB] dark:hover:bg-[#123F35] border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 flex flex-col items-center justify-center text-center gap-1 transition-all group active:scale-95"
            >
              <div className="p-1.5 rounded-md bg-[#FFFFFF] dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] shadow-2xs group-hover:scale-105 transition-transform">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-semibold text-[#36594C] dark:text-[#B5CCC5] group-hover:text-[#0B3024] dark:group-hover:text-[#F1FAF6] leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
