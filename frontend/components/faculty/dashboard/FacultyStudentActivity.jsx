"use client";

import React from "react";
import Link from "next/link";
import { Users, TrendingUp, FileText, Star, ArrowRight } from "lucide-react";

export default function FacultyStudentActivity() {
  const stats = [
    {
      id: "students",
      label: "Total Students",
      value: "156",
      icon: Users,
      iconColor: "text-[#159B72] dark:text-[#20D39B]",
      bgColor: "bg-[#E6F7F0] dark:bg-[#073629]",
    },
    {
      id: "attendance",
      label: "Avg. Attendance",
      value: "82%",
      icon: TrendingUp,
      iconColor: "text-[#159B72] dark:text-[#20D39B]",
      bgColor: "bg-[#E6F7F0] dark:bg-[#073629]",
    },
    {
      id: "assignments",
      label: "Assignments Submitted",
      value: "118 / 156",
      icon: FileText,
      iconColor: "text-[#159B72] dark:text-[#20D39B]",
      bgColor: "bg-[#E6F7F0] dark:bg-[#073629]",
    },
    {
      id: "performance",
      label: "Overall Performance",
      value: "76%",
      icon: Star,
      iconColor: "text-[#EA580C] dark:text-[#FB923C]",
      bgColor: "bg-[#FFF4E5] dark:bg-[#3D2509]",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Student Activity <span className="font-normal text-xs text-[#658278] dark:text-[#789991]">(Your Classes)</span>
          </h2>
        </div>

        <Link
          href="/faculty/students"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3.5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24]/50 border border-[#E8F2ED] dark:border-[#10372F]"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${stat.bgColor} ${stat.iconColor}`}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991] block truncate">
                  {stat.label}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
