"use client";

import { useState } from "react";
import { X, Flag, CheckCircle2 } from "lucide-react";

export default function ReportCommentModal({
  isOpen,
  onClose,
  comment,
  onReportSubmit,
}) {
  const [reason, setReason] = useState("Spam");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !comment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onReportSubmit(comment.id, reason, details);
      setSubmitted(false);
      setReason("Spam");
      setDetails("");
      onClose();
    }, 1000);
  };

  const reasons = [
    "Spam",
    "Harassment",
    "Inappropriate Content",
    "Misleading Information",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2] dark:border-[#10372F]">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Flag className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Report Comment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center space-y-2 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Report Submitted
            </h4>
            <p className="text-xs text-[#658278] dark:text-[#789991] max-w-xs">
              Thank you for keeping our campus discussions safe and supportive.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] text-xs text-[#658278] dark:text-[#789991]">
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
                Reporting comment by {comment.author?.name}:
              </span>
              <p className="line-clamp-2 italic">&ldquo;{comment.text}&rdquo;</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Reason for reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              >
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                Additional context (optional)
              </label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Help us understand the issue..."
                className="w-full p-2.5 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-[#658278] dark:text-[#789991] hover:text-[#0B3024] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors cursor-pointer shadow-xs active:scale-95"
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
