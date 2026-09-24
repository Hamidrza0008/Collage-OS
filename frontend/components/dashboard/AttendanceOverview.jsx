"use client";

import { CheckSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AttendanceOverview() {
  const percentage = 78;
  const strokeDashoffset = 226 - (226 * percentage) / 100;

  const breakdown = [
    { label: "Theory Classes", attended: 16, total: 21, color: "bg-[#159B72] dark:bg-[#20D39B]" },
    { label: "Lab Classes", attended: 4, total: 6, color: "bg-[#38BDF8]" },
    { label: "Tutorials", attended: 2, total: 4, color: "bg-[#F59E0B]" },
  ];

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              My Attendance
            </h2>
          </div>

          <Link
            href="/student/academics"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Chart + Breakdown */}
        <div className="mt-3 flex items-center gap-4">
          {/* Circular Gauge */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="text-[#E8F1ED] dark:text-[#0A2A24]"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="#159B72"
                strokeWidth="7"
                strokeDasharray="213"
                strokeDashoffset={213 - (213 * percentage) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-none">
                {percentage}%
              </span>
              <span className="text-[8.5px] font-medium text-[#658278] dark:text-[#789991] uppercase tracking-wider mt-0.5">
                Overall
              </span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 min-w-0 space-y-2">
            {breakdown.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-medium leading-none">
                  <span className="text-[#36594C] dark:text-[#B5CCC5] truncate">{item.label}</span>
                  <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] shrink-0 ml-1">
                    {item.attended}/{item.total}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#F1F8F5] dark:bg-[#0A2A24] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${(item.attended / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
