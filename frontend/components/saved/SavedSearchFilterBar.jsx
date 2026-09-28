"use client";

import { Search, X, ArrowUpDown, Filter, Folder } from "lucide-react";
import { SORT_OPTIONS } from "./savedItemsData";

export default function SavedSearchFilterBar({
  searchQuery = "",
  onSearchChange,
  sortBy = "recently-saved",
  onSortChange,
  selectedCollection = "all",
  onCollectionChange,
  collections = [],
  totalFiltered = 0,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
      {/* Search Input Bar */}
      <div className="relative flex-1 min-w-[220px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#658278] dark:text-[#789991]">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search saved titles, tags, companies, authors..."
          className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter and Sort Dropdowns */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Collection Filter Dropdown */}
        {collections.length > 0 && (
          <div className="relative">
            <select
              value={selectedCollection}
              onChange={(e) => onCollectionChange(e.target.value)}
              className="h-9 pl-8 pr-7 text-xs font-semibold rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#B5CCC5] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
              title="Filter by collection"
            >
              <option value="all">All Folders</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            <Folder className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991] pointer-events-none" />
            <Filter className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991] pointer-events-none opacity-60" />
          </div>
        )}

        {/* Sort By Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-9 pl-8 pr-7 text-xs font-semibold rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#B5CCC5] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
            title="Sort saved items"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
