"use client";

import React, { useState } from "react";
import { Filter, Calendar, ChevronDown, Check } from "lucide-react";

export default function NoticesFilterSidebar({
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange,
}) {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const dateRangeOptions = [
    { label: "Last 7 days", value: "7days" },
    { label: "Last 30 days", value: "30days" },
    { label: "Last 3 months", value: "3months" },
    { label: "All Time", value: "all" },
  ];

  const selectedDateLabel =
    dateRangeOptions.find((opt) => opt.value === dateRangeFilter)?.label ||
    "Last 30 days";

  return (
    <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark p-5 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-1">
        <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-[14px] font-bold text-text-primary dark:text-text-primary-dark">
          Filter & Sort
        </h2>
      </div>

      {/* 1. Category */}
      <div className="space-y-2.5">
        <label className="text-[11.5px] font-semibold text-text-secondary dark:text-text-secondary-dark tracking-wide uppercase">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {["all", "notices", "announcements"].map((cat) => {
            const isSelected = categoryFilter === cat;
            const label =
              cat === "all"
                ? "All"
                : cat === "notices"
                ? "Notices"
                : "Announcements";
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryFilterChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#063327] dark:bg-[#159B72] text-white shadow-xs"
                    : "bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-emerald-500/50 hover:text-text-primary dark:hover:text-text-primary-dark"
                }`}
              >
                {label}
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
          {["all", "active", "expired"].map((st) => {
            const isSelected = statusFilter === st;
            const label =
              st === "all" ? "All" : st === "active" ? "Active" : "Expired";
            return (
              <button
                key={st}
                type="button"
                onClick={() => onStatusFilterChange(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#063327] dark:bg-[#159B72] text-white shadow-xs"
                    : "bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-emerald-500/50 hover:text-text-primary dark:hover:text-text-primary-dark"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Date Range */}
      <div className="space-y-2.5">
        <label className="text-[11.5px] font-semibold text-text-secondary dark:text-text-secondary-dark tracking-wide uppercase">
          Date Range
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-xs font-medium text-text-primary dark:text-text-primary-dark hover:border-emerald-500/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-text-secondary dark:text-text-secondary-dark" />
              <span>{selectedDateLabel}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-text-secondary-dark" />
          </button>

          {isDateDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-card-bg border border-border-light dark:border-border-dark rounded-xl shadow-lg py-1 z-20">
              {dateRangeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onDateRangeFilterChange(opt.value);
                    setIsDateDropdownOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  {dateRangeFilter === opt.value && (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
