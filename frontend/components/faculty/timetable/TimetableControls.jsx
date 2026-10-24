"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  LayoutGrid,
  List,
  Search,
  X,
  Filter,
  RotateCcw,
} from "lucide-react";
import { WEEK_DAYS, SUBJECT_FILTERS, BATCH_FILTERS } from "./facultyTimetableData";

export default function TimetableControls({
  viewMode, // "weekly" | "daily"
  onViewModeChange,
  activeDay, // "Monday", "Tuesday", etc.
  onSelectDay,
  currentWeekNumber,
  weekDateRange,
  onPrevWeek,
  onNextWeek,
  onResetToday,
  filters,
  onFilterChange,
  dayCounts = {},
}) {
  const hasActiveFilters =
    filters.subject !== "all" || filters.batch !== "all" || Boolean(filters.search);

  const handleClearFilters = () => {
    onFilterChange("subject", "all");
    onFilterChange("batch", "all");
    onFilterChange("search", "");
  };

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* Top Bar: View Mode Switcher + Week Navigation + Today Button */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
        {/* Left: View Mode Toggle (Weekly / Daily) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F0F5F2] dark:bg-[#072F26] border border-[#D8E8E2]/60 dark:border-[#10372F] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onViewModeChange("weekly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "weekly"
                ? "bg-white dark:bg-[#0E4F3D] text-[#0B3024] dark:text-white shadow-xs"
                : "text-[#658278] dark:text-[#8AAEA1] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Weekly View</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("daily")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "daily"
                ? "bg-white dark:bg-[#0E4F3D] text-[#0B3024] dark:text-white shadow-xs"
                : "text-[#658278] dark:text-[#8AAEA1] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Daily Schedule</span>
          </button>
        </div>

        {/* Right: Week Navigator & Today Jump */}
        <div className="flex items-center justify-between md:justify-end gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onPrevWeek}
              title="Previous Week"
              className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#8AAEA1] dark:hover:text-white hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] px-2 whitespace-nowrap">
              Week {currentWeekNumber} • <span className="font-normal text-[#658278] dark:text-[#8AAEA1]">{weekDateRange}</span>
            </span>

            <button
              type="button"
              onClick={onNextWeek}
              title="Next Week"
              className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#8AAEA1] dark:hover:text-white hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onResetToday}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#159B72] dark:text-[#20D39B] bg-[#E6F7F0] dark:bg-[#073629] border border-[#159B72]/30 hover:bg-[#D5F2E5] dark:hover:bg-[#0A4737] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
        </div>
      </div>

      {/* Middle Bar: Day Selection Pills (Essential for Daily mode, and fast filtering in Weekly mode) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {WEEK_DAYS.map((dayObj) => {
          const isActive = activeDay.toLowerCase() === dayObj.full.toLowerCase();
          const count = dayCounts[dayObj.full] || 0;

          return (
            <button
              key={dayObj.id}
              type="button"
              onClick={() => onSelectDay(dayObj.full)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                isActive
                  ? "bg-[#159B72] text-white border-[#159B72] shadow-sm shadow-[#159B72]/20"
                  : "bg-white dark:bg-[#06241F] text-[#4A6B60] dark:text-[#8AAEA1] border-[#D8E8E2] dark:border-[#10372F] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]"
              }`}
            >
              <span>{dayObj.full}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#F0F5F2] dark:bg-[#072F26] text-[#159B72] dark:text-[#20D39B]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Filter Bar: Subject, Batch, Search, Reset */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left Side: Selectors */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
          {/* Subject Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block mb-1">
              Filter by Subject
            </label>
            <select
              value={filters.subject}
              onChange={(e) => onFilterChange("subject", e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 cursor-pointer"
            >
              {SUBJECT_FILTERS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code !== "ALL" ? `${s.code} — ` : ""}{s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Filter */}
          <div className="flex-1 min-w-[180px]">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block mb-1">
              Filter by Batch
            </label>
            <select
              value={filters.batch}
              onChange={(e) => onFilterChange("batch", e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 cursor-pointer"
            >
              {BATCH_FILTERS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side: Search & Clear Button */}
        <div className="flex items-end gap-2 pt-1 md:pt-0">
          <div className="relative w-full sm:w-64">
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block mb-1">
              Search Timetable
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#658278] dark:text-[#789991] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
                placeholder="Search subject, batch, room..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs font-medium bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#8AAEA1] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30"
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() => onFilterChange("search", "")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#658278] hover:text-[#0B3024] dark:text-[#8AAEA1] dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              title="Reset all filters"
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#EA580C] dark:text-[#FB923C] bg-[#FFF4E5] dark:bg-[#3D2509] border border-[#EA580C]/20 hover:bg-[#FFE8CC] transition-colors flex items-center gap-1.5 cursor-pointer h-[38px] shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
