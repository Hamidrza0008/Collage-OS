"use client";

import { Search, SlidersHorizontal, X, ChevronDown, RotateCcw } from "lucide-react";
import { LOST_FOUND_CATEGORIES } from "../lostFoundData";

export default function MyReportsFilterBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onResetFilters,
  onOpenMobileFilter,
  activeFilterCount,
  tabCounts,
}) {
  const tabs = [
    { id: "all", label: "All", count: tabCounts.all },
    { id: "lost", label: "Lost Items", count: tabCounts.lost },
    { id: "found", label: "Found Items", count: tabCounts.found },
    { id: "claims", label: "Claims", count: tabCounts.claims },
    { id: "resolved", label: "Resolved", count: tabCounts.resolved },
    { id: "needs-action", label: "Needs Action", count: tabCounts.needsAction, highlight: tabCounts.needsAction > 0 },
  ];

  const statusOptions = [
    { id: "All", label: "All Statuses" },
    { id: "Open", label: "Open / Active" },
    { id: "Needs Action", label: "Needs Action" },
    { id: "Resolved", label: "Resolved" },
    { id: "Cancelled", label: "Cancelled" },
    { id: "Searching", label: "Searching" },
    { id: "Possible Match Found", label: "Possible Match Found" },
    { id: "Verification Pending", label: "Verification Pending" },
  ];

  const sortOptions = [
    { id: "recently-updated", label: "Recently Updated" },
    { id: "newest", label: "Newest Report" },
    { id: "oldest", label: "Oldest Report" },
    { id: "recently-resolved", label: "Recently Resolved" },
  ];

  return (
    <div className="space-y-3">
      {/* 1. Primary Status Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-[#D8E8E2] dark:border-[#16463D] pb-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-[#159B72] dark:text-[#20D39B] font-bold"
                  : "text-[#55786B] dark:text-[#9FB7AD] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100/60 dark:hover:bg-[#082A24]/60"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                  isActive
                    ? "bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]"
                    : tab.highlight
                    ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400"
                    : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991]"
                }`}
              >
                {tab.count}
              </span>

              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Search, Desktop Filters & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#658278] dark:text-[#789991]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by case ID, item name, location, keyword..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-[13px] rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#85A297] dark:placeholder-[#65857B] focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] focus:ring-1 focus:ring-[#159B72] dark:focus:ring-[#20D39B] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Filter Dropdowns */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] shadow-2xs"
            >
              <option value="All">All Categories</option>
              {LOST_FOUND_CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <option key={c.id} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] shadow-2xs"
            >
              {statusOptions.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] shadow-2xs"
            >
              {sortOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
          </div>

          {/* Reset Filters button if any active */}
          {(searchQuery || selectedCategory !== "All" || selectedStatus !== "All" || sortBy !== "recently-updated") && (
            <button
              type="button"
              onClick={onResetFilters}
              title="Reset all filters"
              className="p-2 rounded-xl bg-gray-100 dark:bg-[#082A24] border border-gray-200 dark:border-[#16463D] text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenMobileFilter}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
              activeFilterCount > 0
                ? "bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D]"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters &amp; Sort</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#042A20] text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {(searchQuery || selectedCategory !== "All" || selectedStatus !== "All") && (
            <button
              type="button"
              onClick={onResetFilters}
              className="p-2 rounded-xl bg-gray-100 dark:bg-[#082A24] border border-gray-200 dark:border-[#16463D] text-[#658278] dark:text-[#789991] cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
