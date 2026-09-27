"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteVersionModal({
  isOpen,
  onClose,
  onConfirm,
  versionName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-[#021512] border border-emerald-950/20 dark:border-emerald-500/20 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-emerald-900/40 dark:text-emerald-100/40 hover:text-emerald-900 dark:hover:text-emerald-100 rounded-lg hover:bg-emerald-500/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Delete Resume Version?
            </h3>
            <p className="text-xs text-[#658278] dark:text-[#8AA89F] leading-relaxed">
              Are you sure you want to delete <strong>&quot;{versionName}&quot;</strong>? This only removes this specific resume configuration. Your underlying profile, projects, and achievements will remain completely safe.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Delete Version
          </button>
        </div>
      </div>
    </div>
  );
}
