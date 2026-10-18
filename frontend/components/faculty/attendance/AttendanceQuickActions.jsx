"use client";

import React from "react";
import Link from "next/link";
import { CheckSquare, UploadCloud, FileBarChart, Settings, ChevronRight } from "lucide-react";

export default function AttendanceQuickActions({ onTakeAttendanceClick }) {
  const actions = [
    {
      id: "take",
      title: "Take Attendance",
      subtitle: "Mark attendance for your classes",
      icon: CheckSquare,
      onClick: onTakeAttendanceClick,
      href: null,
    },
    {
      id: "upload",
      title: "Upload Attendance (Bulk)",
      subtitle: "Use CSV or text file",
      icon: UploadCloud,
      href: "#bulk-upload",
      onClick: () => alert("Bulk CSV Upload: Drag and drop your biometric attendance CSV or Excel file."),
    },
    {
      id: "reports",
      title: "View Attendance Reports",
      subtitle: "Class-wise / Student-wise",
      icon: FileBarChart,
      href: "#reports",
      onClick: () => alert("Attendance Reports: Generating monthly institutional compliance PDF report."),
    },
    {
      id: "settings",
      title: "Attendance Settings",
      subtitle: "Customize preferences",
      icon: Settings,
      href: "/faculty/settings",
      onClick: null,
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] pb-3 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        Quick Actions
      </h2>

      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] pt-1">
        {actions.map((act) => {
          const Icon = act.icon;
          const content = (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-tight">
                    {act.title}
                  </h3>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5">
                    {act.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0" />
            </>
          );

          if (act.href) {
            return (
              <Link
                key={act.id}
                href={act.href}
                onClick={act.onClick || undefined}
                className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="w-full text-left py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
