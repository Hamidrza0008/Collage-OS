"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function AcademicsHeader({ currentSemester, onSemesterChange }) {
  const { isDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const semesters = [
    { num: 1, label: "Semester 1", status: "Completed" },
    { num: 2, label: "Semester 2", status: "Completed" },
    { num: 3, label: "Semester 3", status: "Completed" },
    { num: 4, label: "Semester 4", status: "Completed" },
    { num: 5, label: "Semester 5", status: "Completed" },
    { num: 6, label: "Semester 6", status: "Completed" },
    { num: 7, label: "Semester 7", status: "Current" },
    { num: 8, label: "Semester 8", status: "Upcoming" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#10372F] bg-[#FFFFFF] dark:bg-[#021512] shadow-xs">
      {/* High-Contrast Visible Panoramic Campus Photography */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <Image
          src={isDark ? "/assets/academics/dark/hero-banner.jpg" : "/assets/academics/light/hero-banner.jpg"}
          alt="Modern University Academic Hall"
          fill
          priority
          className="object-cover object-right opacity-95 dark:opacity-90 transition-opacity duration-300"
        />
        {/* Soft directional gradient: Crisp text backing on left, clear architectural campus vista on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent dark:from-[#021512]/95 dark:via-[#021512]/60 dark:to-transparent" />
      </div>

      {/* Content Layer: Compact, streamlined */}
      <div className="relative z-10 py-3.5 px-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-h-[82px]">
        {/* Left: Heading & Subtitle with high legibility */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-[24px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-tight">
            Academics
          </h1>
          <p className="text-xs text-[#4F6E64] dark:text-[#91B5AA] mt-0.5 font-normal max-w-md leading-snug">
            Track your academic progress, view grades, and stay on top of your learning journey.
          </p>
        </div>

        {/* Right: Semester Selector Dropdown */}
        <div className="relative shrink-0 self-start sm:self-center" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#082A24]/95 hover:bg-white dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs text-xs font-medium text-[#0B3024] dark:text-[#E2F1EC] backdrop-blur-xs transition-all cursor-pointer"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              Current Semester <strong className="font-bold text-emerald-800 dark:text-emerald-300">{currentSemester}</strong>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#658278] dark:text-[#789991] transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#10372F] text-[11px] font-semibold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                Select Semester
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {semesters.map((sem) => {
                  const isSelected = currentSemester === sem.num;
                  return (
                    <button
                      key={sem.num}
                      type="button"
                      onClick={() => {
                        onSemesterChange(sem.num);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-800 dark:text-emerald-300 font-semibold"
                          : "text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {sem.label}
                        {sem.status === "Current" && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                            Current
                          </span>
                        )}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
