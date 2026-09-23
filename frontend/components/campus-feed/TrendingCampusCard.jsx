"use client";

import Image from "next/image";
import { TrendingUp, ArrowRight } from "lucide-react";
import { TRENDING_ITEMS } from "./feedData";

export default function TrendingCampusCard({ onSelectTrending }) {
  // Category badge styling helper
  const getBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case "event":
        return "bg-purple-100/70 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-500/20";
      case "placement":
        return "bg-blue-100/70 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-500/20";
      case "academic":
        return "bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-500/20";
      case "sports":
        return "bg-orange-100/70 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 border-orange-500/20";
      default:
        return "bg-amber-100/70 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-500/20";
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 sm:p-4.5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Trending on Campus
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onSelectTrending && onSelectTrending("All Posts")}
          className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Ranked Items List */}
      <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F] mt-1">
        {TRENDING_ITEMS.map((item) => (
          <div
            key={item.rank}
            onClick={() => onSelectTrending && onSelectTrending(item.filterType, item.searchKey)}
            className="py-2.5 flex items-center gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#031A16] px-1.5 -mx-1.5 rounded-xl transition-all cursor-pointer group"
          >
            {/* Rank Number */}
            <span
              className={`w-5 text-center text-xs font-bold ${
                item.rank === 1
                  ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                  : item.rank === 2
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : item.rank === 3
                  ? "text-amber-600 dark:text-amber-400 font-bold"
                  : "text-[#658278] dark:text-[#789991]"
              }`}
            >
              {item.rank}
            </span>

            {/* Thumbnail */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D]">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-1.5 text-[10px] text-[#658278] dark:text-[#789991] mt-0.5">
                <span>{item.views}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>

            {/* Category Badge */}
            <span
              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${getBadgeClass(
                item.category
              )}`}
            >
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
