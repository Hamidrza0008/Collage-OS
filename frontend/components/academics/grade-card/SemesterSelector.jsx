"use client";

import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function SemesterSelector({
  semesters = [],
  selectedSemesterNumber,
  onSelectSemester,
}) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-3 sm:p-4 print:hidden">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
          Semester Progression & Term Selector
        </h3>
        <span className="text-[11px] text-[#5C786E] dark:text-[#8AA89F] font-medium hidden sm:inline">
          Click any term to inspect grades
        </span>
      </div>

      {/* Horizontal Scrollable Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {semesters.map((sem) => {
          const isSelected = sem.number === selectedSemesterNumber;
          const isCurrent = sem.isCurrent;
          const isCompleted = sem.status === "Completed";
          const isInProgress = sem.status === "In Progress";

          return (
            <button
              key={sem.id}
              type="button"
              onClick={() => onSelectSemester(sem.number)}
              className={`flex-shrink-0 flex flex-col items-start min-w-[104px] sm:min-w-[114px] p-2.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                isSelected
                  ? "bg-emerald-50/90 dark:bg-[#082A24] border-emerald-500 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500/20"
                  : "bg-[#F7FBF9] dark:bg-[#06241F] border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:bg-white dark:hover:bg-[#0A2E27]"
              }`}
            >
              {/* Badge for Current Semester */}
              {isCurrent && (
                <span className="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider">
                  Current
                </span>
              )}

              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs font-bold ${
                    isSelected
                      ? "text-emerald-900 dark:text-emerald-200"
                      : "text-[#0B3024] dark:text-[#F1FAF6]"
                  }`}
                >
                  {sem.shortLabel}
                </span>

                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : isInProgress ? (
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                )}
              </div>

              {/* SGPA or Status Label */}
              <div className="mt-1 flex items-baseline gap-1">
                {sem.sgpa !== null ? (
                  <>
                    <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">SGPA:</span>
                    <span
                      className={`text-xs font-extrabold ${
                        isSelected
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-[#0B3024] dark:text-[#F1FAF6]"
                      }`}
                    >
                      {sem.sgpa.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                    {sem.status}
                  </span>
                )}
              </div>

              {/* Academic Year */}
              <span className="text-[9.5px] text-[#658278] dark:text-[#789991] mt-0.5">
                {sem.academicYear}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
