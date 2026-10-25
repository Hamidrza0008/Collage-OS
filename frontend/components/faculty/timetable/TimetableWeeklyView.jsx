"use client";

import React from "react";
import {
  Clock,
  MapPin,
  Users,
  BookOpen,
  CalendarX2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { WEEK_DAYS } from "./facultyTimetableData";

export default function TimetableWeeklyView({
  scheduleList,
  activeDay,
  onSelectClass,
  onSelectDay,
  onRequestChange,
}) {
  // Group schedule list by day
  const groupedByDay = WEEK_DAYS.reduce((acc, day) => {
    acc[day.full] = scheduleList.filter(
      (item) => item.day.toLowerCase() === day.full.toLowerCase()
    );
    return acc;
  }, {});

  const totalClassesInView = scheduleList.length;

  if (totalClassesInView === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-8 sm:p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#F0F5F2] dark:bg-[#072F26] text-[#658278] dark:text-[#8AAEA1] flex items-center justify-center mx-auto">
          <CalendarX2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No Classes Match Your Filter
        </h3>
        <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm mx-auto">
          No teaching sessions match your current subject, batch, or keyword search criteria.
        </p>
      </div>
    );
  }

  // Session type badge stylings
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case "Lab":
        return "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40";
      case "Lecture":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-[#159B72] dark:text-[#20D39B] border-emerald-200 dark:border-emerald-800/40";
      case "Tutorial":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40";
      default:
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40";
    }
  };

  return (
    <div className="overflow-x-auto pb-2 scrollbar-thin">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 w-full min-w-0 md:min-w-[720px] xl:min-w-full">
        {WEEK_DAYS.map((dayObj) => {
          const dayClasses = groupedByDay[dayObj.full] || [];
          const isToday = activeDay.toLowerCase() === dayObj.full.toLowerCase();

          return (
            <div
              key={dayObj.id}
              className={`rounded-2xl border transition-all flex flex-col ${
                isToday
                  ? "bg-[#FAFDFB] dark:bg-[#062922] border-[#159B72]/50 shadow-sm"
                  : "bg-white dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#10372F]"
              }`}
            >
              {/* Day Header */}
              <div
                onClick={() => onSelectDay(dayObj.full)}
                className={`p-3 border-b flex items-center justify-between cursor-pointer rounded-t-2xl transition-colors ${
                  isToday
                    ? "bg-[#E6F7F0]/70 dark:bg-[#073629]/70 border-[#159B72]/30"
                    : "bg-[#F7FBF9] dark:bg-[#082A24] border-[#F0F5F2] dark:border-[#0E352E] hover:bg-[#EEF6F2] dark:hover:bg-[#09352C]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {dayObj.full}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                    {dayClasses.length} {dayClasses.length === 1 ? "session" : "sessions"}
                  </span>
                </div>

                {isToday && (
                  <span className="text-[9.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-[#159B72] text-white">
                    Today
                  </span>
                )}
              </div>

              {/* Day Classes List */}
              <div className="p-2.5 space-y-2.5 flex-1 flex flex-col justify-start">
                {dayClasses.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-[#658278] dark:text-[#789991] italic flex-1 flex items-center justify-center">
                    No classes
                  </div>
                ) : (
                  dayClasses.map((cls) => (
                    <div
                      key={cls.id}
                      onClick={() => onSelectClass(cls)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer group hover:shadow-sm relative ${
                        cls.attendanceStatus === "Ongoing"
                          ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60"
                          : "bg-white dark:bg-[#072F26]/70 border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50"
                      }`}
                    >
                      {/* Ongoing Pulse Ribbon */}
                      {cls.attendanceStatus === "Ongoing" && (
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                            Ongoing
                          </span>
                        </div>
                      )}

                      {/* Time Badge */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#159B72] dark:text-[#20D39B]">
                        <Clock className="w-3 h-3" />
                        <span>{cls.startTime} - {cls.endTime}</span>
                      </div>

                      {/* Course Title & Code */}
                      <div className="mt-1.5">
                        <span className="text-[10px] font-extrabold text-[#658278] dark:text-[#8AAEA1] tracking-wide block">
                          {cls.courseCode}
                        </span>
                        <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-2 leading-tight">
                          {cls.subjectName}
                        </h4>
                      </div>

                      {/* Room & Batch */}
                      <div className="mt-2 pt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between text-[10.5px] text-[#658278] dark:text-[#789991]">
                        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                          {cls.batch}
                        </span>
                        <span className="flex items-center gap-0.5 truncate max-w-[90px]" title={cls.location}>
                          <MapPin className="w-3 h-3 text-[#159B72] shrink-0" />
                          <span className="truncate">{cls.roomShort}</span>
                        </span>
                      </div>

                      {/* Session Type Pill */}
                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-md border ${getTypeBadgeStyle(
                            cls.sessionType
                          )}`}
                        >
                          {cls.sessionType}
                        </span>

                        <span className="text-[10px] text-[#159B72] dark:text-[#20D39B] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                          <span>View</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
