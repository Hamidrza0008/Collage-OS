"use client";

import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { NOTIFICATION_CATEGORIES } from "./notificationData";

export default function NotificationFilters({
  searchQuery = "",
  onSearchChange,
  activeCategory = "all",
  onCategoryChange,
  sortBy = "newest",
  onSortChange,
  onOpenMobileDrawer,
  categoryCounts = {},
}) {
  const isFiltered = activeCategory !== "all" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-3.5">
      {/* Search Bar + Sort & Mobile Drawer Trigger */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#658278] dark:text-[#789991] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notifications by keyword, course, company, tag (e.g. DBMS, Google, Hackathon)..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none focus:ring-2 focus:ring-[#159B72] dark:focus:ring-[#20D39B] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Sort Dropdown */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72] cursor-pointer appearance-none shadow-xs"
              aria-label="Sort notifications"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority First</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          className="sm:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer shadow-xs active:scale-95"
          aria-label="Open filter options"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Filters</span>
          {isFiltered && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
          )}
        </button>
      </div>

      {/* Horizontal Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {NOTIFICATION_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat.id];
          const isSelected = activeCategory === cat.id;

          // Don't display category if it has 0 items and isn't 'all', 'unread', or 'action_required'
          if (
            count === 0 &&
            cat.id !== "all" &&
            cat.id !== "unread" &&
            cat.id !== "action_required"
          ) {
            return null;
          }

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0B3024] dark:bg-[#20D39B] text-white dark:text-[#021512] font-semibold shadow-xs"
                  : "bg-white dark:bg-[#06241F] text-[#4A685D] dark:text-[#8BAAA0] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24]"
              }`}
            >
              <span>{cat.label}</span>
              {typeof count === "number" && count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected
                      ? "bg-white/20 dark:bg-[#021512]/20 text-white dark:text-[#021512]"
                      : "bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]"
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
