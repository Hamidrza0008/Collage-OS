"use client";

import { useEffect } from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import { SORT_OPTIONS } from "./globalSearchData";

export default function MobileSearchFilterDrawer({
  isOpen,
  onClose,
  activeCategory,
  departmentFilter,
  onDepartmentChange,
  workModeFilter,
  onWorkModeChange,
  sort,
  onSortChange,
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

  return (
    <div
      role="dialog"
      aria-modal="true"
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
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Search Filters & Ordering
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
            Sort Order
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSortChange(opt.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border text-left cursor-pointer transition-colors ${
                  sort === opt.value
                    ? "bg-emerald-50 dark:bg-[#082A24] border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold"
                    : "bg-[#F7FBF9] dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#B5CCC5]"
                }`}
              >
                <span>{opt.label}</span>
                {sort === opt.value && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Department Filter (when applicable) */}
        {(activeCategory === "all" ||
          activeCategory === "students" ||
          activeCategory === "notices" ||
          activeCategory === "courses") && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Examination Cell">Examination Cell</option>
              <option value="Training & Placement Cell">Training & Placement Cell</option>
              <option value="Principal Office">Principal Office</option>
            </select>
          </div>
        )}

        {/* Work Mode Filter (when applicable) */}
        {(activeCategory === "all" || activeCategory === "opportunities") && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider block">
              Work Mode
            </label>
            <select
              value={workModeFilter}
              onChange={(e) => onWorkModeChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#087A5B] transition-colors cursor-pointer shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
