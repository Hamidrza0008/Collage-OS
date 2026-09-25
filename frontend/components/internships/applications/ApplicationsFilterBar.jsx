"use client";

import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { STATUS_TABS } from "./applicationsData";

export default function ApplicationsFilterBar({
  activeTab,
  onSelectTab,
  tabCounts = {},
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedWorkMode,
  onWorkModeChange,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  onClearFilters,
  hasActiveFilters,
}) {
  const TYPE_OPTIONS = [
    { value: "all", label: "All Types" },
    { value: "Internship", label: "Internships" },
    { value: "Hackathon", label: "Hackathons" },
    { value: "Competition", label: "Competitions" },
    { value: "Fellowship", label: "Fellowships" },
  ];

  const WORK_MODE_OPTIONS = [
    { value: "all", label: "All Work Modes" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const SORT_OPTIONS = [
    { value: "recently-updated", label: "Recently Updated" },
    { value: "newest-applied", label: "Newest Applied" },
    { value: "oldest-applied", label: "Oldest Applied" },
    { value: "deadline-soonest", label: "Deadline Soonest" },
    { value: "company-asc", label: "Company (A–Z)" },
    { value: "company-desc", label: "Company (Z–A)" },
  ];

  return (
    <div className="w-full space-y-3.5">
      {/* 1. Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        {STATUS_TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          const count = tabCounts[tab.id] ?? 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512] shadow-xs"
                  : "bg-white/60 dark:bg-[#06241F]/60 text-[#06241F]/70 dark:text-[#D8E8E2]/70 hover:bg-white dark:hover:bg-[#06241F] hover:text-[#06241F] dark:hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected
                    ? "bg-white/25 text-white dark:bg-black/20 dark:text-[#021512]"
                    : "bg-[#D8E8E2]/60 dark:bg-[#10372F] text-[#06241F]/70 dark:text-[#D8E8E2]/70"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Search & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, company, or application ID..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white p-0.5 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Filter Dropdowns */}
        <div className="hidden md:flex items-center gap-2">
          {/* Opportunity Type */}
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] cursor-pointer"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Work Mode */}
          <select
            value={selectedWorkMode}
            onChange={(e) => onWorkModeChange(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] cursor-pointer"
          >
            {WORK_MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="px-2.5 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer whitespace-nowrap"
              title="Reset all filters"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            <span>Filters & Sort</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="p-2 rounded-xl text-xs text-rose-500 border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40"
              title="Clear all filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
