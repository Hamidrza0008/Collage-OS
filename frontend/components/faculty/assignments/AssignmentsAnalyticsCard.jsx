"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";

export default function AssignmentsAnalyticsCard() {
  const radius = 34;
  const circumference = 2 * Math.PI * radius; // ≈ 213.6
  const rate = 67;
  const strokeOffset = circumference - (rate / 100) * circumference;

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Assignment Analytics
          </h2>
        </div>

        <Link
          href="#analytics"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Donut & Rate */}
      <div className="pt-4 flex items-center gap-4">
        <div className="relative w-22 h-22 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 84 84">
            <circle
              cx="42"
              cy="42"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-[#E2EFE9] dark:text-[#0C382D]"
            />
            <circle
              cx="42"
              cy="42"
              r={radius}
              fill="none"
              stroke="#159B72"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <span className="absolute text-base font-black text-[#0B3024] dark:text-[#F1FAF6]">
            {rate}%
          </span>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
            Submission Rate
          </h3>
          <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5">
            12 of 18 submitted
          </p>
        </div>
      </div>

      {/* Bottom 3 Stats */}
      <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] text-center">
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">6</span>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991]">Pending</span>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">2</span>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991]">Overdue</span>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#159B72]" />
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">12</span>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991]">Submitted</span>
        </div>
      </div>
    </div>
  );
}
