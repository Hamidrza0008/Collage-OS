"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Sparkles,
  Info,
} from "lucide-react";
import { analyzeJobKeywords } from "./resumeBuilderData";

export default function JobDescriptionAnalyzer({
  resume,
  onChangeResume,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const keywordAnalysis = analyzeJobKeywords(resume.jobDescriptionText, resume);

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header with Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                Target Job Description &amp; Keyword Match
              </h3>
              {keywordAnalysis.hasTarget && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  {keywordAnalysis.coverage}% Matched
                </span>
              )}
            </div>
            <p className="text-xs text-[#658278] dark:text-[#8AA89F] mt-0.5">
              Paste job requirements to compare your resume against required technologies deterministically.
            </p>
          </div>
        </div>

        <div className="p-1 rounded-lg text-[#658278] dark:text-[#789991] group-hover:text-[#0B3024] dark:group-hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-4 animate-in fade-in duration-200">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center justify-between">
              <span>Paste Job Description / Requirements</span>
              {resume.jobDescriptionText && (
                <button
                  type="button"
                  onClick={() => onChangeResume({ ...resume, jobDescriptionText: "" })}
                  className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                >
                  Clear Text
                </button>
              )}
            </label>
            <textarea
              value={resume.jobDescriptionText || ""}
              onChange={(e) => onChangeResume({ ...resume, jobDescriptionText: e.target.value })}
              placeholder="Paste job posting text, qualifications, and tech stack here (e.g. 'Looking for React, Node.js, Docker, TypeScript, REST APIs...')"
              rows={4}
              className="w-full text-xs p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none leading-relaxed"
            />
          </div>

          {/* Keyword Match Results */}
          {keywordAnalysis.hasTarget ? (
            <div className="p-4 rounded-2xl bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Keyword Analysis ({keywordAnalysis.matched.length} of {keywordAnalysis.totalKeywordsFound} keywords present)</span>
                </span>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                  {keywordAnalysis.coverage}% Keyword Coverage
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${keywordAnalysis.coverage}%` }}
                />
              </div>

              {/* Matched Keywords */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
                  ✓ Present in your resume ({keywordAnalysis.matched.length})
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {keywordAnalysis.matched.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20 font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              {keywordAnalysis.missing.length > 0 && (
                <div className="space-y-1.5 pt-1 border-t border-[#E8F1ED] dark:border-[#10372F]">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">
                    ○ Mentioned in job but missing from resume ({keywordAnalysis.missing.length})
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {keywordAnalysis.missing.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-lg bg-amber-100/70 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-500/20 font-medium"
                      >
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-[11px] text-amber-800 dark:text-amber-300 mt-2">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Important:</strong> Only include missing keywords if you genuinely possess practical experience with them. Do not fabricate skills to inflate match rates.
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[11px] text-[#658278] dark:text-[#789991]">
              Tip: Paste the &quot;Required Skills&quot; or &quot;Responsibilities&quot; section from any internship posting to run a live comparison against your current resume content.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
