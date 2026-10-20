"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Megaphone,
  FileText,
  Calendar,
  AlertTriangle,
  Briefcase,
  Search,
  Filter,
  Clock,
  Users,
  Tag,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  Pin,
  Trash2,
  Edit3,
} from "lucide-react";

export default function NoticesListSection({
  notices,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
  onSelectNotice,
  onEditNotice,
  onDeleteNotice,
  onTogglePinNotice,
  allCount,
  noticesCount,
  announcementsCount,
  onOpenMobileFilter,
  onCopyNoticeLink,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close overflow menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pagination calculations (6 items per page matching screenshot)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(notices.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + itemsPerPage);

  const getBadgeStyle = (badgeColor) => {
    switch (badgeColor) {
      case "emerald":
        return "bg-[#E8F7F0] text-[#159B72] border border-[#D5EFE4]";
      case "blue":
        return "bg-[#EDF5FF] text-[#2563EB] border border-[#D8E7FD]";
      case "amber":
        return "bg-[#FFF8EE] text-[#D97706] border border-[#FDEACF]";
      case "red":
        return "bg-[#FFF0F0] text-[#DC2626] border border-[#FCD4D4]";
      case "purple":
        return "bg-[#F8F1FE] text-[#7C3AED] border border-[#EEDDFD]";
      default:
        return "bg-[#E8F7F0] text-[#159B72] border border-[#D5EFE4]";
    }
  };

  const getIconContainerStyle = (badgeColor) => {
    switch (badgeColor) {
      case "emerald":
        return "bg-[#E8F7F0] text-[#159B72]";
      case "blue":
        return "bg-[#EDF5FF] text-[#2563EB]";
      case "amber":
        return "bg-[#FFF8EE] text-[#D97706]";
      case "red":
        return "bg-[#FFF0F0] text-[#DC2626]";
      case "purple":
        return "bg-[#F8F1FE] text-[#7C3AED]";
      default:
        return "bg-[#E8F7F0] text-[#159B72]";
    }
  };

  const renderIcon = (iconType) => {
    const className = "w-5 h-5";
    switch (iconType) {
      case "megaphone":
        return <Megaphone className={className} />;
      case "document":
        return <FileText className={className} />;
      case "calendar":
        return <Calendar className={className} />;
      case "alert":
        return <AlertTriangle className={className} />;
      case "briefcase":
        return <Briefcase className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header Toolbar: Tabs + Search + Filter Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E5ECE8] dark:border-[#10372F] pb-3">
        {/* Left Category Tabs matching screenshot */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          {/* Tab: All */}
          <button
            onClick={() => onTabChange("all")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "all"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <span>All</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "all"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {allCount}
            </span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Tab: Notices */}
          <button
            onClick={() => onTabChange("notices")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "notices"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <span>Notices</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "notices"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {noticesCount}
            </span>
            {activeTab === "notices" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>

          {/* Tab: Announcements */}
          <button
            onClick={() => onTabChange("announcements")}
            className={`flex items-center gap-2 pb-2 text-[14px] transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "announcements"
                ? "text-[#159B72] font-semibold"
                : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] font-medium"
            }`}
          >
            <span>Announcements</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                activeTab === "announcements"
                  ? "bg-[#E8F7F0] dark:bg-[#073629] text-[#159B72] font-semibold"
                  : "bg-gray-100 dark:bg-[#082A24] text-[#658278] dark:text-[#789991] font-normal"
              }`}
            >
              {announcementsCount}
            </span>
            {activeTab === "announcements" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#159B72] rounded-full" />
            )}
          </button>
        </div>

        {/* Right Search Input & Filter button */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="w-4 h-4 text-[#658278] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notices and announcements..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-[13px] rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 focus:outline-none focus:border-[#159B72] transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={onOpenMobileFilter}
            title="Filter options"
            className="p-2 rounded-xl border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#658278] hover:text-[#159B72] hover:border-[#159B72] transition-colors cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. List of Notice & Announcement Cards */}
      <div className="space-y-3">
        {currentNotices.length === 0 ? (
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F7F0] text-[#159B72] flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              No notices or announcements found
            </h3>
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or filter criteria.
            </p>
          </div>
        ) : (
          currentNotices.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotice(item)}
              className="group relative bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] hover:border-[#159B72]/50 transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              {/* Left Column: Icon + Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Round Category Icon */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getIconContainerStyle(
                    item.badgeColor
                  )}`}
                >
                  {renderIcon(item.iconType)}
                </div>

                {/* Details */}
                <div className="space-y-1 flex-1 min-w-0">
                  {/* Badge */}
                  <div>
                    <span
                      className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getBadgeStyle(
                        item.badgeColor
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-[#658278] dark:text-[#789991] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Target Audience & Category Metadata */}
                  <div className="flex items-center flex-wrap gap-2 pt-1 text-xs text-[#658278] dark:text-[#789991]">
                    <span className="flex items-center gap-1.5 font-normal">
                      <Users className="w-3.5 h-3.5 text-[#658278]" />
                      {item.targetAudience}
                    </span>
                    <span className="text-[#D8E8E2] dark:text-[#16463D]">•</span>
                    <span className="flex items-center gap-1.5 font-normal">
                      <Tag className="w-3.5 h-3.5 text-[#658278]" />
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Date, Time, Active Status & More Menu */}
              <div className="shrink-0 flex sm:items-start items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5ECE8] dark:border-[#10372F]">
                {/* Date & Time Column */}
                <div className="flex flex-col sm:items-end items-start text-right">
                  <span className="flex items-center gap-1 text-xs text-[#658278] dark:text-[#789991] font-normal">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#658278]/80 dark:text-[#789991]/80 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[11.5px] font-medium px-2.5 py-0.5 rounded-full ${
                    item.status === "Active"
                      ? "bg-[#E8F7F0] text-[#159B72] border border-[#D5EFE4]"
                      : "bg-gray-100 text-gray-600 dark:bg-[#082A24] dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {item.status}
                </span>

                {/* 3-dots Menu Button */}
                <div className="relative" ref={activeMenuId === item.id ? menuRef : null}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === item.id ? null : item.id);
                    }}
                    className="p-1 rounded-lg text-[#94A3B8] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Popover dropdown */}
                  {activeMenuId === item.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-[#06241F] rounded-xl border border-[#E5ECE8] dark:border-[#10372F] shadow-xl py-1.5 z-30 animate-in fade-in-50 zoom-in-95 duration-150"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onSelectNotice(item);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#159B72] flex items-center gap-2.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#159B72]" />
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onEditNotice(item);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#159B72] flex items-center gap-2.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                        Edit Demo Record
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onCopyNoticeLink(item);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#159B72] flex items-center gap-2.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#658278]" />
                        Copy Link
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onTogglePinNotice(item.id);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#159B72] flex items-center gap-2.5 cursor-pointer"
                      >
                        <Pin className="w-3.5 h-3.5 text-amber-500" />
                        {item.pinned ? "Unpin Notice" : "Pin to Top"}
                      </button>

                      <div className="my-1 border-t border-[#E5ECE8] dark:border-[#10372F]" />

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onDeleteNotice(item);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Record
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3. Pagination Footer matching Image 2 */}
      {notices.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-[#658278] dark:text-[#789991]">
          <div>
            Showing{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {startIndex + 1}–{Math.min(startIndex + itemsPerPage, notices.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {notices.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-center text-[#658278] hover:text-[#0B3024] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] text-[#658278] dark:text-[#789991] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024]"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-[#E5ECE8] dark:border-[#10372F] bg-white dark:bg-[#06241F] flex items-center justify-center text-[#658278] hover:text-[#0B3024] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
