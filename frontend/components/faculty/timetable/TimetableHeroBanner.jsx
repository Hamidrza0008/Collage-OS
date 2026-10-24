"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, Clock, CalendarClock, UserCheck } from "lucide-react";

export default function TimetableHeroBanner({
  facultyProfile,
  currentWeekNumber,
  weekDateRange,
  todayString,
  onRequestScheduleChange,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B3D2F] via-[#0E4F3D] to-[#125A46] text-white shadow-md border border-[#16634E]/40">
      {/* Background Campus Illustration Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-luminosity">
        <Image
          src="/assets/dashboard/hero-campus-light.jpg"
          alt="Campus Architecture"
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2F] via-[#0B3D2F]/85 to-transparent" />
      </div>

      <div className="relative z-10 px-5 sm:px-6 py-5 sm:py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Left Side: Calendar Icon + Title + Faculty Details */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 max-w-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#159B72] border border-emerald-400/30 flex items-center justify-center shrink-0 shadow-inner mt-0.5 sm:mt-0">
            <CalendarDays className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Teaching Timetable
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                Academic Schedule
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              Weekly lecture allocations, specialized laboratory sessions, and cabin office hours for{" "}
              <strong className="text-white font-bold">{facultyProfile?.name || "Dr. Arjun Mehta"}</strong> ({facultyProfile?.shortDept || "Dept. of CSE"}).
            </p>

            <div className="flex items-center gap-3 pt-1 text-[11.5px] text-emerald-200/90 font-medium flex-wrap">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>Week {currentWeekNumber} ({weekDateRange})</span>
              </span>
              <span className="hidden sm:inline text-emerald-400/50">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Today: {todayString}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-end">
          <button
            type="button"
            onClick={onRequestScheduleChange}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-emerald-500/25 hover:bg-emerald-500/40 border border-emerald-400/40 backdrop-blur-sm transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
          >
            <CalendarClock className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
            <span>Request Schedule Change</span>
          </button>
        </div>
      </div>
    </div>
  );
}
