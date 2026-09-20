"use client";

import { SUBMISSION_STATS } from "./assignmentsData";

export default function SubmissionStatsCard() {
  const { completionPercentage, submittedCount, totalCount, overdueCount, pendingCount } =
    SUBMISSION_STATS;

  // Circular progress calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5">
      {/* Title */}
      <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight mb-3">
        Submission Stats
      </h2>

      {/* Circular Progress Gauge & Summary */}
      <div className="flex items-center gap-4 py-1">
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-emerald-100/70 dark:text-[#082A24]"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#10B981"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
              {completionPercentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Completed
          </span>
          <span className="text-[11.5px] font-medium text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            {submittedCount} / {totalCount} assignments
          </span>
        </div>
      </div>

      {/* 3 Metric Pill Boxes */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-[#10372F]">
        {/* Overdue */}
        <div className="p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 text-center">
          <span className="text-base font-extrabold text-rose-600 dark:text-rose-400 block leading-tight">
            {overdueCount}
          </span>
          <span className="text-[10px] font-semibold text-rose-700/80 dark:text-rose-400/80">
            Overdue
          </span>
        </div>

        {/* Pending */}
        <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 text-center">
          <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 block leading-tight">
            {pendingCount}
          </span>
          <span className="text-[10px] font-semibold text-amber-700/80 dark:text-amber-400/80">
            Pending
          </span>
        </div>

        {/* Submitted */}
        <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-center">
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 block leading-tight">
            {submittedCount}
          </span>
          <span className="text-[10px] font-semibold text-emerald-700/80 dark:text-emerald-400/80">
            Submitted
          </span>
        </div>
      </div>
    </div>
  );
}
