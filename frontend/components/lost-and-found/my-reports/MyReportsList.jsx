"use client";

import { PackageX, SearchX, CheckCircle, Plus, FileText } from "lucide-react";
import MyReportCard from "./MyReportCard";

export default function MyReportsList({
  reports,
  activeTab,
  searchQuery,
  onResetFilters,
  onOpenReportLost,
  onViewCase,
  onReviewMatch,
  onClaimVerify,
  onEditReport,
  onCancelReport,
}) {
  // Empty states handling
  if (reports.length === 0) {
    // 1. Search Query Empty State
    if (searchQuery) {
      return (
        <div className="rounded-2xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] flex items-center justify-center">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            No reports match &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] max-w-sm">
            Try checking for spelling errors, using simpler keywords, or resetting your active filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#159B72] dark:text-[#20D39B] bg-[#DDF4EB] dark:bg-[#123F35] hover:bg-[#DDF4EB]/80 transition-colors cursor-pointer"
          >
            Clear Search &amp; Filters
          </button>
        </div>
      );
    }

    // 2. Claims Tab Empty State
    if (activeTab === "claims") {
      return (
        <div className="rounded-2xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            You don&rsquo;t have any claim requests
          </h3>
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] max-w-sm">
            When you submit a claim on a found item across campus, its verification progress and status will appear here.
          </p>
        </div>
      );
    }

    // 3. Needs Action Tab Empty State
    if (activeTab === "needs-action") {
      return (
        <div className="rounded-2xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            All caught up! No actions required
          </h3>
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] max-w-sm">
            None of your reports or claims currently require match reviews or evidence submission.
          </p>
        </div>
      );
    }

    // 4. General / All Empty State
    return (
      <div className="rounded-2xl border border-dashed border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] flex items-center justify-center">
          <PackageX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          You haven&rsquo;t submitted a Lost &amp; Found report yet
        </h3>
        <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] max-w-sm">
          Report an item you lost or turned in on campus to receive match alerts and track resolution.
        </p>
        <button
          type="button"
          onClick={onOpenReportLost}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Report an Item</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <MyReportCard
          key={report.id}
          report={report}
          onViewCase={onViewCase}
          onReviewMatch={onReviewMatch}
          onClaimVerify={onClaimVerify}
          onEditReport={onEditReport}
          onCancelReport={onCancelReport}
        />
      ))}
    </div>
  );
}
