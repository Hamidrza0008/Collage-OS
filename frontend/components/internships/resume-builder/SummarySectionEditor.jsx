"use client";

import React from "react";
import { FileText, Sparkles, Check, Wand2 } from "lucide-react";
import { improveBulletText, generateSummaryVariants } from "./resumeBuilderData";

export default function SummarySectionEditor({
  resume,
  onChangeResume,
  profile,
}) {
  const summary = resume.summary || "";
  const charCount = summary.length;

  const handleImproveSummary = () => {
    if (!summary) return;
    const improved = improveBulletText(summary);
    onChangeResume({ ...resume, summary: improved });
  };

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <FileText className="w-4 h-4" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Professional Summary
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleImproveSummary}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
          >
            <Wand2 className="w-3 h-3" />
            <span>Improve Phrasing</span>
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Resume Summary Statement
          </label>
          <span
            className={`text-[11px] font-semibold ${
              charCount > 400
                ? "text-amber-600"
                : charCount >= 100
                ? "text-emerald-600"
                : "text-[#658278]"
            }`}
          >
            {charCount} / 400 characters {charCount > 400 ? "(Getting long)" : "(Recommended: 150–350)"}
          </span>
        </div>
        <textarea
          value={summary}
          onChange={(e) => onChangeResume({ ...resume, summary: e.target.value })}
          placeholder="Brief 2–3 sentence overview of your engineering strengths, academic background, and focus areas..."
          rows={4}
          className="w-full text-xs p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 leading-relaxed resize-none"
        />
      </div>
    </div>
  );
}
