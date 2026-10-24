"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  CalendarClock,
  CalendarCheck,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function ClassDetailModal({
  isOpen,
  onClose,
  classData,
  onRequestChange,
}) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !classData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="class-detail-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B]">
                  {classData.courseCode}
                </span>
                <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991]">
                  {classData.sessionType}
                </span>
              </div>
              <h3
                id="class-detail-title"
                className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-0.5"
              >
                {classData.subjectName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-[13px]">
          {/* Key Metric Snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F]">
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991] block">Day &amp; Time</span>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#159B72]" />
                <span>{classData.day}, {classData.startTime}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F]">
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991] block">Assigned Batch</span>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#159B72]" />
                <span>{classData.batch} ({classData.semester})</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] col-span-2 sm:col-span-1">
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991] block">Location</span>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
                <span className="truncate">{classData.roomShort}</span>
              </span>
            </div>
          </div>

          {/* Academic Lesson Information */}
          <div className="p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
                Curricular Milestone
              </span>
              <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991]">
                {classData.durationMinutes} mins duration
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {classData.syllabusUnit}
            </h4>

            <p className="text-xs text-[#4A6B60] dark:text-[#A7C8BD] leading-relaxed">
              {classData.lectureTopic}
            </p>
          </div>

          {/* Location & Room Details */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
              Facility &amp; Venue
            </span>
            <div className="p-3 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                  {classData.location}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                  Type: {classData.roomType}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]">
                Confirmed Room
              </span>
            </div>
          </div>

          {/* Teaching Notes & Pedagogical Instructions */}
          {classData.notes && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300">
              <span className="text-[11px] font-bold flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Faculty Lesson Notes</span>
              </span>
              <p className="text-xs leading-relaxed">
                {classData.notes}
              </p>
            </div>
          )}

          {/* Attendance Status Snapshot */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F]">
            <div>
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991] block">Attendance Status</span>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {classData.attendanceStatus === "Completed"
                  ? `Marked (${classData.attendanceRate}% Present)`
                  : classData.attendanceStatus === "Ongoing"
                  ? "Roll Call in Progress"
                  : "Pending Session Start"}
              </span>
            </div>

            <Link
              href="/faculty/attendance"
              className="text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1"
            >
              <span>Manage Attendance</span>
              <CalendarCheck className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 border-t border-[#F0F5F2] dark:border-[#0E352E] bg-[#FAFDFB] dark:bg-[#051D18] flex items-center justify-between gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestChange(classData);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F1F8F5] dark:bg-[#082A24] hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] border border-[#D8E8E2] dark:border-[#10372F] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarClock className="w-4 h-4 text-[#159B72]" />
            <span>Request Reschedule / Substitute</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#658278] dark:text-[#A7C8BD] hover:bg-[#F0F5F2] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              href="/faculty/attendance"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#0E8561] transition-all flex items-center gap-1.5 shadow-sm shadow-[#159B72]/20 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Take Attendance</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
