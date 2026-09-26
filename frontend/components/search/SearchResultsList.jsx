"use client";

import { ArrowRight, User, LayoutGrid, Briefcase, Calendar, Bell, FileText, BookOpen, MessageSquare, ShieldCheck } from "lucide-react";
import SearchResultCard from "./SearchResultCard";

export default function SearchResultsList({
  activeCategory,
  resultsByCategory = {},
  paginatedResults = [],
  onSelectCategory,
  query,
}) {
  const getCategoryMeta = (catId) => {
    switch (catId) {
      case "students":
        return { label: "Students & Builders", icon: User };
      case "projects":
        return { label: "Campus Projects", icon: LayoutGrid };
      case "opportunities":
        return { label: "Internships & Hackathons", icon: Briefcase };
      case "events":
        return { label: "Events & Workshops", icon: Calendar };
      case "notices":
        return { label: "Notices & Circulars", icon: Bell };
      case "assignments":
        return { label: "Academic Assignments", icon: FileText };
      case "courses":
        return { label: "Curriculum Courses", icon: BookOpen };
      case "feed":
        return { label: "Campus Feed Discussions", icon: MessageSquare };
      case "lost-found":
        return { label: "Lost & Found Items", icon: ShieldCheck };
      default:
        return { label: "Results", icon: FileText };
    }
  };

  // 1. Grouped View when in 'all' tab
  if (activeCategory === "all") {
    const categoryKeysWithResults = Object.keys(resultsByCategory).filter(
      (key) => resultsByCategory[key] && resultsByCategory[key].length > 0
    );

    if (categoryKeysWithResults.length === 0) {
      return null;
    }

    return (
      <div className="space-y-6">
        {categoryKeysWithResults.map((catKey) => {
          const items = resultsByCategory[catKey] || [];
          const topItems = items.slice(0, 3);
          const { label, icon: Icon } = getCategoryMeta(catKey);

          return (
            <div
              key={catKey}
              className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#F1F8F5] dark:bg-[#06241F] text-emerald-800 dark:text-emerald-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                    {label}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                    {items.length}
                  </span>
                </div>

                {items.length > 3 && (
                  <button
                    type="button"
                    onClick={() => onSelectCategory(catKey)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer group"
                  >
                    <span>View All {items.length}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>

              {/* Cards for this group */}
              <div className="space-y-2.5">
                {topItems.map((item) => (
                  <SearchResultCard key={item.id} item={item} query={query} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // 2. Specific Category View: Renders paginated results directly
  return (
    <div className="space-y-3">
      {paginatedResults.map((item) => (
        <SearchResultCard key={item.id} item={item} query={query} />
      ))}
    </div>
  );
}
