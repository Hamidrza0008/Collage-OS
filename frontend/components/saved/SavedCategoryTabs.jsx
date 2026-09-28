"use client";

import { SAVED_CATEGORIES } from "./savedItemData";

export default function SavedCategoryTabs({
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
}) {
  return (
    <div className="relative border-b border-[#E8F1ED] dark:border-[#10372F]/60 mb-4 sm:mb-5">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 -mb-px">
        {SAVED_CATEGORIES.map((tab) => {
          const isActive = activeCategory === tab.id;
          const count = categoryCounts[tab.id] ?? 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-[13px] font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] border-emerald-300 dark:border-emerald-700/80 shadow-xs"
                  : "bg-transparent text-[#5C786E] dark:text-[#8AA89F] border-transparent hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100/70 dark:hover:bg-gray-800/50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512]"
                    : "bg-gray-200/80 dark:bg-gray-800 text-[#5C786E] dark:text-[#8AA89F]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
