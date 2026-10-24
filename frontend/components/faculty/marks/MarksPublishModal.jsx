"use client";

import React, { useState } from "react";
import { X, Lock, AlertTriangle, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export default function MarksPublishModal({
  isOpen,
  onClose,
  course,
  exam,
  stats,
  onConfirmPublish,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    onConfirmPublish();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-modal-title"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 id="publish-modal-title" className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Publish &amp; Lock Assessment Marks
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                {course?.code} — {course?.shortName} • {exam?.shortLabel}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-[13px]">
          {/* Institutional Governance Warning */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-[11.5px] leading-relaxed">
              <strong className="block font-bold mb-0.5">Official Academic Record Sign-Off</strong>
              Once published, these scores will immediately reflect in enrolled students’ semester grade cards and SGPA calculations. In accordance with CSMU academic bylaws, subsequent grade edits require HOD/Dean authorization.
            </div>
          </div>

          {/* Assessment Summary Snapshot */}
          <div className="p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A6B60] dark:text-[#8AAEA1] block">
              Assessment Overview
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]">
                <span className="text-[10px] text-[#658278] dark:text-[#789991] block">Total Students</span>
                <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                  {stats?.totalStudents || 0}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]">
                <span className="text-[10px] text-[#658278] dark:text-[#789991] block">Graded</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {stats?.gradedCount || 0}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]">
                <span className="text-[10px] text-[#658278] dark:text-[#789991] block">Average Mark</span>
                <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                  {stats?.averageMarks || "--"}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]">
                <span className="text-[10px] text-[#658278] dark:text-[#789991] block">Pass Rate</span>
                <span className="text-base font-extrabold text-teal-600 dark:text-teal-400">
                  {stats?.passPercentage || 0}%
                </span>
              </div>
            </div>

            {stats?.pendingCount > 0 && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold text-center">
                ⚠️ Notice: {stats.pendingCount} student(s) still have unentered marks or are pending review.
              </p>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 border-t border-[#F0F5F2] dark:border-[#0E352E] bg-[#FAFDFB] dark:bg-[#051D18] flex items-center justify-end gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#36594C] dark:text-[#A7C8BD] bg-[#F1F8F5] dark:bg-[#082A24] hover:bg-[#E8F1ED] transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#0E8561] active:scale-98 shadow-md shadow-[#159B72]/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Locking Marks...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm &amp; Lock Assessment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
