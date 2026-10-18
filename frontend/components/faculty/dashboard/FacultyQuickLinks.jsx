"use client";

import React from "react";
import Link from "next/link";
import { Link2, Calendar, FilePlus, CalendarCheck, Users, ChevronRight } from "lucide-react";

export default function FacultyQuickLinks() {
  const links = [
    {
      label: "View Timetable",
      href: "/faculty/timetable",
      icon: Calendar,
    },
    {
      label: "Create Assignment",
      href: "/faculty/assignments",
      icon: FilePlus,
    },
    {
      label: "Upload Marks",
      href: "/faculty/marks",
      icon: CalendarCheck,
    },
    {
      label: "View Student Profiles",
      href: "/faculty/students",
      icon: Users,
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 pb-3 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
          <Link2 className="w-4 h-4" />
        </div>
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Quick Links
        </h2>
      </div>

      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] pt-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
                  {link.label}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
