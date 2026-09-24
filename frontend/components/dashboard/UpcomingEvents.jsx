"use client";

import { Calendar, ArrowRight, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const EVENTS = [
  {
    day: "20",
    month: "AUG",
    title: "Tech Talk - AI in Modern World",
    venue: "Seminar Hall",
    time: "11:00 AM",
  },
  {
    day: "24",
    month: "AUG",
    title: "Coding Competition",
    venue: "Lab-1",
    time: "10:00 AM",
  },
  {
    day: "28",
    month: "AUG",
    title: "Cultural Fest - Aarohan 2025",
    venue: "Ground",
    time: "04:00 PM",
  },
];

export default function UpcomingEvents() {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/student/events"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Event Items */}
        <div className="mt-2.5 space-y-1.5">
          {EVENTS.map((evt, index) => (
            <div
              key={index}
              className="py-1 px-2 rounded-lg bg-[#F7FBF9]/60 dark:bg-[#031A16]/40 border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              {/* Compact Date Box */}
              <div className="w-8 h-8 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] flex flex-col items-center justify-center shrink-0 leading-none">
                <span className="text-xs font-extrabold text-[#159B72] dark:text-[#20D39B]">
                  {evt.day}
                </span>
                <span className="text-[8px] font-bold text-[#36594C] dark:text-[#B5CCC5] mt-0.5">
                  {evt.month}
                </span>
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate leading-tight">
                  {evt.title}
                </h3>
                <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
                  {evt.venue} &bull; {evt.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
