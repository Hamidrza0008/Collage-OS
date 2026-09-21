"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES_LIST } from "./eventsData";

export default function EventTabsAndFilters({
  activeTab,
  onTabChange,
  upcomingCount = 8,
  ongoingCount = 2,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) {
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming", badge: upcomingCount },
    { id: "ongoing", label: "Ongoing", badge: ongoingCount },
    { id: "past", label: "Past" },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-2 sm:p-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 transition-colors">
      {/* Left: Tabs */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#159B72] text-white shadow-xs"
                  : "text-[#406356] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-100 dark:hover:bg-[#082A24]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-[#DDF4EB] dark:bg-[#0A3D30] text-[#159B72] dark:text-[#20D39B]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Input + Category Dropdown */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Search Field */}
        <div className="relative flex-1 sm:w-52 md:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-[#658278]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-8.5 pr-8 py-1.5 text-xs sm:text-[13px] rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18] text-[#0B3024] dark:text-[#E2F1EC] placeholder-[#658278] dark:placeholder-[#658278] focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative shrink-0" ref={catRef}>
          <button
            type="button"
            onClick={() => setCatOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18] hover:bg-gray-100 dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="max-w-[110px] truncate">{selectedCategory}</span>
            <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-500" />
          </button>

          {catOpen && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#10372F] text-[10.5px] font-semibold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                Filter by Category
              </div>
              <div className="max-h-56 overflow-y-auto py-1">
                {CATEGORIES_LIST.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onCategoryChange(cat);
                        setCatOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                          : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-gray-50 dark:hover:bg-[#082A24]"
                      }`}
                    >
                      <span>{cat}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
