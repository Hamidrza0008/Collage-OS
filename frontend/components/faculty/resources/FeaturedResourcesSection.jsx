"use client";

import React from "react";
import {
  Star,
  ArrowRight,
  FileText,
  Code2,
  Download,
  CheckCircle2,
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
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/60";
      case "blue":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/60";
      case "green":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60";
      case "purple":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/60";
      default:
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60";
    }
  };

  const getTopIconStyle = (formatColor) => {
    switch (formatColor) {
      case "red":
        return "text-rose-500 bg-rose-50/70 dark:bg-rose-950/30 border-rose-200/50";
      case "blue":
        return "text-blue-500 bg-blue-50/70 dark:bg-blue-950/30 border-blue-200/50";
      case "green":
        return "text-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/50";
      case "purple":
        return "text-purple-500 bg-purple-50/70 dark:bg-purple-950/30 border-purple-200/50";
      default:
        return "text-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/50";
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

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_RESOURCES.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectResource(item)}
            className="group bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-4 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            {/* Top Row: Format Badge + Outline Icon */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wider uppercase ${getFormatBadgeStyle(
                  item.formatColor
                )}`}
              >
                {item.format}
              </span>

              <div
                className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${getTopIconStyle(
                  item.formatColor
                )}`}
              >
                {item.iconType === "code" ? (
                  <Code2 className="w-4 h-4" />
                ) : (
                  <FileText className="w-4 h-4" />
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
                    className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: File Format + Size & Download Icon */}
            <div className="flex items-center justify-between pt-2 border-t border-border-light/60 dark:border-border-dark/60 text-xs text-text-secondary dark:text-text-secondary-dark">
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
                className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-all flex items-center justify-center cursor-pointer shadow-2xs group-hover:scale-105"
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
