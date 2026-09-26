"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function ClearReadConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  readCount = 0,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-read-title"
        className="w-full max-w-md bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3
          id="clear-read-title"
          className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]"
        >
          Clear {readCount} read notification{readCount !== 1 ? "s" : ""}?
        </h3>

        <p className="text-xs sm:text-sm text-[#4A685D] dark:text-[#8BAAA0] mt-1.5 leading-relaxed">
          This action will remove all notifications that you have already marked as read. All unread notifications and pending action items will remain in your inbox.
        </p>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#A3BFB5] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            Keep Unread
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Read</span>
          </button>
        </div>
      </div>
    </div>
  );
}
