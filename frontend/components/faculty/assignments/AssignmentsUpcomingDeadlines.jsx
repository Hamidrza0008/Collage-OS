"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function AssignmentsUpcomingDeadlines() {
  const deadlines = [
    {
      id: "d1",
      title: "DSA Practice Set - Arrays",
      due: "Sep 18, 2025 • Today",
      dotColor: "bg-[#EA580C]",
      priority: "High",
      badgeColor: "bg-[#FEE2E2] dark:bg-[#450A0A] text-[#DC2626] dark:text-[#F87171]",
    },
    {
      id: "d2",
      title: "Web Dev - Portfolio Project",
      due: "Sep 20, 2025 • 2 days left",
      dotColor: "bg-[#9333EA]",
      priority: "Medium",
      badgeColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C]",
    },
    {
      id: "d3",
      title: "DBMS - ER Diagram",
      due: "Sep 22, 2025 • 4 days left",
      dotColor: "bg-[#EA580C]",
      priority: "Medium",
      badgeColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C]",
    },
    {
      id: "d4",
      title: "OS - Assignment 2",
      due: "Sep 26, 2025 • 1 week left",
      dotColor: "bg-[#159B72]",
      priority: "Low",
      badgeColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Upcoming Deadlines
          </h2>
        </div>

        <Link
          href="#all-deadlines"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Deadlines List */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] pt-1">
        {deadlines.map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${item.dotColor}`} />
                <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                  {item.title}
                </h3>
              </div>
              <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 ml-4 truncate">
                {item.due}
              </p>
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor}`}
            >
              {item.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
