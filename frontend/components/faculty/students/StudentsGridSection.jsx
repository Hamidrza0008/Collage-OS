"use client";

import React from "react";
import StudentCard from "./StudentCard";
import {
  Users,
  GraduationCap,
  FolderGit2,
  Activity,
  Search,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function StudentsGridSection({
  students,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  currentPage,
  onPageChange,
  onSelectStudent,
  onToggleFollow,
  allCount = 156,
  myClassesCount = 42,
  topProjectsCount = 28,
  activeNowCount = 12,
  onOpenFilter,
}) {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(students.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* 1. Header Toolbar: Tabs + Search + Filter Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E5ECE8] dark:border-[#10372F] pb-3">
        {/* Left Category Tabs matching screenshot */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          {/* All Students 156 */}
          <button
            onClick={() => onTabChange("all")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "all"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All Students</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "all"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {allCount}
            </span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* My Classes 42 */}
          <button
            onClick={() => onTabChange("my_classes")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "my_classes"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>My Classes</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "my_classes"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {myClassesCount}
            </span>
            {activeTab === "my_classes" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Top Projects 28 */}
          <button
            onClick={() => onTabChange("top_projects")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "top_projects"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Top Projects</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "top_projects"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {topProjectsCount}
            </span>
            {activeTab === "top_projects" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Active Now 12 */}
          <button
            onClick={() => onTabChange("active_now")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "active_now"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Active Now</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "active_now"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {activeNowCount}
            </span>
            {activeTab === "active_now" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>
        </div>

        {/* Right Search Input & Filter toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="w-4 h-4 text-[#658278] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-[13px] rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 focus:outline-none focus:border-[#159B72] transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={onOpenFilter}
            title="Filter options"
            className="p-2 rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#159B72] hover:border-[#159B72] transition-colors cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Secondary Toolbar: "Showing 1–12 of 156 students", Sort by, View Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#658278] dark:text-[#789991] pt-1">
        <div className="text-[13px]">
          Showing{" "}
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            {students.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, students.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            {students.length} students
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="relative flex items-center gap-1.5 bg-white dark:bg-[#06241F] border border-[#E5ECE8] dark:border-[#10372F] rounded-xl px-3 py-1.5 shadow-2xs">
            <span className="text-[#658278] text-xs">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none cursor-pointer pr-1"
            >
              <option value="name_asc" className="dark:bg-[#06241F]">Name (A-Z)</option>
              <option value="name_desc" className="dark:bg-[#06241F]">Name (Z-A)</option>
              <option value="roll_asc" className="dark:bg-[#06241F]">Roll Number</option>
              <option value="projects_desc" className="dark:bg-[#06241F]">Most Projects</option>
              <option value="likes_desc" className="dark:bg-[#06241F]">Most Likes</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#658278] pointer-events-none" />
          </div>

          {/* View Mode Switcher (Grid vs List) */}
          <div className="flex items-center bg-white dark:bg-[#06241F] border border-[#E5ECE8] dark:border-[#10372F] rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#159B72] text-white"
                  : "text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              title="List View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#159B72] text-white"
                  : "text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Students Grid (3 columns x 4 rows = 12 cards) */}
      {currentStudents.length === 0 ? (
        <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E8F7F0] text-[#159B72] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            No students found
          </h3>
          <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 max-w-sm mx-auto">
            Try adjusting your search query, branch, semester, or skill filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {currentStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onSelect={onSelectStudent}
              onToggleFollow={onToggleFollow}
            />
          ))}
        </div>
      )}

      {/* 4. Pagination matching screenshot */}
      {students.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-[#658278] dark:text-[#789991]">
          <div>
            Showing{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {startIndex + 1}–{Math.min(startIndex + itemsPerPage, students.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {students.length} students
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="w-8 h-8 rounded-lg border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-center text-[#658278] hover:text-[#0B3024] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#159B72] text-white"
                      : "border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#0B3024]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className="w-8 h-8 rounded-lg border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-center text-[#658278] hover:text-[#0B3024] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
