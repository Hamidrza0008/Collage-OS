"use client";

import { GraduationCap, Building2, Calendar, Hash, Layers, ShieldAlert } from "lucide-react";

export default function EditProfileAcademicSnapshot({ academic = {} }) {
  return (
    <div id="section-academic" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-5">
      <div className="pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Academic Affiliation (Read-Only)</span>
        </h2>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
          Your official enrollment records linked to your university account.
        </p>
      </div>

      {/* Info notice banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          Academic credentials and degree records are verified by the College Registrar. To update branch, roll number, or department details, please contact the academic office.
        </p>
      </div>

      {/* 2-column or 3-column read-only metadata grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 block mb-0.5">
            Degree Program
          </span>
          <span className="text-xs font-bold text-[#06241F] dark:text-white">
            {academic.degree || "B.Tech"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 block mb-0.5">
            Department & Branch
          </span>
          <span className="text-xs font-bold text-[#06241F] dark:text-white">
            {academic.department || "Computer Science & Engineering"} ({academic.branch || "CSE"})
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 block mb-0.5">
            Current Semester
          </span>
          <span className="text-xs font-bold text-[#06241F] dark:text-white">
            {academic.semester || "7th Semester"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 block mb-0.5">
            Academic Batch
          </span>
          <span className="text-xs font-bold text-[#06241F] dark:text-white">
            {academic.batch || "2022 - 2026"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 block mb-0.5">
            Roll / Student Identifier
          </span>
          <span className="text-xs font-bold font-mono text-[#06241F] dark:text-white">
            {academic.rollNo || "CSE-302"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2]/70 dark:border-[#10372F]/70">
          <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 block mb-0.5">
            Affiliated Institute
          </span>
          <span className="text-xs font-bold text-[#06241F] dark:text-white truncate block">
            {academic.college || "XYZ College of Engineering, Mumbai"}
          </span>
        </div>
      </div>
    </div>
  );
}
