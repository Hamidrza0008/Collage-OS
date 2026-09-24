"use client";

import { useState, useEffect } from "react";
import { X, Flag, AlertTriangle, Send } from "lucide-react";

export default function ReportProjectModal({
  isOpen,
  onClose,
  projectTitle,
  onSubmit,
}) {
  const [reason, setReason] = useState("Spam");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ reason, details });
    }
    setDetails("");
    onClose();
  };

  const reportReasons = [
    "Spam",
    "Misleading information",
    "Inappropriate content",
    "Plagiarism / Copyright issue",
    "Other violation",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8F3EE] dark:border-[#10372F] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Report Project
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#8BAEA3] truncate max-w-[240px]">
                {projectTitle || "Project"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#8BAEA3] mb-1.5">
              Select Reason for Reporting
            </label>
            <div className="space-y-1.5">
              {reportReasons.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-colors ${
                    reason === r
                      ? "border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200"
                      : "border-[#E8F3EE] dark:border-[#10372F] hover:bg-gray-50 dark:hover:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6]"
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="accent-rose-600"
                  />
                  <span className="text-xs font-medium">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#8BAEA3] mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context to help campus moderators evaluate this report..."
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none resize-none placeholder:text-[#658278]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F3EE] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#658278] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Submit Report</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
