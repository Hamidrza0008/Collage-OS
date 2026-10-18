"use client";

import React from "react";
import {
  Clock,
  ArrowRight,
  ChevronRight,
  FileText,
  Users,
  Calendar,
} from "lucide-react";
import { FACULTY_RECENT_QUERIES } from "./facultyCampusAIData";

export default function FacultyAIRecentQueries({
  queries = FACULTY_RECENT_QUERIES,
  onSelectQuery,
  onViewAll,
}) {
  const renderQueryIcon = (iconType, iconColor) => {
    let colorClass = "text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200/50";
    if (iconColor === "purple") {
      colorClass = "text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200/50";
    } else if (iconColor === "orange") {
      colorClass = "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200/50";
    } else if (iconColor === "green") {
      colorClass = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/50";
    }

    const className = "w-3.5 h-3.5";

    return (
      <div
        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}
      >
        {iconType === "users" ? (
          <Users className={className} />
        ) : iconType === "calendar" ? (
          <Calendar className={className} />
        ) : (
          <FileText className={className} />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark p-5 shadow-2xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-0.5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-[14px] font-bold text-text-primary dark:text-text-primary-dark">
            Recent Queries
          </h2>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Queries List */}
      <div className="space-y-1.5">
        {queries.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => onSelectQuery(q.query)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              {renderQueryIcon(q.iconType, q.iconColor)}
              <div className="min-w-0">
                <span className="text-xs font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block truncate">
                  {q.query}
                </span>
                <span className="text-[10.5px] text-text-secondary dark:text-text-secondary-dark block">
                  {q.timeAgo}
                </span>
              </div>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-text-secondary/50 group-hover:text-emerald-600 shrink-0 ml-2 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
