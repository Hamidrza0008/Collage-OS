"use client";

import React, { useState } from "react";
import { Flag, X, CheckCircle2 } from "lucide-react";

const REPORT_REASONS = [
  "Spam or Unsolicited Promotion",
  "Misleading Information or Impersonation",
  "Inappropriate or Harassing Content",
  "Duplicate Community / Inactive Group",
  "Violates Campus Guidelines / Other",
];

export default function ReportCommunityModal({ isOpen, onClose, communityName, onReportSubmitted }) {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onReportSubmitted) {
        onReportSubmitted(selectedReason);
      }
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-[#021512] border border-emerald-950/20 dark:border-emerald-500/20 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-emerald-900/40 dark:text-emerald-100/40 hover:text-emerald-900 dark:hover:text-emerald-100 rounded-lg hover:bg-emerald-500/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-50">
              Report Submitted
            </h3>
            <p className="text-xs text-emerald-800/70 dark:text-emerald-100/60 max-w-xs">
              Thank you for keeping our campus safe. Our student council and community moderators will review this club.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 flex-shrink-0">
                <Flag className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 pr-6">
                <h3
                  id="report-modal-title"
                  className="text-base font-bold text-emerald-950 dark:text-emerald-50"
                >
                  Report {communityName}
                </h3>
                <p className="text-xs text-emerald-800/70 dark:text-emerald-100/60">
                  Select the issue that applies. Reports are anonymous and reviewed by campus moderators.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-semibold text-emerald-950/70 dark:text-emerald-100/70 uppercase tracking-wider">
                Reason for reporting
              </label>
              <div className="space-y-1.5">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedReason === reason
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-50 font-medium"
                        : "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-950/10 dark:border-emerald-500/10 text-emerald-900/80 dark:text-emerald-100/70 hover:border-emerald-500/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-emerald-950/70 dark:text-emerald-100/70 uppercase tracking-wider">
                Additional Details (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide relevant links, timestamps, or context..."
                rows={2}
                className="w-full text-xs p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-950/10 dark:border-emerald-500/20 text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/40 dark:placeholder:text-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-100 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
