"use client";

import { ArrowUpRight, GraduationCap } from "lucide-react";
import { UPCOMING_EXAMS } from "./academicsData";

export default function UpcomingExamsCard() {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-4.5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Upcoming Exams
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            End-semester schedule
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Exam List */}
      <div className="space-y-2">
        {UPCOMING_EXAMS.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center justify-between p-2 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/50 hover:bg-gray-50 dark:hover:bg-[#041D18] transition-colors"
          >
            {/* Left: Date Badge + Exam details */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/40 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 leading-none">
                  {exam.day}
                </span>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight mt-0.5">
                  {exam.month}
                </span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
                  {exam.name}
                </h3>
                <div className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] font-medium mt-0.5 flex items-center gap-1.5">
                  <span>{exam.code}</span>
                  <span>•</span>
                  <span>{exam.time}</span>
                </div>
              </div>
            </div>

            {/* Right: Tag */}
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ml-2 ${
                exam.type === "Theory"
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30"
                  : "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/30"
              }`}
            >
              {exam.type}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational Callout Banner */}
      <div className="mt-2.5 p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/30 flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-300">
        <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="text-[11px] font-medium leading-snug">
          Exam preparation is the key to success. All the best! 🎓
        </span>
      </div>
    </div>
  );
}
