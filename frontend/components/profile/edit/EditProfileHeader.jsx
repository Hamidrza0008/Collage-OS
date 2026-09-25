"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Save, RotateCcw, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function EditProfileHeader({
  isDirty,
  isSaving,
  lastSavedTime,
  onSave,
  onReset,
  profileId = "student-1",
}) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#021512]/90 backdrop-blur-md border-b border-[#D8E8E2] dark:border-[#10372F] transition-colors py-3.5 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Left: Navigation back & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/student/profile"
            className="p-2 -ml-1 rounded-xl text-[#06241F] dark:text-[#D8E8E2] hover:bg-[#D8E8E2]/50 dark:hover:bg-[#10372F] transition-colors shrink-0 cursor-pointer"
            title="Back to Profile"
            aria-label="Back to Profile"
          >
            <ArrowLeft className="w-5 h-5 text-[#159B72] dark:text-[#20D39B]" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#06241F] dark:text-white leading-tight">
                Edit Profile & Portfolio
              </h1>
              {isDirty ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Unsaved changes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {lastSavedTime ? `Saved ${lastSavedTime}` : "All changes saved"}
                </span>
              )}
            </div>
            <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/70 truncate mt-0.5">
              Keep your campus identity accurate and showcase your work.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center shrink-0">
          <Link
            href={`/student/profile/${profileId}`}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:bg-[#159B72]/10 dark:hover:bg-[#20D39B]/10 border border-[#159B72]/30 dark:border-[#20D39B]/30 transition-colors cursor-pointer"
            title="View how your public profile appears to peers and recruiters"
          >
            <span>View Public Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onReset}
            disabled={!isDirty || isSaving}
            className={`inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isDirty && !isSaving
                ? "border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                : "border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard</span>
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className={`inline-flex items-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer ${
              isDirty
                ? "bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] shadow-emerald-500/20 active:scale-95"
                : "bg-[#06241F] hover:bg-[#10372F] dark:bg-[#10372F] dark:hover:bg-[#16463D] text-white/90"
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
