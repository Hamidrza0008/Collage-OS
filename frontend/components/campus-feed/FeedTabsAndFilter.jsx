"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { POST_CATEGORIES } from "./feedData";

export default function FeedTabsAndFilter({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategoryChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    { id: "for-you", label: "For You" },
    { id: "following", label: "Following" },
    { id: "latest", label: "Latest" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
      {/* Left Tabs (For You / Following / Latest) */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/60 dark:bg-[#06241F]/60 border border-[#D8E8E2]/80 dark:border-[#16463D]/80">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-[#063327] dark:bg-[#159B72] text-white shadow-xs"
                  : "text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right: Category Filter Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:border-emerald-500/50 shadow-2xs transition-all cursor-pointer select-none"
        >
          <Filter className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{selectedCategory}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#658278] transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1 text-[10px] font-bold text-[#658278] uppercase tracking-wider">
              Filter by Type
            </div>
            {POST_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onCategoryChange(cat);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-white"
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
