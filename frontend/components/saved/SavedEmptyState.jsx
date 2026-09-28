"use client";

import Link from "next/link";
import {
  Bookmark,
  Search,
  LayoutGrid,
  Briefcase,
  Calendar,
  Bell,
  ClipboardCheck,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  Folder,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function SavedEmptyState({
  activeCategory = "all",
  activeCollection = null,
  collections = [],
  searchQuery = "",
  onClearSearch,
  onSelectCategory,
  onResetFilters,
}) {
  // If search query is active
  if (searchQuery) {
    return (
      <div className="py-12 px-4 text-center rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center text-[#658278] dark:text-[#789991] mx-auto mb-3">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No saved items match "{searchQuery}"
        </h3>
        <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 max-w-sm mx-auto">
          Try refining your search keyword or clearing filters to view all your saved items.
        </p>
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] border border-emerald-300 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Search</span>
        </button>
      </div>
    );
  }

  // If specific collection filter is active
  if (activeCollection) {
    const col = collections.find((c) => c.id === activeCollection);
    return (
      <div className="py-12 px-4 text-center rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#159B72] dark:text-[#20D39B] mx-auto mb-3">
          <Folder className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No saved items in "{col ? col.name : "Collection"}"
        </h3>
        <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 max-w-sm mx-auto">
          Add items to this collection by clicking "Add to folder" on any saved item card.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          <span>View All Saved Items</span>
        </button>
      </div>
    );
  }

  // Category-specific empty states
  const getCategoryConfig = () => {
    switch (activeCategory) {
      case "projects":
        return {
          icon: LayoutGrid,
          title: "No saved projects",
          desc: "Bookmark student projects to review architecture, live demos, or collaborate with authors.",
          ctaLabel: "Explore Projects →",
          ctaHref: "/student/projects",
        };
      case "opportunities":
        return {
          icon: Briefcase,
          title: "No saved opportunities",
          desc: "Save internships, hackathons, and placement drives to track deadlines and requirements.",
          ctaLabel: "Explore Opportunities →",
          ctaHref: "/student/internships",
        };
      case "events":
        return {
          icon: Calendar,
          title: "No saved events",
          desc: "Save workshops, guest lectures, and symposiums to keep them on your radar.",
          ctaLabel: "Browse Events →",
          ctaHref: "/student/events",
        };
      case "notices":
        return {
          icon: Bell,
          title: "No saved notices",
          desc: "Bookmark important college circulars, schedules, and circulars to read offline or later.",
          ctaLabel: "Browse Notices →",
          ctaHref: "/student/notices",
        };
      case "assignments":
        return {
          icon: ClipboardCheck,
          title: "No saved assignments",
          desc: "Save upcoming coursework or assignment specifications to revisit before deadlines.",
          ctaLabel: "View Assignments →",
          ctaHref: "/student/assignments",
        };
      case "feed":
        return {
          icon: MessageSquare,
          title: "No saved discussions",
          desc: "Save helpful peer discussions, advice threads, and campus tips from the Campus Feed.",
          ctaLabel: "Explore Campus Feed →",
          ctaHref: "/student/feed",
        };
      case "communities":
        return {
          icon: ShieldCheck,
          title: "No saved communities",
          desc: "Save student clubs and departmental chapters you are interested in following.",
          ctaLabel: "Explore Communities →",
          ctaHref: "/student/feed",
        };
      case "courses":
        return {
          icon: BookOpen,
          title: "No saved courses",
          desc: "Bookmark academic syllabus and subject hubs for fast reference during study sessions.",
          ctaLabel: "Explore Academics →",
          ctaHref: "/student/academics",
        };
      case "all":
      default:
        return {
          icon: Bookmark,
          title: "Nothing saved yet",
          desc: "Keep projects, opportunities, events, notices, and campus content you want to revisit.",
          ctaLabel: "Explore College OS →",
          ctaHref: "/student/search",
        };
    }
  };

  const config = getCategoryConfig();
  const Icon = config.icon;

  return (
    <div className="py-14 px-4 text-center rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#159B72] dark:text-[#20D39B] mx-auto mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
        {config.title}
      </h3>
      <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 max-w-sm mx-auto leading-relaxed">
        {config.desc}
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Link
          href={config.ctaHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
        >
          <span>{config.ctaLabel}</span>
        </Link>
      </div>
    </div>
  );
}
