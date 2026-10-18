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
}) {
  const renderIcon = (iconName, isSelected) => {
    const className = `w-4 h-4 ${
      isSelected
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-text-secondary dark:text-text-secondary-dark group-hover:text-emerald-600"
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
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
        {RESOURCE_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer group shadow-2xs ${
                isSelected
                  ? "bg-white dark:bg-card-bg border-2 border-emerald-500 shadow-xs"
                  : "bg-white dark:bg-card-bg border border-gray-200/70 dark:border-gray-800/80 hover:border-emerald-400/60"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                    : "bg-gray-50 dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40"
                }`}
              >
                {renderIcon(cat.icon, isSelected)}
              </div>

              {/* Text & Count */}
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-[11.5px] font-bold truncate leading-tight transition-colors ${
                    isSelected
                      ? "text-emerald-900 dark:text-emerald-200"
                      : "text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                  }`}
                >
                  {cat.label}
                </span>
                <span className="text-[11px] font-medium text-text-secondary dark:text-text-secondary-dark mt-0.5">
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
