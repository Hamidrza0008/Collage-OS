"use client";

import React, { useState, useRef, useEffect } from "react";
import { Filter, Calendar, MapPin, Monitor, ChevronDown, Check } from "lucide-react";

export default function EventsFilterSidebar({
  selectedType,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  locationFilter,
  onLocationChange,
  formatFilter,
  onFormatChange,
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'date' | 'location' | 'format' | null
  const containerRef = useRef(null);

  const eventTypes = ["All", "Workshop", "Competition", "Event", "Club", "Seminar", "Sports"];

  const dateOptions = [
    { label: "Next 30 days", value: "30days" },
    { label: "Next 90 days", value: "90days" },
    { label: "This Semester", value: "semester" },
    { label: "All Dates", value: "all" },
  ];

  const locationOptions = [
    { label: "All Locations", value: "all" },
    { label: "CS Lab - Block A", value: "CS Lab - Block A" },
    { label: "Auditorium", value: "Auditorium" },
    { label: "Seminar Hall", value: "Seminar Hall" },
    { label: "College Ground", value: "College Ground" },
    { label: "Design Lab - Block B", value: "Design Lab - Block B" },
    { label: "Main Ground", value: "Main Ground" },
  ];

  const formatOptions = [
    { label: "All Formats", value: "all" },
    { label: "In-Person", value: "In-Person" },
    { label: "Virtual", value: "Virtual" },
    { label: "Hybrid", value: "Hybrid" },
  ];

  const selectedDateLabel = dateOptions.find((d) => d.value === dateRange)?.label || "Next 30 days";
  const selectedLocationLabel = locationOptions.find((l) => l.value === locationFilter)?.label || "All Locations";
  const selectedFormatLabel = formatOptions.find((f) => f.value === formatFilter)?.label || "All Formats";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-0.5">
        <Filter className="w-4 h-4 text-[#159B72]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Filter Events
        </h2>
      </div>

      {/* 1. Event Type Pills */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Event Type
        </label>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => {
            const isSelected = selectedType.toLowerCase() === type.toLowerCase();
            return (
              <button
                key={type}
                type="button"
                onClick={() => onTypeChange(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#159B72] text-white font-medium"
                    : "bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] text-[#4A635B] dark:text-[#94B2A8] font-normal hover:border-[#159B72]"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Date Range Dropdown */}
      <div className="space-y-2 relative">
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Date Range
        </label>
        <button
          type="button"
          onClick={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#D8E6E0] dark:border-[#143E33] bg-white dark:bg-[#06241F] text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:border-[#159B72] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#658278]" />
            <span>{selectedDateLabel}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#658278] transition-transform ${
              openDropdown === "date" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDropdown === "date" && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] rounded-xl shadow-lg py-1 z-20 animate-in fade-in-50 zoom-in-95 duration-150">
            {dateOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onDateRangeChange(opt.value);
                  setOpenDropdown(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] flex items-center justify-between cursor-pointer"
              >
                <span className={dateRange === opt.value ? "font-semibold text-[#159B72]" : ""}>
                  {opt.label}
                </span>
                {dateRange === opt.value && <Check className="w-3.5 h-3.5 text-[#159B72]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Location Dropdown */}
      <div className="space-y-2 relative">
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Location
        </label>
        <button
          type="button"
          onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#D8E6E0] dark:border-[#143E33] bg-white dark:bg-[#06241F] text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:border-[#159B72] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#658278]" />
            <span className="truncate">{selectedLocationLabel}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#658278] transition-transform shrink-0 ${
              openDropdown === "location" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDropdown === "location" && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] rounded-xl shadow-lg py-1 z-20 animate-in fade-in-50 zoom-in-95 duration-150">
            {locationOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onLocationChange(opt.value);
                  setOpenDropdown(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] flex items-center justify-between cursor-pointer"
              >
                <span className={locationFilter === opt.value ? "font-semibold text-[#159B72]" : ""}>
                  {opt.label}
                </span>
                {locationFilter === opt.value && <Check className="w-3.5 h-3.5 text-[#159B72]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. Format Dropdown */}
      <div className="space-y-2 relative">
        <label className="text-[13px] font-medium text-[#2E4A40] dark:text-[#D1E5DE] block">
          Format
        </label>
        <button
          type="button"
          onClick={() => setOpenDropdown(openDropdown === "format" ? null : "format")}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#D8E6E0] dark:border-[#143E33] bg-white dark:bg-[#06241F] text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:border-[#159B72] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Monitor className="w-3.5 h-3.5 text-[#658278]" />
            <span>{selectedFormatLabel}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#658278] transition-transform ${
              openDropdown === "format" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDropdown === "format" && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#06241F] border border-[#D8E6E0] dark:border-[#143E33] rounded-xl shadow-lg py-1 z-20 animate-in fade-in-50 zoom-in-95 duration-150">
            {formatOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onFormatChange(opt.value);
                  setOpenDropdown(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#2E4A40] dark:text-[#D1E5DE] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] flex items-center justify-between cursor-pointer"
              >
                <span className={formatFilter === opt.value ? "font-semibold text-[#159B72]" : ""}>
                  {opt.label}
                </span>
                {formatFilter === opt.value && <Check className="w-3.5 h-3.5 text-[#159B72]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
