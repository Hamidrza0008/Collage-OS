"use client";

import { Code2, Globe, Database, FlaskConical, Laptop, Star, ArrowUpRight } from "lucide-react";
import { CURRENT_SEMESTER_SUBJECTS } from "./academicsData";

export default function CurrentSemesterSubjectsCard() {
  const getIcon = (type) => {
    switch (type) {
      case "code":
        return <Code2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case "globe":
        return <Globe className="w-4 h-4 text-blue-700 dark:text-blue-400" />;
      case "database":
        return <Database className="w-4 h-4 text-purple-700 dark:text-purple-400" />;
      case "flask":
        return <FlaskConical className="w-4 h-4 text-teal-700 dark:text-teal-400" />;
      case "laptop":
        return <Laptop className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />;
      case "star":
        return <Star className="w-4 h-4 text-amber-700 dark:text-amber-400" />;
      default:
        return <Code2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  const getGradeBadge = (grade) => {
    if (grade === "A" || grade === "A-") {
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          {grade}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
        {grade}
      </span>
    );
  };

  return (
    <div
      id="academics-timetable"
      className="scroll-mt-24 w-full h-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Current Semester Subjects
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            Your subjects for Semester 7
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All Subjects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2-Column Grid of 6 Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
        {CURRENT_SEMESTER_SUBJECTS.map((sub) => (
          <div
            key={sub.id}
            className="p-3.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/60 dark:bg-[#041D18]/60 hover:bg-gray-50 dark:hover:bg-[#041D18] transition-all flex flex-col justify-between"
          >
            {/* Top row: icon + name + grade badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(sub.icon)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug line-clamp-1">
                    {sub.name}
                  </h3>
                  <span className="text-[10.5px] font-medium text-[#5C786E] dark:text-[#8AA89F]">
                    {sub.code}
                  </span>
                </div>
              </div>
              {getGradeBadge(sub.grade)}
            </div>

            {/* Bottom row: credits + progress */}
            <div className="mt-2.5 pt-2 border-t border-gray-200/50 dark:border-[#10372F]/50">
              <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                <span className="text-[#5C786E] dark:text-[#8AA89F]">
                  {sub.credits} Credits
                </span>
                <span className="text-[#0B3024] dark:text-[#E2F1EC] font-bold">
                  {sub.progress}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-200/80 dark:bg-[#0A3029] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${sub.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
