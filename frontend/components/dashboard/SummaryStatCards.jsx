"use client";

import { ClipboardCheck, Layers, Box, FileText } from "lucide-react";

const STATS = [
  {
    id: "attendance",
    title: "Attendance",
    value: "78%",
    subtext: "16 / 21 classes attended",
    progress: 78,
    icon: ClipboardCheck,
    color: "text-[#159B72] dark:text-[#20D39B]",
    bgLight: "bg-[#DDF3EB] dark:bg-[#123F35]",
    barColor: "bg-[#159B72] dark:bg-[#20D39B]",
  },
  {
    id: "cgpa",
    title: "CGPA",
    value: "8.24",
    subtext: "Current Sem 7",
    icon: Layers,
    color: "text-[#159B72] dark:text-[#20D39B]",
    bgLight: "bg-[#DDF3EB] dark:bg-[#123F35]",
  },
  {
    id: "credits",
    title: "Total Credits",
    value: "142 / 160",
    subtext: "Completed",
    icon: Box,
    color: "text-[#159B72] dark:text-[#20D39B]",
    bgLight: "bg-[#DDF3EB] dark:bg-[#123F35]",
  },
  {
    id: "assignments",
    title: "Upcoming Assignments",
    value: "3",
    subtext: "Due this week",
    icon: FileText,
    color: "text-[#159B72] dark:text-[#20D39B]",
    bgLight: "bg-[#DDF3EB] dark:bg-[#123F35]",
  },
];

export default function SummaryStatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="p-3 sm:p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3"
          >
            {/* Left Icon */}
            <div className={`p-2 rounded-lg ${stat.bgLight} ${stat.color} shrink-0`}>
              <Icon className="w-4 h-4" strokeWidth={2.2} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <span className="text-[11.5px] font-medium text-[#658278] dark:text-[#789991] block leading-tight">
                {stat.title}
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg sm:text-xl font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-none">
                  {stat.value}
                </span>
              </div>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
                {stat.subtext}
              </p>

              {/* Progress bar for attendance */}
              {stat.progress !== undefined && (
                <div className="mt-1.5 w-full h-1 bg-[#F1F8F5] dark:bg-[#0A2A24] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stat.barColor}`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
