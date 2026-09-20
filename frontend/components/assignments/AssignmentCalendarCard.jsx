"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function AssignmentCalendarCard({ onDateSelect }) {
  const [selectedDay, setSelectedDay] = useState(18);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // August 2025 calendar days matching the reference
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
    { day: 18, isCurrentMonth: true, eventColor: "emerald" }, // Due in 2 days / selected
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true, eventColor: "rose" }, // Urgent deadline
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true, eventColor: "amber" }, // Upcoming deadline
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true, eventColor: "blue" }, // Lab deadline
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
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

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Calendar
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View Full Calendar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Month Label */}
      <div className="text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] mb-2">
        August 2025
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-[#658278] dark:text-[#789991] mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-0.5">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
          {calendarCells.map((item, idx) => {
            const isSelected = item.isCurrentMonth && item.day === selectedDay;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (item.isCurrentMonth) {
                    setSelectedDay(item.day);
                    if (onDateSelect) onDateSelect(item.day);
                  }
                }}
                className={`relative h-6.5 w-6.5 mx-auto flex items-center justify-center rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-700 text-white font-bold shadow-xs"
                    : item.isCurrentMonth
                    ? "text-[#0B3024] dark:text-[#E2F1EC] hover:bg-emerald-50 dark:hover:bg-[#082A24]"
                    : "text-gray-300 dark:text-gray-600 cursor-default"
                }`}
              >
                <span>{item.day}</span>
                {item.eventColor && !isSelected && (
                  <span
                    className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                      item.eventColor === "emerald"
                        ? "bg-emerald-500"
                        : item.eventColor === "rose"
                        ? "bg-rose-500"
                        : item.eventColor === "amber"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
