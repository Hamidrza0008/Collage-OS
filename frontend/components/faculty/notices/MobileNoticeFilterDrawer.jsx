"use client";

import React, { useEffect } from "react";
import { X, Filter, RotateCcw, Calendar, Check, ArrowUpDown } from "lucide-react";

export default function MobileNoticeFilterDrawer({
  isOpen,
  onClose,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  activeFilterCount,
}) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const dateRangeOptions = [
    { label: "Last 30 days", value: "30days" },
    { label: "Last 90 days", value: "90days" },
    { label: "This Semester", value: "semester" },
    { label: "All Time", value: "all" },
  ];

  const sortOptions = [
    { label: "Latest First", value: "latest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Title A–Z", value: "title-asc" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#031C16] border-l border-border-light dark:border-border-dark h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary dark:text-text-primary-dark">
                Filter & Sort
              </h3>
              {activeFilterCount > 0 && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {activeFilterCount} active filter{activeFilterCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* 1. Category */}
          <div className="space-y-2.5">
            <label className="text-[11.5px] font-semibold text-text-secondary dark:text-text-secondary-dark tracking-wide uppercase">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Notices", value: "notices" },
                { label: "Announcements", value: "announcements" },
              ].map((cat) => {
                const isSelected = categoryFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => onCategoryFilterChange(cat.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#063327] dark:bg-[#159B72] text-white shadow-xs"
                        : "bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-emerald-500/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Status */}
          <div className="space-y-2.5">
            <label className="text-[11.5px] font-semibold text-text-secondary dark:text-text-secondary-dark tracking-wide uppercase">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Expired", value: "expired" },
              ].map((st) => {
                const isSelected = statusFilter === st.value;
                return (
                  <button
                    key={st.value}
                    type="button"
                    onClick={() => onStatusFilterChange(st.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#063327] dark:bg-[#159B72] text-white shadow-xs"
                        : "bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-emerald-500/50"
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Date Range */}
          <div className="space-y-2.5">
            <label className="text-[11.5px] font-semibold text-text-secondary dark:text-text-secondary-dark tracking-wide uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dateRangeOptions.map((opt) => {
                const isSelected = dateRangeFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onDateRangeFilterChange(opt.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                      isSelected
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500/50 font-semibold"
                        : "border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Sorting */}
          <div className="space-y-2.5">
            <label className="text-[11.5px] font-semibold text-text-secondary dark:text-text-secondary-dark tracking-wide uppercase flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort By
            </label>
            <div className="space-y-1.5">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onSortByChange(opt.value)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                      isSelected
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500/50 font-semibold"
                        : "border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/40 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex-1 py-2 px-3 rounded-xl border border-border-light dark:border-border-dark text-xs font-semibold text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-surface-dark flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-xl bg-[#159B72] hover:bg-[#11805D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
