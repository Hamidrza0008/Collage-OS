"use client";

import { Star, Bookmark, ExternalLink, MessageSquare } from "lucide-react";

export default function MobileActionBar({
  isLiked,
  likesCount,
  onToggleLike,
  isBookmarked,
  onToggleBookmark,
  demoUrl,
  onJumpToComments,
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#06241F]/95 backdrop-blur-md border-t border-[#D8E8E2] dark:border-[#16463D] px-4 py-2.5 shadow-lg flex items-center justify-between gap-2 safe-area-bottom">
      <div className="flex items-center gap-1.5">
        {/* Like */}
        <button
          type="button"
          onClick={onToggleLike}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 cursor-pointer ${
            isLiked
              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300"
              : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border-[#D8E8E2] dark:border-[#16463D]"
          }`}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              isLiked ? "fill-amber-500 text-amber-500" : "text-[#658278]"
            }`}
          />
          <span>{likesCount}</span>
        </button>

        {/* Bookmark */}
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
            isBookmarked
              ? "bg-[#159B72] text-white border-emerald-500"
              : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border-[#D8E8E2] dark:border-[#16463D]"
          }`}
          title="Bookmark project"
        >
          <Bookmark
            className={`w-4 h-4 ${
              isBookmarked ? "fill-current text-white" : "text-[#658278]"
            }`}
          />
        </button>

        {/* Comment Jump */}
        <button
          type="button"
          onClick={onJumpToComments}
          className="p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] transition-all active:scale-95 cursor-pointer"
          title="Jump to Discussion"
        >
          <MessageSquare className="w-4 h-4 text-[#658278] dark:text-[#8BAEA3]" />
        </button>
      </div>

      {/* Live Demo CTA */}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 max-w-[160px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#159B72] hover:bg-[#0E825E] text-white text-xs font-bold shadow-xs active:scale-95 transition-all truncate"
        >
          <span>Live Demo</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      )}
    </div>
  );
}
