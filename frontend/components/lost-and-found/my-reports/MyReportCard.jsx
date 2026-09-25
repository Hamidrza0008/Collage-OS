"use client";

import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Award,
  HelpCircle,
  Eye,
  Edit3,
  XCircle,
  Sparkles,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { REPORT_STATUS_CONFIG } from "./myReportsData";

export default function MyReportCard({
  report,
  onViewCase,
  onReviewMatch,
  onClaimVerify,
  onEditReport,
  onCancelReport,
}) {
  const statusCfg = REPORT_STATUS_CONFIG[report.status] || {
    label: report.status,
    badgeBg: "bg-gray-100 dark:bg-gray-800",
    badgeText: "text-gray-700 dark:text-gray-300",
    badgeBorder: "border-gray-200 dark:border-gray-700",
    dot: "bg-gray-400",
  };

  const isLost = report.type === "Lost Report";
  const isFound = report.type === "Found Report";
  const isClaim = report.type === "Claim Request";

  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-[#06241F] transition-all hover:shadow-sm overflow-hidden flex flex-col justify-between ${
        report.needsAction
          ? "border-amber-300 dark:border-amber-800/80 shadow-xs ring-1 ring-amber-400/20"
          : "border-[#D8E8E2] dark:border-[#16463D]"
      }`}
    >
      {/* Top Banner for Action Required Cases */}
      {report.needsAction && report.actionPrompt && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-900/40 px-4 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-amber-900 dark:text-amber-200 truncate">
              {report.actionPrompt.title}
            </span>
          </div>
          {report.status === "Possible Match Found" && (
            <button
              type="button"
              onClick={() => onReviewMatch(report)}
              className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:underline shrink-0 cursor-pointer"
            >
              {report.actionPrompt.actionLabel} &rarr;
            </button>
          )}
          {report.status === "Verification Pending" && (
            <button
              type="button"
              onClick={() => onClaimVerify(report)}
              className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:underline shrink-0 cursor-pointer"
            >
              {report.actionPrompt.actionLabel} &rarr;
            </button>
          )}
        </div>
      )}

      {/* Main Card Body */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
        {/* Item Image with Fallback */}
        <div className="relative w-full sm:w-28 sm:h-28 h-36 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] shrink-0">
          {report.image ? (
            <Image
              src={report.image}
              alt={report.itemName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 112px"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#658278] dark:text-[#789991]">
              <HelpCircle className="w-8 h-8 opacity-40 mb-1" />
              <span className="text-[10px] font-semibold">No Image</span>
            </div>
          )}

          {/* Type Badge on Image */}
          <div className="absolute top-2 left-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs backdrop-blur-xs ${
                isLost
                  ? "bg-rose-500/90 text-white"
                  : isFound
                  ? "bg-emerald-600/90 text-white"
                  : "bg-sky-600/90 text-white"
              }`}
            >
              {isLost ? (
                <AlertCircle className="w-2.5 h-2.5" />
              ) : isFound ? (
                <Award className="w-2.5 h-2.5" />
              ) : (
                <FileCheck className="w-2.5 h-2.5" />
              )}
              {report.type}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 space-y-2.5">
          {/* Header Row: Category + Case ID + Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
                {report.category}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-xs font-mono font-medium text-[#658278] dark:text-[#8BA69D]">
                {report.caseId}
              </span>
            </div>

            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusCfg.badgeBg} ${statusCfg.badgeText} ${statusCfg.badgeBorder}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
              {statusCfg.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug tracking-tight">
            {report.itemName}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] line-clamp-2 leading-relaxed">
            {report.description}
          </p>

          {/* Metadata chips: Location & Reported Date */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#658278] dark:text-[#8BA69D] pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="truncate max-w-[220px]">{report.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Reported: {report.reportedAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Last updated + Primary Action Buttons */}
      <div className="bg-[#FAFDFB] dark:bg-[#072620]/60 border-t border-[#E0EBE6] dark:border-[#16463D] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-[#658278] dark:text-[#8BA69D]">
          <Clock className="w-3 h-3" />
          <span>Updated {report.updatedAt}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Possible Match Action */}
          {report.status === "Possible Match Found" && (
            <button
              type="button"
              onClick={() => onReviewMatch(report)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Review Match</span>
            </button>
          )}

          {/* Verification Pending Action */}
          {report.status === "Verification Pending" && (
            <button
              type="button"
              onClick={() => onClaimVerify(report)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Provide Evidence</span>
            </button>
          )}

          {/* Edit Report Button */}
          {report.canEdit && report.status !== "Resolved" && report.status !== "Cancelled" && (
            <button
              type="button"
              onClick={() => onEditReport(report)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] hover:bg-gray-100 dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-colors cursor-pointer"
              title="Edit report details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          )}

          {/* Cancel Report Button */}
          {report.canCancel && report.status !== "Resolved" && report.status !== "Cancelled" && (
            <button
              type="button"
              onClick={() => onCancelReport(report)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
              title="Cancel this report"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cancel</span>
            </button>
          )}

          {/* View Case Drawer Button */}
          <button
            type="button"
            onClick={() => onViewCase(report)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#159B72] dark:text-[#20D39B] bg-[#DDF4EB]/60 dark:bg-[#123F35]/60 hover:bg-[#DDF4EB] dark:hover:bg-[#123F35] border border-[#159B72]/30 dark:border-[#20D39B]/30 transition-all cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Case</span>
          </button>
        </div>
      </div>
    </div>
  );
}
