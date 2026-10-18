"use client";

import React from "react";
import { Database } from "lucide-react";

export default function ResourcesSidebarStorage({
  usedGB = 68.4,
  totalGB = 100,
  percentage = 68,
}) {
  // SVG circular calculation
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-0.5">
        <Database className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Storage Usage
        </h2>
      </div>

      {/* Progress Area */}
      <div className="flex items-center gap-4">
        {/* Circular Gauge */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-[#E8F1ED] dark:text-[#082A24]"
            />
            {/* Value circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="text-[#159B72] dark:text-[#20D39B] transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            {percentage}%
          </span>
        </div>

        {/* Text and Bar */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              {usedGB} GB{" "}
              <span className="text-[#658278] dark:text-[#789991] font-normal">
                / {totalGB} GB
              </span>
            </span>
            <span className="text-xs text-[#658278] dark:text-[#789991]">
              Used
            </span>
          </div>

          {/* Horizontal mini bar */}
          <div className="w-full h-2 rounded-full bg-[#E8F1ED] dark:bg-[#082A24] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#159B72] dark:bg-[#20D39B]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
