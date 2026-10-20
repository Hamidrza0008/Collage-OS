"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function EventsCalendarCard({ onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState("September 2025");

  // Calendar dates for September 2025 (matching reference screenshot)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = [
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
    { day: 20, isCurrentMonth: true },

    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true, hasEvent: true }, // Full Stack Web Dev
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true, hasEvent: true }, // CodeRush
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true, hasEvent: true }, // TechTalk AI

    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
  ];

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-0.5">
        <Calendar className="w-4 h-4 text-[#159B72]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Calendar
        </h2>
      </div>

      {/* Month Selector */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] px-1">
        <button
          type="button"
          onClick={() => setCurrentMonth("August 2025")}
          className="p-1 rounded-md text-[#658278] hover:text-[#0B3024] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span>{currentMonth}</span>
        <button
          type="button"
          onClick={() => setCurrentMonth("October 2025")}
          className="p-1 rounded-md text-[#658278] hover:text-[#0B3024] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-[#658278] dark:text-[#789991]">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {calendarDays.map((d, index) => {
          return (
            <div key={index} className="flex items-center justify-center py-1">
              {d.hasEvent ? (
                <button
                  type="button"
                  onClick={() => onSelectDate && onSelectDate(d.day)}
                  className="w-7 h-7 rounded-full bg-[#159B72] text-white font-semibold flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#11805D] transition-transform hover:scale-105"
                >
                  {d.day}
                </button>
              ) : (
                <span
                  className={`w-7 h-7 flex items-center justify-center font-normal ${
                    d.isCurrentMonth
                      ? "text-[#0B3024] dark:text-[#F1FAF6]"
                      : "text-[#94A3B8]/50 dark:text-gray-600"
                  }`}
                >
                  {d.day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
