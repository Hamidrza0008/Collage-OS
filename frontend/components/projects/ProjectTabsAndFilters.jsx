"use client";

import { Search, GitBranch, X } from "lucide-react";
import { BRANCH_OPTIONS } from "./projectsData";

export default function ProjectTabsAndFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedBranch,
  onBranchChange,
  counts = {},
}) {
  const tabs = [
    { id: "all", label: "All Projects", count: counts.all },
    { id: "my-projects", label: "My Projects", count: counts.my },
    { id: "liked", label: "Liked Projects", count: counts.liked },
    { id: "my-team", label: "My Team", count: counts.team },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-2.5 sm:p-3 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 transition-colors">
      {/* Left: Main Tabs */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-[#DDF4EB] dark:bg-[#0D4436] text-[#087A5B] dark:text-[#20D39B] shadow-xs"
                  : "text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10.5px] font-bold ${
                    isActive
                      ? "bg-[#159B72]/15 text-[#087A5B] dark:text-[#20D39B]"
                      : "bg-gray-100 dark:bg-[#0A2E26] text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Input + Branch Dropdown */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search Field */}
        <div className="relative flex-1 sm:w-56 md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#658278] dark:text-[#789991] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-8.5 pr-8 py-1.5 rounded-xl text-xs font-medium bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72] dark:focus:border-[#20D39B] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Branch Dropdown */}
        <div className="relative shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] text-xs font-semibold">
            <GitBranch className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
            <select
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-1"
            >
              {BRANCH_OPTIONS.map((br) => (
                <option
                  key={br.value}
                  value={br.value}
                  className="bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6]"
                >
                  {br.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
