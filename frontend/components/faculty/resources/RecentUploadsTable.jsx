"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Clock,
  ArrowRight,
  Download,
  MoreHorizontal,
  ExternalLink,
  Share2,
  Trash2,
  Copy,
  Info,
} from "lucide-react";

export default function RecentUploadsTable({
  uploads,
  onSelectResource,
  onDownloadResource,
  onViewAll,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const getFormatBadge = (format, formatColor) => {
    switch (formatColor) {
      case "red":
        return "bg-rose-500 text-white";
      case "blue":
        return "bg-blue-600 text-white";
      case "purple":
        return "bg-purple-600 text-white";
      case "green":
        return "bg-emerald-600 text-white";
      default:
        return "bg-emerald-600 text-white";
    }
  };

  const getTagStyle = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/60";
      case "teal":
        return "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200/60";
      case "amber":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/60";
      case "green":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60";
      case "purple":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/60";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-surface-dark dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="bg-white dark:bg-card-bg rounded-2xl border border-gray-200/70 dark:border-gray-800/80 p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h2 className="text-[15px] font-bold text-text-primary dark:text-text-primary-dark">
              Recent Uploads
            </h2>
            <p className="text-[11.5px] text-text-secondary dark:text-text-secondary-dark">
              Latest resources added by faculty
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

      {/* Uploads List */}
      <div className="divide-y divide-border-light/70 dark:divide-border-dark/70">
        {uploads.length === 0 ? (
          <div className="py-8 text-center text-xs text-text-secondary dark:text-text-secondary-dark">
            No resources match the selected criteria.
          </div>
        ) : (
          uploads.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResource(item)}
              className="py-3 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:bg-gray-50/70 dark:hover:bg-surface-dark/40 px-2 -mx-2 rounded-xl transition-colors cursor-pointer"
            >
              {/* Left Column: Format Square Badge + Title & Tags */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                {/* Format Square Badge */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[11px] tracking-wide shrink-0 shadow-2xs ${getFormatBadge(
                    item.format,
                    item.formatColor
                  )}`}
                >
                  {item.format}
                </div>

                {/* Title & Tags */}
                <div className="space-y-1 min-w-0">
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {item.title}
                  </h4>

                  <div className="flex items-center flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${getTagStyle(
                          tag.color
                        )}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Faculty Info, File Size, Download & Menu */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-light/40 dark:border-border-dark/40">
                {/* Faculty Author + Time */}
                <div className="flex items-center gap-2 text-left">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border-light dark:border-border-dark shrink-0">
                    <Image
                      src={item.author.avatar || "/assets/profile/dr-arjun-mehta.jpg"}
                      alt={item.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-text-primary dark:text-text-primary-dark truncate max-w-[130px]">
                      {item.author.name}
                    </span>
                    <span className="text-[10.5px] text-text-secondary dark:text-text-secondary-dark">
                      {item.uploadedTime}
                    </span>
                  </div>
                </div>

                {/* File Size */}
                <div className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark min-w-[55px] text-right">
                  {item.size}
                </div>

                {/* Download Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadResource(item);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Download
                </button>

                {/* 3-dots Menu Popover */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === item.id ? null : item.id);
                    }}
                    className="p-1 rounded-md text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {activeMenuId === item.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-card-bg rounded-xl border border-border-light dark:border-border-dark shadow-lg py-1.5 z-30"
                    >
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          onSelectResource(item);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-2"
                      >
                        <Info className="w-3.5 h-3.5" />
                        Details
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          navigator.clipboard.writeText(
                            `${window.location.origin}/faculty/resources#${item.id}`
                          );
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Link
                      </button>
                      <button
                        onClick={() => setActiveMenuId(null)}
                        className="w-full px-3 py-1.5 text-left text-xs text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-2"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
