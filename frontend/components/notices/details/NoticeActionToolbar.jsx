"use client";

import {
  FileCheck2,
  CheckCircle2,
  Bookmark,
  Share2,
  Printer,
  Download,
  Eye,
  Check,
  Sparkles,
} from "lucide-react";

export default function NoticeActionToolbar({
  notice,
  isRead,
  isAcknowledged,
  isBookmarked,
  onToggleRead,
  onToggleBookmark,
  onOpenAcknowledgeModal,
  onShare,
  onPrint,
  onDownloadAll,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#10372F] print:hidden">
      {/* Left Group: Status Toggles */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Acknowledgement Action (If required and not yet acknowledged) */}
        {notice.requiresAcknowledgement && (
          <button
            type="button"
            onClick={isAcknowledged ? null : onOpenAcknowledgeModal}
            disabled={isAcknowledged}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
              isAcknowledged
                ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 cursor-default"
                : "bg-[#159B72] hover:bg-[#0F805D] text-white cursor-pointer hover:shadow-xs active:scale-95"
            }`}
          >
            {isAcknowledged ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Acknowledged ✓</span>
              </>
            ) : (
              <>
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Acknowledge Circular</span>
              </>
            )}
          </button>
        )}

        {/* Mark as Read / Read State */}
        <button
          type="button"
          onClick={onToggleRead}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
            isRead
              ? "bg-white dark:bg-[#06241F] text-[#426659] dark:text-[#9FBDB4] border-[#D8E8E2] dark:border-[#16463D]"
              : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
          }`}
        >
          {isRead ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Marked as Read</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Mark as Read</span>
            </>
          )}
        </button>
      </div>

      {/* Right Group: Utility Actions */}
      <div className="flex items-center gap-1.5">
        {/* Bookmark */}
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
            isBookmarked
              ? "bg-[#DDF4EB] dark:bg-[#073D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
              : "bg-white dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-50 dark:hover:bg-[#082A24]"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Save Notice"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
          <span className="text-[11.5px]">{isBookmarked ? "Saved" : "Save"}</span>
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={onShare}
          className="p-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-50 dark:hover:bg-[#082A24] transition-all cursor-pointer flex items-center gap-1.5"
          title="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="text-[11.5px]">Share</span>
        </button>

        {/* Print */}
        <button
          type="button"
          onClick={onPrint}
          className="p-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-50 dark:hover:bg-[#082A24] transition-all cursor-pointer flex items-center gap-1.5"
          title="Print Document"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="text-[11.5px]">Print</span>
        </button>

        {/* Download Bundle */}
        {notice.files && notice.files.length > 0 && (
          <button
            type="button"
            onClick={onDownloadAll}
            className="p-2 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#0F805D] text-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Download Document"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-[11.5px] hidden sm:inline">Download</span>
          </button>
        )}
      </div>
    </div>
  );
}
