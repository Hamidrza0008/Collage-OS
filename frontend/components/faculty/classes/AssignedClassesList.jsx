"use client";

import React, { useState } from "react";
import {
  Calendar,
  Search,
  ChevronDown,
  Code2,
  Globe,
  Database,
  Monitor,
  Users,
  Clock,
  FileText,
  MoreVertical,
  ArrowRight,
  GraduationCap,
  X,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function AssignedClassesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedClassModal, setSelectedClassModal] = useState(null);

  const classes = [
    {
      id: "dsa",
      code: "CSE-301",
      shortName: "DSA",
      fullName: "Data Structures & Algorithms",
      semester: 5,
      semesterLabel: "Sem 5",
      block: "A-Block",
      batch: "B.Tech CSE • Sem 5 • A-Block",
      schedule: "Mon, Wed, Fri • 09:00 AM - 10:00 AM",
      studentsCount: 42,
      attendance: 78,
      todayAttendance: "32/42",
      pendingAssignments: 5,
      theme: {
        badgeBg: "bg-[#DDF4EB] dark:bg-[#073629] border-[#159B72]/20",
        semPill: "bg-[#C1EAD9] dark:bg-[#0E4A3A] text-[#0E7A57] dark:text-[#20D39B]",
        iconBg: "bg-[#0B3D2F] text-white",
        icon: Code2,
      },
    },
    {
      id: "webdev",
      code: "CSE-302",
      shortName: "Web Dev",
      fullName: "Web Development",
      semester: 3,
      semesterLabel: "Sem 3",
      block: "B-Block",
      batch: "B.Tech CSE • Sem 3 • B-Block",
      schedule: "Tue, Thu • 11:00 AM - 12:00 PM",
      studentsCount: 38,
      attendance: 85,
      todayAttendance: "32/38",
      pendingAssignments: 3,
      theme: {
        badgeBg: "bg-[#E8F3FF] dark:bg-[#082A40] border-[#2563EB]/20",
        semPill: "bg-[#CFE5FF] dark:bg-[#0E3B5C] text-[#1D4ED8] dark:text-[#60A5FA]",
        iconBg: "bg-[#1E40AF] text-white",
        icon: Globe,
      },
    },
    {
      id: "dbms",
      code: "CSE-303",
      shortName: "DBMS",
      fullName: "Database Management Systems",
      semester: 5,
      semesterLabel: "Sem 5",
      block: "A-Block",
      batch: "B.Tech CSE • Sem 5 • A-Block",
      schedule: "Mon, Wed • 02:00 PM - 03:00 PM",
      studentsCount: 40,
      attendance: 72,
      todayAttendance: "29/40",
      pendingAssignments: 4,
      theme: {
        badgeBg: "bg-[#F5EDFF] dark:bg-[#2C1340] border-[#9333EA]/20",
        semPill: "bg-[#E8D4FF] dark:bg-[#431B63] text-[#7E22CE] dark:text-[#C084FC]",
        iconBg: "bg-[#6B21A8] text-white",
        icon: Database,
      },
    },
    {
      id: "cn",
      code: "CSE-304",
      shortName: "CN",
      fullName: "Computer Networks",
      semester: 3,
      semesterLabel: "Sem 3",
      block: "B-Block",
      batch: "B.Tech CSE • Sem 3 • B-Block",
      schedule: "Fri • 04:00 PM - 05:00 PM",
      studentsCount: 28,
      attendance: 90,
      todayAttendance: "25/28",
      pendingAssignments: 2,
      theme: {
        badgeBg: "bg-[#FFF3E8] dark:bg-[#382008] border-[#EA580C]/20",
        semPill: "bg-[#FFE0C4] dark:bg-[#522D0A] text-[#C2410C] dark:text-[#FB923C]",
        iconBg: "bg-[#C2410C] text-white",
        icon: Monitor,
      },
    },
  ];

  // Filter based on search input and semester
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSemester =
      selectedSemester === "all" ||
      (selectedSemester === "sem3" && cls.semester === 3) ||
      (selectedSemester === "sem5" && cls.semester === 5);

    return matchesSearch && matchesSemester;
  });

  return (
    <div id="assigned-classes" className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 md:p-6 shadow-xs">
      {/* Header with Title and Search/Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-5 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 mt-0.5">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
              Assigned Classes
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Here are the classes and subjects you are currently assigned to.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991]" />
            <input
              type="text"
              placeholder="Search classes or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-8 pr-3 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Semester Dropdown */}
          <div className="relative">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="h-9 pl-3 pr-7 text-xs font-semibold rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] cursor-pointer appearance-none"
            >
              <option value="all">All Semesters</option>
              <option value="sem3">Semester 3</option>
              <option value="sem5">Semester 5</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#658278] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E]">
        {filteredClasses.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#658278]">
            No assigned classes found matching your search.
          </div>
        ) : (
          filteredClasses.map((cls) => {
            const Icon = cls.theme.icon;
            const radius = 22;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (cls.attendance / 100) * circumference;

            return (
              <div
                key={cls.id}
                className="py-4 sm:py-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 group"
              >
                {/* Left Side: Short Code Card + Info */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4.5 min-w-0 w-full xl:w-auto">
                  {/* Left Badge Box */}
                  <div
                    className={`relative w-28 sm:w-32 h-24 sm:h-26 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between shrink-0 border ${cls.theme.badgeBg}`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs ${cls.theme.iconBg}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls.theme.semPill}`}
                      >
                        {cls.semesterLabel}
                      </span>
                    </div>

                    <div>
                      <span className="text-base sm:text-lg font-black text-[#0B3024] dark:text-[#F1FAF6] block leading-tight">
                        {cls.shortName}
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#658278] dark:text-[#789991]">
                        {cls.code}
                      </span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
                      {cls.fullName}
                    </h3>

                    <div className="mt-1.5 space-y-1 text-xs text-[#658278] dark:text-[#789991]">
                      <div className="flex items-center gap-1.5 truncate">
                        <GraduationCap className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                        <span>{cls.batch}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                        <span>{cls.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                        <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                          {cls.studentsCount} Students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Circular Attendance + Pending Assignments + Action Button */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3.5 sm:gap-5 w-full xl:w-auto pt-2 xl:pt-0 border-t xl:border-t-0 border-[#F0F5F2] dark:border-[#0E352E]">
                  {/* Circular Attendance Meter */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="relative w-14 h-14 flex items-center justify-center">
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
                    <span className="text-[10px] font-semibold text-[#658278] dark:text-[#789991] mt-0.5">
                      Attendance
                    </span>
                    <span className="text-[9.5px] font-bold text-[#0B3024] dark:text-[#D5EFE5]">
                      Today: {cls.todayAttendance}
                    </span>
                  </div>

                  {/* Pending Assignments Box */}
                  <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] min-w-[100px] text-center">
                    <div className="w-6 h-6 rounded-md bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC] flex items-center justify-center mb-1">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] leading-none">
                      {cls.pendingAssignments}
                    </span>
                    <span className="text-[9.5px] font-semibold text-[#658278] dark:text-[#789991] mt-0.5">
                      Pending Assignments
                    </span>
                  </div>

                  {/* Options Menu & View Class CTA */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedClassModal(cls)}
                      className="px-3.5 sm:px-4 py-2 rounded-xl border border-[#159B72] hover:bg-[#159B72] text-[#159B72] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group-hover:bg-[#159B72] group-hover:text-white"
                    >
                      <span>View Class</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedClassModal(cls)}
                      className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F0F5F2] dark:hover:bg-[#0C382D] transition-colors"
                      title="More Options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Class Details Modal */}
      {selectedClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${selectedClassModal.theme.iconBg}`}
                >
                  {selectedClassModal.shortName}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {selectedClassModal.fullName}
                  </h3>
                  <span className="text-xs text-[#658278] dark:text-[#789991]">
                    {selectedClassModal.code} • {selectedClassModal.batch}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClassModal(null)}
                className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] text-center">
                  <span className="text-lg font-black text-[#159B72] dark:text-[#20D39B] block">
                    {selectedClassModal.attendance}%
                  </span>
                  <span className="text-[10px] text-[#658278]">Attendance</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] text-center">
                  <span className="text-lg font-black text-[#0B3024] dark:text-[#F1FAF6] block">
                    {selectedClassModal.studentsCount}
                  </span>
                  <span className="text-[10px] text-[#658278]">Enrolled Students</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] text-center">
                  <span className="text-lg font-black text-[#9333EA] dark:text-[#C084FC] block">
                    {selectedClassModal.pendingAssignments}
                  </span>
                  <span className="text-[10px] text-[#658278]">Pending Reviews</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Weekly Schedule &amp; Classroom
                </h4>
                <p className="text-[#658278] dark:text-[#789991]">
                  {selectedClassModal.schedule} in {selectedClassModal.block}.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F0F5F2] dark:border-[#0E352E]">
                <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Quick Management Actions
                </h4>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Opening Roll-Call Attendance for ${selectedClassModal.fullName}`);
                      setSelectedClassModal(null);
                    }}
                    className="p-2.5 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] font-bold text-center hover:opacity-90 transition-opacity"
                  >
                    Mark Attendance
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Creating new assignment for ${selectedClassModal.fullName}`);
                      setSelectedClassModal(null);
                    }}
                    className="p-2.5 rounded-xl bg-[#F1F8F5] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] font-bold text-center hover:bg-[#E2EBE7] dark:hover:bg-[#0C382D] transition-colors"
                  >
                    Create Assignment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
