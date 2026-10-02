"use client";

import Link from "next/link";
import {
  Code2,
  Globe,
  Database,
  FlaskConical,
  Laptop,
  Star,
  Cpu,
  Calculator,
  BookOpen,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  BookX,
} from "lucide-react";

function getSubjectIcon(iconName) {
  switch (iconName) {
    case "code":
      return <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    case "globe":
      return <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case "database":
      return <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    case "flask":
      return <FlaskConical className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
    case "laptop":
      return <Laptop className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
    case "star":
      return <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    case "cpu":
      return <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
    case "calculator":
      return <Calculator className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
    default:
      return <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
  }
}

export default function SubjectCatalogGrid({ subjects = [], onResetFilters }) {
  if (subjects.length === 0) {
    return (
      <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#041D18] flex items-center justify-center mb-4">
          <BookX className="w-8 h-8 text-[#5C786E] dark:text-[#8AA89F]" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
          No courses match your criteria
        </h3>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] max-w-sm mb-6">
          Try adjusting your search terms, changing the semester filter, or clearing the selected course type.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {subjects.map((subject) => {
        const isCurrentSem = subject.semester === 7;
        return (
          <div
            key={subject.id}
            className="group relative rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top row: Badges + Type */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] flex items-center justify-center shrink-0">
                    {getSubjectIcon(subject.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-wide text-[#0B3024] dark:text-[#F1FAF6] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                      {subject.code}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isCurrentSem
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                        : "bg-gray-100 dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F]"
                    }`}
                  >
                    Sem {subject.semester}
                  </span>
                  <span className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F] px-2 py-0.5 rounded-md bg-gray-50 dark:bg-[#061F1B] border border-gray-200/50 dark:border-[#10372F]/50">
                    {subject.type}
                  </span>
                </div>
              </div>

              {/* Course Title & Department */}
              <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug line-clamp-2 group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
                {subject.name}
              </h2>

              <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F] mt-1 line-clamp-1">
                {subject.department}
              </p>

              {/* Subject Specs: Credits, Grade / Status */}
              <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-[#10372F]/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0B3024] dark:text-[#E2F1EC] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                  <span>{subject.credits} Credits</span>
                </span>

                {subject.currentGrade ? (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                    Grade {subject.currentGrade}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F]">
                    {subject.status}
                  </span>
                )}
              </div>

              {/* Progress bar for ongoing subjects */}
              {subject.progress !== null && subject.progress > 0 && (
                <div className="mt-2.5">
                  <div className="flex items-center justify-between text-[10.5px] font-medium mb-1">
                    <span className="text-[#5C786E] dark:text-[#8AA89F]">Syllabus Progress</span>
                    <span className="text-[#0B3024] dark:text-[#E2F1EC] font-bold">{subject.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-[#0A3029] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#159B72] dark:bg-[#20D39B] rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom action button */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#10372F]/60 flex items-center justify-between">
              {subject.hasDetails ? (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Full Syllabus & Notes</span>
                </div>
              ) : (
                <span className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
                  Curriculum Record
                </span>
              )}

              <Link
                href={`/student/academics/subjects/${subject.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-50 dark:bg-[#041D18] hover:bg-[#159B72] hover:text-white dark:hover:bg-[#159B72] dark:hover:text-white text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#10372F] transition-all cursor-pointer group-hover:border-[#159B72]"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
