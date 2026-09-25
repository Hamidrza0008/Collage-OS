"use client";

import { FileCode, AlertCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ProblemStatement({ problemStatement }) {
  const [copied, setCopied] = useState(false);

  if (!problemStatement) return null;

  const handleCopyCode = () => {
    if (problemStatement?.codeSnippet?.code) {
      navigator.clipboard?.writeText(problemStatement.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <FileCode className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Problem Statement & Specifications
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Detailed academic brief, technical constraints, and implementation scope
          </p>
        </div>
      </div>

      {/* Narrative Prose Intro */}
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-xs sm:text-sm text-[#35574C] dark:text-[#C5DCD4] leading-relaxed">
          {problemStatement.intro}
        </p>
      </div>

      {/* Numbered Core Objectives */}
      {problemStatement.objectives && problemStatement.objectives.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Key Objectives & Deliverables
          </h3>
          <ol className="space-y-2">
            {problemStatement.objectives.map((obj, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] text-xs text-[#35574C] dark:text-[#C5DCD4]"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-[#20D39B] text-[11px] font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="leading-relaxed flex-1">{obj}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Technical Constraints Box */}
      {problemStatement.technicalConstraints && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Technical Constraints & Rules</span>
          </h3>
          <ul className="space-y-1.5 pl-1">
            {problemStatement.technicalConstraints.map((constraint, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-[#55786B] dark:text-[#8FAFA4] leading-relaxed"
              >
                <span className="text-emerald-500 font-bold">•</span>
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code / Structure Snippet */}
      {problemStatement.codeSnippet && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
              {problemStatement.codeSnippet.title || "Reference Specification"}
            </h4>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 text-[11px] text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#D8E8E2] dark:border-[#10372F] bg-[#0A1A17] text-[#D1E7DF] p-3.5 sm:p-4 font-mono text-[11.5px] sm:text-xs overflow-x-auto leading-relaxed shadow-inner">
            <pre className="whitespace-pre">{problemStatement.codeSnippet.code}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
