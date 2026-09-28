"use client";

import { CheckSquare, Trash2, FolderPlus, X } from "lucide-react";

export default function SavedBulkActionBar({
  selectedCount = 0,
  totalItemsCount = 0,
  isAllSelected = false,
  onToggleSelectAll,
  onRemoveSelected,
  onMoveToCollection,
  collections = [],
  onCancel,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] p-3 rounded-2xl bg-[#0B3024] dark:bg-[#021512] text-white shadow-2xl border border-emerald-500/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {selectedCount} Selected
        </span>
        <button
          type="button"
          onClick={onToggleSelectAll}
          className="text-xs font-medium text-emerald-300 hover:text-white underline cursor-pointer"
        >
          {isAllSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Move to collection dropdown */}
        {collections.length > 0 && (
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onMoveToCollection(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className="h-8 px-2.5 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white cursor-pointer focus:outline-none"
            >
              <option value="" disabled className="text-gray-900">
                Move to Folder...
              </option>
              {collections.map((col) => (
                <option key={col.id} value={col.id} className="text-gray-900">
                  {col.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Remove Selected */}
        <button
          type="button"
          onClick={onRemoveSelected}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove ({selectedCount})</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Cancel selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
