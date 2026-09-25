"use client";

import { Save, RotateCcw, Loader2 } from "lucide-react";

export default function MobileEditProfileActionBar({
  isDirty,
  isSaving,
  onSave,
  onReset,
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#021512]/95 backdrop-blur-md border-t border-[#D8E8E2] dark:border-[#10372F] px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            isDirty ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
          }`}
        />
        <span className="text-[11px] font-medium text-[#06241F]/80 dark:text-[#D8E8E2]/80 truncate">
          {isDirty ? "Unsaved edits" : "Synced"}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onReset}
          disabled={!isDirty || isSaving}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isDirty && !isSaving
              ? "border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-[#D8E8E2]"
              : "opacity-40 border-transparent text-gray-400 cursor-not-allowed"
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
          <span>Discard</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] shadow-sm cursor-pointer active:scale-95"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
