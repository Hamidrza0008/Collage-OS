"use client";

import { useState } from "react";
import { X, Flag, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ReportPostModal({ isOpen, onClose, post, onReportSubmit }) {
  const [reason, setReason] = useState("Spam");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onReportSubmit(post.id, reason, details);
      setSubmitted(false);
      setReason("Spam");
      setDetails("");
      onClose();
    }, 1200);
  };

  const reportReasons = [
    "Spam",
    "Inappropriate content",
    "Misleading information",
    "Harassment or bullying",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Flag className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Report Post
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center space-y-2 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Thank You for Reporting
            </h4>
            <p className="text-xs text-[#658278] dark:text-[#789991] max-w-xs">
              Our campus moderation team has received your report and will review this content shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3.5 space-y-4">
            <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>
                Please help us maintain a safe and respectful campus environment for all students and faculty.
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                Why are you reporting this post?
              </label>
              <div className="space-y-1.5">
                {reportReasons.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                      reason === r
                        ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 text-[#0B3024] dark:text-[#F1FAF6] font-semibold"
                        : "border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={r}
                      checked={reason === r}
                      onChange={(e) => setReason(e.target.value)}
                      className="accent-emerald-600 cursor-pointer"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                Additional Details (Optional)
              </label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide any context that will help us investigate..."
                className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] resize-none outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Report Post
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
