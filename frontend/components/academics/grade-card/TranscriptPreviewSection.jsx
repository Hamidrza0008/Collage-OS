"use client";

import { FileText, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export default function TranscriptPreviewSection({
  semesters = [],
  student,
  onOpenFullTranscript,
}) {
  const publishedSemesters = semesters.filter((s) => s.isPublished || s.isCurrent);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Digital Academic Transcript Preview
            </h3>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
              Comprehensive chronological semester history ({student.batch})
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenFullTranscript}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#087A5B] transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <span>View Full Transcript</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Transcript Quick Summary Table */}
      <div className="overflow-x-auto w-full mt-3 scrollbar-none">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="border-b border-[#E8F1ED] dark:border-[#10372F] text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
              <th className="py-2.5 px-2">Semester</th>
              <th className="py-2.5 px-2">Session</th>
              <th className="py-2.5 px-2 text-center">Registered</th>
              <th className="py-2.5 px-2 text-center">Earned</th>
              <th className="py-2.5 px-2 text-center">SGPA</th>
              <th className="py-2.5 px-2 text-center">CGPA</th>
              <th className="py-2.5 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8F1ED] dark:divide-[#10372F]/60">
            {publishedSemesters.map((sem) => (
              <tr
                key={sem.id}
                className="hover:bg-[#F7FBF9]/90 dark:hover:bg-[#041D18]/70 transition-colors"
              >
                <td className="py-2.5 px-2 font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {sem.label}
                </td>
                <td className="py-2.5 px-2 text-[#5C786E] dark:text-[#8AA89F] font-medium">
                  {sem.academicYear} ({sem.shortLabel})
                </td>
                <td className="py-2.5 px-2 text-center text-[#5C786E] dark:text-[#8AA89F]">
                  {sem.creditsRegistered}
                </td>
                <td className="py-2.5 px-2 text-center font-bold text-emerald-800 dark:text-emerald-300">
                  {sem.creditsEarned}
                </td>
                <td className="py-2.5 px-2 text-center font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                  {sem.sgpa !== null ? sem.sgpa.toFixed(2) : "—"}
                </td>
                <td className="py-2.5 px-2 text-center font-bold text-emerald-700 dark:text-emerald-400">
                  {sem.cgpaAfterSem !== null ? sem.cgpaAfterSem.toFixed(2) : "—"}
                </td>
                <td className="py-2.5 px-2 text-right">
                  {sem.status === "Completed" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Ratified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>Provisional</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2 text-[11px] text-[#658278] dark:text-[#789991] flex items-center justify-between flex-wrap gap-2">
        <span>College OS Digital Academic Record • Cumulative: 142 / 160 Credits</span>
        <span className="font-semibold text-emerald-800 dark:text-emerald-300">
          Current Cumulative CGPA: {student.cumulativeCGPA.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
