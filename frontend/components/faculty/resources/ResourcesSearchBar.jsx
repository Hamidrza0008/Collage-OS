"use client";

import React from "react";
import { Search, ChevronDown, ArrowUpDown } from "lucide-react";

export default function ResourcesSearchBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  semesterFilter,
  onSemesterFilterChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] p-2.5 sm:p-3 shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <Search className="w-4 h-4 text-[#658278] dark:text-[#789991] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, subject, or keywords..."
          className="w-full pl-10 pr-3 py-1.5 text-xs sm:text-[13px] rounded-xl border-none bg-transparent text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Dropdown Filters & Sort */}
      <div className="flex items-center flex-wrap gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-[#E8F1ED] dark:border-[#10372F]">
        {/* All Categories Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] hover:border-[#159B72]/60 focus:outline-none focus:ring-1.5 focus:ring-[#159B72] cursor-pointer shadow-2xs"
          >
            <option value="all">All Categories</option>
            <option value="study-material">Study Material</option>
            <option value="syllabus">Syllabus</option>
            <option value="previous-papers">Previous Papers</option>
            <option value="guidelines">Guidelines</option>
            <option value="forms-templates">Forms & Templates</option>
            <option value="others">Others</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* All Semesters Dropdown */}
        <div className="relative">
          <select
            value={semesterFilter}
            onChange={(e) => onSemesterFilterChange(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] hover:border-[#159B72]/60 focus:outline-none focus:ring-1.5 focus:ring-[#159B72] cursor-pointer shadow-2xs"
          >
            <option value="all">All Semesters</option>
            <option value="Sem 1">Sem 1</option>
            <option value="Sem 2">Sem 2</option>
            <option value="Sem 3">Sem 3</option>
            <option value="Sem 4">Sem 4</option>
            <option value="Sem 5">Sem 5</option>
            <option value="Sem 6">Sem 6</option>
            <option value="All Sem">All Sem</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort Dropdown with ArrowUpDown Icon */}
        <div className="relative">
          <div className="flex items-center rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs hover:border-[#159B72]/60">
            <span className="pl-3 text-[#159B72] dark:text-[#20D39B]">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </span>
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value)}
              className="appearance-none pl-2 pr-8 py-1.5 text-xs font-semibold bg-transparent text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A–Z</option>
              <option value="downloads">Most Downloaded</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
