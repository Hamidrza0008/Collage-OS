"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATALOG_SEMESTERS, CATALOG_TYPES, CATALOG_DEPARTMENTS } from "./subjectCatalogData";

export default function SubjectCatalogFilters({
  searchQuery,
  onSearchChange,
  selectedSemester,
  onSemesterChange,
  selectedType,
  onTypeChange,
  selectedDepartment,
  onDepartmentChange,
  onResetFilters,
  hasActiveFilters,
  resultCount = 0,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 space-y-4 transition-all">
      {/* Search Bar & Department Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C786E] dark:text-[#8AA89F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by course code or subject title (e.g. CSE-302, DSA, Web Dev)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-gray-50 dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-xs sm:text-sm text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#8AA89F] focus:outline-hidden focus:ring-2 focus:ring-[#159B72]/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-gray-200 dark:hover:bg-[#10372F] text-[#5C786E] dark:text-[#8AA89F] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Department selector */}
        <div className="shrink-0 flex items-center gap-2">
          <label htmlFor="dept-select" className="text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] whitespace-nowrap hidden md:inline">
            Department:
          </label>
          <select
            id="dept-select"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:ring-2 focus:ring-[#159B72]/40 transition-all cursor-pointer"
          >
            {CATALOG_DEPARTMENTS.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row 1: Semester Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider shrink-0 mr-1">
          Semester:
        </span>
        {CATALOG_SEMESTERS.map((sem) => {
          const isActive = selectedSemester === sem.value;
          return (
            <button
              key={sem.value}
              type="button"
              onClick={() => onSemesterChange(sem.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#159B72] text-white shadow-2xs"
                  : "bg-gray-100/70 dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-200/70 dark:hover:bg-[#10372F]"
              }`}
            >
              {sem.label}
            </button>
          );
        })}
      </div>

      {/* Filter Row 2: Course Type Filter & Result Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-[#10372F]/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider shrink-0 mr-1">
            Type:
          </span>
          {CATALOG_TYPES.map((type) => {
            const isActive = selectedType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onTypeChange(type.value)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0B3024] dark:bg-[#F1FAF6] text-white dark:text-[#0B3024]"
                    : "text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-[#041D18]"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F]">
          Showing <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{resultCount}</strong> courses matching filters
        </div>
      </div>
    </div>
  );
}
