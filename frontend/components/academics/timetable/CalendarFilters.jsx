"use client";

import {
  TYPE_FILTER_OPTIONS,
  SUBJECT_FILTER_OPTIONS,
} from "./timetableData";
import {
  Layers,
  BookOpen,
  GraduationCap,
  FileText,
  Calendar,
  Bell,
  Sun,
  Clock,
  RotateCcw,
} from "lucide-react";

export default function CalendarFilters({
  activeType,
  onTypeChange,
  activeSubject,
  onSubjectChange,
  onResetFilters,
}) {
  const iconMap = {
    Layers,
    BookOpen,
    GraduationCap,
    FileText,
    Calendar,
    Bell,
    Sun,
    Clock,
  };

  const isFiltered = activeType !== "all" || activeSubject !== "all";

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 shadow-xs space-y-3">
      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Filter by Subject:
          </span>
          <select
            value={activeSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#159B72] cursor-pointer"
            aria-label="Filter schedule by subject"
          >
            {SUBJECT_FILTER_OPTIONS.map((sub) => (
              <option key={sub.id} value={sub.id} className="bg-white dark:bg-[#06241F]">
                {sub.label} {sub.code !== "ALL" ? `(${sub.code})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Reset filter button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors py-1 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Item Type Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {TYPE_FILTER_OPTIONS.map((opt) => {
          const IconComp = iconMap[opt.icon] || Layers;
          const isSelected = activeType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onTypeChange(opt.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0B3024] text-white dark:bg-[#159B72] dark:text-white font-bold shadow-xs"
                  : "bg-gray-100/70 dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-200/60 dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              <IconComp className="w-3 h-3 shrink-0" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
