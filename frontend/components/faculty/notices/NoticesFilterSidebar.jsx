"use client";

import React, { useState, useRef, useEffect } from "react";
import { Filter, Calendar, ChevronDown, Check } from "lucide-react";

export default function NoticesFilterSidebar({
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange,
}) {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dateDropdownRef = useRef(null);

  const dateRangeOptions = [
    { label: "Last 30 days", value: "30days" },
    { label: "Last 90 days", value: "90days" },
    { label: "This Semester", value: "semester" },
    { label: "All Time", value: "all" },
  ];

  const selectedDateLabel =
    dateRangeOptions.find((opt) => opt.value === dateRangeFilter)?.label ||
    "Last 30 days";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-0.5">
        <Filter className="w-4 h-4 text-[#159B72]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Filter & Sort
        </h2>
      </div>

      {/* 1. Category */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {["all", "notices", "announcements"].map((cat) => {
            const isSelected = categoryFilter === cat;
            const label =
              cat === "all"
                ? "All"
                : cat === "notices"
                ? "Notices"
                : "Announcements";
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryFilterChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium"
                    : "bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] text-[#4A635B] dark:text-[#94B2A8] font-normal hover:border-[#159B72]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Status */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {["all", "active", "expired"].map((st) => {
            const isSelected = statusFilter === st;
            const label =
              st === "all" ? "All" : st === "active" ? "Active" : "Expired";
            return (
              <button
                key={st}
                type="button"
                onClick={() => onStatusFilterChange(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium"
                    : "bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] text-[#4A635B] dark:text-[#94B2A8] font-normal hover:border-[#159B72]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Date Range */}
      <div className="space-y-2" ref={dateDropdownRef}>
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Date Range
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#D8E6E0] dark:border-[#143E33] bg-white dark:bg-[#06241F] text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:border-[#159B72] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#658278]" />
              <span>{selectedDateLabel}</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#658278] transition-transform ${
                isDateDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDateDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] rounded-xl shadow-lg py-1 z-20 animate-in fade-in-50 zoom-in-95 duration-150">
              {dateRangeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onDateRangeFilterChange(opt.value);
                    setIsDateDropdownOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] flex items-center justify-between cursor-pointer"
                >
                  <span className={dateRangeFilter === opt.value ? "font-semibold text-[#159B72]" : ""}>
                    {opt.label}
                  </span>
                  {dateRangeFilter === opt.value && (
                    <Check className="w-3.5 h-3.5 text-[#159B72]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
