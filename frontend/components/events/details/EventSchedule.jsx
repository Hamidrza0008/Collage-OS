"use client";

import { useState } from "react";
import { Clock, CalendarDays, CheckCircle2, ChevronRight } from "lucide-react";

export default function EventSchedule({ schedule }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  if (!schedule || schedule.length === 0) return null;

  const currentDay = schedule[activeDayIndex] || schedule[0];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Event Schedule & Timeline
            </h2>
            <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
              Hour-by-hour itinerary, session venues, and submission deadlines
            </p>
          </div>
        </div>

        {/* Day Tabs */}
        {schedule.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F]">
            {schedule.map((dayItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeDayIndex === idx
                    ? "bg-emerald-700 text-white dark:bg-[#159B72] dark:text-[#021512] shadow-xs"
                    : "text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
                }`}
              >
                {dayItem.day}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Subtitle */}
      {currentDay.date && (
        <div className="flex items-center justify-between text-xs font-semibold text-[#55786B] dark:text-[#8AA89F]">
          <span>{currentDay.day} Schedule</span>
          <span>{currentDay.date}</span>
        </div>
      )}

      {/* Timeline List */}
      <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-[11px] before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-gray-200 dark:before:bg-[#10372F]">
        {currentDay.sessions.map((session, sIdx) => {
          const isPassed = session.status === "completed";
          const isLive = session.status === "live";

          return (
            <div key={sIdx} className="relative flex items-start gap-3 group">
              {/* Timeline dot */}
              <div
                className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isPassed
                    ? "bg-emerald-600 text-white"
                    : isLive
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950 animate-pulse"
                    : "bg-[#F0F7F4] dark:bg-[#06241F] border border-gray-200 dark:border-[#16463D] text-emerald-700 dark:text-[#20D39B]"
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </div>

              {/* Session Card */}
              <div className="flex-1 p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {session.title}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-[#20D39B] bg-emerald-50 dark:bg-[#06241F] px-2 py-0.5 rounded-md border border-emerald-100 dark:border-[#10372F]">
                    <Clock className="w-3 h-3" />
                    <span>{session.time}</span>
                  </div>
                </div>

                {session.desc && (
                  <p className="text-xs text-[#55786B] dark:text-[#8AA89F] leading-relaxed mt-1">
                    {session.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
