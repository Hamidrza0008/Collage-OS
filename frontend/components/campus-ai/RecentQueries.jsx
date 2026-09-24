"use client";

import { Clock, ArrowRight, Calendar, BookOpen, User, FileText, CalendarDays } from "lucide-react";

export default function RecentQueries({ queries, onSelectQuery, onViewAll }) {
  const getQueryIcon = (text) => {
    const q = text.toLowerCase();
    if (q.includes("attendance") || q.includes("events")) return <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    if (q.includes("course") || q.includes("syllabus")) return <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    if (q.includes("profile")) return <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    return <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
  };

  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 shadow-xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Recent Queries
          </h2>
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

      {/* Query List */}
      {queries.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#658278] dark:text-[#789991]">
          No recent queries yet.
        </div>
      ) : (
        <div className="divide-y divide-[#D8E8E2]/60 dark:divide-[#16463D]/60 pt-1">
          {queries.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectQuery(item.question)}
              className="w-full text-left py-2 px-1 flex items-center justify-between text-xs text-[#36594C] dark:text-[#B5CCC5] hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 rounded-lg transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0">
                  {getQueryIcon(item.question)}
                </div>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors truncate">
                  {item.question}
                </span>
              </div>
              <span className="text-[10px] text-[#658278] dark:text-[#789991] shrink-0 font-normal">
                {item.timeAgo}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
