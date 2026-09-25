"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarRange,
  ListOrdered,
  Plus,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react";

export default function TimetableHeader({
  viewMode,
  onViewModeChange,
  currentDateLabel,
  onPrevDate,
  onNextDate,
  onToday,
  isTodayActive,
  onOpenReminderModal,
  onOpenMobileFilters,
  activeFilterCount = 0,
}) {
  const views = [
    { id: "week", label: "Week", icon: CalendarRange },
    { id: "day", label: "Day", icon: CalendarDays },
    { id: "month", label: "Month", icon: CalendarIcon },
    { id: "agenda", label: "Agenda", icon: ListOrdered },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top row: Compact Back Navigation & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <Link
          href="/student/academics"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-emerald-50/50 dark:hover:bg-[#06241F]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Academics</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] hover:bg-emerald-50/50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            aria-label="Open filter drawer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 text-[10px] font-bold rounded-full bg-[#159B72] text-white flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Add Reminder Action */}
          <button
            type="button"
            onClick={onOpenReminderModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#159B72] hover:bg-[#128360] text-white shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Middle row: Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6]">
            Academic Timetable & Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            Plan classes, assessments, deadlines, exams, and campus events from one place.
          </p>
        </div>

        {/* View Mode Toggle Pill Bar */}
        <div className="inline-flex items-center p-1 rounded-xl bg-gray-100/90 dark:bg-[#041D18] border border-gray-200/80 dark:border-[#10372F] self-start sm:self-auto shrink-0">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = viewMode === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onViewModeChange(v.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FFFFFF] dark:bg-[#0B3024] text-[#0B3024] dark:text-[#20D39B] shadow-2xs font-bold"
                    : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
                }`}
                aria-pressed={isActive}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom row: Interactive Date Navigator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F]">
        {/* Left: Previous, Today, Next */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrevDate}
            className="p-1.5 rounded-lg border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-[#06241F] transition-colors cursor-pointer"
            aria-label="Previous date period"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToday}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isTodayActive
                ? "bg-[#DDF3EB] dark:bg-[#123F35] border-[#159B72]/40 text-[#0B3024] dark:text-[#20D39B]"
                : "bg-white dark:bg-[#041D18] border-[#D8E8E2] dark:border-[#16463D] text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            Today
          </button>

          <button
            type="button"
            onClick={onNextDate}
            className="p-1.5 rounded-lg border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-[#06241F] transition-colors cursor-pointer"
            aria-label="Next date period"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center/Right: Current date period label */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <span className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            {currentDateLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
