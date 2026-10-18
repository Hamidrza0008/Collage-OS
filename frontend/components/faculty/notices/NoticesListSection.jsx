"use client";

import React, { useState } from "react";
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
  allCount,
  noticesCount,
  announcementsCount,
  onToggleMobileFilter,
  showMobileFilterButton,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Pagination calculations (6 items per page matching screenshot)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(notices.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = notices.slice(startIndex, startIndex + itemsPerPage);

  const getBadgeStyle = (badgeColor, type) => {
    switch (badgeColor) {
      case "emerald":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/40";
      case "blue":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/40";
      case "amber":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/40";
      case "red":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/40";
      case "purple":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/40";
      default:
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/40";
    }
  };

  const getIconContainerStyle = (badgeColor) => {
    switch (badgeColor) {
      case "emerald":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40";
      case "blue":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40";
      case "amber":
        return "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40";
      case "red":
        return "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40";
      case "purple":
        return "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/40";
      default:
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40";
    }
  };

  const renderIcon = (iconType, badgeColor) => {
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border-light dark:border-border-dark pb-3">
        {/* Left Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onTabChange("all")}
            className={`flex items-center gap-2 pb-2 text-[13.5px] font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "all"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
            }`}
          >
            All
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : "bg-gray-100 dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
              }`}
            >
              {allCount}
            </span>
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onTabChange("notices")}
            className={`flex items-center gap-2 pb-2 text-[13.5px] font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "notices"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
            }`}
          >
            Notices
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                activeTab === "notices"
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : "bg-gray-100 dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
              }`}
            >
              {noticesCount}
            </span>
            {activeTab === "notices" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onTabChange("announcements")}
            className={`flex items-center gap-2 pb-2 text-[13.5px] font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
              activeTab === "announcements"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
            }`}
          >
            Announcements
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                activeTab === "announcements"
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : "bg-gray-100 dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark"
              }`}
            >
              {announcementsCount}
            </span>
            {activeTab === "announcements" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-600 dark:bg-emerald-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Right Search Input & Filter toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notices and announcements..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-[13px] rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 dark:placeholder:text-text-secondary-dark/60 focus:outline-none focus:ring-1.5 focus:ring-emerald-500 transition-all"
            />
          </div>

          <button
            onClick={onToggleMobileFilter}
            title="Filter options"
            className="p-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-card-bg text-text-secondary dark:text-text-secondary-dark hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. List of Notice Cards */}
      <div className="space-y-3.5">
        {currentNotices.length === 0 ? (
          <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
              No notices or announcements found
            </h3>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or filter criteria to see more campus communications.
            </p>
          </div>
        ) : (
          currentNotices.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotice(item)}
              className="group relative bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:shadow-sm transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4 cursor-pointer"
            >
              {/* Left Column: Icon + Content */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Round Category Icon Container */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${getIconContainerStyle(
                    item.badgeColor
                  )}`}
                >
                  {renderIcon(item.iconType, item.badgeColor)}
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  {/* Badge */}
                  <div>
                    <span
                      className={`inline-block text-[10.5px] font-semibold px-2 py-0.5 rounded-md border tracking-wide uppercase ${getBadgeStyle(
                        item.badgeColor,
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] sm:text-[15.5px] font-bold text-text-primary dark:text-text-primary-dark group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-text-secondary dark:text-text-secondary-dark leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Target Audience & Category Metadata */}
                  <div className="flex items-center flex-wrap gap-2 pt-1 text-xs text-text-secondary dark:text-text-secondary-dark">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-text-secondary/70 dark:text-text-secondary-dark/70" />
                      {item.targetAudience}
                    </span>
                    <span className="text-border-light dark:text-border-dark">•</span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-text-secondary/70 dark:text-text-secondary-dark/70" />
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Date, Time, Status & More Menu */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2.5 sm:gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-light/60 dark:border-border-dark/60">
                {/* Date and Time */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2.5 sm:gap-0.5 text-right text-xs text-text-secondary dark:text-text-secondary-dark">
                  <span className="flex items-center gap-1 font-medium text-text-secondary dark:text-text-secondary-dark">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-text-secondary/80 dark:text-text-secondary-dark/80">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>

                {/* Status Badge + More Button */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      item.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40"
                        : "bg-gray-100 text-gray-600 dark:bg-surface-dark dark:text-gray-400 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* 3-dots Menu Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === item.id ? null : item.id);
                      }}
                      className="p-1 rounded-md text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Popover dropdown */}
                    {activeMenuId === item.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-card-bg rounded-xl border border-border-light dark:border-border-dark shadow-lg py-1.5 z-30"
                      >
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onSelectNotice(item);
                          }}
                          className="w-full px-3 py-1.5 text-left text-xs font-medium text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            navigator.clipboard.writeText(
                              `${window.location.origin}/faculty/notices#${item.id}`
                            );
                          }}
                          className="w-full px-3 py-1.5 text-left text-xs font-medium text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          Copy Link
                        </button>
                        <button
                          onClick={() => setActiveMenuId(null)}
                          className="w-full px-3 py-1.5 text-left text-xs font-medium text-text-primary dark:text-text-primary-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2"
                        >
                          <Pin className="w-3.5 h-3.5" />
                          Pin Notice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3. Pagination Footer */}
      {notices.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border-light dark:border-border-dark text-xs text-text-secondary dark:text-text-secondary-dark">
          <div>
            Showing{" "}
            <span className="font-semibold text-text-primary dark:text-text-primary-dark">
              {startIndex + 1}–{Math.min(startIndex + itemsPerPage, notices.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-text-primary dark:text-text-primary-dark">
              {notices.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-border-light dark:border-border-dark flex items-center justify-center text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                    : "border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-surface-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-border-light dark:border-border-dark flex items-center justify-center text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
