"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Users,
  BookOpen,
  CalendarCheck,
  CalendarClock,
  ArrowRight,
  Info,
  CalendarX2,
  Sparkles,
} from "lucide-react";

export default function TimetableDailyView({
  classes,
  activeDay,
  onSelectClass,
  onRequestChange,
}) {
  if (classes.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-8 sm:p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#F0F5F2] dark:bg-[#072F26] text-[#658278] dark:text-[#8AAEA1] flex items-center justify-center mx-auto">
          <CalendarX2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No Classes Scheduled on {activeDay}
        </h3>
        <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm mx-auto">
          You have no teaching periods matching the current filters on this day. Select another day or adjust your filters above.
        </p>
      </div>
    );
  }

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case "Lab":
        return "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40";
      case "Lecture":
        return "bg-emerald-100 dark:bg-emerald-950/70 text-[#159B72] dark:text-[#20D39B] border-emerald-200 dark:border-emerald-800/40";
      case "Tutorial":
        return "bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40";
      default:
        return "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40";
    }
  };

  const getStatusBadge = (status, attendanceRate) => {
    switch (status) {
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] border border-emerald-200 dark:border-emerald-800/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Class in Progress</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F0F5F2] dark:bg-[#072F26] text-[#4A6B60] dark:text-[#A7C8BD] border border-[#D8E8E2] dark:border-[#10372F]">
            <span>Completed ({attendanceRate || 92}% Attendance)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
            <span>Scheduled Upcoming</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* Daily Header Summary */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            {activeDay} Schedule
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]">
            {classes.length} {classes.length === 1 ? "Class" : "Classes"}
          </span>
        </div>

        <span className="text-xs text-[#658278] dark:text-[#789991]">
          Chronological timeline of your scheduled periods
        </span>
      </div>

      {/* Class Cards Timeline */}
      <div className="space-y-3.5 sm:space-y-4">
        {classes.map((cls, index) => (
          <div
            key={cls.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              cls.attendanceStatus === "Ongoing"
                ? "bg-[#FAFDFB] dark:bg-[#062922] border-emerald-400 dark:border-emerald-600 shadow-xs ring-1 ring-emerald-400/20"
                : "bg-white dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#10372F]"
            }`}
          >
            {/* Left: Time & Period Number */}
            <div className="flex items-center md:flex-col items-start gap-3 md:gap-1.5 md:w-36 shrink-0 border-b md:border-b-0 md:border-r border-[#F0F5F2] dark:border-[#0E352E] pb-3 md:pb-0 md:pr-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                Period {index + 1}
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-[#159B72] dark:text-[#20D39B]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{cls.startTime} - {cls.endTime}</span>
              </div>
              <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                {cls.durationMinutes} minutes
              </span>
            </div>

            {/* Middle: Subject, Topic, Batch, Room */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-[10.5px] font-extrabold bg-[#F0F5F2] dark:bg-[#072F26] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#10372F]">
                  {cls.courseCode}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {cls.subjectName}
                </h3>

                <span
                  className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md border ${getTypeBadgeStyle(
                    cls.sessionType
                  )}`}
                >
                  {cls.sessionType}
                </span>

                {getStatusBadge(cls.attendanceStatus, cls.attendanceRate)}
              </div>

              {/* Topic & Syllabus */}
              <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2]/70 dark:border-[#16463D]/60 text-xs">
                <span className="font-bold text-[#159B72] dark:text-[#20D39B] block text-[11px]">
                  {cls.syllabusUnit}
                </span>
                <p className="text-[#0B3024] dark:text-[#F1FAF6] font-medium mt-0.5">
                  {cls.lectureTopic}
                </p>
              </div>

              {/* Meta pills: Batch, Location, Students */}
              <div className="flex items-center gap-3 text-xs text-[#658278] dark:text-[#789991] flex-wrap pt-0.5">
                <span className="flex items-center gap-1.5 font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  <BookOpen className="w-3.5 h-3.5 text-[#159B72]" />
                  <span>{cls.batch} • {cls.semester}</span>
                </span>

                <span>•</span>

                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#159B72]" />
                  <span>{cls.location}</span>
                </span>

                <span>•</span>

                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#159B72]" />
                  <span>{cls.enrolledStudents} Enrolled</span>
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex md:flex-col items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0F5F2] dark:border-[#0E352E]">
              <button
                type="button"
                onClick={() => onSelectClass(cls)}
                className="flex-1 md:w-36 px-3 py-2 rounded-xl text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] hover:bg-[#EEF6F2] dark:hover:bg-[#0D3830] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-[#159B72]" />
                <span>View Details</span>
              </button>

              <Link
                href="/faculty/attendance"
                className="flex-1 md:w-36 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#0E8561] transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-[#159B72]/20 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Attendance</span>
              </Link>

              <button
                type="button"
                onClick={() => onRequestChange(cls)}
                className="px-2 py-1.5 text-[11px] font-semibold text-[#658278] hover:text-[#0B3024] dark:text-[#8AAEA1] dark:hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <CalendarClock className="w-3 h-3" />
                <span>Reschedule</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
