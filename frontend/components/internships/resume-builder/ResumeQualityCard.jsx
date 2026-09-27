"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Sparkles, FileText, Check } from "lucide-react";
import { calculateResumeQuality } from "./resumeBuilderData";

export default function ResumeQualityCard({ resume, keywordAnalysis }) {
  const quality = calculateResumeQuality(resume, keywordAnalysis);

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Resume Readiness
          </h3>
        </div>
        <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
          {quality.score}% Ready
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
            style={{ width: `${quality.score}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
          <span>{quality.passedCount} of {quality.totalChecks} standards met</span>
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Est. {quality.pageEstimate}
          </span>
        </div>
      </div>

      {/* Density Warning */}
      {quality.warnings.map((w, idx) => (
        <div
          key={idx}
          className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{w}</span>
        </div>
      ))}

      {/* Checklist Items */}
      <div className="space-y-2 pt-1">
        {quality.checklist.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
              item.passed
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/20 text-[#0B3024] dark:text-[#F1FAF6]"
                : "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 text-[#658278] dark:text-[#789991]"
            }`}
          >
            {item.passed ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ○
              </span>
            )}
            <div className="min-w-0 flex-1">
              <span className={item.passed ? "font-semibold" : "font-normal"}>
                {item.label}
              </span>
              {!item.passed && (
                <span className="text-[10.5px] text-[#658278] dark:text-[#8AA89F] block mt-0.5">
                  Tip: {item.tip}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
