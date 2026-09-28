"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  Folder,
  FolderPlus,
  Sparkles,
  ArrowRight,
  Clock,
  Search,
  LayoutGrid,
  Briefcase,
  Calendar,
  MessageSquare,
  Pin,
  ChevronRight,
} from "lucide-react";

export default function SavedSidebarRail({
  metrics,
  recentItems = [],
  collections = [],
  activeCollection,
  onSelectCollection,
  onOpenManageCollections,
  collectionCounts = {},
  onSelectCategory,
}) {
  return (
    <aside className="lg:sticky lg:top-20 space-y-5">
      {/* 1. Saved Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]/60">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] fill-current" />
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Workspace Overview
            </h3>
          </div>
          <span className="text-xs font-bold text-[#159B72] dark:text-[#20D39B] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            {metrics.total} saved
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <button
            type="button"
            onClick={() => onSelectCategory("projects")}
            className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#041D18] hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-colors cursor-pointer group"
          >
            <span className="text-[#5C786E] dark:text-[#8AA89F] group-hover:text-purple-700 dark:group-hover:text-purple-300">
              Projects
            </span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {metrics.projects}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory("opportunities")}
            className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#041D18] hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors cursor-pointer group"
          >
            <span className="text-[#5C786E] dark:text-[#8AA89F] group-hover:text-blue-700 dark:group-hover:text-blue-300">
              Opportunities
            </span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {metrics.opportunities}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory("events")}
            className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#041D18] hover:bg-amber-50 dark:hover:bg-amber-950/40 text-left transition-colors cursor-pointer group"
          >
            <span className="text-[#5C786E] dark:text-[#8AA89F] group-hover:text-amber-700 dark:group-hover:text-amber-300">
              Events
            </span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {metrics.events}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory("notices")}
            className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#041D18] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left transition-colors cursor-pointer group"
          >
            <span className="text-[#5C786E] dark:text-[#8AA89F] group-hover:text-rose-700 dark:group-hover:text-rose-300">
              Notices
            </span>
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {metrics.notices}
            </span>
          </button>
        </div>

        {metrics.pinned > 0 && (
          <div className="mt-3 pt-2.5 border-t border-[#E8F1ED] dark:border-[#10372F]/60 flex items-center justify-between text-xs text-[#5C786E] dark:text-[#8AA89F]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Pin className="w-3 h-3 text-amber-500 fill-current" />
              Pinned items
            </span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {metrics.pinned}
            </span>
          </div>
        )}
      </div>

      {/* 2. Recently Saved Rail (3–5 items) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]/60">
          <Clock className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Recently Saved
          </h3>
        </div>

        <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F]/50 mt-1">
          {recentItems.length > 0 ? (
            recentItems.slice(0, 4).map((item) => (
              <div key={item.id} className="py-2.5 first:pt-2 last:pb-0">
                {item.isAvailable && item.route ? (
                  <Link
                    href={item.route}
                    className="group block text-left hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                        {item.entityType}
                      </span>
                      <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {item.title}
                    </p>
                    {item.subtitle && (
                      <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </Link>
                ) : (
                  <div className="text-left text-gray-400 dark:text-gray-500">
                    <span className="text-[10px] font-bold uppercase text-gray-400">
                      {item.entityType}
                    </span>
                    <p className="text-xs font-medium truncate mt-0.5">{item.title}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-[#658278] dark:text-[#789991] py-3 text-center">
              No recently saved items.
            </p>
          )}
        </div>
      </div>

      {/* 3. Collections / Folders Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]/60">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Collections
            </h3>
          </div>
          <button
            type="button"
            onClick={onOpenManageCollections}
            className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline cursor-pointer"
          >
            Manage
          </button>
        </div>

        <div className="space-y-1.5 mt-3">
          {/* All Collections Filter */}
          <button
            type="button"
            onClick={() => onSelectCollection(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeCollection === null
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] border border-emerald-300 dark:border-emerald-700/80"
                : "text-[#5C786E] dark:text-[#8AA89F] hover:bg-gray-50 dark:hover:bg-gray-800/60"
            }`}
          >
            <span>All Items</span>
            <span className="text-[11px] opacity-70">{metrics.total}</span>
          </button>

          {/* Collection items */}
          {collections.map((col) => {
            const isSelected = activeCollection === col.id;
            const count = collectionCounts[col.id] || 0;

            return (
              <button
                key={col.id}
                type="button"
                onClick={() => onSelectCollection(col.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] border border-emerald-300 dark:border-emerald-700/80"
                    : "text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                <span className="truncate pr-2">{col.name}</span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991] font-medium shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onOpenManageCollections}
          className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 px-3 border border-dashed border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500 rounded-xl text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>New Collection</span>
        </button>
      </div>

      {/* 4. Quick Discovery Shortcuts */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] mb-2.5">
          Quick Discovery
        </h4>

        <div className="space-y-1 text-xs">
          <Link
            href="/student/search"
            className="flex items-center justify-between p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-semibold">Search College OS</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </Link>

          <Link
            href="/student/projects"
            className="flex items-center justify-between p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
          >
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold">Explore Projects</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </Link>

          <Link
            href="/student/internships"
            className="flex items-center justify-between p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold">Career Opportunities</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </Link>

          <Link
            href="/student/events"
            className="flex items-center justify-between p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">Campus Events</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </Link>

          <Link
            href="/student/feed"
            className="flex items-center justify-between p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="font-semibold">Campus Feed</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </Link>
        </div>
      </div>

      {/* 5. Organization Tip Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:from-[#062923] dark:to-[#041D18] border border-emerald-200 dark:border-emerald-800/80 text-xs">
        <div className="flex items-center gap-2 mb-1.5 text-[#159B72] dark:text-[#20D39B]">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="font-bold">Pro Tip</span>
        </div>
        <p className="text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
          Pin important notices or application deadlines to keep them at the top of your workspace. Use folders to group items by semester or goal.
        </p>
      </div>
    </aside>
  );
}
