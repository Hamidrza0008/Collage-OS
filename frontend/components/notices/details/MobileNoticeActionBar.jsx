"use client";

import { Bookmark, Share2, FileCheck2, CheckCircle2, Eye, Check } from "lucide-react";

export default function MobileNoticeActionBar({
  notice,
  isRead,
  isAcknowledged,
  isBookmarked,
  onToggleRead,
  onToggleBookmark,
  onShare,
  onOpenAcknowledgeModal,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-white/95 dark:bg-[#06241F]/95 backdrop-blur-md border-t border-[#D8E8E2] dark:border-[#16463D] shadow-lg flex items-center justify-between gap-2.5 print:hidden">
      {/* Left icons: Bookmark & Share */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
            isBookmarked
              ? "bg-[#DDF4EB] dark:bg-[#073D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
              : "border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4]"
          }`}
          title="Bookmark"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
        </button>

        <button
          type="button"
          onClick={onShare}
          className="p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4]"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Right Primary Action: Acknowledge or Mark Read */}
      <div className="flex-1 max-w-xs">
        {notice.requiresAcknowledgement ? (
          <button
            type="button"
            onClick={isAcknowledged ? null : onOpenAcknowledgeModal}
            disabled={isAcknowledged}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
              isAcknowledged
                ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "bg-[#159B72] hover:bg-[#0F805D] text-white"
            }`}
          >
            {isAcknowledged ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Acknowledged ✓</span>
              </>
            ) : (
              <>
                <FileCheck2 className="w-4 h-4" />
                <span>Acknowledge Notice</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleRead}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border shadow-2xs ${
              isRead
                ? "bg-white dark:bg-[#06241F] text-[#426659] dark:text-[#9FBDB4] border-[#D8E8E2] dark:border-[#16463D]"
                : "bg-[#159B72] text-white border-transparent"
            }`}
          >
            {isRead ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Marked as Read</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Mark as Read</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
