"use client";

import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";

export default function LostFoundTabsAndSearch({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onToggleFilters,
  activeFilterCount = 0,
  counts = { all: 24, lost: 12, found: 12 },
}) {
  const tabs = [
    { id: "all", label: "All Items", count: counts.all },
    { id: "lost", label: "Lost Items", count: counts.lost },
    { id: "found", label: "Found Items", count: counts.found },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
      {/* Left: Main Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-[#D8E8E2] dark:border-[#16463D] pb-1 md:pb-0 md:border-b-0 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
                    : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991]"
                }`}
              >
                {tab.count}
              </span>
              {/* Active Underline Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Field & Filters Button */}
      <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
        {/* Search Field */}
        <div className="relative flex-1 md:w-64 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#658278] dark:text-[#789991]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items, category, description..."
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

        {/* Filters Button */}
        <button
          type="button"
          onClick={onToggleFilters}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold border transition-all cursor-pointer shrink-0 shadow-2xs ${
            activeFilterCount > 0
              ? "bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40 dark:border-[#20D39B]/40"
              : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/60 dark:hover:border-[#20D39B]/60"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFilterCount > 0 ? (
            <span className="w-4 h-4 rounded-full bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#042A20] text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          ) : (
            <ChevronDown className="w-3 h-3 text-[#658278] dark:text-[#789991]" />
          )}
        </button>
      </div>
    </div>
  );
}
