"use client";

import { X, AlertTriangle, XCircle } from "lucide-react";

export default function CancelReportModal({
  isOpen,
  onClose,
  report,
  onConfirmCancel,
}) {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Cancel this Lost &amp; Found report?
            </h3>
            <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] leading-relaxed">
              This will close case <span className="font-mono font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{report.caseId}</span> ({report.itemName}) and remove it from your active search cases.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] text-[11px] text-[#658278] dark:text-[#8BA69D] text-left">
            The record will remain in your history under &ldquo;Cancelled&rdquo; so you can review previous case activity at any time.
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] bg-gray-100 dark:bg-[#082A24] hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Keep Report
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmCancel(report.id);
                onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer shadow-xs"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
