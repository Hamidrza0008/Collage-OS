"use client";

import { X, Sparkles, MapPin, Calendar, Building2, CheckCircle2, ShieldAlert } from "lucide-react";

export default function PossibleMatchModal({
  isOpen,
  onClose,
  report,
  onConfirmMatchAsClaim,
  onDismissMatch,
}) {
  if (!isOpen || !report || !report.possibleMatch) return null;

  const match = report.possibleMatch;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3 bg-[#FAFDFB] dark:bg-[#072620]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Review Potential Match
              </h3>
              <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                Case: {report.caseId} • {report.itemName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 leading-relaxed">
            An item with similar details was logged into the campus Lost &amp; Found registry. Review the public custodian information below to determine if it is yours.
          </div>

          {/* Comparison Cards: Side by Side on Tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Left: Your Reported Item */}
            <div className="p-3.5 rounded-xl bg-gray-50/80 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] block">
                Your Lost Report
              </span>
              <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {report.itemName}
              </h4>
              <div className="space-y-1 text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Reported: {report.reportedAt}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#0B3024] dark:text-[#F1FAF6] line-clamp-3 pt-1 border-t border-[#E0EBE6] dark:border-[#16463D]/60">
                {report.description}
              </p>
            </div>

            {/* Right: Public Matched Item */}
            <div className="p-3.5 rounded-xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 block">
                Found Item in Custody
              </span>
              <h4 className="font-bold text-purple-950 dark:text-purple-100">
                {match.publicTitle}
              </h4>
              <div className="space-y-1 text-[11px] text-[#55786B] dark:text-[#9FB7AD]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{match.locationFound}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Logged: {match.foundDate}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  <Building2 className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
                  <span>Held by: {match.custodian}</span>
                </div>
              </div>
              <p className="text-[11px] text-purple-900/90 dark:text-purple-200 line-clamp-3 pt-1 border-t border-purple-200/60 dark:border-purple-900/40">
                {match.notes}
              </p>
            </div>
          </div>

          {/* Privacy Safety Notice */}
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] flex items-center gap-2 text-[11px] text-[#658278] dark:text-[#8BA69D]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
            <span>
              Personal contact details of other campus members remain strictly protected. Handover is facilitated exclusively through campus security desks.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#D8E8E2] dark:border-[#16463D] bg-[#FAFDFB] dark:bg-[#072620] flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => onDismissMatch(report.id)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer transition-colors"
          >
            Not My Item (Keep Searching)
          </button>

          <button
            type="button"
            onClick={() => onConfirmMatchAsClaim(report)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>This is My Item (Claim Now)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
