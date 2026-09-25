"use client";

import {
  TYPE_FILTER_OPTIONS,
  SUBJECT_FILTER_OPTIONS,
} from "./timetableData";
import {
  X,
  Layers,
  BookOpen,
  GraduationCap,
  FileText,
  Calendar,
  Bell,
  Sun,
  Clock,
  RotateCcw,
  Check,
} from "lucide-react";

export default function MobileAcademicCalendarFilterDrawer({
  isOpen,
  onClose,
  activeType,
  onTypeChange,
  activeSubject,
  onSubjectChange,
  onResetFilters,
}) {
  if (!isOpen) return null;

  const iconMap = {
    Layers,
    BookOpen,
    GraduationCap,
    FileText,
    Calendar,
    Bell,
    Sun,
    Clock,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#FFFFFF] dark:bg-[#021512] border-t sm:border border-[#D8E8E2] dark:border-[#10372F] rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-drawer-title"
      >
        {/* Drawer Handle on mobile */}
        <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto -mt-1 mb-2 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div>
            <h2
              id="mobile-filter-drawer-title"
              className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight"
            >
              Calendar & Schedule Filters
            </h2>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
              Filter items by category and enrolled subjects
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Enrolled Subject:
          </label>
          <select
            value={activeSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#159B72]"
          >
            {SUBJECT_FILTER_OPTIONS.map((sub) => (
              <option key={sub.id} value={sub.id} className="bg-white dark:bg-[#06241F]">
                {sub.label} {sub.code !== "ALL" ? `(${sub.code})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Category Type Options */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Item Type:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TYPE_FILTER_OPTIONS.map((opt) => {
              const IconComp = iconMap[opt.icon] || Layers;
              const isSelected = activeType === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onTypeChange(opt.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#159B72] border-[#159B72] text-white shadow-xs"
                      : "bg-gray-50/70 dark:bg-[#041D18] border-gray-100 dark:border-[#10372F] text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-100"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] hover:text-rose-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
