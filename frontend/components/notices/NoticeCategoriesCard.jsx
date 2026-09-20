"use client";

import { ArrowUpRight } from "lucide-react";

export default function NoticeCategoriesCard({ selectedCategory, onSelectCategory }) {
  const categories = [
    "All",
    "Important",
    "Exam",
    "Event",
    "Placement",
    "General",
    "Information",
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Categories
        </h2>
        <button
          type="button"
          onClick={() => onSelectCategory("All Categories")}
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Chips Grid / Wrap */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {categories.map((cat) => {
          const isSelected =
            (cat === "All" && (selectedCategory === "All Categories" || selectedCategory === "All")) ||
            selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat === "All" ? "All Categories" : cat)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                isSelected
                  ? "bg-emerald-700 dark:bg-emerald-500 text-white dark:text-[#021512] font-bold shadow-xs"
                  : "border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#021512] text-[#5C786E] dark:text-[#8AA89F] hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
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
