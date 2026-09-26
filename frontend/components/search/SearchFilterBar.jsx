"use client";

import { SlidersHorizontal, ArrowUpDown, RotateCcw } from "lucide-react";
import { SORT_OPTIONS } from "./globalSearchData";

export default function SearchFilterBar({
  activeCategory,
  totalResults,
  query,
  sort,
  onSortChange,
  departmentFilter,
  onDepartmentChange,
  workModeFilter,
  onWorkModeChange,
  onOpenMobileFilters,
  onResetFilters,
}) {
  const hasActiveFilters = departmentFilter !== "all" || workModeFilter !== "all";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 py-1">
      {/* Result Count and Active Query Label */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {totalResults} {totalResults === 1 ? "result" : "results"}
        </span>
        {query && (
          <span className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
            for &ldquo;<strong className="text-[#0B3024] dark:text-[#F1FAF6] font-semibold">{query}</strong>&rdquo;
          </span>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer ml-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Mobile Filter Drawer Button */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] dark:bg-[#021512] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs hover:bg-[#F1F8F5] cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          )}
        </button>

        {/* Desktop Contextual Filter: Department */}
        {(activeCategory === "students" || activeCategory === "notices" || activeCategory === "courses") && (
          <div className="hidden lg:flex items-center gap-1 text-xs">
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] dark:bg-[#021512] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science & Engineering">Computer Science (CSE)</option>
              <option value="Information Technology">Information Tech (IT)</option>
              <option value="Examination Cell">Examination Cell</option>
              <option value="Training & Placement Cell">Placement Cell</option>
            </select>
          </div>
        )}

        {/* Desktop Contextual Filter: Work Mode (Opportunities) */}
        {activeCategory === "opportunities" && (
          <div className="hidden lg:flex items-center gap-1 text-xs">
            <select
              value={workModeFilter}
              onChange={(e) => onWorkModeChange(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] dark:bg-[#021512] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        )}

        {/* Sort Selector */}
        <div className="flex items-center gap-1 text-xs">
          <div className="relative inline-flex items-center">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="pl-7 pr-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] dark:bg-[#021512] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] absolute left-2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
