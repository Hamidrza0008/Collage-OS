"use client";

import React from "react";
import { Search, BookOpen, Layers, Filter, CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";
import { ASSIGNED_COURSES, EXAM_TYPES } from "./facultyMarksData";

export default function MarksFilterBar({
  selectedCourseId,
  onCourseChange,
  selectedExamId,
  onExamChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  counts,
}) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-4">
      {/* Top Row: Course Select + Exam Type Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-center">
        {/* Course / Subject Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Assigned Course &amp; Batch
          </label>
          <div className="relative">
            <select
              value={selectedCourseId}
              onChange={(e) => onCourseChange(e.target.value)}
              className="w-full h-11 px-3.5 pr-8 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-xs sm:text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 cursor-pointer transition-colors"
            >
              {ASSIGNED_COURSES.map((course) => (
                <option key={course.id} value={course.id} className="bg-white dark:bg-[#06241F]">
                  {course.code} — {course.fullName} ({course.batch})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Type Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Examination / Assessment Type
          </label>
          <div className="relative">
            <select
              value={selectedExamId}
              onChange={(e) => onExamChange(e.target.value)}
              className="w-full h-11 px-3.5 pr-8 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-xs sm:text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 cursor-pointer transition-colors"
            >
              {EXAM_TYPES.map((exam) => (
                <option key={exam.id} value={exam.id} className="bg-white dark:bg-[#06241F]">
                  {exam.name} (Max Marks: {exam.maxMarks})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real-time Search by Name or Roll Number */}
        <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            Search Student
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-11 pl-9 pr-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-xs sm:text-sm text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 transition-colors"
            >
            </input>
            <Search className="w-4 h-4 text-[#658278] dark:text-[#789991] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Row: Status Filter Tabs */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F0F5F2] dark:border-[#0E352E] flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onStatusFilterChange("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === "all"
                ? "bg-[#159B72] text-white shadow-xs"
                : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#A7C8BD] hover:bg-[#E8F4F0] dark:hover:bg-[#0C3A32]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            All Students ({counts?.total || 0})
          </button>

          <button
            type="button"
            onClick={() => onStatusFilterChange("Graded")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === "Graded"
                ? "bg-[#159B72] text-white shadow-xs"
                : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#A7C8BD] hover:bg-[#E8F4F0] dark:hover:bg-[#0C3A32]"
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            Graded ({counts?.graded || 0})
          </button>

          <button
            type="button"
            onClick={() => onStatusFilterChange("Pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === "Pending"
                ? "bg-[#159B72] text-white shadow-xs"
                : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#A7C8BD] hover:bg-[#E8F4F0] dark:hover:bg-[#0C3A32]"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Pending / Unentered ({counts?.pending || 0})
          </button>

          <button
            type="button"
            onClick={() => onStatusFilterChange("Absent")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === "Absent"
                ? "bg-[#159B72] text-white shadow-xs"
                : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#A7C8BD] hover:bg-[#E8F4F0] dark:hover:bg-[#0C3A32]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            Absent ({counts?.absent || 0})
          </button>
        </div>

        <div className="text-[11px] text-[#658278] dark:text-[#789991] font-medium hidden sm:block">
          Auto-evaluates letter grades (O, A+, A, B, C, F)
        </div>
      </div>
    </div>
  );
}
