"use client";

import { ArrowRight } from "lucide-react";
import { SIDEBAR_CATEGORIES } from "./eventsData";

export default function EventCategoriesCard({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) {
  return (
    <div className="w-full rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs p-4 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Event Categories
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-1.5">
        {SIDEBAR_CATEGORIES.map((cat) => {
          const isSelected =
            (cat === "All" && (selectedCategory === "All Categories" || selectedCategory === "All")) ||
            selectedCategory.toLowerCase() === cat.toLowerCase();

          return (
            <button
              key={cat}
              type="button"
              onClick={() =>
                onSelectCategory(cat === "All" ? "All Categories" : cat)
              }
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-[#159B72] text-white shadow-xs"
                  : "bg-gray-50/80 dark:bg-[#041D18] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#10372F] hover:bg-[#DDF4EB]/50 dark:hover:bg-[#082A24]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
