"use client";

import {
  Bookmark,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import { BADGE_STYLES } from "./internshipsData";

export default function OpportunityCard({
  opportunity,
  onViewDetails,
  onApplyOrRegister,
  onToggleBookmark,
  isSaved = false,
  isAppliedOrRegistered = false,
}) {
  const isHackathon = opportunity.type === "hackathon";
  const badgeStyle = BADGE_STYLES[opportunity.badge] || BADGE_STYLES["Open"];
  const ctaLabel = isHackathon ? "Register Now" : "Apply Now";
  const completedLabel = isHackathon ? "Registered" : "Applied";

  return (
    <div className="group relative flex flex-col justify-between h-full p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs hover:shadow-md hover:border-[#159B72]/60 dark:hover:border-[#20D39B]/60 transition-all duration-200">
      {/* Top Row: Status Badge + Bookmark Button */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
        >
          {opportunity.badge}
        </span>

        {/* Bookmark Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(opportunity.id);
          }}
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            isSaved
              ? "text-[#159B72] dark:text-[#20D39B] bg-emerald-50 dark:bg-emerald-950/40"
              : "text-[#85A297] dark:text-[#65857B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24]"
          }`}
          title={isSaved ? "Remove from saved" : "Save opportunity"}
        >
          <Bookmark
            className={`w-3.5 h-3.5 ${isSaved ? "fill-[#159B72] dark:fill-[#20D39B]" : ""}`}
          />
        </button>
      </div>

      {/* Main Content Area (Clicking opens details) */}
      <div
        onClick={() => onViewDetails(opportunity)}
        className="cursor-pointer flex-1 flex flex-col justify-between"
      >
        <div>
          {/* Company Logo */}
          <div className="mb-2">
            <CompanyLogo logoType={opportunity.logoType} className="w-8 h-8" />
          </div>

          {/* Title & Company */}
          <h3 className="text-[13.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-snug line-clamp-1">
            <Link
              href={`/student/internships/${opportunity.id}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {opportunity.title}
            </Link>
          </h3>
          <p className="text-[11.5px] text-[#55786B] dark:text-[#8FAFA4] font-medium truncate mt-0.5">
            {opportunity.company}
          </p>

          {/* Metadata: Location / Work Mode + Duration / Date */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5 text-[10.5px] text-[#426659] dark:text-[#9FBDB4]">
              <MapPin className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="truncate">{opportunity.workMode || opportunity.mode || opportunity.location}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[10.5px] text-[#426659] dark:text-[#9FBDB4]">
              <Calendar className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="truncate">{opportunity.duration || opportunity.date}</span>
            </div>
          </div>

          {/* Skill Chips */}
          <div className="mt-2.5 flex items-center flex-wrap gap-1 min-h-[22px]">
            {opportunity.skills?.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[9.5px] font-medium px-1.5 py-0.5 rounded-md bg-[#F1F8F5] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2]/80 dark:border-[#16463D]/80 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row: Applicant Count + Action CTA Button */}
        <div className="mt-3 pt-2.5 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
            <Users className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
            <span className="truncate">{opportunity.applications}</span>
          </div>

          {isAppliedOrRegistered ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-bold rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-[#087A5B] dark:text-[#20D39B] border border-emerald-300/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3 h-3 text-[#159B72]" />
              <span>{completedLabel}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onApplyOrRegister(opportunity);
              }}
              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-[#159B72] hover:bg-[#087A5B] text-white flex items-center gap-1 transition-all shadow-xs cursor-pointer group-hover:shadow-sm shrink-0"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
