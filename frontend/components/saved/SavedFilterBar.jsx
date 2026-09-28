"use client";

import { Search, X, ArrowUpDown, Folder, Filter } from "lucide-react";
import { SAVED_SORT_OPTIONS } from "./savedItemData";

export default function SavedFilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  activeCollection,
  onCollectionChange,
  collections = [],
  filteredCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
      {/* Search Bar */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#658278] dark:text-[#789991]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search saved projects, opportunities, notices, subjects, tags..."
          className="w-full pl-9.5 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {/* Collection Dropdown Filter */}
        <div className="relative flex-1 sm:flex-none">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl shadow-xs text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            <Folder className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
            <select
              value={activeCollection || ""}
              onChange={(e) => onCollectionChange(e.target.value || null)}
              className="bg-transparent border-none text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden cursor-pointer pr-1"
            >
              <option value="" className="bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6]">
                All Collections
              </option>
              {collections.map((col) => (
                <option
                  key={col.id}
                  value={col.id}
                  className="bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6]"
                >
                  {col.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl shadow-xs text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden cursor-pointer pr-1"
            >
              {SAVED_SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.id}
                  value={opt.id}
                  className="bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtered items counter badge */}
        <span className="hidden md:inline-flex text-[11px] font-semibold text-[#658278] dark:text-[#789991] px-2 py-1 bg-gray-100 dark:bg-[#041D18] rounded-lg whitespace-nowrap">
          {filteredCount} {filteredCount === 1 ? "item" : "items"}
        </span>
      </div>
    </div>
  );
}
