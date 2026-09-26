"use client";

import { Clock, X, Trash2, TrendingUp, Sparkles, Lightbulb, Compass } from "lucide-react";
import { POPULAR_SKILLS, POPULAR_CAMPUS_TOPICS, SEARCH_TIPS } from "./globalSearchData";

export default function SearchDiscoveryRail({
  recentSearches = [],
  onSelectSearch,
  onRemoveRecentSearch,
  onClearRecentSearches,
}) {
  return (
    <aside className="w-full space-y-4 lg:sticky lg:top-20">
      {/* 1. Recent Searches (Local persistence) */}
      {recentSearches.length > 0 && (
        <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
                Recent Searches
              </h3>
            </div>

            <button
              type="button"
              onClick={onClearRecentSearches}
              className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Clear all
            </button>
          </div>

          <div className="mt-2.5 space-y-1">
            {recentSearches.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-[#F7FBF9] dark:hover:bg-[#06241F] transition-colors group"
              >
                <button
                  type="button"
                  onClick={() => onSelectSearch(item)}
                  className="flex items-center gap-2 text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] group-hover:text-emerald-800 dark:group-hover:text-emerald-300 truncate cursor-pointer text-left"
                >
                  <Clock className="w-3 h-3 text-[#658278] dark:text-[#789991] shrink-0" />
                  <span className="truncate">{item}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveRecentSearch(item)}
                  className="p-1 rounded-md text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove query"
                  aria-label={`Remove recent search ${item}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Popular Skills & Technologies */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Popular Skills & Tools
          </h3>
        </div>

        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {POPULAR_SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => onSelectSearch(skill)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#F7FBF9] dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-400 dark:hover:border-emerald-700 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Trending Campus Topics */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Campus Highlights
          </h3>
        </div>

        <div className="mt-3 space-y-1.5">
          {POPULAR_CAMPUS_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => onSelectSearch(topic)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#06241F] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer group"
            >
              <span className="truncate">{topic}</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Search Tips */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Search Tips
          </h3>
        </div>

        <ul className="mt-2.5 space-y-2 text-xs text-[#5C786E] dark:text-[#8AA89F]">
          {SEARCH_TIPS.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
