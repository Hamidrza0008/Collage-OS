"use client";

import { TrendingUp, ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SEMESTER_DATA = [
  { sem: "Sem 1", sgpa: 7.2 },
  { sem: "Sem 2", sgpa: 7.45 },
  { sem: "Sem 3", sgpa: 7.6 },
  { sem: "Sem 4", sgpa: 7.85 },
  { sem: "Sem 5", sgpa: 7.92 },
  { sem: "Sem 6", sgpa: 8.05 },
  { sem: "Sem 7", sgpa: 8.24, current: true },
];

export default function AcademicPerformance() {
  const [hoveredSem, setHoveredSem] = useState(null);

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Academic Performance
            </h2>
          </div>

          <Link
            href="/academics"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>View Report</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Top Metric */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] text-[#658278] dark:text-[#789991] font-medium">
              CGPA
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
              8.24
            </span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-[#20D39B] bg-emerald-50 dark:bg-[#123F35] px-1 py-0.2 rounded">
              <ArrowUp className="w-2.5 h-2.5" />
              +0.32
            </span>
          </div>

          {hoveredSem && (
            <span className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B]">
              {hoveredSem.sem}: {hoveredSem.sgpa}
            </span>
          )}
        </div>

        {/* Compact Bar Chart */}
        <div className="mt-2 pt-1">
          <div className="h-16 flex items-end justify-between gap-1.5 px-0.5">
            {SEMESTER_DATA.map((item, index) => {
              const heightPercent = (item.sgpa / 10) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setHoveredSem(item)}
                  onMouseLeave={() => setHoveredSem(null)}
                >
                  {/* Bar */}
                  <div className="w-full max-w-[16px] bg-[#F1F8F5] dark:bg-[#0A2A24] rounded-t-sm h-full flex items-end">
                    <div
                      className={`w-full rounded-t-xs transition-all duration-300 ${
                        item.current
                          ? "bg-[#159B72] dark:bg-[#20D39B]"
                          : "bg-[#159B72]/50 dark:bg-[#20D39B]/50 group-hover:bg-[#159B72] dark:group-hover:bg-[#20D39B]"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  {/* Label */}
                  <span
                    className={`mt-1.5 text-[9px] leading-none ${
                      item.current
                        ? "font-bold text-[#159B72] dark:text-[#20D39B]"
                        : "text-[#658278] dark:text-[#789991]"
                    }`}
                  >
                    {item.sem.replace("Sem ", "S")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
