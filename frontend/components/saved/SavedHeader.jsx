"use client";

import { Bookmark, FolderHeart, CheckSquare, X } from "lucide-react";

export default function SavedHeader({
  totalCount = 0,
  isSelectMode = false,
  onToggleSelectMode,
  onOpenCollectionsModal,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 flex items-center justify-center shrink-0">
            <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6]">
            Saved Items
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8F5EF] dark:bg-[#07382E] text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            {totalCount} {totalCount === 1 ? "Item" : "Items"}
          </span>
        </div>
        <p className="text-xs sm:text-[13px] text-[#55786B] dark:text-[#8FAFA4]">
          Keep projects, opportunities, events, notices, and campus content you want to revisit.
        </p>
      </div>

      {/* Top Utility Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenCollectionsModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 shadow-xs transition-all cursor-pointer"
          title="Organize into collections"
        >
          <FolderHeart className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Collections</span>
        </button>

        <button
          type="button"
          onClick={onToggleSelectMode}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border shadow-xs transition-all cursor-pointer ${
            isSelectMode
              ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
              : "bg-[#FFFFFF] dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:border-emerald-500/40 dark:hover:border-emerald-400/40"
          }`}
          title={isSelectMode ? "Cancel selection" : "Select multiple items"}
        >
          {isSelectMode ? (
            <>
              <X className="w-3.5 h-3.5" />
              <span>Done</span>
            </>
          ) : (
            <>
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Select</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
