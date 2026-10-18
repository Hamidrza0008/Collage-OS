"use client";

import React from "react";
import { GraduationCap, Globe, Info } from "lucide-react";

export default function FacultyAIModeBar({ mode, onModeChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
      {/* 1. College Mode Card */}
      <button
        type="button"
        onClick={() => onModeChange("college")}
        className={`md:col-span-3.5 flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
          mode === "college"
            ? "bg-white dark:bg-card-bg border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
            : "bg-white/70 dark:bg-card-bg/70 border-border-light dark:border-border-dark hover:border-emerald-500/40"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            mode === "college"
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
              : "bg-gray-100 dark:bg-surface-dark text-text-secondary"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs sm:text-[13px] font-bold text-text-primary dark:text-text-primary-dark">
            College Mode
          </h3>
          <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark">
            Use college data + RAG
          </p>
        </div>
      </button>

      {/* 2. General Mode Card */}
      <button
        type="button"
        onClick={() => onModeChange("general")}
        className={`md:col-span-3.5 flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
          mode === "general"
            ? "bg-white dark:bg-card-bg border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
            : "bg-white/70 dark:bg-card-bg/70 border-border-light dark:border-border-dark hover:border-emerald-500/40"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            mode === "general"
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
              : "bg-gray-100 dark:bg-surface-dark text-text-secondary"
          }`}
        >
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs sm:text-[13px] font-bold text-text-primary dark:text-text-primary-dark">
            General Mode
          </h3>
          <p className="text-[11px] text-text-secondary dark:text-text-secondary-dark">
            Use general AI knowledge
          </p>
        </div>
      </button>

      {/* 3. Privacy & Source Guarantee Info Card */}
      <div className="md:col-span-5 flex items-center gap-3 p-3.5 rounded-2xl border border-border-light dark:border-border-dark bg-white/70 dark:bg-card-bg/70 text-xs text-text-secondary dark:text-text-secondary-dark">
        <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <p className="text-[11.5px] leading-snug">
          Campus AI uses MongoDB + RAG for college-related queries. No private data (emails, passwords, etc.).
        </p>
      </div>
    </div>
  );
}
