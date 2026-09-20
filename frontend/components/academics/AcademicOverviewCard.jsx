"use client";

import { Award, GraduationCap, CalendarCheck, AlertCircle } from "lucide-react";
import { ACADEMIC_OVERVIEW } from "./academicsData";

export default function AcademicOverviewCard() {
  const { cgpa, currentSem, totalCreditsCompleted, totalCreditsRequired, attendancePercentage, backlogs } =
    ACADEMIC_OVERVIEW;

  // Circular progress calculations for CGPA out of 10
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cgpa / 10) * circumference;

  return (
    <div
      id="academics-overview"
      className="scroll-mt-24 w-full h-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="mb-3.5">
        <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Academic Overview
        </h2>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
          Your overall performance at a glance
        </p>
      </div>

      {/* Main Content: Left Circular Indicator + Right 2x2 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
        {/* Left: Circular CGPA Gauge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-2">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-emerald-100/70 dark:text-[#082A24]"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#10B981"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                {cgpa.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-[#5C786E] dark:text-[#91B5AA] mt-0.5">
                Current CGPA
              </span>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                (Sem {currentSem})
              </span>
            </div>
          </div>
        </div>

        {/* Right: 2x2 Metric Cards */}
        <div className="md:col-span-7 grid grid-cols-2 gap-3">
          {/* Total Credits */}
          <div className="p-3.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18]/70 flex items-start gap-3 transition-transform hover:-translate-y-0.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {totalCreditsCompleted} / {totalCreditsRequired}
              </div>
              <div className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
                Total Credits
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Completed
              </div>
            </div>
          </div>

          {/* CGPA Card */}
          <div className="p-3.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18]/70 flex items-start gap-3 transition-transform hover:-translate-y-0.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-blue-700 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {cgpa.toFixed(2)}
              </div>
              <div className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
                CGPA
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                Current Sem {currentSem}
              </div>
            </div>
          </div>

          {/* Attendance (Target ID for #academics-attendance) */}
          <div
            id="academics-attendance"
            className="scroll-mt-28 p-3.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18]/70 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-4 h-4 text-purple-700 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {attendancePercentage}%
              </div>
              <div className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
                Attendance
              </div>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                This Semester
              </div>
            </div>
          </div>

          {/* Backlogs */}
          <div className="p-3.5 rounded-xl border border-gray-100 dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18]/70 flex items-start gap-3 transition-transform hover:-translate-y-0.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {backlogs}
              </div>
              <div className="text-[11px] font-medium text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
                Backlogs
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                (if any)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
