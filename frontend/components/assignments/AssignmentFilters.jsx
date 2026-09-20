"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { SUBJECTS_LIST } from "./assignmentsData";

export default function AssignmentFilters({
  activeTab,
  onTabChange,
  counts,
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
}) {
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const tabs = [
    { id: "all", label: "All Assignments", count: counts.all },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "submitted", label: "Submitted", count: counts.submitted },
    { id: "overdue", label: "Overdue", count: counts.overdue },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSubjectDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-2 sm:p-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      {/* Left: Filter Tabs with Counts */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? "text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40"
                  : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-50 dark:hover:bg-[#082A24]/60"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-bold ${
                  isActive
                    ? "bg-emerald-600 text-white dark:bg-emerald-400 dark:text-[#021512]"
                    : tab.id === "overdue"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                    : "bg-gray-100 text-gray-600 dark:bg-[#082A24] dark:text-gray-300"
                }`}
              >
                {tab.count}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Input + Subject Dropdown */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Search Field */}
        <div className="relative flex-1 sm:w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#658278]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search assignments..."
            className="w-full py-1.5 pl-8 pr-3 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18] text-xs text-[#0B3024] dark:text-[#E2F1EC] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Subject Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setSubjectDropdownOpen((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18] hover:bg-gray-100 dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="max-w-[110px] truncate">{selectedSubject}</span>
            <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-500" />
          </button>

          {subjectDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#10372F] text-[10.5px] font-semibold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                Filter by Subject
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {SUBJECTS_LIST.map((subj) => {
                  const isSelected = selectedSubject === subj;
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        onSubjectChange(subj);
                        setSubjectDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-800 dark:text-emerald-300 font-semibold"
                          : "text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                      }`}
                    >
                      <span>{subj}</span>
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
