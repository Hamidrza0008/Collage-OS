"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Megaphone,
  FileText,
  Users,
  Calendar,
  Info,
  Building2,
  Paperclip,
  Pin,
  MoreVertical,
  Eye,
  Download,
  CheckCircle,
  Share2,
} from "lucide-react";

export default function NoticeCard({
  notice,
  onViewDetails,
  onDownloadAttachments,
  onMarkAsRead,
  onShare,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Category Icon & Styling
  const getCategoryIcon = (categoryType) => {
    switch (categoryType) {
      case "important":
        return (
          <div className="w-11 h-11 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-900/40 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
            <Megaphone className="w-5 h-5 transform -rotate-12" />
          </div>
        );
      case "exam":
        return (
          <div className="w-11 h-11 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-900/40 flex items-center justify-center shrink-0 text-blue-700 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
        );
      case "placement":
        return (
          <div className="w-11 h-11 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200/70 dark:border-purple-900/40 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-400">
            <Users className="w-5 h-5" />
          </div>
        );
      case "event":
        return (
          <div className="w-11 h-11 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200/70 dark:border-amber-900/40 flex items-center justify-center shrink-0 text-amber-700 dark:text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
        );
      case "general":
        return (
          <div className="w-11 h-11 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200/70 dark:border-rose-900/40 flex items-center justify-center shrink-0 text-rose-700 dark:text-rose-400">
            <FileText className="w-5 h-5" />
          </div>
        );
      case "information":
      default:
        return (
          <div className="w-11 h-11 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200/70 dark:border-sky-900/40 flex items-center justify-center shrink-0 text-sky-700 dark:text-sky-400">
            <Info className="w-5 h-5" />
          </div>
        );
    }
  };

  // Category Pill Badge
  const getCategoryBadge = (category, categoryType) => {
    switch (categoryType) {
      case "important":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
            {category}
          </span>
        );
      case "exam":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40">
            {category}
          </span>
        );
      case "placement":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-900/40">
            {category}
          </span>
        );
      case "event":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
            {category}
          </span>
        );
      case "general":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40">
            {category}
          </span>
        );
      case "information":
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-900/40">
            {category}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 hover:border-emerald-300 dark:hover:border-emerald-800/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer">
      {/* Left Section: Category Icon + Content (Title, Description, Meta) */}
      <div
        className="flex items-start gap-3.5 flex-1 min-w-0"
        onClick={() => onViewDetails(notice)}
      >
        {getCategoryIcon(notice.categoryType)}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/student/notices/${notice.id}`}
              onClick={(e) => e.stopPropagation()}
              className="block hover:underline"
            >
              <h3 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-snug truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                {notice.title}
              </h3>
            </Link>
          </div>

          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] line-clamp-2 mt-1 font-normal leading-relaxed">
            {notice.description}
          </p>

          {/* Meta Info Row */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[11px] text-[#658278] dark:text-[#789991] mt-2.5 font-medium">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{notice.department}</span>
            </div>

            <span>•</span>
            <span>{notice.date}</span>

            {notice.filesCount > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1 text-[#0B3024] dark:text-[#C5DCD4]">
                  <Paperclip className="w-3 h-3 text-gray-400" />
                  <span>
                    {notice.filesCount} {notice.filesCount === 1 ? "file" : "files"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Category Badge + Pin Indicator + 3-Dot Menu */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-[#10372F]">
        {/* Category Pill */}
        <div>{getCategoryBadge(notice.category, notice.categoryType)}</div>

        {/* Pin Icon if Pinned */}
        {notice.pinned && (
          <div
            className="text-emerald-700 dark:text-emerald-400 p-1"
            title="Pinned notice"
          >
            <Pin className="w-3.5 h-3.5 fill-emerald-600/30 transform rotate-45" />
          </div>
        )}

        {/* 3-Dot Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((p) => !p);
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            aria-label="Notice options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
              <Link
                href={`/student/notices/${notice.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>View Notice Page</span>
              </Link>

              {notice.filesCount > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadAttachments(notice);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Files</span>
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notice.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
              >
                <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Mark as Read</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(notice);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
              >
                <Share2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Share Notice</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
