"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, FileCheck2, AlertCircle } from "lucide-react";

export default function NoticeAcknowledgementModal({
  notice,
  isOpen,
  onClose,
  onConfirmAcknowledgement,
}) {
  const [agreed, setAgreed] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !notice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onConfirmAcknowledgement({
        timestamp: new Date().toLocaleString(),
        notes,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Notice Acknowledgement
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                Official Institutional Record Submission
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Circular Reference Summary */}
          <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#10372F] text-xs">
            <div className="font-mono text-[11px] text-[#159B72] dark:text-[#20D39B] font-bold">
              {notice.referenceNumber}
            </div>
            <div className="font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-1 leading-snug">
              {notice.title}
            </div>
            <div className="text-[11px] text-[#658278] dark:text-[#789991] mt-1">
              Issued by: {notice.department}
            </div>
          </div>

          {/* Student Info Card */}
          <div className="p-3 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#082A24]/40 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
                Logged in Student
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">Hamid Rza</span>
              <span className="text-[11px] text-[#658278] dark:text-[#789991] ml-2">
                (21BCSE042 • CSE 7th Sem)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified</span>
            </div>
          </div>

          {/* Optional Inquiries or Comments */}
          <div>
            <label className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Optional Student Remarks / Query to Department:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Acknowledged, note that my elective submission was completed..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Mandatory Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-0.5 rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="text-xs font-medium text-[#0B3024] dark:text-[#E2F1EC] leading-relaxed">
              I hereby confirm that I have thoroughly read, understood, and agreed to adhere to all directives,
              dates, and regulations detailed in this official notification.
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-50 dark:hover:bg-[#082A24] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreed || submitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0F805D] text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              {submitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Acknowledgement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
