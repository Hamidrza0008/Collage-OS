"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Briefcase } from "lucide-react";

export default function ApplicationsHeader({ totalCount = 0 }) {
  return (
    <header className="w-full pb-4 sm:pb-6 border-b border-[#D8E8E2] dark:border-[#10372F] transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Back Link & Title */}
        <div className="space-y-1.5 min-w-0">
          <Link
            href="/student/internships"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#18A97C] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Opportunities</span>
          </Link>

          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#06241F] dark:text-white leading-tight">
              Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20 dark:border-[#20D39B]/20">
              {totalCount} Total
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#06241F]/70 dark:text-[#D8E8E2]/70 leading-relaxed">
            Track your internship, job, hackathon, and campus opportunity applications in real time.
          </p>
        </div>

        {/* Right: Quick Context Pill */}
        <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-[#06241F]/80 dark:text-[#D8E8E2]/80">
              Auto-synced with Opportunity Portal
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
