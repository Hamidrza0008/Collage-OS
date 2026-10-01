"use client";

import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { PROJECT_CATEGORIES, SORT_OPTIONS } from "./projectsData";

export default function ProjectCategories({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount = 0,
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 py-1 transition-colors">
      {/* Category Filter Chips (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {PROJECT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-[#159B72] text-white shadow-xs"
                  : "bg-white dark:bg-[#06241F] text-[#426659] dark:text-[#9FBDB4] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sorting Dropdown on Right */}
      <div className="self-end sm:self-auto shrink-0 flex items-center gap-2">
        {/* Mobile Filter Button (visible only on mobile, replaces category chips) */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] text-xs font-semibold hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#159B72] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs">
          <ArrowUpDown className="w-3 h-3 text-[#159B72] dark:text-[#20D39B] shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer pr-1"
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6]"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
