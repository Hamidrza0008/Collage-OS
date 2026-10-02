"use client";

import Link from "next/link";
import { BookOpen, ChevronRight, Award, Layers, CheckCircle2, Sparkles } from "lucide-react";

export default function SubjectCatalogHeader({ totalCount = 0, currentCount = 0, completedCount = 0 }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#10372F] bg-[#FFFFFF] dark:bg-[#021512] shadow-xs p-5 sm:p-6 transition-all">
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5C786E] dark:text-[#8AA89F] mb-3">
        <Link
          href="/student/academics"
          className="hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors font-medium flex items-center gap-1"
        >
          <span>Academics</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#A0BCB2] dark:text-[#3B665B] shrink-0" />
        <span className="text-[#0B3024] dark:text-[#E2F1EC] font-semibold">Course Catalog</span>
      </nav>

      {/* Title & Description & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[#159B72] dark:text-[#20D39B] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Browser • B.Tech CSE (2022–2026)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            All Courses & Subject Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#5C786E] dark:text-[#8AA89F] mt-1 max-w-2xl leading-relaxed">
            Explore the complete 8-semester Computer Science & Engineering syllabus, theory courses, laboratory practicums, and open electives with syllabus units and learning materials.
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50/80 dark:bg-[#041D18]/80 border border-[#D8E8E2] dark:border-[#10372F]">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C786E] dark:text-[#8AA89F]">
                Total Courses
              </span>
              <span className="text-sm font-black text-[#0B3024] dark:text-[#F1FAF6]">
                {totalCount} Subjects
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50/80 dark:bg-[#041D18]/80 border border-[#D8E8E2] dark:border-[#10372F]">
            <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C786E] dark:text-[#8AA89F]">
                Current Enrolled
              </span>
              <span className="text-sm font-black text-[#0B3024] dark:text-[#F1FAF6]">
                {currentCount} Subjects
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50/80 dark:bg-[#041D18]/80 border border-[#D8E8E2] dark:border-[#10372F]">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C786E] dark:text-[#8AA89F]">
                Completed
              </span>
              <span className="text-sm font-black text-[#0B3024] dark:text-[#F1FAF6]">
                {completedCount} Subjects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
