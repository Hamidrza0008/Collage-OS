"use client";

import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { SEMESTER_GRADES } from "./academicsData";

export default function SemesterGradesCard({ onViewAllMarks }) {
  const getGradeBadge = (grade) => {
    if (grade === "A" || grade === "A-") {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          {grade}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
        {grade}
      </span>
    );
  };

  return (
    <div
      id="academics-marks"
      className="scroll-mt-24 w-full h-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Semester Grades
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            Internal evaluation & credit breakdown
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllMarks}
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All Marks</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Container stretching cleanly across the card */}
      <div className="overflow-x-auto flex-1 flex flex-col justify-between">
        <table className="w-full text-left text-xs h-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#10372F] text-[11px] font-semibold text-[#658278] dark:text-[#789991]">
              <th className="pb-2.5 font-semibold">Subject</th>
              <th className="pb-2.5 font-semibold text-center">Credits</th>
              <th className="pb-2.5 font-semibold text-center">Grade</th>
              <th className="pb-2.5 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#10372F]/60">
            {SEMESTER_GRADES.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50/70 dark:hover:bg-[#041D18]/70 transition-colors"
              >
                <td className="py-3 font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  {row.subject}
                </td>
                <td className="py-3 text-center text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                  {row.credits}
                </td>
                <td className="py-3 text-center">
                  {getGradeBadge(row.grade)}
                </td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{row.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
