"use client";

import React, { useEffect } from "react";
import { X, Download, FileText, Clock, HardDrive, Trash2 } from "lucide-react";

export default function ViewDownloadsModal({
  isOpen,
  downloads = [],
  onClose,
  onClearDownloads,
}) {
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

  const totalDownloads = downloads.length;

  const getFormatBadgeStyle = (format) => {
    switch (format?.toUpperCase()) {
      case "PDF":
        return "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300";
      case "DOC":
      case "DOCX":
        return "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300";
      case "PPT":
      case "PPTX":
        return "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300";
      case "ZIP":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-[#082A24] dark:text-gray-300";
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return "Recently";
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 2) return "Just now";
      if (diffMins < 60) return `${diffMins} mins ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#D8E8E2] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#04241C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2]/60 dark:border-[#16463D] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Downloads Activity
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                Track downloaded resources and demo export history
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 px-6 py-3.5 bg-[#F1F8F5]/60 dark:bg-[#082A24]/50 border-b border-[#D8E8E2]/80 dark:border-[#10372F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#06241F] flex items-center justify-center text-[#159B72] dark:text-[#20D39B] shadow-2xs border border-[#D8E8E2]/40 dark:border-[#16463D]">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#658278] dark:text-[#789991] block">
                Total Downloads
              </span>
              <span className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {totalDownloads} items
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            {totalDownloads > 0 && (
              <button
                type="button"
                onClick={onClearDownloads}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:underline cursor-pointer font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Downloads List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {downloads.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Download className="w-8 h-8 text-[#658278]/40 dark:text-[#789991]/40 mx-auto" />
              <p className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                No downloads recorded yet
              </p>
              <p className="text-[11px] text-[#658278] dark:text-[#789991] max-w-xs mx-auto">
                Download any featured resource or recent upload to monitor activity here.
              </p>
            </div>
          ) : (
            downloads.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#082A24] shadow-2xs gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase shrink-0 ${getFormatBadgeStyle(
                      item.format
                    )}`}
                  >
                    {item.format}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[#658278] dark:text-[#789991] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#159B72]" />
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-[#658278] dark:text-[#789991] shrink-0 text-right">
                  {item.size}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#D8E8E2] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#04241C] flex items-center justify-between">
          <span className="text-[11px] text-[#658278] dark:text-[#789991]">
            Frontend activity tracking (persisted in local demo store)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-white dark:hover:bg-[#06241F] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
