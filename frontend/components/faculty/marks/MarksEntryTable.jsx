"use client";

import React from "react";
import Image from "next/image";
import {
  AlertCircle,
  Check,
  UserX,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { calculateGrade } from "./facultyMarksData";

export default function MarksEntryTable({
  students = [],
  maxMarks = 30,
  validationErrors = {},
  onMarkChange,
  onToggleAbsent,
  onResetStudent,
  onQuickFillAll,
  onClearAllUnsaved,
  isLocked = false,
}) {
  if (!students || students.length === 0) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#DDF4EB] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No Students Found
        </h3>
        <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm mx-auto">
          No student records matched your current search query or filter selection. Try adjusting the search keywords or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs overflow-hidden flex flex-col">
      {/* Table Header Bar & Bulk Actions */}
      <div className="px-4 sm:px-5 py-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
            Student Marks Ledger ({students.length} Records)
          </span>
          <span className="text-[11px] text-[#658278] dark:text-[#789991]">
            Max Marks: <strong className="text-[#159B72] dark:text-[#20D39B]">{maxMarks}</strong> • Passing Threshold: 40% ({Math.ceil(maxMarks * 0.4)} Marks)
          </span>
        </div>

        {!isLocked && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onQuickFillAll}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] bg-[#DDF4EB] dark:bg-[#073629] hover:bg-[#c9edd9] dark:hover:bg-[#0b4737] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              Fill Max Marks
            </button>
            <button
              type="button"
              onClick={onClearAllUnsaved}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-[#DC2626] dark:text-[#F87171] bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#FAFDFB] dark:bg-[#051D18] text-[#4A6B60] dark:text-[#8AAEA1] font-bold uppercase tracking-wider text-[10.5px]">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[200px]">Student Details</th>
              <th className="py-3 px-4 w-28 text-center">Max Marks</th>
              <th className="py-3 px-4 w-36">Marks Obtained</th>
              <th className="py-3 px-4 w-24 text-center">Percentage</th>
              <th className="py-3 px-4 w-24 text-center">Letter Grade</th>
              <th className="py-3 px-4 w-28 text-center">Status</th>
              <th className="py-3 px-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
            {students.map((student, idx) => {
              const error = validationErrors[student.roll];
              const isAbsent = student.status === "Absent";
              const numericMarks = student.marks !== null && student.marks !== undefined && student.marks !== "" ? Number(student.marks) : "";
              const gradeData = isAbsent
                ? { grade: "AB", label: "Absent", badgeColor: "bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-400/30" }
                : calculateGrade(numericMarks, maxMarks);

              const percentage = !isAbsent && numericMarks !== "" && !isNaN(numericMarks)
                ? `${((numericMarks / maxMarks) * 100).toFixed(0)}%`
                : "--";

              return (
                <tr
                  key={student.roll}
                  className={`hover:bg-[#F9FCFA] dark:hover:bg-[#082A24]/60 transition-colors ${
                    error ? "bg-rose-50/40 dark:bg-rose-950/20" : ""
                  }`}
                >
                  {/* Row Number */}
                  <td className="py-3 px-4 text-center text-[#658278] dark:text-[#789991] font-mono text-[11px]">
                    {idx + 1}
                  </td>

                  {/* Student Info: Avatar + Name + Roll */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#DDF4EB] dark:bg-[#073629] shrink-0 border border-[#D8E8E2] dark:border-[#16463D]">
                        <Image
                          src={student.avatar || "/assets/profile/avatar.jpg"}
                          alt={student.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                          {student.name}
                        </span>
                        <span className="text-[10.5px] font-mono text-[#159B72] dark:text-[#20D39B]">
                          {student.roll}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Max Marks (Read-Only) */}
                  <td className="py-3 px-4 text-center font-semibold text-[#4A6B60] dark:text-[#8AAEA1]">
                    {maxMarks}
                  </td>

                  {/* Marks Obtained Input Field with live validation */}
                  <td className="py-3 px-4">
                    {isAbsent ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs">
                        <UserX className="w-3.5 h-3.5" />
                        <span>Absent</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max={maxMarks}
                            step="0.5"
                            disabled={isLocked}
                            placeholder="0-30"
                            value={student.marks ?? ""}
                            onChange={(e) => onMarkChange(student.roll, e.target.value)}
                            className={`w-28 h-9 px-3 rounded-lg text-xs font-bold font-mono transition-all text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none ${
                              error
                                ? "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 focus:ring-2 focus:ring-rose-500/30"
                                : "border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] focus:ring-2 focus:ring-[#159B72]/30"
                            } disabled:opacity-60 disabled:cursor-not-allowed`}
                          />
                        </div>
                        {error && (
                          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1 leading-tight">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {error}
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Percentage */}
                  <td className="py-3 px-4 text-center font-mono font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                    {percentage}
                  </td>

                  {/* Letter Grade Badge */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${gradeData.badgeColor}`}
                    >
                      {gradeData.grade}
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        student.status === "Graded"
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                          : student.status === "Absent"
                          ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                          : student.status === "Needs Review"
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {student.status === "Graded" && <Check className="w-3 h-3" />}
                      {student.status}
                    </span>
                  </td>

                  {/* Row Actions */}
                  <td className="py-3 px-4 text-right">
                    {!isLocked && (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onToggleAbsent(student.roll)}
                          title={isAbsent ? "Mark as Present" : "Mark as Absent"}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isAbsent
                              ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                              : "bg-[#F7FBF9] dark:bg-[#082A24] border-[#D8E8E2] dark:border-[#16463D] text-[#658278] dark:text-[#789991] hover:text-rose-600 dark:hover:text-rose-400"
                          }`}
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onResetStudent(student.roll)}
                          title="Reset student score"
                          className="p-1.5 rounded-lg bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="px-4 sm:px-5 py-3 border-t border-[#F0F5F2] dark:border-[#0E352E] bg-[#FAFDFB] dark:bg-[#06241F] flex items-center justify-between text-xs text-[#658278] dark:text-[#789991] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <span>Real-time evaluation: Changes save automatically to session storage.</span>
        </div>
        <div>
          Showing {students.length} student entries
        </div>
      </div>
    </div>
  );
}
