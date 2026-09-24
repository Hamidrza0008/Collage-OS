"use client";

import { X, Database, FileText, Layers, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { HOW_IT_WORKS_RULES, QUICK_PROMPTS } from "./campusAIData";

export function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Campus AI Architecture
              </h3>
              <p className="text-xs text-[#658278]">
                MongoDB Source of Truth + RAG Vector Search
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3.5 text-xs text-[#36594C] dark:text-[#B5CCC5] leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-1">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              1. MongoDB — Application Source of Truth
            </span>
            <p>
              Real-time student data (such as timetables, attendance percentages, assignment deadlines, exam marks, and official notices) are retrieved directly from verified MongoDB collections with strict access controls.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-1">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              2. Vector Retrieval Augmented Generation (RAG)
            </span>
            <p>
              Unstructured university documents (academic regulations, syllabus PDFs, hostel handbooks, placement cell criteria) are chunked, embedded, and queried via semantic vector similarity.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-1">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              3. Hybrid Synthesis Engine
            </span>
            <p>
              Complex queries like "What is my attendance and what does the policy say about shortage?" synthesize both live MongoDB statistics and official regulatory text into an actionable answer.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-amber-900 dark:text-amber-200">
            <span className="font-semibold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              4. Strict Anti-Hallucination Guardrails
            </span>
            <p>
              If requested college information is absent from permitted database or document indexes, Campus AI returns a clean "Information Unavailable" response rather than inventing unverified data.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 space-y-1 text-rose-900 dark:text-rose-200">
            <span className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              5. Student Privacy &amp; Credential Protection
            </span>
            <p>
              Passwords, session tokens, private identity fields, and confidential teacher notes are rigorously excluded from retrieval pipelines and LLM context windows.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

export function ViewAllQueriesModal({ isOpen, onClose, queries, onSelectQuery }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            All Recent Queries ({queries.length})
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Query List */}
        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
          {queries.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                onSelectQuery(q.question);
                onClose();
              }}
              className="w-full text-left p-2.5 rounded-xl border border-[#D8E8E2]/60 dark:border-[#16463D]/60 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs flex items-center justify-between transition-colors group cursor-pointer"
            >
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                {q.question}
              </span>
              <span className="text-[10px] text-[#658278] shrink-0 ml-2">
                {q.timeAgo}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
