"use client";

import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Trophy,
  CheckCircle2,
  Bookmark,
  Share2,
  Flag,
  ShieldCheck,
  Building2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import CompanyLogo from "../CompanyLogo";

export default function OpportunityHero({
  opportunity,
  isSaved,
  applicationState,
  onToggleSave,
  onShare,
  onOpenReportModal,
}) {
  const isHackathon = opportunity.type === "hackathon";
  const isApplied = applicationState === "applied";

  return (
    <div className="relative rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 transition-all">
      {/* Top Row: Type Badge + Verification + Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center flex-wrap gap-2">
          {/* Opportunity Type Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/30">
            {isHackathon ? <Trophy className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{opportunity.opportunityTypeLabel || (isHackathon ? "Hackathon" : "Internship")}</span>
          </span>

          {/* Badge Pill */}
          {opportunity.badge && (
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
              {opportunity.badge}
            </span>
          )}

          {/* Work Mode */}
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-[#041D18] text-[#36594C] dark:text-[#B5CCC5] border border-gray-200 dark:border-[#10372F]">
            {opportunity.workMode || "Remote"}
          </span>

          {/* Application Status if applied */}
          {isApplied && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-400/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Applied ✓</span>
            </span>
          )}
        </div>

        {/* Top-Right Quick Actions: Bookmark, Share, Report */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleSave}
            title={isSaved ? "Remove from Saved" : "Save Opportunity"}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isSaved
                ? "bg-[#DDF4EB] dark:bg-[#073D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                : "border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-[#F0F7F4] dark:hover:bg-[#082A24]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            onClick={onShare}
            title="Share Opportunity"
            className="p-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-[#F0F7F4] dark:hover:bg-[#082A24] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={onOpenReportModal}
            title="Report inaccurate info"
            className="p-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#55786B] dark:text-[#8FAFA4] hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 transition-all cursor-pointer"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title & Company Brand Section */}
      <div className="mt-5 flex items-start gap-4">
        {/* Company Avatar / Logo */}
        <div className="shrink-0 p-2.5 rounded-2xl bg-white dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs">
          <CompanyLogo logoType={opportunity.logoType} className="w-12 h-12" />
        </div>

        <div className="min-w-0 flex-1">
          {/* Company Name & Verified Badge */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#55786B] dark:text-[#8FAFA4]">
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm">
              {opportunity.company}
            </span>
            {opportunity.verified && (
              <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Host</span>
              </span>
            )}
            <span>&bull;</span>
            <span>{opportunity.companyCategory}</span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-[25px] font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-snug mt-1">
            {opportunity.title}
          </h1>

          {/* Tagline */}
          {opportunity.tagline && (
            <p className="text-xs sm:text-sm text-[#55786B] dark:text-[#8FAFA4] mt-1.5 leading-relaxed font-normal">
              {opportunity.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Metadata Highlights Bar */}
      <div className="mt-6 pt-4 border-t border-[#E8F1ED] dark:border-[#10372F] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Location */}
        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col justify-between">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#159B72]" />
            Location
          </span>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate mt-1">
            {opportunity.location}
          </span>
        </div>

        {/* Duration */}
        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col justify-between">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#159B72]" />
            Duration
          </span>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate mt-1">
            {opportunity.duration}
          </span>
        </div>

        {/* Compensation / Prize */}
        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col justify-between">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] flex items-center gap-1">
            {isHackathon ? (
              <Trophy className="w-3 h-3 text-amber-500" />
            ) : (
              <DollarSign className="w-3 h-3 text-[#159B72]" />
            )}
            {isHackathon ? "Prize Pool" : "Stipend"}
          </span>
          <span className="font-black text-[#159B72] dark:text-[#20D39B] truncate mt-1">
            {opportunity.stipend || opportunity.prizePool}
          </span>
        </div>

        {/* Deadline */}
        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col justify-between">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-500" />
            Deadline
          </span>
          <span className="font-bold text-rose-700 dark:text-rose-400 truncate mt-1">
            {opportunity.deadline}
          </span>
        </div>
      </div>
    </div>
  );
}
