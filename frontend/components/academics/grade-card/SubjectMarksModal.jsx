"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Award, ExternalLink, BookOpen, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function SubjectMarksModal({
  isOpen,
  onClose,
  subject,
  semesterLabel = "Semester VII",
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !subject) return null;

  const breakdowns = subject.marksBreakdown || [];
  const subjectHref = `/student/academics/subjects/${subject.slug || subject.code}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subject-marks-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-start justify-between gap-3 bg-[#F7FBF9] dark:bg-[#06241F]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                {subject.code}
              </span>
              <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                {semesterLabel} • {subject.credits} Credits
              </span>
            </div>
            <h3
              id="subject-marks-title"
              className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-1"
            >
              {subject.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close marks breakdown"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Summary Score Banner */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-[#082A24] border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider">
                Overall Assessment
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
                  {subject.total > 0 ? `${subject.total}` : "Pending"}
                </span>
                {subject.total > 0 && (
                  <span className="text-xs text-[#5C786E] dark:text-[#8AA89F]">/ 100</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider block font-bold">
                  Grade Point
                </span>
                <span className="text-lg font-black text-emerald-800 dark:text-emerald-300">
                  {subject.gradePoint !== null ? `${subject.gradePoint} / 10` : "—"}
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#06241F] border border-emerald-300 dark:border-emerald-700/60 font-black text-lg text-emerald-800 dark:text-emerald-300">
                {subject.grade}
              </div>
            </div>
          </div>

          {/* Component Breakdown Table/List */}
          <div>
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2.5">
              Evaluation Components & Rubrics
            </h4>

            {breakdowns.length === 0 ? (
              <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] py-4 text-center">
                Detailed continuous evaluation breakdown not yet compiled for this course.
              </p>
            ) : (
              <div className="space-y-2.5">
                {breakdowns.map((comp, idx) => {
                  const percent =
                    comp.scored !== null && comp.max > 0
                      ? Math.round((comp.scored / comp.max) * 100)
                      : null;

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                          {comp.component}
                        </span>
                        <div className="flex items-baseline gap-1 font-bold">
                          <span
                            className={
                              comp.scored !== null
                                ? "text-emerald-800 dark:text-emerald-300 text-sm font-extrabold"
                                : "text-amber-600 dark:text-amber-400"
                            }
                          >
                            {comp.scored !== null ? comp.scored : "Pending"}
                          </span>
                          <span className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                            / {comp.max}
                          </span>
                        </div>
                      </div>

                      {/* Mini Bar */}
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        {percent !== null ? (
                          <div
                            className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        ) : (
                          <div className="h-full w-1/3 bg-amber-400 dark:bg-amber-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Faculty / Academic Remark */}
          {subject.remarks && (
            <div className="p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24]/60 border border-[#D8E8E2] dark:border-[#16463D] text-xs">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
                Instructor Remarks
              </span>
              <p className="text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
                {subject.remarks}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#06241F] flex items-center justify-between gap-3">
          <Link
            href={subjectHref}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors"
          >
            <span>Open Subject Workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] dark:bg-[#0B3024] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-gray-50 dark:hover:bg-[#0F4237] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
