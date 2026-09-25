"use client";

import { useState } from "react";
import {
  formatDateKey,
  parseDateKey,
  formatDayLabel,
  getPressureForDate,
} from "./timetableData";
import {
  Calendar as CalendarIcon,
  Flame,
  ArrowRight,
  Clock,
  MapPin,
  GraduationCap,
  FileText,
  Bell,
  Sun,
} from "lucide-react";

export default function MonthView({
  activeMonthDate,
  itemsByDate,
  todayKey,
  selectedDateKey,
  onSelectDate,
  onSelectItem,
}) {
  const [internalSelectedDate, setInternalSelectedDate] = useState(
    selectedDateKey || todayKey
  );

  const activeDate = parseDateKey(internalSelectedDate);
  const selectedDayItems = itemsByDate[internalSelectedDate] || [];
  const pressure = getPressureForDate(selectedDayItems);

  // Build calendar matrix for activeMonthDate
  const year = activeMonthDate.getFullYear();
  const month = activeMonthDate.getMonth();

  // First day of current month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Day of week of first day (0 = Sunday, 1 = Mon ... 6 = Sat)
  const startDayOfWeek = firstDayOfMonth.getDay(); // Sunday index
  // Convert so Monday = 0
  const adjustedStart = (startDayOfWeek + 6) % 7;

  const totalDays = lastDayOfMonth.getDate();

  // Generate 35 or 42 grid cells
  const days = [];

  // Previous month padding days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = adjustedStart - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const curDate = new Date(year, month, d);
    days.push({ date: curDate, isCurrentMonth: true });
  }

  // Next month padding days to complete full grid (multiple of 7)
  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ date: d, isCurrentMonth: false });
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleCellClick = (cellDate) => {
    const key = formatDateKey(cellDate);
    setInternalSelectedDate(key);
    if (onSelectDate) onSelectDate(key);
  };

  const getMarkerTypeCounts = (items) => {
    let classes = 0;
    let exams = 0;
    let assignments = 0;
    let events = 0;
    let notices = 0;
    let holidays = 0;

    items.forEach((item) => {
      if (item.type === "class") classes++;
      else if (item.type === "exam") exams++;
      else if (item.type === "assignment") assignments++;
      else if (item.type === "event") events++;
      else if (item.type === "notice") notices++;
      else if (item.type === "holiday") holidays++;
    });

    return { classes, exams, assignments, events, notices, holidays };
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-5">
      {/* Month Calendar Grid */}
      <div>
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center border-b border-[#E8F1ED] dark:border-[#10372F] pb-2 mb-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-xs font-bold text-[#5C786E] dark:text-[#8AA89F]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Date cells grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {days.map((cell, idx) => {
            const dateKey = formatDateKey(cell.date);
            const isToday = dateKey === todayKey;
            const isSelected = dateKey === internalSelectedDate;
            const items = itemsByDate[dateKey] || [];
            const counts = getMarkerTypeCounts(items);
            const hasHoliday = counts.holidays > 0;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCellClick(cell.date)}
                className={`min-h-[64px] sm:min-h-[82px] p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#159B72] dark:border-[#20D39B] bg-emerald-50/50 dark:bg-[#09332A] ring-1 ring-[#159B72]"
                    : cell.isCurrentMonth
                    ? "border-gray-100 dark:border-[#10372F] bg-white dark:bg-[#041D18] hover:border-[#159B72]/50 hover:bg-emerald-50/20"
                    : "border-transparent bg-gray-50/40 dark:bg-black/10 opacity-40 hover:opacity-75"
                }`}
                aria-label={`${cell.date.toDateString()}, ${items.length} events`}
              >
                {/* Date header in cell */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? "w-5 h-5 rounded-full bg-[#159B72] text-white flex items-center justify-center font-extrabold text-[11px]"
                        : isSelected
                        ? "text-[#159B72] dark:text-[#20D39B]"
                        : cell.isCurrentMonth
                        ? "text-[#0B3024] dark:text-[#F1FAF6]"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  >
                    {cell.date.getDate()}
                  </span>

                  {hasHoliday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>

                {/* Event indicators / chips inside cell */}
                <div className="space-y-1 mt-1">
                  {counts.exams > 0 && (
                    <div className="flex items-center gap-1 px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 text-[9.5px] font-bold truncate">
                      <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                      <span className="truncate">{counts.exams} Exam</span>
                    </div>
                  )}

                  {counts.assignments > 0 && (
                    <div className="flex items-center gap-1 px-1 py-0.2 rounded bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 text-[9.5px] font-bold truncate">
                      <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                      <span className="truncate">{counts.assignments} Due</span>
                    </div>
                  )}

                  {counts.events > 0 && (
                    <div className="flex items-center gap-1 px-1 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 text-[9.5px] font-bold truncate">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                      <span className="truncate">Event</span>
                    </div>
                  )}

                  {counts.notices > 0 && (
                    <div className="flex items-center gap-1 px-1 py-0.2 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 text-[9.5px] font-bold truncate">
                      <span className="w-1 h-1 rounded-full bg-rose-500 shrink-0" />
                      <span className="truncate">Notice</span>
                    </div>
                  )}

                  {counts.classes > 0 && counts.exams === 0 && counts.assignments === 0 && (
                    <div className="hidden sm:block text-[9.5px] text-[#5C786E] dark:text-[#8AA89F] font-medium truncate">
                      {counts.classes} classes
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda Drawer Below Month Grid */}
      <div className="pt-4 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Schedule for {formatDayLabel(activeDate)}
            </h3>
          </div>
          {pressure.isBusy && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              <Flame className="w-3 h-3" />
              <span>{pressure.label}</span>
            </span>
          )}
        </div>

        {selectedDayItems.length === 0 ? (
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] py-3 text-center bg-gray-50/50 dark:bg-[#041D18] rounded-xl border border-dashed border-[#D8E8E2] dark:border-[#10372F]">
            No academic items scheduled for this date.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selectedDayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-3 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18] hover:bg-emerald-50/50 dark:hover:bg-[#082A24] transition-all cursor-pointer flex items-center justify-between gap-2"
                role="button"
                tabIndex={0}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {item.startTime}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#159B72] dark:text-[#20D39B]">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate mt-0.5">
                    {item.title || item.subjectName}
                  </h4>
                  <p className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F] truncate">
                    {item.room || item.venue}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F] shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
