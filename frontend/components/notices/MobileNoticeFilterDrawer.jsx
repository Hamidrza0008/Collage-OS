"use client";

import { useEffect } from "react";
import { X, SlidersHorizontal, Check, RotateCcw } from "lucide-react";
import { DEPARTMENTS_LIST, CATEGORIES_LIST } from "./noticesData";

export default function MobileNoticeFilterDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  selectedDepartment,
  onDepartmentChange,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
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

  const hasActiveFilters =
    activeTab !== "notices" ||
    selectedDepartment !== "All Departments" ||
    selectedCategory !== "All Categories";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-notice-filter-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 lg:hidden"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] dark:bg-[#021512] border-t sm:border border-[#D8E8E2] dark:border-[#10372F] rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3
              id="mobile-notice-filter-title"
              className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]"
            >
              Filter Notices
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filter drawer"
            className="p-1.5 rounded-lg text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Type Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Notice Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "notices", label: "Notices" },
              { id: "announcements", label: "Announcements" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                      : "bg-[#F8FAFC] dark:bg-[#06241F] text-[#06241F]/80 dark:text-[#D8E8E2]/80 border-[#D8E8E2] dark:border-[#10372F]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Department Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Department
          </label>
          <div className="max-h-48 overflow-y-auto rounded-xl border border-[#D8E8E2] dark:border-[#10372F]">
            {DEPARTMENTS_LIST.map((dept) => {
              const isSelected = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => onDepartmentChange(dept)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium border-b border-[#D8E8E2] dark:border-[#10372F] last:border-b-0 text-left cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-900 dark:text-emerald-200 font-bold"
                      : "bg-[#F7FBF9] dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5]"
                  }`}
                >
                  <span className="truncate">{dept}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Category
          </label>
          <div className="max-h-44 overflow-y-auto rounded-xl border border-[#D8E8E2] dark:border-[#10372F]">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategoryChange(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium border-b border-[#D8E8E2] dark:border-[#10372F] last:border-b-0 text-left cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-900 dark:text-emerald-200 font-bold"
                      : "bg-[#F7FBF9] dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5]"
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
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
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] text-white transition-colors shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
