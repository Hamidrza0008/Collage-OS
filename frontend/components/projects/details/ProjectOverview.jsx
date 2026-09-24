"use client";

import {
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ProjectOverview({ overview, projectTitle }) {
  if (!overview) return null;

  return (
    <section
      aria-label="Project Overview"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Overview
          </h2>
          <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
            Executive summary and core value proposition
          </p>
        </div>
      </div>

      {/* Main Core Mission Statement */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F0F8F5] to-[#E9F5EF] dark:from-[#072B23] dark:to-[#04201A] border border-[#D8E8E2] dark:border-[#10372F]">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#0B3024] dark:text-[#E6F4EE] leading-relaxed font-medium">
            {overview.problem && overview.solution
              ? `${projectTitle || "This project"} is an AI-powered digital campus platform designed to bring academics, student collaboration, campus activities, opportunities and college information into one connected experience.`
              : overview.solution}
          </p>
        </div>
      </div>

      {/* Problem & Solution 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBFB] dark:bg-[#1A1111]/40 border border-rose-200/70 dark:border-rose-950/60 flex flex-col justify-between space-y-2.5">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>The Problem</span>
          </div>
          <p className="text-xs sm:text-[13px] text-[#4C6B61] dark:text-[#CBD5E1] leading-relaxed">
            {overview.problem}
          </p>
        </div>

        {/* Solution Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F6FCF9] dark:bg-[#07241E]/40 border border-emerald-200/70 dark:border-emerald-950/60 flex flex-col justify-between space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>The Solution</span>
          </div>
          <p className="text-xs sm:text-[13px] text-[#4C6B61] dark:text-[#CBD5E1] leading-relaxed">
            {overview.solution}
          </p>
        </div>
      </div>

      {/* Key Highlights */}
      {overview.highlights && overview.highlights.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Key Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {overview.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] text-xs text-[#0B3024] dark:text-[#E6F4EE]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
                <span className="leading-snug">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
