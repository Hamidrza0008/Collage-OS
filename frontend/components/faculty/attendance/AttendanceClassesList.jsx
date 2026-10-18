"use client";

import React, { useState } from "react";
import { Calendar, Search, Filter, Users, ChevronRight, CheckSquare } from "lucide-react";

export default function AttendanceClassesList({ onMarkAttendance }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const classes = [
    {
      id: "dsa",
      code: "CSE-301",
      shortName: "DSA",
      fullName: "Data Structures & Algorithms",
      batch: "Sem 5 • B.Tech CSE",
      semester: 5,
      studentsCount: 42,
      attendance: 78,
      present: 32,
      absent: 10,
      badgeStyle: "bg-[#DDF4EB] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
    },
    {
      id: "webdev",
      code: "CSE-302",
      shortName: "WD",
      fullName: "Web Development",
      batch: "Sem 3 • B.Tech CSE",
      semester: 3,
      studentsCount: 38,
      attendance: 85,
      present: 32,
      absent: 6,
      badgeStyle: "bg-[#E8F3FF] dark:bg-[#082A40] text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/20",
    },
    {
      id: "dbms",
      code: "CSE-303",
      shortName: "DBMS",
      fullName: "Database Management Systems",
      batch: "Sem 5 • B.Tech CSE",
      semester: 5,
      studentsCount: 40,
      attendance: 72,
      present: 29,
      absent: 11,
      badgeStyle: "bg-[#F5EDFF] dark:bg-[#2C1340] text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/20",
    },
    {
      id: "cn",
      code: "CSE-304",
      shortName: "CN",
      fullName: "Computer Networks",
      batch: "Sem 3 • B.Tech CSE",
      semester: 3,
      studentsCount: 28,
      attendance: 90,
      present: 25,
      absent: 3,
      badgeStyle: "bg-[#FFF3E8] dark:bg-[#382008] text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/20",
    },
  ];

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSemester =
      filterSemester === "all" ||
      (filterSemester === "sem3" && cls.semester === 3) ||
      (filterSemester === "sem5" && cls.semester === 5);

    return matchesSearch && matchesSemester;
  });

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 md:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 mt-0.5">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
              My Classes
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Select a class to mark attendance or view details.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991]" />
            <input
              type="text"
              placeholder="Search by class, subject or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-8 pr-3 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="h-9 px-3 text-xs font-semibold rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5 hover:border-[#159B72] cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-[#658278]" />
              <span>{filterSemester === "all" ? "Filter" : filterSemester === "sem3" ? "Sem 3" : "Sem 5"}</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-20 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFilterSemester("all");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#F0FAF5] dark:hover:bg-[#082A24] ${
                    filterSemester === "all" ? "font-bold text-[#159B72]" : ""
                  }`}
                >
                  All Semesters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterSemester("sem3");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#F0FAF5] dark:hover:bg-[#082A24] ${
                    filterSemester === "sem3" ? "font-bold text-[#159B72]" : ""
                  }`}
                >
                  Semester 3
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterSemester("sem5");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#F0FAF5] dark:hover:bg-[#082A24] ${
                    filterSemester === "sem5" ? "font-bold text-[#159B72]" : ""
                  }`}
                >
                  Semester 5
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Class Rows List */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {filteredClasses.map((cls) => {
          const radius = 22;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (cls.attendance / 100) * circumference;

          return (
            <div
              key={cls.id}
              className="py-4 sm:py-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              {/* Left Box & Course Meta */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {/* Short Badge */}
                <div
                  className={`w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${cls.badgeStyle}`}
                >
                  <span className="text-xs sm:text-sm font-black leading-tight block">
                    {cls.shortName}
                  </span>
                  <span className="text-[10px] font-semibold opacity-75 block mt-0.5">
                    {cls.code}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                    {cls.fullName}
                  </h3>
                  <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5 truncate">
                    {cls.batch}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#658278] dark:text-[#789991]">
                    <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                    <span className="font-medium">{cls.studentsCount} Students</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Circular Gauge + Attendance Stats + Mark Attendance Button */}
              <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#F0F5F2] dark:border-[#0E352E]">
                {/* Circular Gauge */}
                <div className="flex items-center gap-3">
                  <div className="relative w-13 h-13 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 54 54">
                      <circle
                        cx="27"
                        cy="27"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-[#E2EFE9] dark:text-[#0C382D]"
                      />
                      <circle
                        cx="27"
                        cy="27"
                        r={radius}
                        fill="none"
                        stroke="#159B72"
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                      {cls.attendance}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] block leading-tight">
                      Attendance
                    </span>
                    <span className="text-[10.5px] font-medium text-[#658278] dark:text-[#789991] block mt-0.5">
                      {cls.present} Present / {cls.absent} Absent
                    </span>
                  </div>
                </div>

                {/* Mark Attendance CTA */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onMarkAttendance && onMarkAttendance(cls)}
                    className="px-3.5 py-2 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] hover:bg-[#159B72] text-[#159B72] dark:text-[#20D39B] hover:text-white border border-[#159B72]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group-hover:bg-[#159B72] group-hover:text-white"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Mark Attendance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onMarkAttendance && onMarkAttendance(cls)}
                    className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F0F5F2] dark:hover:bg-[#0C382D] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
