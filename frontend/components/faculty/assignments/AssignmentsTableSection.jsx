"use client";

import React, { useState } from "react";
import { Search, ChevronDown, FileText, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export default function AssignmentsTableSection({ onSelectAssignment }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const assignments = [
    {
      id: 1,
      title: "DSA Practice Set - Arrays",
      description: "Solve the given 10 problems on arrays...",
      course: "DSA (CSE-301)",
      courseColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      iconColor: "text-blue-500",
      dueDate: "Sep 18, 2025",
      dueMeta: "(Today)",
      isDueToday: true,
      submitted: 28,
      total: 42,
      status: "Pending",
      statusColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/20",
      tabCategory: "pending",
    },
    {
      id: 2,
      title: "Web Dev - Portfolio Project",
      description: "Build a personal portfolio using Next.js...",
      course: "Web Dev (CSE-302)",
      courseColor: "bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/20",
      iconColor: "text-purple-500",
      dueDate: "Sep 20, 2025",
      dueMeta: "(2 days left)",
      isDueToday: false,
      submitted: 15,
      total: 38,
      status: "Pending",
      statusColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/20",
      tabCategory: "pending",
    },
    {
      id: 3,
      title: "DBMS - ER Diagram",
      description: "Create ER diagram for online shopping...",
      course: "DBMS (CSE-303)",
      courseColor: "bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/20",
      iconColor: "text-purple-500",
      dueDate: "Sep 22, 2025",
      dueMeta: "(4 days left)",
      isDueToday: false,
      submitted: 32,
      total: 40,
      status: "Active",
      statusColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      tabCategory: "submitted",
    },
    {
      id: 4,
      title: "Computer Networks - Report",
      description: "Write a short note on TCP/IP model...",
      course: "CN (CSE-304)",
      courseColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/20",
      iconColor: "text-orange-500",
      dueDate: "Sep 25, 2025",
      dueMeta: "(1 week left)",
      isDueToday: false,
      submitted: 12,
      total: 32,
      status: "Active",
      statusColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      tabCategory: "submitted",
    },
    {
      id: 5,
      title: "OS - Assignment 2",
      description: "Explain process scheduling algorithms...",
      course: "OS (CSE-305)",
      courseColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      iconColor: "text-emerald-500",
      dueDate: "Sep 26, 2025",
      dueMeta: "(1 week left)",
      isDueToday: false,
      submitted: 18,
      total: 30,
      status: "Active",
      statusColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      tabCategory: "submitted",
    },
    {
      id: 6,
      title: "Data Structures - Quiz",
      description: "Online quiz (30 mins) on linked lists...",
      course: "DSA (CSE-301)",
      courseColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      iconColor: "text-blue-500",
      dueDate: "Sep 28, 2025",
      dueMeta: "(1 week left)",
      isDueToday: false,
      submitted: 0,
      total: 42,
      status: "Pending",
      statusColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/20",
      tabCategory: "pending",
    },
    {
      id: 7,
      title: "Web Dev - UI Design",
      description: "Design the given components in Figma...",
      course: "Web Dev (CSE-302)",
      courseColor: "bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/20",
      iconColor: "text-purple-500",
      dueDate: "Sep 30, 2025",
      dueMeta: "(10 days left)",
      isDueToday: false,
      submitted: 6,
      total: 38,
      status: "Active",
      statusColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      tabCategory: "submitted",
    },
    {
      id: 8,
      title: "DBMS - SQL Queries",
      description: "Write optimized queries for the given...",
      course: "DBMS (CSE-303)",
      courseColor: "bg-[#F3E8FF] dark:bg-[#34164D] text-[#9333EA] dark:text-[#C084FC] border-[#9333EA]/20",
      iconColor: "text-purple-500",
      dueDate: "Oct 02, 2025",
      dueMeta: "(12 days left)",
      isDueToday: false,
      submitted: 0,
      total: 40,
      status: "Upcoming",
      statusColor: "bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/20",
      tabCategory: "upcoming",
    },
    {
      id: 9,
      title: "CN - Simulation Report",
      description: "Write a report on network simulation...",
      course: "CN (CSE-304)",
      courseColor: "bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C] border-[#EA580C]/20",
      iconColor: "text-orange-500",
      dueDate: "Oct 05, 2025",
      dueMeta: "(15 days left)",
      isDueToday: false,
      submitted: 0,
      total: 28,
      status: "Upcoming",
      statusColor: "bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/20",
      tabCategory: "upcoming",
    },
    {
      id: 10,
      title: "OS - Project Submission",
      description: "Submit final project files and report...",
      course: "OS (CSE-305)",
      courseColor: "bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] border-[#159B72]/20",
      iconColor: "text-emerald-500",
      dueDate: "Oct 10, 2025",
      dueMeta: "(20 days left)",
      isDueToday: false,
      submitted: 0,
      total: 25,
      status: "Upcoming",
      statusColor: "bg-[#EBF5FF] dark:bg-[#0A2E47] text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/20",
      tabCategory: "upcoming",
    },
  ];

  // Filter logic
  const filtered = assignments.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && item.status === "Pending") ||
      (activeTab === "submitted" && item.status === "Active") ||
      (activeTab === "overdue" && item.isDueToday);

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "all" || item.course.toLowerCase().includes(selectedClass.toLowerCase());

    return matchesTab && matchesSearch && matchesClass;
  });

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 md:p-6 shadow-xs overflow-hidden">
      {/* Tabs and Toolbar Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#F0F5F2] dark:border-[#0E352E]">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`pb-2.5 transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "text-[#159B72] dark:text-[#20D39B] font-bold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <span>All Assignments</span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`pb-2.5 transition-colors relative cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "pending"
                ? "text-[#159B72] dark:text-[#20D39B] font-bold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <span>Pending</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FFF4E5] dark:bg-[#3D2509] text-[#EA580C] dark:text-[#FB923C]">
              6
            </span>
            {activeTab === "pending" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("submitted")}
            className={`pb-2.5 transition-colors relative cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "submitted"
                ? "text-[#159B72] dark:text-[#20D39B] font-bold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <span>Submitted</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B]">
              12
            </span>
            {activeTab === "submitted" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("overdue")}
            className={`pb-2.5 transition-colors relative cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "overdue"
                ? "text-[#159B72] dark:text-[#20D39B] font-bold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <span>Overdue</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FEE2E2] dark:bg-[#450A0A] text-[#DC2626] dark:text-[#F87171]">
              2
            </span>
            {activeTab === "overdue" && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
            )}
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991]" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8.5 pl-8 pr-3 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Class Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-8.5 pl-3 pr-7 text-xs font-semibold rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] cursor-pointer appearance-none"
            >
              <option value="all">All Classes</option>
              <option value="dsa">DSA (CSE-301)</option>
              <option value="web dev">Web Dev (CSE-302)</option>
              <option value="dbms">DBMS (CSE-303)</option>
              <option value="cn">CN (CSE-304)</option>
              <option value="os">OS (CSE-305)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#658278] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F5F2] dark:border-[#0E352E] text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
              <th className="py-3 px-3 w-8">#</th>
              <th className="py-3 px-3 min-w-[220px]">Title</th>
              <th className="py-3 px-3 min-w-[120px]">Class</th>
              <th className="py-3 px-3 min-w-[130px]">Due Date</th>
              <th className="py-3 px-3 min-w-[110px]">Submissions</th>
              <th className="py-3 px-3 min-w-[90px]">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] text-xs font-medium">
            {filtered.map((item) => {
              const submissionPct = item.total > 0 ? (item.submitted / item.total) * 100 : 0;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectAssignment && onSelectAssignment(item)}
                  className="hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 transition-colors cursor-pointer group"
                >
                  {/* # */}
                  <td className="py-3.5 px-3 font-semibold text-[#658278] dark:text-[#789991]">
                    {item.id}
                  </td>

                  {/* Title & Icon & Subtitle */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-[#F0FAF5] dark:bg-[#082A24] flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className={`w-3.5 h-3.5 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors block truncate">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#658278] dark:text-[#789991] block truncate mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Class Badge */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${item.courseColor}`}
                    >
                      {item.course}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-3">
                    <span className="text-[#0B3024] dark:text-[#F1FAF6] font-semibold block">
                      {item.dueDate}
                    </span>
                    <span
                      className={`text-[10.5px] block ${
                        item.isDueToday
                          ? "text-[#DC2626] dark:text-[#F87171] font-bold"
                          : "text-[#658278] dark:text-[#789991]"
                      }`}
                    >
                      {item.dueMeta}
                    </span>
                  </td>

                  {/* Submissions */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-1">
                      <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                        {item.submitted} / {item.total}
                      </span>
                      <div className="w-20 h-1.5 rounded-full bg-[#E2EFE9] dark:bg-[#0C382D] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#159B72]"
                          style={{ width: `${submissionPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAssignment && onSelectAssignment(item);
                      }}
                      className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F0F5F2] dark:hover:bg-[#0C382D] transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pt-4 mt-2 border-t border-[#F0F5F2] dark:border-[#0E352E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#658278] dark:text-[#789991]">
        <span>Showing 1-10 of 18 assignments</span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-[#D8E8E2] dark:border-[#10372F] flex items-center justify-center hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] disabled:opacity-40"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
              currentPage === 1
                ? "bg-[#159B72] text-white"
                : "border border-[#D8E8E2] dark:border-[#10372F] hover:bg-[#F7FBF9]"
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
              currentPage === 2
                ? "bg-[#159B72] text-white"
                : "border border-[#D8E8E2] dark:border-[#10372F] hover:bg-[#F7FBF9]"
            }`}
          >
            2
          </button>
          <button
            type="button"
            disabled={currentPage === 2}
            onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
            className="w-7 h-7 rounded-lg border border-[#D8E8E2] dark:border-[#10372F] flex items-center justify-center hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] disabled:opacity-40"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
