"use client";

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  notice,
  onClose,
  onConfirmDelete,
}) {
  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#031C16] rounded-2xl border border-border-light dark:border-border-dark shadow-2xl p-6 space-y-4"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-text-primary dark:text-text-primary-dark">
              Delete Demonstration Record?
            </h3>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
              Are you sure you want to remove &ldquo;<span className="font-semibold text-text-primary dark:text-text-primary-dark">{notice.title}</span>&rdquo;? This will remove the record from your local demonstration dataset and update active counters.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border-light dark:border-border-dark">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-surface-dark text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmDelete(notice.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Record
          </button>
        </div>
      </div>
    </div>
  );
}
