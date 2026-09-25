"use client";

import Link from "next/link";
import {
  Layers,
  BookOpen,
  GraduationCap,
  FileText,
  Plus,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function CalendarSummaryCard({
  classesTodayCount = 0,
  classesWeekCount = 0,
  assessmentsCount = 0,
  deadlinesCount = 0,
  onGoToToday,
  onOpenReminderModal,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            My Week Summary
          </h2>
        </div>
        <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F]">
          Active Schedule
        </span>
      </div>

      {/* 2x2 Stats Grid calculated dynamically */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">Today</span>
          </div>
          <div className="text-lg font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
            {classesTodayCount}
          </div>
          <div className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">Classes Today</div>
        </div>

        <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60">
          <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">This Week</span>
          </div>
          <div className="text-lg font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
            {classesWeekCount}
          </div>
          <div className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">Weekly Lectures</div>
        </div>

        <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">Exams</span>
          </div>
          <div className="text-lg font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
            {assessmentsCount}
          </div>
          <div className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">Assessments Scheduled</div>
        </div>

        <div className="p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60">
          <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">Deadlines</span>
          </div>
          <div className="text-lg font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
            {deadlinesCount}
          </div>
          <div className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">Deadlines Active</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="pt-2 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-1.5">
        <span className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
          Quick Actions:
        </span>

        <button
          type="button"
          onClick={onGoToToday}
          className="w-full flex items-center justify-between p-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] hover:bg-emerald-50/60 dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] transition-colors cursor-pointer"
        >
          <span>Jump to Today</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
        </button>

        <Link
          href="/student/academics"
          className="w-full flex items-center justify-between p-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] hover:bg-emerald-50/60 dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] transition-colors"
        >
          <span>My Subjects & Syllabus</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
        </Link>

        <button
          type="button"
          onClick={onOpenReminderModal}
          className="w-full flex items-center justify-between p-2 rounded-xl border border-dashed border-[#159B72]/50 bg-emerald-50/30 dark:bg-[#06241F]/40 hover:bg-emerald-50/70 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Personal Reminder</span>
          </span>
        </button>
      </div>
    </div>
  );
}
