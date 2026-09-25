"use client";

import { AlertTriangle, X } from "lucide-react";

export default function WithdrawApplicationModal({
  isOpen,
  application,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !application) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#06241F] dark:text-white">
                Withdraw Application?
              </h3>
              <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60 font-mono">
                {application.applicationId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#06241F]/80 dark:text-[#D8E8E2]/80 leading-relaxed">
          Are you sure you want to withdraw your application for{" "}
          <strong className="text-[#06241F] dark:text-white">{application.opportunityTitle}</strong> at{" "}
          <strong className="text-[#06241F] dark:text-white">{application.company}</strong>?
        </p>

        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-800 dark:text-rose-300 text-xs border border-rose-500/20">
          This will notify the campus recruitment coordinator and remove you from subsequent testing rounds. This action cannot be undone.
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            Keep Application
          </button>
          <button
            type="button"
            onClick={() => onConfirm(application)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-xs"
          >
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}
