"use client";

import { X, Building2, Calendar, Paperclip, Download, Pin, Share2, CheckCircle2 } from "lucide-react";

export default function NoticeDetailsModal({
  notice,
  onClose,
  onDownloadFile,
  onMarkAsRead,
  onShare,
}) {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl max-w-xl w-full shadow-2xl p-5 sm:p-6 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              {notice.category}
            </span>
            {notice.pinned && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                <Pin className="w-3 h-3 fill-amber-600/30 transform rotate-45" />
                <span>Pinned</span>
              </span>
            )}
            <span className="text-xs text-[#658278] dark:text-[#8AA89F]">
              {notice.type === "announcement" ? "Announcement" : "Official Notice"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="py-3">
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
            {notice.title}
          </h2>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-[#658278] dark:text-[#8AA89F] mt-2 font-medium">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{notice.department}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{notice.date}</span>
            </div>
          </div>
        </div>

        {/* Full Notice Content */}
        <div className="py-3.5 border-y border-gray-100 dark:border-[#10372F] text-xs text-[#0B3024] dark:text-[#E2F1EC] leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto">
          {notice.fullContent || notice.description}
        </div>

        {/* Attachments Section if available */}
        {notice.files && notice.files.length > 0 && (
          <div className="py-3.5 border-b border-gray-100 dark:border-[#10372F]">
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-2 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Attached Documents ({notice.files.length})</span>
            </h4>

            <div className="space-y-2">
              {notice.files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/50"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <Paperclip className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] truncate">
                      {file.name}
                    </span>
                    <span className="text-[10.5px] text-gray-400 shrink-0">
                      ({file.size})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDownloadFile && onDownloadFile(file.name)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-3.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onMarkAsRead(notice.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] hover:bg-gray-50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark as Read</span>
            </button>

            <button
              type="button"
              onClick={() => onShare(notice)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] hover:bg-gray-50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:text-[#021512] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
