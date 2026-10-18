"use client";

import React, { useState } from "react";
import { Zap, ChevronDown } from "lucide-react";

export default function AttendanceOverviewCard() {
  const [timeframe, setTimeframe] = useState("week");

  // Donut SVG parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ≈ 238.76
  const presentPct = 82;
  const absentPct = 18;
  const presentOffset = circumference - (presentPct / 100) * circumference;

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Attendance Overview
          </h2>
        </div>

        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="h-7 pl-2.5 pr-6 text-[11px] font-semibold rounded-lg bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden cursor-pointer appearance-none"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-[#658278] pointer-events-none" />
        </div>
      </div>

      {/* Donut Chart & Breakdown */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut Chart */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
              {/* Absent track / background */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="#EA580C"
                strokeWidth="7"
                strokeOpacity="0.8"
                className="transition-all duration-700"
              />
              {/* Present stroke */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="#159B72"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={presentOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute text-xl font-black text-[#0B3024] dark:text-[#F1FAF6]">
              {presentPct}%
            </span>
          </div>

          <span className="text-[10px] font-semibold text-[#658278] dark:text-[#789991] mt-2 max-w-[120px] leading-tight">
            Overall Attendance (Assigned Classes)
          </span>
        </div>

        {/* Legend / Metrics */}
        <div className="space-y-2.5 w-full sm:w-auto text-xs font-semibold">
          {/* Present */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#0B3024] dark:text-[#F1FAF6]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#159B72]" />
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">345</span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991]">82%</span>
            </div>
          </div>

          {/* Absent */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#0B3024] dark:text-[#F1FAF6]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">76</span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991]">18%</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#F0F5F2] dark:border-[#0E352E]">
            <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991]">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              <span>Total</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">421</span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991]">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
