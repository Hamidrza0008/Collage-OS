"use client";

import React, { useState, useMemo } from "react";
import NoticesHeroBanner from "./NoticesHeroBanner";
import NoticesListSection from "./NoticesListSection";
import NoticesFilterSidebar from "./NoticesFilterSidebar";
import NoticesQuickActions from "./NoticesQuickActions";
import NoticesQuoteCard from "./NoticesQuoteCard";
import NoticeDetailsModal from "./NoticeDetailsModal";
import CreateNoticeModal from "./CreateNoticeModal";
import { INITIAL_FACULTY_NOTICES } from "./facultyNoticesData";
import { CheckCircle2 } from "lucide-react";

export default function FacultyNoticesAssembler() {
  const [notices, setNotices] = useState(INITIAL_FACULTY_NOTICES);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'notices' | 'announcements'
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // 'all' | 'notices' | 'announcements'
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'expired'
  const [dateRangeFilter, setDateRangeFilter] = useState("30days");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState("Notice");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync tab and sidebar category filter
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCategoryFilter(tab);
    setCurrentPage(1);
  };

  const handleSidebarCategoryChange = (cat) => {
    setCategoryFilter(cat);
    setActiveTab(cat);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Compute counts
  const allCount = notices.length;
  const noticesCount = notices.filter(
    (n) => n.type === "Notice" || n.type === "Important"
  ).length;
  const announcementsCount = notices.filter(
    (n) => n.type === "Announcement"
  ).length;

  // Filtered notices
  const filteredNotices = useMemo(() => {
    return notices.filter((item) => {
      // 1. Tab / Category Filter
      if (activeTab === "notices") {
        if (item.type === "Announcement") return false;
      } else if (activeTab === "announcements") {
        if (item.type !== "Announcement") return false;
      }

      // 2. Status Filter
      if (statusFilter !== "all") {
        if (item.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesAudience = item.targetAudience.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesAudience && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [notices, activeTab, statusFilter, searchQuery]);

  const handleCreateNewNotice = (newNotice) => {
    setNotices((prev) => [newNotice, ...prev]);
    showToast(`Successfully published "${newNotice.title}"!`);
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 1. Hero Banner */}
      <NoticesHeroBanner />

      {/* 2. Main 2-Column Grid matching Screenshot */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Notices & Announcements List Section (approx 68% width on xl) */}
        <div className="flex-1 w-full min-w-0">
          <NoticesListSection
            notices={filteredNotices}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            onSelectNotice={(item) => setSelectedNotice(item)}
            allCount={allCount}
            noticesCount={noticesCount}
            announcementsCount={announcementsCount}
            onToggleMobileFilter={() => {
              // Quick toggle to active / all
              setStatusFilter((prev) => (prev === "all" ? "active" : "all"));
            }}
          />
        </div>

        {/* Right Column: Sidebar (Filter & Sort, Quick Actions, Community Quote) (approx 32% width on xl) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* 1. Filter & Sort */}
          <NoticesFilterSidebar
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleSidebarCategoryChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            dateRangeFilter={dateRangeFilter}
            onDateRangeFilterChange={(val) => setDateRangeFilter(val)}
          />

          {/* 2. Quick Actions */}
          <NoticesQuickActions
            onCreateNotice={() => {
              setCreateModalType("Notice");
              setIsCreateModalOpen(true);
            }}
            onCreateAnnouncement={() => {
              setCreateModalType("Announcement");
              setIsCreateModalOpen(true);
            }}
            onViewAllNotices={() => {
              handleTabChange("notices");
            }}
            onViewAllAnnouncements={() => {
              handleTabChange("announcements");
            }}
          />

          {/* 3. Quote Card */}
          <NoticesQuoteCard />
        </div>
      </div>

      {/* Notice Details Modal */}
      <NoticeDetailsModal
        isOpen={!!selectedNotice}
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      {/* Create Notice / Announcement Modal */}
      <CreateNoticeModal
        isOpen={isCreateModalOpen}
        defaultType={createModalType}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitNotice={handleCreateNewNotice}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#063327] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-500/40 animate-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
