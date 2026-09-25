"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  Award,
  Sparkles,
  Edit3,
  XCircle,
  HelpCircle,
  Building2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { REPORT_STATUS_CONFIG } from "./myReportsData";

export default function CaseDetailDrawer({
  isOpen,
  onClose,
  report,
  onReviewMatch,
  onClaimVerify,
  onEditReport,
  onCancelReport,
}) {
  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !report) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#06241F] border-l border-[#D8E8E2] dark:border-[#16463D] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620]">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
                {report.type}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-xs font-mono font-medium text-[#658278] dark:text-[#8BA69D]">
                {report.caseId}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
              {report.itemName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Status & Lifecycle Step Bar */}
          <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-gray-50/60 dark:bg-[#082A24]/60 p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD]">
                Current Lifecycle State
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusCfg.badgeBg} ${statusCfg.badgeText} ${statusCfg.badgeBorder}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                {statusCfg.label}
              </span>
            </div>

            {/* Next Steps / Status Guidance */}
            {report.status === "Possible Match Found" && (
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Next Step: Compare Matched Item</span>
                </div>
                <p className="text-[11px] text-purple-800/90 dark:text-purple-300">
                  Campus security has cataloged an item matching your description. Click &ldquo;Review Match&rdquo; to verify without disclosing private details.
                </p>
              </div>
            )}

            {report.status === "Verification Pending" && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Next Step: Provide Supporting Proof</span>
                </div>
                <p className="text-[11px] text-amber-800/90 dark:text-amber-300">
                  Please submit a distinguishing feature, purchase reference, or serial number so the custodian can confirm ownership.
                </p>
              </div>
            )}

            {report.status === "Searching" && (
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                Campus staff and student community have been notified. When a matching item is logged at a security desk or canteen lost box, you will receive an alert.
              </p>
            )}

            {report.status === "Resolved" && (
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Case Resolved ({report.resolution?.type || "Item Reunited"})</span>
                </div>
                <p className="text-[11px] text-teal-800/90 dark:text-teal-300">
                  {report.resolution?.notes || "Item ownership confirmed and successfully handed over."}
                </p>
              </div>
            )}
          </div>

          {/* Item Image & Key Metadata */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
              Item Details
            </h4>

            {report.image && (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D]">
                <Image
                  src={report.image}
                  alt={report.itemName}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-1">
                <span className="text-[#658278] dark:text-[#8BA69D] text-[11px] block">Location</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  <MapPin className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                  <span className="truncate">{report.location}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-1">
                <span className="text-[#658278] dark:text-[#8BA69D] text-[11px] block">Date Reported</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  <Calendar className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                  <span className="truncate">{report.reportedAt}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-1.5">
              <span className="text-[#658278] dark:text-[#8BA69D] text-[11px] font-semibold block uppercase">
                Description
              </span>
              <p className="text-xs text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed">
                {report.description}
              </p>
            </div>

            {report.distinguishingFeatures && (
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-1.5">
                <span className="text-[#658278] dark:text-[#8BA69D] text-[11px] font-semibold block uppercase">
                  Distinguishing Features (Private)
                </span>
                <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] leading-relaxed">
                  {report.distinguishingFeatures}
                </p>
              </div>
            )}
          </div>

          {/* Claim / Verification Details (if applicable) */}
          {(report.type === "Claim Request" || report.claimId || report.verification) && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
                Claim &amp; Verification Status
              </h4>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] space-y-2 text-xs">
                {report.claimId && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#658278] dark:text-[#8BA69D]">Claim ID</span>
                    <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6]">{report.claimId}</span>
                  </div>
                )}
                {report.claimSubmittedAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#658278] dark:text-[#8BA69D]">Submitted On</span>
                    <span className="text-[#0B3024] dark:text-[#F1FAF6]">{report.claimSubmittedAt}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[#658278] dark:text-[#8BA69D]">Verification State</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {report.claimStatus || "In Progress"}
                  </span>
                </div>

                {report.verification?.otherClaimActivity && (
                  <div className="pt-2 border-t border-[#E0EBE6] dark:border-[#16463D] text-[11px] text-[#658278] dark:text-[#8BA69D] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
                    <span>Other claim activity exists for this item category (anonymized).</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
              Activity Timeline
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8E8E2] dark:before:bg-[#16463D]">
              {(report.timeline || []).map((ev, idx) => (
                <div key={ev.id || idx} className="relative space-y-0.5 text-xs">
                  {/* Timeline bullet */}
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white dark:bg-[#06241F] border-2 border-[#159B72] dark:border-[#20D39B] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {ev.title}
                    </span>
                    <span className="text-[10px] text-[#658278] dark:text-[#8BA69D]">
                      {ev.date}
                    </span>
                  </div>

                  <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] leading-snug">
                    {ev.description}
                  </p>

                  {ev.actor && (
                    <span className="text-[10px] text-[#159B72] dark:text-[#20D39B] font-semibold block">
                      Actor: {ev.actor}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#D8E8E2] dark:border-[#16463D] bg-[#FAFDFB] dark:bg-[#072620] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            {report.canEdit && report.status !== "Resolved" && report.status !== "Cancelled" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditReport(report);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] hover:bg-gray-100 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            )}

            {report.canCancel && report.status !== "Resolved" && report.status !== "Cancelled" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCancelReport(report);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel Report</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {report.status === "Possible Match Found" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReviewMatch(report);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Review Match</span>
              </button>
            )}

            {report.status === "Verification Pending" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onClaimVerify(report);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer shadow-xs"
              >
                <FileCheck className="w-4 h-4" />
                <span>Provide Evidence</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
