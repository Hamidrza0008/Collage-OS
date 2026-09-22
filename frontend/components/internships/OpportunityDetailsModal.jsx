"use client";

import { useEffect } from "react";
import {
  X,
  MapPin,
  Calendar,
  Users,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Trophy,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import CompanyLogo from "./CompanyLogo";
import { BADGE_STYLES } from "./internshipsData";

export default function OpportunityDetailsModal({
  opportunity,
  onClose,
  onApplyOrRegister,
  onToggleBookmark,
  isSaved = false,
  isAppliedOrRegistered = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!opportunity) return null;

  const isHackathon = opportunity.type === "hackathon";
  const badgeStyle = BADGE_STYLES[opportunity.badge] || BADGE_STYLES["Open"];
  const ctaLabel = isHackathon ? "Register for Hackathon" : "Apply for Internship";
  const completedLabel = isHackathon ? "Registration Confirmed" : "Application Submitted";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-5 sm:px-6 pt-5 pb-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3 bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-3 min-w-0">
            <CompanyLogo logoType={opportunity.logoType} className="w-10 h-10" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                >
                  {opportunity.badge}
                </span>
                <span className="text-xs text-[#55786B] dark:text-[#8FAFA4] font-medium capitalize">
                  &bull; {opportunity.type}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate mt-0.5">
                {opportunity.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(opportunity.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isSaved
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#159B72]"
                  : "bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#159B72] border border-[#D8E8E2] dark:border-[#16463D]"
              }`}
              title={isSaved ? "Saved" : "Save opportunity"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#159B72]" : ""}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4.5 text-xs sm:text-sm">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col gap-1">
              <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#159B72]" /> Location
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {opportunity.workMode || opportunity.mode || "Remote"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col gap-1">
              <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#159B72]" /> Timeline
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {opportunity.duration || opportunity.date}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col gap-1">
              <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991] flex items-center gap-1">
                {isHackathon ? (
                  <Trophy className="w-3 h-3 text-amber-500" />
                ) : (
                  <DollarSign className="w-3 h-3 text-emerald-500" />
                )}{" "}
                {isHackathon ? "Reward" : "Stipend"}
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {opportunity.prize || opportunity.stipend || "Competitive"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col gap-1">
              <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991] flex items-center gap-1">
                <Users className="w-3 h-3 text-[#159B72]" /> Participation
              </span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {opportunity.applications}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-1.5">
              Overview
            </h4>
            <p className="text-xs sm:text-[13px] text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Eligibility & Requirements */}
          <div>
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#159B72]" />
              Eligibility &amp; Criteria
            </h4>
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-[#087A5B] dark:text-[#20D39B] font-medium mb-2.5">
              {opportunity.eligibility}
            </div>

            {opportunity.requirements && (
              <ul className="space-y-1.5">
                {opportunity.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Skills Required */}
          <div>
            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Target Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#DDF4EB] dark:bg-[#0D4436] text-[#087A5B] dark:text-[#20D39B] border border-emerald-300/40 dark:border-emerald-700/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <span className="text-xs text-[#658278] dark:text-[#789991]">
            Application closes: <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{opportunity.deadline || "Soon"}</span>
          </span>

          {isAppliedOrRegistered ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#087A5B] dark:text-[#20D39B] font-bold text-xs border border-emerald-300/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>{completedLabel}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onApplyOrRegister(opportunity)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:shadow-sm"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
