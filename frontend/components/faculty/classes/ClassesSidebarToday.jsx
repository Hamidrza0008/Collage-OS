"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function ClassesSidebarToday() {
  const todayClasses = [
    {
      id: "dsa",
      time: "09:00 - 10:00",
      subject: "DSA (CSE-301)",
      location: "A-Block",
      status: "Ongoing",
      statusBadge: "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/30",
    },
    {
      id: "webdev",
      time: "11:00 - 12:00",
      subject: "Web Dev (CSE-302)",
      location: "B-Block",
      status: "Upcoming",
      statusBadge: "bg-[#2563EB]/15 text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/30",
    },
    {
      id: "dbms",
      time: "02:00 - 03:00",
      subject: "DBMS (CSE-303)",
      location: "A-Block",
      status: "Upcoming",
      statusBadge: "bg-[#9333EA]/15 text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/30",
    },
    {
      id: "cn",
      time: "04:00 - 05:00",
      subject: "CN (CSE-304)",
      location: "B-Block",
      status: "Upcoming",
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

        <Link
          href="/faculty/timetable"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View Full Timetable</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Class Rows */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {todayClasses.map((cls) => (
          <div
            key={cls.id}
            className="py-3 flex items-center justify-between gap-2.5 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 rounded-xl transition-colors"
          >
            <div>
              <span className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] block">
                {cls.time}
              </span>
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-0.5">
                {cls.subject}
              </h3>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                • {cls.location}
              </p>
            </div>

            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${cls.statusBadge}`}
            >
              {cls.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
