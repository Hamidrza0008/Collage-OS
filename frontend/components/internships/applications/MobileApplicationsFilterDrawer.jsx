"use client";

import { X, SlidersHorizontal, Check } from "lucide-react";

export default function MobileApplicationsFilterDrawer({
  isOpen,
  onClose,
  selectedType,
  onTypeChange,
  selectedWorkMode,
  onWorkModeChange,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}) {
  if (!isOpen) return null;

  const TYPE_OPTIONS = [
    { value: "all", label: "All Types" },
    { value: "Internship", label: "Internships" },
    { value: "Hackathon", label: "Hackathons" },
    { value: "Competition", label: "Competitions" },
    { value: "Fellowship", label: "Fellowships" },
  ];

  const WORK_MODE_OPTIONS = [
    { value: "all", label: "All Work Modes" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const SORT_OPTIONS = [
    { value: "recently-updated", label: "Recently Updated" },
    { value: "newest-applied", label: "Newest Applied" },
    { value: "oldest-applied", label: "Oldest Applied" },
    { value: "deadline-soonest", label: "Deadline Soonest" },
    { value: "company-asc", label: "Company (A–Z)" },
    { value: "company-desc", label: "Company (Z–A)" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#06241F] border-t sm:border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h3 className="text-sm font-bold text-[#06241F] dark:text-white">
              Filter & Sort Applications
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Opportunity Type */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#06241F] dark:text-[#D8E8E2]">
            Opportunity Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onTypeChange(opt.value)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedType === opt.value
                    ? "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                    : "bg-[#F8FAFC] dark:bg-[#021512] text-[#06241F]/80 dark:text-[#D8E8E2]/80 border-[#D8E8E2] dark:border-[#10372F]"
                }`}
              >
                <span>{opt.label}</span>
                {selectedType === opt.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Work Mode */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#06241F] dark:text-[#D8E8E2]">
            Work Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            {WORK_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onWorkModeChange(opt.value)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedWorkMode === opt.value
                    ? "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/40"
                    : "bg-[#F8FAFC] dark:bg-[#021512] text-[#06241F]/80 dark:text-[#D8E8E2]/80 border-[#D8E8E2] dark:border-[#10372F]"
                }`}
              >
                <span>{opt.label}</span>
                {selectedWorkMode === opt.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#06241F] dark:text-[#D8E8E2]">
            Sort Applications
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#D8E8E2]/60 dark:border-[#10372F]/60">
          <button
            type="button"
            onClick={() => {
              onClearFilters();
              onClose();
            }}
            disabled={!hasActiveFilters}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 disabled:opacity-40"
          >
            Reset Filters
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
