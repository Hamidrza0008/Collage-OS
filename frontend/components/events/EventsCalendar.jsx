"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AUGUST_2025_EVENT_DAYS } from "./eventsData";

export default function EventsCalendar({
  selectedDay,
  onSelectDay,
}) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(7); // 7 = August (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // August 2025 grid matching reference image:
  // Starts on Friday August 1, 2025. Preceded by July 27, 28, 29, 30, 31
  const daysGrid = [
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
    { day: 18, isCurrentMonth: true, isEventDay: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true, isEventDay: true },
    { day: 23, isCurrentMonth: true },

    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true, isEventDay: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true, isEventDay: true },
    { day: 30, isCurrentMonth: true },

    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs p-4 transition-colors">
      {/* Header: Month & Year + Nav Arrows */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {months[currentMonthIndex]} {currentYear}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="w-6 h-6 rounded-lg flex items-center justify-center text-[#55786B] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-6 h-6 rounded-lg flex items-center justify-center text-[#55786B] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {weekdays.map((wd) => (
          <span
            key={wd}
            className="text-[11px] font-semibold text-[#658278] dark:text-[#789991]"
          >
            {wd}
          </span>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysGrid.map((item, idx) => {
          const isEventDay =
            item.isCurrentMonth &&
            currentMonthIndex === 7 &&
            AUGUST_2025_EVENT_DAYS.includes(item.day);

          const isSelected =
            item.isCurrentMonth && selectedDay === item.day;

          return (
            <button
              key={idx}
              type="button"
              disabled={!item.isCurrentMonth}
              onClick={() => {
                if (item.isCurrentMonth) {
                  onSelectDay(isSelected ? null : item.day);
                }
              }}
              className={`h-7 w-7 sm:h-7.5 sm:w-7.5 mx-auto rounded-full text-[11.5px] font-medium flex items-center justify-center transition-all duration-150 ${
                !item.isCurrentMonth
                  ? "text-gray-300 dark:text-[#0E352B] cursor-default"
                  : isSelected
                  ? "bg-[#0B7A55] text-white font-bold ring-2 ring-[#159B72]/40 shadow-xs cursor-pointer"
                  : isEventDay
                  ? "bg-[#159B72] text-white font-bold shadow-xs hover:bg-[#0E835F] cursor-pointer"
                  : "text-[#24473C] dark:text-[#C5DED7] hover:bg-[#DDF4EB]/60 dark:hover:bg-[#082A24] cursor-pointer"
              }`}
            >
              {item.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
