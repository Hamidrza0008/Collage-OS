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
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-card-bg rounded-2xl border border-gray-200/70 dark:border-gray-800/80 p-2.5 sm:p-3 shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <Search className="w-4 h-4 text-text-secondary/60 dark:text-text-secondary-dark/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, subject, or keywords..."
          className="w-full pl-10 pr-3 py-1.5 text-xs sm:text-[13px] rounded-xl border-none bg-transparent text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/50 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Dropdown Filters & Sort */}
      <div className="flex items-center flex-wrap gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800/60">
        {/* All Categories Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-medium rounded-xl border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-primary dark:text-text-primary-dark hover:border-emerald-500/50 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 cursor-pointer shadow-2xs"
          >
            <option value="all">All Categories</option>
            <option value="study-material">Study Material</option>
            <option value="syllabus">Syllabus</option>
            <option value="previous-papers">Previous Papers</option>
            <option value="guidelines">Guidelines</option>
            <option value="forms-templates">Forms & Templates</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-text-secondary-dark absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* All Semesters Dropdown */}
        <div className="relative">
          <select
            value={semesterFilter}
            onChange={(e) => onSemesterFilterChange(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-medium rounded-xl border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-primary dark:text-text-primary-dark hover:border-emerald-500/50 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 cursor-pointer shadow-2xs"
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
          <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-text-secondary-dark absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Latest First Sort */}
        <button
          type="button"
          onClick={() =>
            onSortOrderChange(sortOrder === "latest" ? "oldest" : "latest")
          }
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-primary dark:text-text-primary-dark hover:border-emerald-500/50 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{sortOrder === "latest" ? "Latest First" : "Oldest First"}</span>
        </button>
      </div>
    </div>
  );
}
