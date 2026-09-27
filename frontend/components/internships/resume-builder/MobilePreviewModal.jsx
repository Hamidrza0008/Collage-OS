"use client";

import React from "react";
import { X, Printer } from "lucide-react";
import LiveResumePreview from "./LiveResumePreview";

export default function MobilePreviewModal({
  isOpen,
  onClose,
  resume,
  onPrint,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-xs p-2 sm:p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#06241F] rounded-2xl mb-2 text-xs">
        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Full Resume Preview
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrint}
            className="px-3 py-1.5 rounded-xl font-bold bg-emerald-600 text-white flex items-center gap-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Scrollable Region */}
      <div className="flex-1 overflow-auto rounded-2xl">
        <LiveResumePreview resume={resume} onPrint={onPrint} />
      </div>
    </div>
  );
}
