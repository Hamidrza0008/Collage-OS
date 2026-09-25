"use client";

import {
  Building2,
  Calendar,
  Clock,
  Pin,
  ShieldCheck,
  AlertTriangle,
  Info,
  Users,
  FileCheck2,
  Bookmark,
  Share2,
  Printer,
  Sparkles,
} from "lucide-react";

export default function NoticeHeader({
  notice,
  isBookmarked,
  isAcknowledged,
  onToggleBookmark,
  onShare,
  onPrint,
  onOpenAcknowledgeModal,
}) {
  const isUrgent = notice.priority?.toLowerCase() === "urgent";
  const isHigh = notice.priority?.toLowerCase() === "high";

  // Category badge color mapping
  const getCategoryStyles = (categoryType) => {
    switch (categoryType) {
      case "exam":
        return "bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60";
      case "placement":
        return "bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60";
      case "event":
        return "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      case "important":
        return "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
      default:
        return "bg-slate-100 dark:bg-slate-900/70 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800/60";
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-6 transition-all">
      {/* Top Banner Ribbon for Urgent / Important */}
      {(isUrgent || isHigh) && (
        <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            {isUrgent
              ? "Urgent Official Circular: Requires immediate attention and compliance."
              : "High Priority Notice: Please read the complete guidelines carefully."}
          </span>
        </div>
      )}

      {/* Row 1: Badges & Quick Tool Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center flex-wrap gap-2">
          {/* Circular Type Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{notice.type || "Official Circular"}</span>
          </span>

          {/* Category Badge */}
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${getCategoryStyles(
              notice.categoryType
            )}`}
          >
            {notice.category}
          </span>

          {/* Priority Pill if Urgent/High */}
          {isUrgent && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
              🔴 Urgent
            </span>
          )}

          {/* Pinned Tag */}
          {notice.pinned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
              <Pin className="w-3 h-3 fill-amber-600/30 transform rotate-45" />
              <span>Pinned</span>
            </span>
          )}

          {/* Acknowledgement Indicator */}
          {notice.requiresAcknowledgement && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${
                isAcknowledged
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                  : "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800 animate-pulse"
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>{isAcknowledged ? "Acknowledged ✓" : "Acknowledgement Required"}</span>
            </span>
          )}
        </div>

        {/* Top-Right Utility Actions (Bookmark, Share, Print) */}
        <div className="flex items-center gap-1.5 print:hidden">
          <button
            type="button"
            onClick={onToggleBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Save Notice"}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isBookmarked
                ? "bg-[#DDF4EB] dark:bg-[#073D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                : "border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-[#F0F7F4] dark:hover:bg-[#082A24]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            onClick={onShare}
            title="Share Notice"
            className="p-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-[#F0F7F4] dark:hover:bg-[#082A24] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            title="Print Official Notice"
            className="p-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-[#F0F7F4] dark:hover:bg-[#082A24] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Row 2: Reference Number & Official Title */}
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#159B72] dark:text-[#20D39B] tracking-wider uppercase">
          <span>Ref No:</span>
          <span>{notice.referenceNumber}</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-[26px] font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-snug mt-1.5">
          {notice.title}
        </h1>

        {notice.subtitle && (
          <p className="text-sm text-[#55786B] dark:text-[#8FAFA4] mt-2 leading-relaxed font-normal">
            {notice.subtitle}
          </p>
        )}
      </div>

      {/* Row 3: Metadata Grid (Department, Dates, Audience) */}
      <div className="mt-5 pt-4 border-t border-[#E8F1ED] dark:border-[#10372F] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs text-[#36594C] dark:text-[#B5CCC5]">
        {/* Department */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
              Issuing Authority
            </span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
              {notice.department}
            </span>
          </div>
        </div>

        {/* Date of Issue */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
              Date Published
            </span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
              {notice.publishedAt}
            </span>
          </div>
        </div>

        {/* Target Audience */}
        <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
          <div className="p-1.5 rounded-lg bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
              Audience
            </span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
              {notice.audience}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
