"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Clock,
  ArrowRight,
  Download,
  MoreHorizontal,
  Share2,
  Trash2,
  Copy,
  Info,
} from "lucide-react";

export default function RecentUploadsTable({
  uploads,
  onSelectResource,
  onDownloadResource,
  onShareResource,
  onDeleteResource,
  onViewAll,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const getFormatBadge = (format, formatColor) => {
    switch (formatColor) {
      case "red":
        return "bg-[#F43F5E] text-white";
      case "blue":
        return "bg-[#2563EB] text-white";
      case "purple":
        return "bg-[#8B5CF6] text-white";
      case "green":
        return "bg-[#10B981] text-white";
      default:
        return "bg-[#159B72] text-white";
    }
  };

  const getTagStyle = (color) => {
    switch (color) {
      case "blue":
        return "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/40";
      case "teal":
        return "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/40";
      case "amber":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40";
      case "green":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40";
      case "purple":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40";
      default:
        return "bg-[#F1F8F5] text-[#36594C] dark:bg-[#082A24] dark:text-[#B5CCC5] border-[#D8E8E2]/60 dark:border-[#16463D]";
    }
  };

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <div>
            <h2 className="text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Recent Uploads
            </h2>
            <p className="text-[11.5px] text-[#658278] dark:text-[#789991]">
              Latest resources added by faculty
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#18B887] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Uploads List */}
      <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F]">
        {uploads.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              No resources found
            </p>
            <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm mx-auto">
              No academic resources match your active search or filters. Try adjusting your search keyword or clearing the semester filter.
            </p>
            <button
              type="button"
              onClick={onViewAll}
              className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E8F6EF] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] text-xs font-semibold hover:bg-[#159B72] hover:text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          uploads.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResource(item)}
              className="py-3 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 px-2 -mx-2 rounded-xl transition-colors cursor-pointer"
            >
              {/* Left Column: Format Square Badge + Title & Tags */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                {/* Format Square Badge matching screenshot */}
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
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                    {item.title}
                  </h4>

                  <div className="flex items-center flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getTagStyle(
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
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E8F1ED] dark:border-[#10372F]/50">
                {/* Faculty Author + Relative Time */}
                <div className="flex items-center gap-2 text-left">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] shrink-0">
                    <Image
                      src={
                        typeof item.author === "string"
                          ? "/assets/profile/dr-arjun-mehta.jpg"
                          : item.author?.avatar || "/assets/profile/dr-arjun-mehta.jpg"
                      }
                      alt={typeof item.author === "string" ? item.author : item.author?.name || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate max-w-[120px] sm:max-w-[140px]">
                      {typeof item.author === "string" ? item.author : item.author?.name || "Dr. Arjun Mehta"}
                    </span>
                    <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                      {item.uploadedTime}
                    </span>
                  </div>
                </div>

                {/* File Size */}
                <div className="text-xs font-semibold text-[#658278] dark:text-[#789991] min-w-[50px] text-right">
                  {item.size}
                </div>

                {/* Download Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadResource(item);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#159B72] hover:bg-[#118360] dark:bg-[#18B887] dark:hover:bg-[#0F8F6B] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
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
                    className="p-1 rounded-md text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
                    title="More actions"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {activeMenuId === item.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-[#06241F] rounded-xl border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1.5 z-30"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onSelectResource(item);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#E8F6EF] dark:hover:bg-[#0F4A3B]/40 flex items-center gap-2 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-[#159B72]" />
                        Resource Details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          if (typeof window !== "undefined") {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/faculty/resources#${item.id}`
                            );
                          }
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#E8F6EF] dark:hover:bg-[#0F4A3B]/40 flex items-center gap-2 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#658278]" />
                        Copy Reference Link
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          if (onShareResource) onShareResource(item);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#E8F6EF] dark:hover:bg-[#0F4A3B]/40 flex items-center gap-2 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
                        Share with Class
                      </button>
                      {onDeleteResource && item.id.startsWith("rec-user-") && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onDeleteResource(item.id);
                          }}
                          className="w-full px-3 py-1.5 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer border-t border-[#E8F1ED] dark:border-[#10372F] mt-1 pt-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Demo Record
                        </button>
                      )}
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
