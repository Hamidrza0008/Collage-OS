"use client";

import {
  FileSpreadsheet,
  CalendarCheck,
  Download,
  FileText,
  CalendarDays,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { QUICK_ACTIONS } from "./academicsData";

export default function QuickActionsCard({ onActionClick }) {
  const getIcon = (type) => {
    switch (type) {
      case "marks":
        return <FileSpreadsheet className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case "attendance":
        return <CalendarCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case "download":
        return <Download className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case "revaluation":
        return <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case "calendar":
        return <CalendarDays className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      default:
        return <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Quick Actions
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Action Rows */}
      <div className="space-y-2">
        {QUICK_ACTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onActionClick(item.target)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60 hover:bg-emerald-50/60 dark:hover:bg-[#082A24] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>
              <span className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                {item.label}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#789991] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
