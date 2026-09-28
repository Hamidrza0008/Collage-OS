"use client";

import Link from "next/link";
import {
  Bookmark,
  FolderHeart,
  Clock,
  ExternalLink,
  Plus,
  Compass,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  LayoutGrid,
  Briefcase,
  Calendar,
  MessageSquare,
  Search,
} from "lucide-react";

export default function SavedRightSidebar({
  totalSaved = 0,
  recentlySaved = [],
  collections = [],
  collectionCounts = {},
  selectedCollection = "all",
  onSelectCollection,
  onOpenCollectionsModal,
}) {
  const quickLinks = [
    { label: "Global Search", href: "/student/search", icon: Search },
    { label: "Explore Projects", href: "/student/projects", icon: LayoutGrid },
    { label: "Internships & Drives", href: "/student/internships", icon: Briefcase },
    { label: "Campus Events", href: "/student/events", icon: Calendar },
    { label: "Campus Feed", href: "/student/feed", icon: MessageSquare },
  ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-20">
      {/* 1. Storage & Privacy Overview Card */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B3024] dark:text-[#F1FAF6]">
              Private Bookmark Library
            </h2>
          </div>
          <span className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Encrypted Local
          </span>
        </div>
        <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] leading-relaxed">
          Your saved items, pins, and custom folders are private to your logged-in student account.
        </p>
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 text-[#36594C] dark:text-[#B5CCC5]">
          <span>Saved items total</span>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">{totalSaved}</span>
        </div>
      </div>

      {/* 2. Recently Saved (3-5 items) */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B3024] dark:text-[#F1FAF6]">
              Recently Saved
            </h2>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991]">Last 4 additions</span>
        </div>

        {recentlySaved.length === 0 ? (
          <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] py-2">
            No items bookmarked yet.
          </p>
        ) : (
          <div className="space-y-2">
            {recentlySaved.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group flex items-start justify-between gap-2 p-2 rounded-xl hover:bg-[#F9FCFA] dark:hover:bg-[#072F27] border border-transparent hover:border-[#D8E8E2]/60 dark:hover:border-[#16463D]/60 transition-all"
              >
                <div className="min-w-0 flex-1">
                  {item.isAvailable && item.route ? (
                    <Link
                      href={item.route}
                      className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="block text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
                      {item.title}
                    </span>
                  )}
                  <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                    {item.typeLabel} • {item.savedAtFormatted}
                  </span>
                </div>
                {item.isAvailable && item.route && (
                  <Link
                    href={item.route}
                    className="p-1 rounded text-[#658278] hover:text-emerald-600 transition-colors shrink-0"
                    title="Open destination"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Collections / Folders Filter */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderHeart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B3024] dark:text-[#F1FAF6]">
              Collections
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenCollectionsModal}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Manage</span>
          </button>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCollection("all")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCollection === "all"
                ? "bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-200"
                : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <span>All Folders</span>
            <span className="text-[10px] font-bold opacity-75">{totalSaved}</span>
          </button>

          {collections.map((col) => {
            const count = collectionCounts[col.id] || 0;
            const isSelected = selectedCollection === col.id;

            return (
              <button
                key={col.id}
                type="button"
                onClick={() => onSelectCollection(col.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-200"
                    : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="truncate max-w-[170px]">{col.name}</span>
                <span className="text-[10px] font-bold opacity-75">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Discovery Navigation */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-2.5">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B3024] dark:text-[#F1FAF6]">
            Quick Discovery
          </h2>
        </div>
        <div className="space-y-1">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:text-emerald-600 transition-colors" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. Organization Tip */}
      <div className="p-3.5 rounded-2xl bg-[#E8F5EF] dark:bg-[#07382E] border border-emerald-500/20 text-xs text-[#0B3024] dark:text-[#F1FAF6] space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
          <Lightbulb className="w-4 h-4 shrink-0" />
          <span>Productivity Tip</span>
        </div>
        <p className="text-[11.5px] text-[#36594C] dark:text-[#A4C4BA] leading-normal">
          Click the pin icon on top of any card to keep priority hackathons and projects docked at the top of your workspace.
        </p>
      </div>
    </aside>
  );
}
