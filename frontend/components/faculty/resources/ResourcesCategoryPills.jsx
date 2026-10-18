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
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-3 min-w-max">
        {RESOURCE_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500/70 dark:border-emerald-500/60 shadow-xs ring-1 ring-emerald-500/30"
                  : "bg-white dark:bg-card-bg border-border-light dark:border-border-dark hover:border-emerald-500/40 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-gray-50 dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40"
                }`}
              >
                {renderIcon(cat.icon, isSelected)}
              </div>

              {/* Text & Count */}
              <div className="flex flex-col">
                <span
                  className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                    isSelected
                      ? "text-emerald-900 dark:text-emerald-200"
                      : "text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`text-[11px] font-medium transition-colors ${
                    isSelected
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-text-secondary dark:text-text-secondary-dark"
                  }`}
                >
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
