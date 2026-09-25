"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function SemesterCalendarCard() {
  const [selectedDay, setSelectedDay] = useState(20);
  const [monthIndex, setMonthIndex] = useState(7); // 7 for August (0-indexed)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // August 2025 dates representation matching the reference
  const calendarCells = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true, isExam: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true, isExam: true },
    { day: 25, isCurrentMonth: true, isAssignment: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true, isExam: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
    { day: 6, isCurrentMonth: false },
  ];

  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <div
      id="academics-calendar"
      className="scroll-mt-24 w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-4.5"
    >
      {/* Header: Month title + nav */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Semester Calendar
        </h2>

        {/* Month Navigation */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC]">
            {months[monthIndex]} 2025
          </span>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-0.5 rounded text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-0.5 rounded text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid: Compact without vertical stretching */}
      <div className="mt-1">
        {/* Day of Week headers */}
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-[#658278] dark:text-[#789991] mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-0.5">
              {day}
            </div>
          ))}
        </div>

        {/* Date numbers grid */}
        <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
          {calendarCells.map((item, idx) => {
            const isSelected = item.isCurrentMonth && item.day === selectedDay;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (item.isCurrentMonth) setSelectedDay(item.day);
                }}
                className={`relative h-6 w-6 sm:h-6.5 sm:w-6.5 mx-auto flex items-center justify-center rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-700 text-white font-bold shadow-xs"
                    : item.isCurrentMonth
                    ? "text-[#0B3024] dark:text-[#E2F1EC] hover:bg-emerald-50 dark:hover:bg-[#082A24]"
                    : "text-gray-300 dark:text-gray-600 cursor-default"
                }`}
              >
                <span>{item.day}</span>
                {/* Status Dot */}
                {item.isExam && !isSelected && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-rose-500" />
                )}
                {item.isAssignment && !isSelected && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-cyan-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend: Compact bottom row */}
      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-[#10372F] flex items-center justify-between gap-1 text-[10px] text-[#5C786E] dark:text-[#8AA89F]">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>Exams</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <span>Assignments</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>Events</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Holidays</span>
        </div>
      </div>

      {/* View Full Timetable Link */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-[#10372F] flex justify-end">
        <Link
          href="/student/academics/timetable"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
        >
          <span>Full Timetable & Calendar</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
