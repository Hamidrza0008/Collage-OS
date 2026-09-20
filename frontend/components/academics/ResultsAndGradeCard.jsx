"use client";

import { Download, CheckCircle2, Clock } from "lucide-react";
import { RESULTS_AND_GRADE_CARD } from "./academicsData";

export default function ResultsAndGradeCard({ onDownloadGradeCard }) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-4.5 flex flex-col justify-between">
      {/* Header */}
      <div className="mb-2.5">
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Results & Grade Card
        </h2>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
          View and download your semester results
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#10372F] text-[10.5px] font-semibold text-[#658278] dark:text-[#789991]">
              <th className="pb-1.5 font-semibold">Semester</th>
              <th className="pb-1.5 font-semibold text-center">Result Status</th>
              <th className="pb-1.5 font-semibold text-center">CGPA</th>
              <th className="pb-1.5 font-semibold text-right">Grade Card</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#10372F]/60">
            {RESULTS_AND_GRADE_CARD.map((row) => (
              <tr
                key={row.semester}
                className="hover:bg-gray-50/70 dark:hover:bg-[#041D18]/70 transition-colors"
              >
                <td className="py-2 font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  {row.semester}
                </td>
                <td className="py-2 text-center">
                  {row.status === "Completed" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{row.status}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{row.status}</span>
                    </span>
                  )}
                </td>
                <td className="py-2 text-center font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {row.cgpa}
                </td>
                <td className="py-2 text-right">
                  {row.downloadable ? (
                    <button
                      type="button"
                      onClick={() => onDownloadGradeCard(row.semester)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800 text-[10.5px] font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <span className="text-gray-400 dark:text-[#4F6E64] font-medium text-xs mr-3">
                      -
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
