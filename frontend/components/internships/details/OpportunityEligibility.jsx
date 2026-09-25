"use client";

import { GraduationCap, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function OpportunityEligibility({ eligibility }) {
  if (!eligibility) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 space-y-4.5 transition-all">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <span>Eligibility & Academic Criteria</span>
        </h3>

        {/* Student Match Indicator */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>You are Eligible</span>
        </span>
      </div>

      {/* Match Reason Callout */}
      {eligibility.studentMatchReason && (
        <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {eligibility.studentMatchReason}
          </p>
        </div>
      )}

      {/* Eligibility Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
            Qualifying Degree
          </span>
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] mt-1 block">
            {eligibility.degree || "Any Graduate or Engineering Program"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
            Eligible Batches / Years
          </span>
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] mt-1 block">
            {eligibility.eligibleYears || "All Students"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
            Academic Score (CGPA)
          </span>
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] mt-1 block">
            {eligibility.minCgpa || "No Minimum Score"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10.5px] uppercase font-bold text-[#658278] dark:text-[#789991] block">
            Backlog Policy
          </span>
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] mt-1 block">
            {eligibility.backlogs || "No Active Backlogs"}
          </span>
        </div>
      </div>
    </div>
  );
}
