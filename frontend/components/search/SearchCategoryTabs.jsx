"use client";

import { SEARCH_CATEGORIES } from "./globalSearchData";

export default function SearchCategoryTabs({
  activeCategory = "all",
  onSelectCategory,
  resultsByCategory = {},
  totalResults = 0,
  hasSearched = false,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-2 sm:p-2.5 transition-colors">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {SEARCH_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? totalResults
              : resultsByCategory[cat.id]?.length || 0;

          // If user searched and category has 0 results, dim slightly unless selected
          const hasZeroMatches = hasSearched && cat.id !== "all" && count === 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              disabled={hasZeroMatches && !isSelected}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#159B72] text-white shadow-xs font-bold"
                  : hasZeroMatches
                  ? "text-gray-400 dark:text-gray-600 bg-transparent opacity-60 cursor-not-allowed"
                  : "text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#06241F]"
              }`}
            >
              <span>{cat.label}</span>

              {hasSearched && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
