"use client";

import React from "react";
import Link from "next/link";
import { Megaphone, FileText, ChevronRight, ArrowRight } from "lucide-react";

export default function FacultyRecentAnnouncements() {
  const announcements = [
    {
      id: "a1",
      title: "College Fest 2025 Registrations Open",
      date: "Sep 14, 2025",
    },
    {
      id: "a2",
      title: "Library Timings Updated",
      date: "Sep 12, 2025",
    },
    {
      id: "a3",
      title: "Internal Assessment Schedule",
      date: "Sep 10, 2025",
    },
    {
      id: "a4",
      title: "Holiday on 17th Sep [Ganesh Chaturthi]",
      date: "Sep 8, 2025",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <Megaphone className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Recent Announcements
          </h2>
        </div>

        <Link
          href="/faculty/notices"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Announcements List */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {announcements.map((item) => (
          <Link
            key={item.id}
            href={`/faculty/notices`}
            className="py-3 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate">
                  {item.date}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
