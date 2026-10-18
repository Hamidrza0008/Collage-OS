"use client";

import React from "react";
import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";

export default function FacultyClassOverview() {
  const classes = [
    {
      subject: "DSA",
      semester: "Sem 5",
      attendance: 78,
      assignments: "12/15",
    },
    {
      subject: "Web Dev",
      semester: "Sem 3",
      attendance: 85,
      assignments: "10/12",
    },
    {
      subject: "DBMS",
      semester: "Sem 5",
      attendance: 72,
      assignments: "8/10",
    },
    {
      subject: "CN",
      semester: "Sem 3",
      attendance: 90,
      assignments: "7/8",
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Class-wise Overview
          </h2>
        </div>

        <Link
          href="/faculty/classes"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:gap-1.5 transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of 4 Circular Meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
        {classes.map((item) => {
          // Circular SVG calculation: radius = 30, circumference = 2 * PI * 30 ≈ 188.49
          const radius = 28;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (item.attendance / 100) * circumference;

          return (
            <div
              key={item.subject}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24]/50 border border-[#E8F2ED] dark:border-[#10372F] hover:border-[#159B72]/40 transition-colors"
            >
              <div className="text-center mb-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block">
                  {item.subject}
                </span>
                <span className="text-[10.5px] font-medium text-[#658278] dark:text-[#789991]">
                  {item.semester}
                </span>
              </div>

              {/* Progress Ring */}
              <div className="relative w-18 h-18 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
                  {/* Background track */}
                  <circle
                    cx="34"
                    cy="34"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    className="text-[#E2EFE9] dark:text-[#0C382D]"
                  />
                  {/* Progress stroke */}
                  <circle
                    cx="34"
                    cy="34"
                    r={radius}
                    fill="none"
                    stroke="#159B72"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {item.attendance}%
                  </span>
                </div>
              </div>

              {/* Attendance label & Assignments info */}
              <span className="text-[10px] font-semibold text-[#658278] dark:text-[#789991] mt-1">
                Attendance
              </span>
              <span className="text-[10.5px] font-bold text-[#0B3024] dark:text-[#D5EFE5] mt-0.5">
                {item.assignments} Assignments
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
