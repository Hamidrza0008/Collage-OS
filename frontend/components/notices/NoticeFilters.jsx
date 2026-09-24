"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, Building2, Tag } from "lucide-react";
import { DEPARTMENTS_LIST, CATEGORIES_LIST } from "./noticesData";

export default function NoticeFilters({
  activeTab,
  onTabChange,
  selectedDepartment,
  onDepartmentChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) {
  const [deptOpen, setDeptOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const deptRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (deptRef.current && !deptRef.current.contains(e.target)) {
        setDeptOpen(false);
      }
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-2 sm:p-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 transition-colors">
      {/* Left: Main Tabs (Notices vs Announcements) */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onTabChange("notices")}
          className={`relative px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "notices"
              ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
              : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-50 dark:hover:bg-[#082A24]/60"
          }`}
        >
          <span>Notices</span>
          {activeTab === "notices" && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onTabChange("announcements")}
          className={`relative px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "announcements"
              ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
              : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-50 dark:hover:bg-[#082A24]/60"
          }`}
        >
          <span>Announcements</span>
          {activeTab === "announcements" && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
          )}
        </button>
      </div>

      {/* Right: Department Filter + Category Filter + Search Field */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
        {/* Dropdowns Row on Mobile */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Department Dropdown */}
          <div className="relative flex-1 sm:flex-initial shrink-0" ref={deptRef}>
            <button
              type="button"
              onClick={() => {
                setDeptOpen((p) => !p);
                setCatOpen(false);
              }}
              className="w-full sm:w-auto flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18] hover:bg-gray-100 dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="max-w-[100px] truncate">{selectedDepartment}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
            </button>

            {deptOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-1.5 w-60 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#10372F] text-[10.5px] font-semibold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                  Filter by Department
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {DEPARTMENTS_LIST.map((dept) => {
                    const isSelected = selectedDepartment === dept;
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => {
                          onDepartmentChange(dept);
                          setDeptOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-800 dark:text-emerald-300 font-semibold"
                            : "text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                        }`}
                      >
                        <span className="truncate">{dept}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative flex-1 sm:flex-initial shrink-0" ref={catRef}>
            <button
              type="button"
              onClick={() => {
                setCatOpen((p) => !p);
                setDeptOpen(false);
              }}
              className="w-full sm:w-auto flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18] hover:bg-gray-100 dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#E2F1EC] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 truncate">
                <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="max-w-[95px] truncate">{selectedCategory}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
            </button>

            {catOpen && (
              <div className="absolute right-0 mt-1.5 w-52 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#10372F] text-[10.5px] font-semibold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                  Filter by Category
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {CATEGORIES_LIST.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          onCategoryChange(cat);
                          setCatOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-800 dark:text-emerald-300 font-semibold"
                            : "text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-52">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#658278]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notices..."
            className="w-full py-1.5 pl-8 pr-3 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/70 dark:bg-[#041D18] text-xs text-[#0B3024] dark:text-[#E2F1EC] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
