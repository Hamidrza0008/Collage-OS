"use client";

import { useState } from "react";
import { FileEdit, X, CheckCircle2 } from "lucide-react";

export default function ApplicationNotesModal({
  isOpen,
  application,
  onClose,
  onSave,
}) {
  const [content, setContent] = useState(application?.notes || "");
  const [saved, setSaved] = useState(false);

  if (!isOpen || !application) return null;

  const handleSave = () => {
    onSave(application.id, content);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#06241F] dark:text-white">
                Candidate Notes
              </h3>
              <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 truncate max-w-[240px]">
                {application.company} • {application.opportunityTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70">
          Private notes are visible only to you on this device. Use them to track interview prep, referral contacts, or dates.
        </p>

        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add reminders, interview topics, questions asked, or referral contacts..."
          className="w-full p-3.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] resize-y"
        />

        <div className="flex items-center justify-between pt-1">
          {saved ? (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Saved!
            </span>
          ) : <span />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer shadow-xs"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
