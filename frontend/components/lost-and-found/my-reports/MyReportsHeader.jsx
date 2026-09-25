"use client";

import Link from "next/link";
import { ArrowLeft, Plus, ShieldCheck, AlertCircle, Award } from "lucide-react";
import { useState } from "react";

export default function MyReportsHeader({ onOpenReportLost, onOpenReportFound }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative w-full rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Side: Navigation link + Heading + Subtitle */}
        <div className="space-y-1.5">
          <Link
            href="/student/lost-and-found"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Lost &amp; Found</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              My Reports &amp; Claims
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20 dark:border-[#20D39B]/20">
              <ShieldCheck className="w-3 h-3" />
              Private Workspace
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#55786B] dark:text-[#9FB7AD] max-w-xl leading-relaxed">
            Track your Lost &amp; Found reports, claim requests, ownership verification, and case resolution status.
          </p>
        </div>

        {/* Right Side: + Report an Item Dropdown / Action */}
        <div className="relative shrink-0 self-start sm:self-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-[#159B72] hover:bg-[#107A59] dark:bg-[#159B72] dark:hover:bg-[#20D39B] dark:hover:text-[#042A20] transition-all shadow-xs cursor-pointer focus:outline-hidden"
              aria-expanded={dropdownOpen}
            >
              <Plus className="w-4 h-4" />
              <span>Report an Item</span>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] shadow-lg py-1.5 z-30 animate-in fade-in-50 zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenReportLost?.();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#DDF4EB]/60 dark:hover:bg-[#123F35]/60 hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors cursor-pointer text-left"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Report Lost Item</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenReportFound?.();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#DDF4EB]/60 dark:hover:bg-[#123F35]/60 hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors cursor-pointer text-left"
                  >
                    <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Report Found Item</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
