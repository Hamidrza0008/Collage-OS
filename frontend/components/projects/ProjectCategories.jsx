"use client";

import { ArrowUpDown } from "lucide-react";
import { PROJECT_CATEGORIES, SORT_OPTIONS } from "./projectsData";

export default function ProjectCategories({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 py-1 transition-colors">
      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
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
      <div className="self-end sm:self-auto shrink-0">
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
