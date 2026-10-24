"use client";

import React from "react";
import {
  Download,
  Printer,
  Lock,
  BarChart3,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function MarksAnalyticsSidebar({
  course,
  exam,
  stats,
  isLocked,
  onExportCSV,
  onOpenPublishModal,
  onAIAction,
}) {
  const gradeDistribution = stats?.gradeDistribution || {
    O: 3,
    "A+": 4,
    A: 4,
    "B+": 2,
    B: 1,
    C: 0,
    F: 0,
    AB: 1,
  };

  const totalEvaluated = stats?.gradedCount || 14;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Quick Actions Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#DDF4EB] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Evaluation Actions
          </h3>
        </div>

        <div className="space-y-2 pt-1">
          {/* Export to CSV button */}
          <button
            type="button"
            onClick={onExportCSV}
            className="w-full h-10 px-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] hover:bg-[#E8F4F0] dark:hover:bg-[#0C3A32] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center justify-between transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span>Export as CSV</span>
            </div>
            <span className="text-[10px] text-[#658278] dark:text-[#789991] font-mono group-hover:text-[#0B3024] dark:group-hover:text-white">
              .csv
            </span>
          </button>

          {/* Print Grade Sheet button */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") window.print();
            }}
            className="w-full h-10 px-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] hover:bg-[#E8F4F0] dark:hover:bg-[#0C3A32] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Print Grade Ledger</span>
            </div>
            <span className="text-[10px] text-[#658278] dark:text-[#789991]">
              A4
            </span>
          </button>

          {/* Lock / Publish Marks button */}
          <button
            type="button"
            disabled={isLocked}
            onClick={onOpenPublishModal}
            className={`w-full h-11 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
              isLocked
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700 cursor-not-allowed shadow-none"
                : "bg-[#159B72] hover:bg-[#0E8561] text-white shadow-[#159B72]/20 cursor-pointer active:scale-98"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isLocked ? "Marks Locked & Published" : "Publish & Lock Assessment"}</span>
          </button>
        </div>
      </div>

      {/* 2. Grade Distribution Widget */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA] flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Grade Distribution
              </h3>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Letter Grade Frequencies
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B]">
            {stats?.passPercentage || 0}% Pass
          </span>
        </div>

        {/* Distribution Bars */}
        <div className="space-y-2 pt-1">
          {Object.entries(gradeDistribution).map(([grade, count]) => {
            const pct = totalEvaluated > 0 ? ((count / totalEvaluated) * 100).toFixed(0) : 0;
            const barColor =
              grade === "O" || grade === "A+"
                ? "bg-emerald-500"
                : grade === "A" || grade === "B+"
                ? "bg-teal-500"
                : grade === "B"
                ? "bg-blue-500"
                : grade === "C"
                ? "bg-amber-500"
                : "bg-rose-500";

            return (
              <div key={grade} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-medium text-[#4A6B60] dark:text-[#A7C8BD]">
                  <span className="font-bold font-mono">Grade {grade}</span>
                  <span>
                    {count} student{count !== 1 ? "s" : ""} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E8F1ED] dark:bg-[#10372F] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Grading Policy / Guidelines */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-2.5 text-xs text-[#36594C] dark:text-[#A7C8BD]">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Grading Ordinance Policy
          </h4>
        </div>
        <p className="text-[11px] leading-relaxed text-[#658278] dark:text-[#789991]">
          Per CSMU academic rules, students scoring below 40% fail the module and are designated Grade F. Absent students are marked AB and must be scheduled for authorized re-examination by the Examination Cell.
        </p>
      </div>

      {/* 4. Faculty AI Grading Assistant Widget */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0B3D2F] to-[#125A46] text-white shadow-md border border-[#16634E]/40 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Campus AI Grading Assistant</h4>
            <p className="text-[10.5px] text-emerald-200/80">College-grounded analysis</p>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => onAIAction("Analyze borderline student scores")}
            className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-emerald-100 transition-colors cursor-pointer"
          >
            💡 Identify borderline pass/fail students
          </button>
          <button
            type="button"
            onClick={() => onAIAction("Generate class performance summary")}
            className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-emerald-100 transition-colors cursor-pointer"
          >
            📊 Generate assessment executive summary
          </button>
        </div>
      </div>
    </div>
  );
}
