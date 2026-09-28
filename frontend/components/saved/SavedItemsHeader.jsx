"use client";

import { Bookmark, FolderPlus, CheckSquare, Trash2, FolderInput, X } from "lucide-react";

export default function SavedItemsHeader({
  totalCount,
  isBulkMode,
  setIsBulkMode,
  selectedCount,
  onSelectAll,
  isAllSelected,
  onBulkRemove,
  onBulkMoveToCollection,
  collections = [],
  onOpenManageCollections,
  onClearSearch,
  hasActiveSearch,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]/60">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-[#159B72] dark:text-[#20D39B] shrink-0">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6]">
                Saved Items
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#159B72] dark:text-[#20D39B]">
                {totalCount}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[#658278] dark:text-[#789991] mt-0.5">
              Keep projects, opportunities, events, notices, and campus content you want to revisit.
            </p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {hasActiveSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] bg-gray-100 dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Search</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOpenManageCollections}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors shadow-xs cursor-pointer"
          title="Manage Collections and Folders"
        >
          <FolderPlus className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Manage Collections</span>
        </button>

        {!isBulkMode ? (
          <button
            type="button"
            onClick={() => setIsBulkMode(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Select Items</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 p-1 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
            <button
              type="button"
              onClick={onSelectAll}
              className="px-2.5 py-1 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </button>

            {selectedCount > 0 && (
              <>
                <span className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] px-1.5">
                  ({selectedCount})
                </span>

                {/* Move to Collection */}
                <div className="relative group">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] rounded-lg border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
                  >
                    <FolderInput className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                    <span>Move</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl shadow-xl p-1 hidden group-hover:block z-50">
                    <button
                      type="button"
                      onClick={() => onBulkMoveToCollection(null)}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Remove from Collection
                    </button>
                    {collections.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => onBulkMoveToCollection(col.id)}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#0B3024] dark:text-[#F1FAF6] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg truncate"
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onBulkRemove}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsBulkMode(false)}
              className="p-1 text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
