"use client";

import React from "react";
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
  const getFormatBadgeStyle = (formatColor) => {
    switch (formatColor) {
      case "red":
        return "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300";
      case "blue":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300";
      case "green":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "purple":
        return "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300";
      default:
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300";
    }
  };

  const getTopIconColor = (formatColor) => {
    switch (formatColor) {
      case "red":
        return "text-rose-400 dark:text-rose-300";
      case "blue":
        return "text-blue-400 dark:text-blue-300";
      case "green":
        return "text-emerald-500 dark:text-emerald-400";
      case "purple":
        return "text-purple-400 dark:text-purple-300";
      default:
        return "text-emerald-500 dark:text-emerald-400";
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
          <div>
            <h2 className="text-[15px] font-bold text-text-primary dark:text-text-primary-dark">
              Featured Resources
            </h2>
            <p className="text-[11.5px] text-text-secondary dark:text-text-secondary-dark">
              Most accessed and important resources for your academics
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Cards Grid with clean soft borders matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_RESOURCES.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectResource(item)}
            className="group bg-white dark:bg-card-bg rounded-2xl border border-gray-200/70 dark:border-gray-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            {/* Top Row: Format Badge + Bare Outline Icon (No boxed container) */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase ${getFormatBadgeStyle(
                  item.formatColor
                )}`}
              >
                {item.format}
              </span>

              {/* Clean Icon without boxed container */}
              <div className={`shrink-0 ${getTopIconColor(item.formatColor)}`}>
                {item.iconType === "code" ? (
                  <Code2 className="w-5 h-5 stroke-[1.75]" />
                ) : (
                  <FileText className="w-5 h-5 stroke-[1.75]" />
                )}
              </div>
            </div>

            {/* Middle: Title, Subtitle & Tags */}
            <div className="space-y-1 mb-4 flex-1">
              <h3 className="text-[14px] font-bold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-snug">
                {item.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[#F4F7F5] dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: File Format + Size & Download Icon */}
            <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-gray-800/60 text-xs text-text-secondary dark:text-text-secondary-dark">
              <span className="flex items-center gap-1 font-medium">
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
                className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-all flex items-center justify-center cursor-pointer shadow-2xs group-hover:scale-105"
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
