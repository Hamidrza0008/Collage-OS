"use client";

import { Zap, Calendar, FileText, CalendarDays, Briefcase, ArrowRight } from "lucide-react";
import { QUICK_PROMPTS } from "./campusAIData";

export default function QuickPrompts({ onSelectPrompt, onViewAll }) {
  // Helper to map icon types
  const renderIcon = (type) => {
    switch (type) {
      case "calendar":
        return <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "document":
        return <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "events":
        return <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "briefcase":
        return <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
          <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
          <span>Quick Prompts</span>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2x2 Grid of Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onSelectPrompt(prompt.query)}
            className="flex items-center gap-3 p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-left hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {renderIcon(prompt.iconType)}
            </div>
            <span className="text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-1">
              {prompt.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
