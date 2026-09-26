"use client";

import { Award, TrendingUp, CheckCircle2, Clock, AlertTriangle, BookOpen, Layers } from "lucide-react";

export default function CurrentSemesterHero({
  student,
  semester,
  metrics,
}) {
  const isCompleted = semester.status === "Completed";
  const isInProgress = semester.status === "In Progress";
  const isPending = semester.status === "Result Pending" || (!isCompleted && !isInProgress);

  // Delta calculation for SGPA
  const hasPrevious = semester.previousSgpa !== null && semester.sgpa !== null;
  const delta = hasPrevious ? (semester.sgpa - semester.previousSgpa).toFixed(2) : null;
  const isPositiveDelta = delta && Number(delta) >= 0;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      {/* Top Banner: Term info & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {semester.label}
            </h2>
            <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-medium">
              • Academic Year {semester.academicYear}
            </span>
          </div>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            {semester.term} • {student.degree} in {student.branch}
          </p>
        </div>

        {/* Status Badge */}
        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Result Published</span>
            </span>
          ) : isInProgress ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>In Progress (Provisional)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>Result Pending</span>
            </span>
          )}
        </div>
      </div>

      {/* Metrics Row: SGPA, CGPA, Credits & Academic Standing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        {/* Card 1: SGPA */}
        <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider">
              Semester GPA (SGPA)
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                {semester.sgpa !== null ? semester.sgpa.toFixed(2) : "—"}
              </span>
              <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                / 10.0
              </span>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[11px]">
              {hasPrevious ? (
                <>
                  <span className="text-[#658278] dark:text-[#789991]">
                    Prev: {semester.previousSgpa.toFixed(2)}
                  </span>
                  <span
                    className={`font-semibold inline-flex items-center gap-0.5 ${
                      isPositiveDelta
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {isPositiveDelta ? `+${delta}` : delta}
                  </span>
                </>
              ) : (
                <span className="text-[#658278] dark:text-[#789991]">
                  First semester baseline
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Cumulative CGPA */}
        <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider">
              Cumulative CGPA
            </span>
            <div className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                {semester.cgpaAfterSem !== null
                  ? semester.cgpaAfterSem.toFixed(2)
                  : student.cumulativeCGPA.toFixed(2)}
              </span>
              <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                / 10.0
              </span>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
              <span>Degree Benchmark: 160 Cr</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {student.cumulativeCreditsEarned} Earned
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Semester Credits */}
        <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider">
              Term Credits
            </span>
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                {metrics.creditsEarned}
              </span>
              <span className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                / {metrics.creditsRegistered} Registered
              </span>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
              <span>Passed: {metrics.passedSubjects}</span>
              {metrics.incompleteSubjects > 0 && (
                <span className="font-semibold text-amber-700 dark:text-amber-400">
                  {metrics.incompleteSubjects} Incomplete
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Academic Standing */}
        <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase tracking-wider">
              Academic Standing
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span>{student.academicStanding}</span>
            </div>

            <p className="mt-1.5 text-[10.5px] text-[#658278] dark:text-[#789991] line-clamp-2 leading-tight">
              Factual institutional status: all credit criteria fulfilled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
