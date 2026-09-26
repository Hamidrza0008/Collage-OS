"use client";

import { useEffect } from "react";
import { X, Printer, Download, CheckCircle2, ShieldCheck, GraduationCap } from "lucide-react";

export default function FullTranscriptModal({
  isOpen,
  onClose,
  transcriptData,
  onPrint,
  onDownload,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !transcriptData) return null;

  const { student, semesters } = transcriptData;
  const publishedSemesters = semesters.filter(
    (s) => s.isPublished || s.isCurrent || (s.subjects && s.subjects.length > 0)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="transcript-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar with Actions */}
        <div className="p-3.5 sm:p-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3 bg-[#F7FBF9] dark:bg-[#06241F] print:hidden">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h2
              id="transcript-modal-title"
              className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]"
            >
              College OS Digital Academic Record — Transcript Viewer
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#0B3024] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-50 dark:hover:bg-[#10372F] transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Transcript</span>
            </button>

            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] text-white transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Record</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Close transcript viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-[#0B3024] dark:text-[#F1FAF6]">
          {/* Formal University Header */}
          <div className="text-center pb-5 border-b-2 border-emerald-600/30 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#0B3024] dark:text-[#F1FAF6]">
              {student.college}
            </h3>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-medium">
              Affiliated with {student.university} • Recognized by AICTE & UGC
            </p>
            <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold tracking-wide uppercase">
              Provisional Consolidated Grade Record & Academic Transcript
            </div>
          </div>

          {/* Student Particulars Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
            <div>
              <span className="text-[10.5px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
                Student Full Name
              </span>
              <span className="font-extrabold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
                {student.name}
              </span>
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
                University Seat No. (USN)
              </span>
              <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
                {student.usn}
              </span>
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
                Program & Major
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {student.degree} — {student.branch}
              </span>
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
                Batch & Academic Span
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {student.batch} (Adm: {student.admissionYear})
              </span>
            </div>
          </div>

          {/* Semester-Wise Transcript Sections */}
          <div className="space-y-6">
            {publishedSemesters.map((sem) => (
              <div
                key={sem.id}
                className="border border-[#D8E8E2] dark:border-[#16463D] rounded-xl overflow-hidden shadow-2xs"
              >
                {/* Semester Sub-Header */}
                <div className="p-3 bg-[#F1F8F5] dark:bg-[#082A24] border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-[#0B3024] dark:text-[#F1FAF6]">
                      {sem.label} ({sem.academicYear})
                    </span>
                    <span className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                      • {sem.term}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-semibold">
                    <span>
                      Earned Cr: <strong className="text-emerald-700 dark:text-emerald-400">{sem.creditsEarned}</strong> / {sem.creditsRegistered}
                    </span>
                    <span>
                      SGPA: <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{sem.sgpa !== null ? sem.sgpa.toFixed(2) : "—"}</strong>
                    </span>
                    <span>
                      Cumulative CGPA: <strong className="text-emerald-800 dark:text-emerald-300">{sem.cgpaAfterSem !== null ? sem.cgpaAfterSem.toFixed(2) : "—"}</strong>
                    </span>
                  </div>
                </div>

                {/* Course Grade Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-[#10372F] text-[10.5px] font-bold text-[#658278] dark:text-[#789991] bg-white dark:bg-[#021512]">
                        <th className="py-2 px-3">Code</th>
                        <th className="py-2 px-3">Course Title</th>
                        <th className="py-2 px-3 text-center">Credits</th>
                        <th className="py-2 px-3 text-center">Marks</th>
                        <th className="py-2 px-3 text-center">Grade</th>
                        <th className="py-2 px-3 text-center">Grade Point</th>
                        <th className="py-2 px-3 text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#10372F]/50">
                      {sem.subjects.map((sub, sIdx) => (
                        <tr key={sIdx} className="hover:bg-gray-50/60 dark:hover:bg-[#041D18]/50">
                          <td className="py-2 px-3 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                            {sub.code}
                          </td>
                          <td className="py-2 px-3 font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                            {sub.name}
                          </td>
                          <td className="py-2 px-3 text-center font-bold">
                            {sub.credits}
                          </td>
                          <td className="py-2 px-3 text-center text-[#5C786E] dark:text-[#8AA89F]">
                            {sub.total > 0 ? sub.total : "—"}
                          </td>
                          <td className="py-2 px-3 text-center font-bold">
                            <span className="px-2 py-0.2 rounded font-black text-[11px] bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                              {sub.grade}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center font-bold">
                            {sub.gradePoint !== null ? sub.gradePoint : "—"}
                          </td>
                          <td className="py-2 px-3 text-right font-medium">
                            <span
                              className={
                                sub.status === "Passed"
                                  ? "text-emerald-700 dark:text-emerald-400"
                                  : "text-amber-700 dark:text-amber-400"
                              }
                            >
                              {sub.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Cumulative Degree Audit Section */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-[#082A24] border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider block">
                Cumulative Performance Summary
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
                  CGPA: {student.cumulativeCGPA.toFixed(2)}
                </span>
                <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                  (On a 10.0 Grade Point Scale)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap text-xs font-semibold">
              <div>
                <span className="text-[#5C786E] dark:text-[#8AA89F] block text-[10.5px]">Credits Earned:</span>
                <span className="text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  {student.cumulativeCreditsEarned} / {student.cumulativeCreditsRequired}
                </span>
              </div>
              <div>
                <span className="text-[#5C786E] dark:text-[#8AA89F] block text-[10.5px]">Standing:</span>
                <span className="text-[#0B3024] dark:text-[#F1FAF6] font-bold text-sm">
                  {student.academicStanding}
                </span>
              </div>
            </div>
          </div>

          {/* Legal / ERP Non-Certified Disclaimer */}
          <div className="pt-4 border-t border-[#E8F1ED] dark:border-[#10372F] text-[11px] text-[#658278] dark:text-[#789991] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>College OS Digital Academic Record Certification Note</span>
            </div>
            <p className="leading-relaxed">
              This document is a digital academic performance summary generated for student advising and portfolio review. It does not replace an officially sealed, embossed university transcript issued by the Controller of Examinations.
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              System Document ID: COS-TR-2026-8942 • Generated on: 26 September 2026 • Verified on College OS Node
            </p>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#06241F] flex items-center justify-end gap-2 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0B3024] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-gray-50 dark:hover:bg-[#0F4237] transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
