"use client";

import { X, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import { LOST_FOUND_CATEGORIES } from "../lostFoundData";

export default function MobileMyReportsFilterDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onResetFilters,
}) {
  if (!isOpen) return null;

  const statusOptions = [
    { id: "All", label: "All Statuses" },
    { id: "Open", label: "Open / Active" },
    { id: "Needs Action", label: "Needs Action" },
    { id: "Resolved", label: "Resolved" },
    { id: "Cancelled", label: "Cancelled" },
    { id: "Searching", label: "Searching" },
    { id: "Possible Match Found", label: "Possible Match Found" },
    { id: "Verification Pending", label: "Verification Pending" },
  ];

  const sortOptions = [
    { id: "recently-updated", label: "Recently Updated" },
    { id: "newest", label: "Newest Report" },
    { id: "oldest", label: "Oldest Report" },
    { id: "recently-resolved", label: "Recently Resolved" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs bg-white dark:bg-[#06241F] border-l border-[#D8E8E2] dark:border-[#16463D] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between bg-[#FAFDFB] dark:bg-[#072620]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Filters &amp; Sort
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#8BA69D] dark:hover:text-[#F1FAF6] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          {/* Status section */}
          <div className="space-y-2">
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider text-[11px] block">
              Case Status
            </span>
            <div className="flex flex-wrap gap-1.5">
              {statusOptions.map((st) => {
                const isSelected = selectedStatus === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => onStatusChange(st.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/50"
                        : "bg-gray-50 dark:bg-[#082A24] text-[#55786B] dark:text-[#9FB7AD] border-[#E0EBE6] dark:border-[#16463D]"
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category section */}
          <div className="space-y-2">
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider text-[11px] block">
              Category
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onCategoryChange("All")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/50"
                    : "bg-gray-50 dark:bg-[#082A24] text-[#55786B] dark:text-[#9FB7AD] border-[#E0EBE6] dark:border-[#16463D]"
                }`}
              >
                All
              </button>
              {LOST_FOUND_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onCategoryChange(cat.label)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#DDF4EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/50"
                        : "bg-gray-50 dark:bg-[#082A24] text-[#55786B] dark:text-[#9FB7AD] border-[#E0EBE6] dark:border-[#16463D]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort section */}
          <div className="space-y-2">
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider text-[11px] block">
              Sort By
            </span>
            <div className="space-y-1">
              {sortOptions.map((s) => {
                const isSelected = sortBy === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSortChange(s.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#DDF4EB]/60 dark:bg-[#123F35]/60 text-[#159B72] dark:text-[#20D39B] font-bold"
                        : "text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-50 dark:hover:bg-[#082A24]"
                    }`}
                  >
                    <span>{s.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D8E8E2] dark:border-[#16463D] bg-[#FAFDFB] dark:bg-[#072620] flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] bg-gray-100 dark:bg-[#082A24] hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs text-center"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
