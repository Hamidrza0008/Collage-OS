"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { OPPORTUNITY_TABS } from "./internshipsData";

export default function OpportunityTabsAndSearch({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onToggleFilters,
  activeFilterCount = 0,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-2.5 sm:p-3 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-colors">
      {/* Left: Main Tabs */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {OPPORTUNITY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-[#159B72] text-white shadow-xs"
                  : "text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right: Search Field + Filters Button */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search input */}
        <div className="relative flex-1 sm:w-60 md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, company, or tag..."
            className="w-full pl-8.5 pr-8 py-1.5 rounded-xl text-xs font-medium bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72] dark:focus:border-[#20D39B] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Trigger Button */}
        <button
          type="button"
          onClick={onToggleFilters}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
            activeFilterCount > 0
              ? "bg-[#DDF4EB] dark:bg-[#0D4436] text-[#087A5B] dark:text-[#20D39B] border-[#159B72]/50"
              : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#EBF7F2] dark:hover:bg-[#0D4436]"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#159B72] text-white text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
