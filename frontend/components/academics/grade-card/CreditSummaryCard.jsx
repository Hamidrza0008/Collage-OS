"use client";

import { CheckCircle2, Layers, AlertCircle, ArrowUpRight } from "lucide-react";

export default function CreditSummaryCard({
  student,
  semester,
  metrics,
}) {
  const degreeTotal = student.cumulativeCreditsRequired; // 160
  const degreeEarned = student.cumulativeCreditsEarned; // 142
  const degreePercent = Math.min(100, Math.round((degreeEarned / degreeTotal) * 100));

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div>
          <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Credit Summary & Graduation Audit
          </h3>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            Institutional credit distribution for {semester.label} & degree completion
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
          {degreePercent}% Degree Completed
        </span>
      </div>

      {/* Degree Progression Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <span className="text-[#0B3024] dark:text-[#F1FAF6]">
            Cumulative Degree Credits Accrued
          </span>
          <span className="font-bold text-emerald-800 dark:text-emerald-300">
            {degreeEarned} / {degreeTotal} Credits
          </span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${degreePercent}%` }}
          />
        </div>
      </div>

      {/* Grid of Credit Statistics for this semester */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
          <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider block">
            Term Registered
          </span>
          <span className="text-lg sm:text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
            {metrics.creditsRegistered}
          </span>
          <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Credits attempted
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
          <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider block">
            Term Earned
          </span>
          <span className="text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5 block">
            {metrics.creditsEarned}
          </span>
          <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Passed courses
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
          <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider block">
            Term Pending
          </span>
          <span className="text-lg sm:text-xl font-black text-amber-700 dark:text-amber-400 mt-0.5 block">
            {Math.max(0, metrics.creditsRegistered - metrics.creditsEarned)}
          </span>
          <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Incomplete / Viva
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
          <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider block">
            Degree Remaining
          </span>
          <span className="text-lg sm:text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
            {Math.max(0, degreeTotal - degreeEarned)}
          </span>
          <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Credits to graduate
          </span>
        </div>
      </div>
    </div>
  );
}
