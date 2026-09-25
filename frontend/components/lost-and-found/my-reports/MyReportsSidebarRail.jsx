"use client";

import {
  ShieldAlert,
  Sparkles,
  FileCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  Building2,
  Phone,
  ChevronRight,
} from "lucide-react";
import { REPORT_STATUS_CONFIG } from "./myReportsData";

export default function MyReportsSidebarRail({
  reports,
  metrics,
  onReviewMatch,
  onClaimVerify,
  onViewCase,
}) {
  // Action required items
  const actionItems = reports.filter(
    (r) => r.needsAction || r.status === "Possible Match Found" || r.status === "Verification Pending"
  );

  // Recent 3 updates from cases
  const recentUpdates = [...reports]
    .sort((a, b) => new Date(b.rawUpdatedAt || 0) - new Date(a.rawUpdatedAt || 0))
    .slice(0, 3);

  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      {/* A. My Summary Card */}
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] mb-3">
          Workspace Summary
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-gray-50/70 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D]">
            <span className="text-[#658278] dark:text-[#8BA69D] text-[11px] block">Total Reports</span>
            <span className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">{metrics.total}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-amber-700 dark:text-amber-400 text-[11px] block">Active Cases</span>
            <span className="text-lg font-bold text-amber-900 dark:text-amber-300">{metrics.open}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/40">
            <span className="text-sky-700 dark:text-sky-400 text-[11px] block">Claims</span>
            <span className="text-lg font-bold text-sky-900 dark:text-sky-300">{metrics.claimsPending}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-emerald-700 dark:text-emerald-400 text-[11px] block">Resolved</span>
            <span className="text-lg font-bold text-emerald-900 dark:text-emerald-300">{metrics.resolved}</span>
          </div>
        </div>
      </div>

      {/* B. Action Required Card */}
      {actionItems.length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-amber-300/80 dark:border-amber-800/60 p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Action Required ({actionItems.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 truncate">
                    {item.itemName}
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400">
                    {item.caseId}
                  </span>
                </div>
                <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD] line-clamp-2 leading-snug">
                  {item.actionPrompt?.description || "Requires verification or review."}
                </p>

                <div className="pt-1 flex items-center justify-end">
                  {item.status === "Possible Match Found" && (
                    <button
                      type="button"
                      onClick={() => onReviewMatch(item)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-300 hover:underline cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Review Match &rarr;</span>
                    </button>
                  )}
                  {item.status === "Verification Pending" && (
                    <button
                      type="button"
                      onClick={() => onClaimVerify(item)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:underline cursor-pointer"
                    >
                      <FileCheck className="w-3 h-3" />
                      <span>Provide Evidence &rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* C. Recent Case Updates */}
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Recent Activity</span>
        </h3>

        <div className="space-y-3">
          {recentUpdates.map((item) => {
            const lastEvent = item.timeline?.[item.timeline.length - 1];
            const cfg = REPORT_STATUS_CONFIG[item.status];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewCase(item)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-colors cursor-pointer group space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] truncate max-w-[170px]">
                    {item.itemName}
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#658278] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#658278] dark:text-[#8BA69D]">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg?.dot || "bg-gray-400"}`} />
                  <span>{item.status}</span>
                  <span>•</span>
                  <span>{item.updatedAt.split(",")[0]}</span>
                </div>
                {lastEvent && (
                  <p className="text-[11px] text-[#55786B] dark:text-[#9FB7AD] line-clamp-1">
                    {lastEvent.title}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* D. Reporting Guidance Card */}
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Reporting Guidance</span>
        </h3>

        <ul className="text-xs text-[#55786B] dark:text-[#9FB7AD] space-y-2 list-none">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B] mt-1.5 shrink-0" />
            <span>
              <strong className="text-[#0B3024] dark:text-[#F1FAF6]">Distinguishing details:</strong> Mention unique stickers, markings, serial prefixes or scratches.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B] mt-1.5 shrink-0" />
            <span>
              <strong className="text-[#0B3024] dark:text-[#F1FAF6]">Accurate locations:</strong> Specify building, floor, room number or nearby campus landmarks.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B] mt-1.5 shrink-0" />
            <span>
              <strong className="text-[#0B3024] dark:text-[#F1FAF6]">Privacy safety:</strong> Do not publicly disclose passwords, bank cards, or PIN numbers.
            </span>
          </li>
        </ul>

        <div className="pt-2 border-t border-[#E0EBE6] dark:border-[#16463D] text-[11px] text-[#658278] dark:text-[#8BA69D] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            <Building2 className="w-3 h-3 text-[#159B72] dark:text-[#20D39B]" />
            <span>Central Security Desk (Gate 1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            <span>Ext. 4022 • Mon–Sat: 08:00–20:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
