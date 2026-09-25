"use client";

import { Bell, ArrowRight, Volume2 } from "lucide-react";
import Link from "next/link";

const NOTICES = [
  {
    id: "not-2",
    title: "Mid Sem Exam Schedule Released",
    date: "18 Aug",
    cell: "Exam Cell",
    isNew: true,
  },
  {
    id: "not-4",
    title: "College Fest • Aarohan 2025",
    date: "16 Aug",
    cell: "Council",
    isNew: false,
  },
  {
    id: "not-1",
    title: "Class Representative Election",
    date: "14 Aug",
    cell: "Academic",
    isNew: false,
  },
  {
    id: "not-6",
    title: "Library Timings Extended",
    date: "12 Aug",
    cell: "Admin",
    isNew: false,
  },
];

export default function RecentNotices() {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Recent Notices
            </h2>
          </div>

          <Link
            href="/student/notices"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Notice Items */}
        <div className="mt-2.5 space-y-1.5">
          {NOTICES.map((notice, index) => (
            <Link
              key={notice.id || index}
              href={`/student/notices/${notice.id}`}
              className="py-1 px-2 rounded-lg bg-[#F7FBF9]/60 dark:bg-[#031A16]/40 border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-all flex items-center justify-between gap-2 cursor-pointer group block"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Volume2 className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                <span className="text-[11.5px] font-medium text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                  {notice.title}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 text-[10px] text-[#658278] dark:text-[#789991]">
                {notice.isNew && (
                  <span className="px-1 py-0.2 rounded text-[8.5px] font-bold bg-[#159B72] text-white">
                    New
                  </span>
                )}
                <span>{notice.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
