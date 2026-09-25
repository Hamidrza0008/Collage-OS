"use client";

import Link from "next/link";
import { GraduationCap, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export default function UpcomingExamSidebar({ exam, onSelectItem }) {
  if (!exam) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h2 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Upcoming Exam
          </h2>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          {exam.examType || "Mid-Sem"}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 bg-amber-50/50 dark:bg-[#201504]/50 space-y-2.5">
        <div>
          <span className="text-[10px] font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wide">
            {exam.subjectCode}
          </span>
          <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
            {exam.title || exam.subjectName}
          </h3>
        </div>

        <div className="space-y-1.5 text-xs text-[#5C786E] dark:text-[#8AA89F]">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {exam.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{exam.timeDisplay || exam.startTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{exam.venue || exam.room}</span>
          </div>
        </div>

        {/* Action footer */}
        <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/50 flex items-center justify-between">
          {exam.subjectSlug && (
            <Link
              href={`/student/academics/subjects/${exam.subjectSlug}`}
              className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>View Subject</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => onSelectItem(exam)}
            className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:text-amber-700 cursor-pointer"
          >
            Exam Details
          </button>
        </div>
      </div>
    </div>
  );
}
