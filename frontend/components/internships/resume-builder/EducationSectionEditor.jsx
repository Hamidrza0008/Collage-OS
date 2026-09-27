"use client";

import React from "react";
import { GraduationCap, BookOpen } from "lucide-react";

export default function EducationSectionEditor({ resume, onChangeResume }) {
  const edu = resume.education || {};

  const updateEdu = (fields) => {
    onChangeResume({
      ...resume,
      education: {
        ...edu,
        ...fields,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <GraduationCap className="w-4 h-4" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Education &amp; Academic Identity
          </h3>
        </div>
        <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
          Verified from College OS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Degree */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Degree &amp; Program
          </label>
          <input
            type="text"
            value={edu.degree || ""}
            onChange={(e) => updateEdu({ degree: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
          />
        </div>

        {/* Department / Branch */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Department / Major
          </label>
          <input
            type="text"
            value={edu.department || ""}
            onChange={(e) => updateEdu({ department: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
          />
        </div>

        {/* Institution */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            College / University
          </label>
          <input
            type="text"
            value={edu.college || ""}
            onChange={(e) => updateEdu({ college: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
          />
        </div>

        {/* Batch / Years */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Batch / Graduation Period
          </label>
          <input
            type="text"
            value={edu.batch || ""}
            onChange={(e) => updateEdu({ batch: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
          />
        </div>
      </div>

      {/* CGPA Toggle */}
      <div className="p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
            Cumulative GPA (CGPA)
          </span>
          <span className="text-[11px] text-[#658278] dark:text-[#789991]">
            Official transcript score: <strong>{edu.cgpa || "8.6 / 10.0"}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={edu.cgpa || ""}
            onChange={(e) => updateEdu({ cgpa: e.target.value })}
            className="w-24 text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
          />
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer">
            <input
              type="checkbox"
              checked={edu.includeCgpa !== false}
              onChange={(e) => updateEdu({ includeCgpa: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span>Include</span>
          </label>
        </div>
      </div>

      {/* Coursework Toggle */}
      <div className="p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Relevant Coursework</span>
          </span>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] cursor-pointer">
            <input
              type="checkbox"
              checked={edu.includeCoursework !== false}
              onChange={(e) => updateEdu({ includeCoursework: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span>Include</span>
          </label>
        </div>
        {edu.includeCoursework !== false && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {(edu.coursework || []).map((course, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 font-medium"
              >
                {course}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
