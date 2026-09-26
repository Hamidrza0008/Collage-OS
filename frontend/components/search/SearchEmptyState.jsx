"use client";

import {
  Search,
  Users,
  LayoutGrid,
  Briefcase,
  Calendar,
  BookOpen,
  Bell,
  Sparkles,
  ArrowRight,
  FilterX,
  HelpCircle,
} from "lucide-react";
import { QUICK_DISCOVERY_CATEGORIES, POPULAR_SKILLS, POPULAR_CAMPUS_TOPICS } from "./globalSearchData";

export default function SearchEmptyState({
  isInitialState = true,
  query = "",
  onSelectDiscovery,
  onResetFilters,
}) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "LayoutGrid":
        return <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "Calendar":
        return <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "BookOpen":
        return <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      case "Bell":
        return <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  if (!isInitialState) {
    // No Results State
    return (
      <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-8 text-center space-y-4 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800/80 flex items-center justify-center mx-auto text-[#5C786E] dark:text-[#8AA89F]">
          <FilterX className="w-6 h-6" />
        </div>

        <div className="space-y-1 max-w-md mx-auto">
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            No results found for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
            We couldn&apos;t find any public students, projects, courses, or events matching your criteria.
          </p>
        </div>

        {/* Suggestion Points */}
        <div className="p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] max-w-md mx-auto text-left text-xs space-y-1.5 text-[#5C786E] dark:text-[#8AA89F]">
          <div className="flex items-center gap-1.5 font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Search suggestions:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            <li>Check for spelling mistakes or try shorter keyword phrases.</li>
            <li>Search by general technology names like &apos;React&apos;, &apos;Python&apos;, or &apos;DSA&apos;.</li>
            <li>Try searching by course code prefix such as &apos;CSE&apos; or &apos;MAT&apos;.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F1F8F5] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-50 dark:hover:bg-[#082A24] cursor-pointer"
          >
            Clear Search & Filters
          </button>
        </div>
      </div>
    );
  }

  // Initial State: Start Exploring
  return (
    <div className="space-y-6">
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-colors">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Explore College OS Discovery Hub
          </h2>
        </div>

        {/* Grid of Quick Discovery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_DISCOVERY_CATEGORIES.map((cat) => (
            <button
              key={cat.type}
              type="button"
              onClick={() => onSelectDiscovery(cat.query, cat.type)}
              className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-400 dark:hover:border-emerald-700/80 hover:bg-white dark:hover:bg-[#082A24] transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="p-2 w-fit rounded-lg bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                <span>Browse {cat.title.split(" ")[0]}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Search Chips */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 transition-colors">
        <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-2.5">
          Trending Campus Keywords & Skills
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          {POPULAR_SKILLS.concat(POPULAR_CAMPUS_TOPICS.slice(0, 4)).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelectDiscovery(item, "all")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-400 dark:hover:border-emerald-700 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50/50 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
