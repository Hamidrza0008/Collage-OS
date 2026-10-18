"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Trophy, Award, Users, ChevronRight, ArrowRight } from "lucide-react";

export default function FacultyUpcomingEvents() {
  const events = [
    {
      id: "e1",
      title: "TechFest 2025",
      details: "Sep 20, 2025 • College Ground",
      icon: Trophy,
      iconColor: "text-[#EA580C] dark:text-[#FB923C]",
      iconBg: "bg-[#FFF4E5] dark:bg-[#3D2509]",
    },
    {
      id: "e2",
      title: "Faculty Development Program",
      details: "Sep 25, 2025 • Seminar Hall",
      icon: Award,
      iconColor: "text-[#DC2626] dark:text-[#F87171]",
      iconBg: "bg-[#FEE2E2] dark:bg-[#450A0A]",
    },
    {
      id: "e3",
      title: "Department Meeting",
      details: "Sep 28, 2025 • HOD Office",
      icon: Users,
      iconColor: "text-[#159B72] dark:text-[#20D39B]",
      iconBg: "bg-[#E6F7F0] dark:bg-[#073629]",
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
            Upcoming Events
          </h2>
        </div>

        <Link
          href="/faculty/events"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Events List */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <Link
              key={event.id}
              href="/faculty/events"
              className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${event.iconBg} ${event.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                    {event.title}
                  </h3>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                    {event.details}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
