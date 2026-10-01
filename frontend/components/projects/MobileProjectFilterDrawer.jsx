"use client";

import { useEffect } from "react";
import { X, SlidersHorizontal, Check, RotateCcw } from "lucide-react";
import { BRANCH_OPTIONS, PROJECT_CATEGORIES, SORT_OPTIONS } from "./projectsData";

export default function MobileProjectFilterDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  selectedBranch,
  onBranchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onResetFilters,
  counts = {},
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: "all", label: "All Projects", count: counts.all },
    { id: "my-projects", label: "My Projects", count: counts.my },
    { id: "liked", label: "Liked Projects", count: counts.liked },
    { id: "my-team", label: "My Team", count: counts.team },
  ];

  const hasActiveFilters =
    activeTab !== "all" ||
    selectedBranch !== "all" ||
    selectedCategory !== "All" ||
    sortBy !== "latest";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-project-filter-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 lg:hidden"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] dark:bg-[#06241F] border-t sm:border border-[#D8E8E2] dark:border-[#16463D] rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#16463D]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3
              id="mobile-project-filter-title"
              className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]"
            >
              Filter & Sort Projects
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filter drawer"
            className="p-1.5 rounded-lg text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Tab Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Project Collection
          </label>
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                      : "bg-[#F8FAFC] dark:bg-[#082A24] text-[#06241F]/80 dark:text-[#D8E8E2]/80 border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {tab.label}
                    {typeof tab.count === "number" && (
                      <span
                        className={`inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-[#159B72]/20 text-[#159B72] dark:text-[#20D39B]"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Branch Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Branch / Department
          </label>
          <div className="max-h-40 overflow-y-auto rounded-xl border border-[#D8E8E2] dark:border-[#16463D]">
            {BRANCH_OPTIONS.map((branch) => {
              const isSelected = selectedBranch === branch.value;
              return (
                <button
                  key={branch.value}
                  type="button"
                  onClick={() => onBranchChange(branch.value)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium border-b border-[#D8E8E2] dark:border-[#16463D] last:border-b-0 text-left cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-[#0D4436] text-emerald-900 dark:text-emerald-200 font-bold"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5]"
                  }`}
                >
                  <span>{branch.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Project Category
          </label>
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#159B72] text-white shadow-xs"
                      : "bg-white dark:bg-[#082A24] text-[#426659] dark:text-[#9FBDB4] border border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Sort Projects
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E8F1ED] dark:border-[#16463D]">
          <button
            type="button"
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            disabled={!hasActiveFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] dark:bg-[#20D39B] dark:hover:bg-[#10B981] text-white dark:text-[#021512] transition-colors shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
