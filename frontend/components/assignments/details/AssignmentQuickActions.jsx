"use client";

import { FileDown, Download, HelpCircle, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AssignmentQuickActions({
  onDownloadBrief,
  onDownloadResources,
  onAskFaculty,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3">
      {/* Header */}
      <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        Quick Actions
      </h3>

      {/* Action Buttons List */}
      <div className="space-y-1.5">
        <button
          type="button"
          onClick={onDownloadBrief}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#10372F] transition-all text-xs font-semibold text-[#0B3024] dark:text-[#C5DCD4] cursor-pointer text-left group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <FileDown className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">Download Assignment Brief</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onDownloadResources}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#10372F] transition-all text-xs font-semibold text-[#0B3024] dark:text-[#C5DCD4] cursor-pointer text-left group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Download className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">Download All Resources</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onAskFaculty}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#10372F] transition-all text-xs font-semibold text-[#0B3024] dark:text-[#C5DCD4] cursor-pointer text-left group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">Ask Subject Faculty</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>

        <Link
          href="/student/assignments"
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:border-[#10372F] transition-all text-xs font-semibold text-emerald-700 dark:text-[#20D39B] cursor-pointer text-left group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            <span className="truncate">Back to Assignments</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
