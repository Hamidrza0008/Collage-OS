"use client";

import React from "react";
import {
  Folder,
  BookOpen,
  FileText,
  Archive,
  ShieldCheck,
  LayoutTemplate,
  MoreHorizontal,
} from "lucide-react";
import { RESOURCE_CATEGORIES } from "./facultyResourcesData";

export default function ResourcesCategoryPills({
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
}) {
  const renderIcon = (iconName, isSelected) => {
    const className = `w-4 h-4 transition-colors ${
      isSelected
        ? "text-[#159B72] dark:text-[#20D39B]"
        : "text-[#658278] dark:text-[#789991] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B]"
    }`;

    switch (iconName) {
      case "folder":
        return <Folder className={className} />;
      case "book":
        return <BookOpen className={className} />;
      case "file-text":
        return <FileText className={className} />;
      case "archive":
        return <Archive className={className} />;
      case "shield":
        return <ShieldCheck className={className} />;
      case "layout":
        return <LayoutTemplate className={className} />;
      case "more":
        return <MoreHorizontal className={className} />;
      default:
        return <Folder className={className} />;
    }
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-none pb-0.5">
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3 min-w-[620px] xl:min-w-0">
        {RESOURCE_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const displayCount = categoryCounts[cat.id] ?? cat.count;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer group shadow-2xs ${
                isSelected
                  ? "bg-[#E8F6EF] dark:bg-[#073227] border-2 border-[#159B72] dark:border-[#20D39B] shadow-xs"
                  : "bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/50 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#D7EFE4] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B]"
                    : "bg-[#F1F8F5] dark:bg-[#082A24] text-[#658278] dark:text-[#789991] group-hover:bg-[#E8F6EF] dark:group-hover:bg-[#0F4A3B]/60"
                }`}
              >
                {renderIcon(cat.icon, isSelected)}
              </div>

              {/* Text & Count */}
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-[11.5px] font-bold truncate leading-tight transition-colors ${
                    isSelected
                      ? "text-[#0B3024] dark:text-[#F1FAF6]"
                      : "text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B]"
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`text-[11px] font-semibold mt-0.5 transition-colors ${
                    isSelected
                      ? "text-[#159B72] dark:text-[#20D39B]"
                      : "text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {displayCount}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
