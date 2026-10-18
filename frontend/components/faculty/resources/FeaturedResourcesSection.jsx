"use client";

import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  FileText,
  Code2,
  Download,
} from "lucide-react";
import { FEATURED_RESOURCES } from "./facultyResourcesData";

export default function FeaturedResourcesSection({
  onSelectResource,
  onDownloadResource,
  onViewAll,
}) {
  const [showAll, setShowAll] = useState(false);

  const displayedResources = showAll ? FEATURED_RESOURCES : FEATURED_RESOURCES.slice(0, 4);

  const getFormatBadgeStyle = (formatColor) => {
    switch (formatColor) {
      case "red":
        return "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300";
      case "blue":
        return "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300";
      case "green":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "purple":
        return "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300";
      default:
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300";
    }
  };

  const getTopIcon = (item) => {
    if (item.iconType === "code") {
      return (
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#159B72] dark:text-[#20D39B]">
          <Code2 className="w-4 h-4 stroke-[2]" />
        </div>
      );
    }

    let colorClass = "text-rose-400 dark:text-rose-300";
    if (item.formatColor === "blue") colorClass = "text-sky-400 dark:text-sky-300";
    if (item.formatColor === "purple") colorClass = "text-purple-400 dark:text-purple-300";
    if (item.formatColor === "green") colorClass = "text-emerald-400 dark:text-emerald-300";

    return (
      <div className={`shrink-0 ${colorClass}`}>
        <FileText className="w-5 h-5 stroke-[1.75]" />
      </div>
    );
  };

  const handleToggleViewAll = () => {
    setShowAll((prev) => !prev);
    if (onViewAll) onViewAll();
  };

  return (
    <div className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] fill-[#159B72]/20" />
          <div>
            <h2 className="text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Featured Resources
            </h2>
            <p className="text-[11.5px] text-[#658278] dark:text-[#789991]">
              Most accessed and important resources for your academics
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#18B887] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>{showAll ? "Show Top 4" : "View All"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Cards Grid with soft borders matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedResources.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectResource(item)}
            className="group bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/60 dark:hover:border-[#20D39B]/50 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            {/* Top Row: Format Badge + Top Right Icon */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase ${getFormatBadgeStyle(
                  item.formatColor
                )}`}
              >
                {item.format}
              </span>

              {getTopIcon(item)}
            </div>

            {/* Middle: Title, Subtitle & Tags */}
            <div className="space-y-1 mb-4 flex-1">
              <h3 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991] leading-snug">
                {item.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-[#F1F8F5] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2]/50 dark:border-[#16463D]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: File Format + Size & Download Icon */}
            <div className="flex items-center justify-between pt-2.5 border-t border-[#E8F1ED] dark:border-[#10372F] text-xs text-[#658278] dark:text-[#789991]">
              <span className="flex items-center gap-1 font-semibold text-[11px]">
                <FileText className="w-3.5 h-3.5" />
                {item.format} • {item.size}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadResource(item);
                }}
                title="Download resource"
                className="w-7 h-7 rounded-full bg-[#EBF6F1] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] hover:bg-[#159B72] hover:text-white dark:hover:bg-[#20D39B] dark:hover:text-[#021512] transition-all flex items-center justify-center cursor-pointer shadow-2xs group-hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
