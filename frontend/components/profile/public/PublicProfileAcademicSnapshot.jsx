'use client';

import React from 'react';
import { GraduationCap, Building2, Calendar, BookOpen, Layers } from 'lucide-react';

export default function PublicProfileAcademicSnapshot({ education, department, branch, semester, batch, college }) {
  const degree = education?.degree || 'Bachelor of Technology (B.Tech)';
  const dept = department || education?.branch || 'Computer Science & Engineering';
  const sem = semester || education?.currentSemester || 'Current Semester';
  const graduationBatch = batch || education?.batch || '2022 - 2026';
  const campusCollege = college || education?.college || 'XYZ College of Engineering, Mumbai';

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
          <GraduationCap className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            Academic Identity
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
            Public university affiliation, program track, and cohort snapshot
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Degree */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#021512]/50 border border-gray-100 dark:border-[#10372F]/60 space-y-1">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-[#A7C7BC] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            Program
          </span>
          <p className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2]">
            {degree}
          </p>
        </div>

        {/* Department / Branch */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#021512]/50 border border-gray-100 dark:border-[#10372F]/60 space-y-1">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-[#A7C7BC] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            Department
          </span>
          <p className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2]">
            {dept}
          </p>
        </div>

        {/* Semester & Batch */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#021512]/50 border border-gray-100 dark:border-[#10372F]/60 space-y-1">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-[#A7C7BC] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            Current Term
          </span>
          <p className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2]">
            {sem} &bull; {graduationBatch}
          </p>
        </div>
      </div>

      {/* College affiliation bar */}
      <div className="p-3.5 rounded-xl border border-emerald-200/50 dark:border-[#159B72]/30 bg-emerald-50/40 dark:bg-[#10372F]/30 flex items-center gap-2.5 text-xs text-gray-700 dark:text-[#D8E8E2]">
        <Building2 className="w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0" />
        <span className="font-semibold">{campusCollege}</span>
      </div>
    </section>
  );
}
