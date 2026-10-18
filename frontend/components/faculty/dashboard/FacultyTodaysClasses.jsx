"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

export default function FacultyTodaysClasses() {
  const classes = [
    {
      id: "dsa",
      time: "09:00 - 10:00",
      duration: "60 mins",
      subject: "Data Structures & Algorithms",
      batch: "B.Tech CSE • Sem 5 • A-Block",
      status: "Ongoing",
      timeColor: "bg-[#E6F7F0] text-[#0E7A57] dark:bg-[#073629] dark:text-[#20D39B] border-[#159B72]/20",
      statusBadge: "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/30",
    },
    {
      id: "webdev",
      time: "11:00 - 12:00",
      duration: "60 mins",
      subject: "Web Development",
      batch: "B.Tech CSE • Sem 3 • B-Block",
      status: "Upcoming",
      timeColor: "bg-[#EBF5FF] text-[#1D4ED8] dark:bg-[#0A2E47] dark:text-[#60A5FA] border-[#2563EB]/20",
      statusBadge: "bg-[#2563EB]/15 text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/30",
    },
    {
      id: "dbms",
      time: "02:00 - 03:00",
      duration: "60 mins",
      subject: "Database Management Systems",
      batch: "B.Tech CSE • Sem 5 • A-Block",
      status: "Upcoming",
      timeColor: "bg-[#F3E8FF] text-[#7E22CE] dark:bg-[#34164D] dark:text-[#C084FC] border-[#9333EA]/20",
      statusBadge: "bg-[#9333EA]/15 text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/30",
    },
    {
      id: "cn",
      time: "04:00 - 05:00",
      duration: "60 mins",
      subject: "Computer Networks",
      batch: "B.Tech CSE • Sem 3 • B-Block",
      status: "Upcoming",
      timeColor: "bg-[#FFF4E5] text-[#C2410C] dark:bg-[#3D2509] dark:text-[#FB923C] border-[#EA580C]/20",
      statusBadge: "bg-[#EA580C]/15 text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/30",
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
            Today&apos;s Classes
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#658278] dark:text-[#789991] font-medium bg-[#F7FBF9] dark:bg-[#082A24] px-2.5 py-1 rounded-lg border border-[#E2EBE7] dark:border-[#10372F]">
          <Calendar className="w-3.5 h-3.5" />
          <span>Tue, 16 Sep 2025</span>
        </div>
      </div>

      {/* Classes list */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {classes.map((cls) => (
          <Link
            key={cls.id}
            href={`/faculty/classes/${cls.id}`}
            className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors group cursor-pointer"
          >
            {/* Left: Time & Class Details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 min-w-0">
              <div
                className={`px-2.5 py-1 rounded-lg border text-[11.5px] font-bold shrink-0 self-start sm:self-auto ${cls.timeColor}`}
              >
                <span>{cls.time}</span>
                <span className="opacity-75 font-normal ml-1">({cls.duration})</span>
              </div>

              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                  {cls.subject}
                </h3>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
                  {cls.batch}
                </p>
              </div>
            </div>

            {/* Right: Status Pill & Chevron */}
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cls.statusBadge}`}
              >
                {cls.status}
              </span>
              <ChevronRight className="w-4 h-4 text-[#A7C8BD] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
