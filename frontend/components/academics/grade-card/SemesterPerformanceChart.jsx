"use client";

import { useState } from "react";
import { TrendingUp, BarChart2 } from "lucide-react";

export default function SemesterPerformanceChart({
  semesters = [],
  selectedSemesterNumber,
  onSelectSemester,
}) {
  const [hoveredSem, setHoveredSem] = useState(null);

  // Filter only published or current semesters with an SGPA value
  const chartSemesters = semesters.filter((s) => s.sgpa !== null);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Semester Performance Progression
            </h3>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
              Descriptive term-by-term SGPA and credit evolution
            </p>
          </div>
        </div>

        {hoveredSem ? (
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {hoveredSem.shortLabel}: {hoveredSem.sgpa.toFixed(2)} SGPA
            </span>
            <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] block">
              {hoveredSem.creditsEarned} Cr Earned
            </span>
          </div>
        ) : (
          <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-semibold hidden sm:inline">
            Click bar to inspect term
          </span>
        )}
      </div>

      {/* SVG / CSS Bar Chart */}
      <div className="mt-4 pt-2">
        <div className="h-40 flex items-end justify-between gap-2 sm:gap-4 px-1 pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
          {chartSemesters.map((sem) => {
            const heightPercent = Math.max(15, Math.min(100, (sem.sgpa / 10) * 100));
            const isSelected = sem.number === selectedSemesterNumber;
            const isCurrent = sem.isCurrent;

            return (
              <div
                key={sem.id}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onClick={() => onSelectSemester(sem.number)}
                onMouseEnter={() => setHoveredSem(sem)}
                onMouseLeave={() => setHoveredSem(null)}
              >
                {/* Tooltip on Hover */}
                <div className="mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#06241F] px-1.5 py-0.5 rounded shadow-2xs border border-[#D8E8E2] dark:border-[#16463D] pointer-events-none">
                  {sem.sgpa.toFixed(2)}
                </div>

                {/* Bar */}
                <div className="w-full max-w-[40px] bg-gray-100 dark:bg-gray-800/80 rounded-t-lg overflow-hidden h-full flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-600 dark:bg-emerald-400 ring-2 ring-emerald-500/30"
                        : isCurrent
                        ? "bg-teal-500/90 dark:bg-teal-400/90"
                        : "bg-emerald-400/70 dark:bg-emerald-600/70 group-hover:bg-emerald-500"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Semester Label */}
                <span
                  className={`mt-2 text-[10.5px] font-bold transition-colors ${
                    isSelected
                      ? "text-emerald-800 dark:text-emerald-300 font-extrabold"
                      : "text-[#5C786E] dark:text-[#8AA89F] group-hover:text-[#0B3024] dark:group-hover:text-[#F1FAF6]"
                  }`}
                >
                  {sem.shortLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* CGPA Progression Timeline */}
        <div className="mt-3.5 pt-2 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#5C786E] dark:text-[#8AA89F]">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold">CGPA Progression:</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[11px] font-medium text-[#0B3024] dark:text-[#F1FAF6]">
            {chartSemesters.slice(-4).map((s) => (
              <span
                key={s.id}
                className="px-2 py-0.5 rounded-md bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]"
              >
                {s.shortLabel} → <strong className="text-emerald-700 dark:text-emerald-300">{s.cgpaAfterSem?.toFixed(2)}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
