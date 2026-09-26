"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer, FileText } from "lucide-react";

export default function GradeCardHeader({
  onDownloadGradeCard,
  onPrint,
  onOpenTranscript,
  selectedSemesterLabel = "Semester VII",
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors print:hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation & Titles */}
        <div className="space-y-1.5">
          <Link
            href="/student/academics"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Academics</span>
          </Link>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                Grade Card & Transcript
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {selectedSemesterLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
              View semester results, credits, grades, and your academic record.
            </p>
          </div>
        </div>

        {/* Functional Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onDownloadGradeCard}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#F1F8F5] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer shadow-2xs"
            title="Download formatted grade card summary"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Download Grade Card</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#F1F8F5] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer shadow-2xs"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F]" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={onOpenTranscript}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] text-white transition-colors cursor-pointer shadow-xs"
            title="View complete multi-semester transcript"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Transcript</span>
          </button>
        </div>
      </div>
    </div>
  );
}
