"use client";

import React from "react";
import { Filter, Search, RotateCcw } from "lucide-react";

export default function StudentsFilterSidebar({
  selectedBranch,
  onBranchChange,
  selectedSemester,
  onSemesterChange,
  skillSearch,
  onSkillSearchChange,
  selectedSkill,
  onSkillChange,
  projectStatus,
  onProjectStatusChange,
  onResetFilters,
}) {
  const branches = ["All", "CSE", "IT", "DS", "ETC"];
  const semesters = ["All", "Sem 1", "Sem 3", "Sem 5", "Sem 7"];
  const popularSkills = ["React", "Node.js", "Python", "MongoDB"];
  const projectStatuses = ["All", "Has Projects", "No Projects"];

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 pb-1">
        <Filter className="w-4 h-4 text-[#159B72]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Filter & Search
        </h2>
      </div>

      {/* Branch Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
          Branch
        </label>
        <div className="flex flex-wrap gap-1.5">
          {branches.map((branch) => {
            const isSelected = selectedBranch === branch;
            return (
              <button
                key={branch}
                type="button"
                onClick={() => onBranchChange(branch)}
                className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium shadow-xs"
                    : "border border-[#D8E6E0] dark:border-[#143E33] bg-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
                }`}
              >
                {branch}
              </button>
            );
          })}
        </div>
      </div>

      {/* Semester Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
          Semester
        </label>
        <div className="flex flex-wrap gap-1.5">
          {semesters.map((sem) => {
            const isSelected = selectedSemester === sem;
            return (
              <button
                key={sem}
                type="button"
                onClick={() => onSemesterChange(sem)}
                className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium shadow-xs"
                    : "border border-[#D8E6E0] dark:border-[#143E33] bg-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
                }`}
              >
                {sem}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Section with inline search & pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
          Skills
        </label>
        {/* Search skills input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#658278] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={skillSearch}
            onChange={(e) => onSkillSearchChange(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-8 pr-3 py-1 text-xs rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 focus:outline-none focus:border-[#159B72] transition-colors"
          />
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {popularSkills.map((skill) => {
            const isSelected = selectedSkill === skill;
            return (
              <button
                key={skill}
                type="button"
                onClick={() => onSkillChange(isSelected ? "All" : skill)}
                className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium shadow-xs"
                    : "border border-[#D8E6E0] dark:border-[#143E33] bg-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
                }`}
              >
                {skill}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onSkillChange("All")}
            className="text-xs px-2.5 py-1 rounded-full border border-dashed border-[#D8E6E0] dark:border-[#143E33] bg-transparent text-[#159B72] hover:bg-[#E8F7F0]/40 transition-all cursor-pointer"
          >
            + More
          </button>
        </div>
      </div>

      {/* Project Status Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
          Project Status
        </label>
        <div className="flex flex-wrap gap-1.5">
          {projectStatuses.map((status) => {
            const isSelected = projectStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => onProjectStatusChange(status)}
                className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium shadow-xs"
                    : "border border-[#D8E6E0] dark:border-[#143E33] bg-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-2 px-3 rounded-xl border border-[#D8E6E0] dark:border-[#143E33] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-[#082A24] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#658278]" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}
