"use client";

import React, { useState, useEffect, useMemo } from "react";
import NoticesHeroBanner from "./NoticesHeroBanner";
import NoticesListSection from "./NoticesListSection";
import NoticesFilterSidebar from "./NoticesFilterSidebar";
import NoticesQuickActions from "./NoticesQuickActions";
import NoticesQuoteCard from "./NoticesQuoteCard";
import NoticeDetailsModal from "./NoticeDetailsModal";
import CreateNoticeModal from "./CreateNoticeModal";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import MobileNoticeFilterDrawer from "./MobileNoticeFilterDrawer";
import { INITIAL_FACULTY_NOTICES } from "./facultyNoticesData";
import { CheckCircle2, AlertCircle } from "lucide-react";

const STORAGE_KEY = "college_os_faculty_notices_v2";

export default function FacultyNoticesAssembler() {
  const [notices, setNotices] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const persisted = localStorage.getItem(STORAGE_KEY);
        if (persisted) {
          const parsed = JSON.parse(persisted);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.title) {
            return parsed;
          }
        }
      } catch {
        // Fallback silently
      }
    }
    return INITIAL_FACULTY_NOTICES;
  });

  // Filters and state
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("30days");
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isCreateNoticeOpen, setIsCreateNoticeOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Save to localStorage whenever notices change
  const persistNotices = (updatedNotices) => {
    setNotices(updatedNotices);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotices));
    } catch {
      // Ignore localStorage write error if in private mode
    }
  };

  // Sync tab & category filter
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

  const handleDateRangeFilterChange = (range) => {
    setDateRangeFilter(range);
    setCurrentPage(1);
  };

  const handleSortByChange = (order) => {
    setSortBy(order);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setCategoryFilter("all");
    setStatusFilter("all");
    setDateRangeFilter("all");
    setSortBy("latest");
    setSearchQuery("");
    setCurrentPage(1);
    showToast("Filters reset to default.");
  };

  // Counts for tabs
  const allCount = notices.length;
  const noticesCount = notices.filter(
    (n) => n.type === "Notice" || n.type === "Important"
  ).length;
  const announcementsCount = notices.filter(
    (n) => n.type === "Announcement"
  ).length;

  const isFiltered =
    activeTab !== "all" ||
    statusFilter !== "all" ||
    dateRangeFilter !== "all" ||
    sortBy !== "latest" ||
    searchQuery.trim() !== "";

  // Filtered & Sorted notices (pure without Date.now)
  const filteredNotices = useMemo(() => {
    const filtered = notices.filter((item) => {
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

      // 3. Date Range Filter
      if (dateRangeFilter !== "all") {
        const diffDays = item.daysAgo !== undefined ? item.daysAgo : 0;
        if (dateRangeFilter === "30days" && diffDays > 30) return false;
        if (dateRangeFilter === "90days" && diffDays > 90) return false;
        if (dateRangeFilter === "semester" && diffDays > 180) return false;
      }

      // 4. Search Query across title, description, content, audience, category, author
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesContent = item.content?.toLowerCase().includes(q);
        const matchesAudience = item.targetAudience?.toLowerCase().includes(q);
        const matchesCategory = item.category?.toLowerCase().includes(q);
        const matchesAuthor = item.author?.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesContent &&
          !matchesAudience &&
          !matchesCategory &&
          !matchesAuthor
        ) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") {
        const timeA = a.timestamp || 0;
        const timeB = b.timestamp || 0;
        return timeA - timeB;
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      // Latest first: preserve exact chronological order (Sep 14 -> Sep 12 -> Sep 10 -> Sep 8 -> Sep 6 -> Sep 5)
      const timeA = a.timestamp || 0;
      const timeB = b.timestamp || 0;
      return timeB - timeA;
    });
  }, [notices, activeTab, statusFilter, dateRangeFilter, sortBy, searchQuery]);

  // Create / Update Notice handler
  const handleSaveNotice = (savedNotice, status, isEditing) => {
    let updated;
    if (isEditing) {
      updated = notices.map((n) => (n.id === savedNotice.id ? savedNotice : n));
      showToast(
        status === "Draft"
          ? "Notice draft updated locally."
          : `Notice "${savedNotice.title}" updated successfully.`
      );
    } else {
      updated = [savedNotice, ...notices];
      showToast(
        status === "Draft"
          ? "Demo notice saved as draft locally. No students were notified."
          : "Demo notice saved locally. No students were notified."
      );
    }
    persistNotices(updated);
    setNoticeToEdit(null);
  };

  // Create / Update Announcement handler
  const handleSaveAnnouncement = (savedAnnouncement, status, isEditing) => {
    let updated;
    if (isEditing) {
      updated = notices.map((n) => (n.id === savedAnnouncement.id ? savedAnnouncement : n));
      showToast(
        status === "Draft"
          ? "Announcement draft updated locally."
          : `Announcement "${savedAnnouncement.title}" updated successfully.`
      );
    } else {
      updated = [savedAnnouncement, ...notices];
      showToast(
        status === "Draft"
          ? "Demo announcement saved as draft locally. No students were notified."
          : "Demo announcement published locally. No students were notified."
      );
    }
    persistNotices(updated);
    setNoticeToEdit(null);
  };

  // Delete notice handler
  const handleConfirmDelete = (noticeId) => {
    const updated = notices.filter((n) => n.id !== noticeId);
    persistNotices(updated);
    showToast("Notice record removed from local demonstration data.");
    setNoticeToDelete(null);
    if (selectedNotice?.id === noticeId) {
      setSelectedNotice(null);
    }
  };

  // Pin notice handler
  const handleTogglePinNotice = (noticeId) => {
    const updated = notices.map((n) =>
      n.id === noticeId ? { ...n, pinned: !n.pinned } : n
    );
    const item = notices.find((n) => n.id === noticeId);
    persistNotices(updated);
    showToast(item?.pinned ? "Notice unpinned." : "Notice pinned to top!");
  };

  // Copy notice link
  const handleCopyNoticeLink = (item) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/faculty/notices#${item.id}`
      );
      showToast("Link copied to clipboard!");
    }
  };

  // Edit trigger
  const handleStartEdit = (item) => {
    setNoticeToEdit(item);
    if (item.type === "Announcement") {
      setIsCreateAnnouncementOpen(true);
    } else {
      setIsCreateNoticeOpen(true);
    }
  };

  // Count active filters for badge
  const activeFilterCount =
    (categoryFilter !== "all" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (dateRangeFilter !== "all" ? 1 : 0) +
    (sortBy !== "latest" ? 1 : 0);

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* 1. Hero Banner matching screenshot */}
      <NoticesHeroBanner />

      {/* 2. Main 2-Column Content Layout (72-75% / 25-28%) */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Notices & Announcements List Section (~72-74% on xl) */}
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
            onEditNotice={handleStartEdit}
            onDeleteNotice={(item) => setNoticeToDelete(item)}
            onTogglePinNotice={handleTogglePinNotice}
            onCopyNoticeLink={handleCopyNoticeLink}
            allCount={allCount}
            noticesCount={noticesCount}
            announcementsCount={announcementsCount}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </div>

        {/* Right Column: Utility Rail (~26-28% on xl) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* Card 1: Filter & Sort */}
          <NoticesFilterSidebar
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleSidebarCategoryChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            dateRangeFilter={dateRangeFilter}
            onDateRangeFilterChange={handleDateRangeFilterChange}
          />

          {/* Card 2: Quick Actions */}
          <NoticesQuickActions
            onCreateNotice={() => {
              setNoticeToEdit(null);
              setIsCreateNoticeOpen(true);
            }}
            onCreateAnnouncement={() => {
              setNoticeToEdit(null);
              setIsCreateAnnouncementOpen(true);
            }}
            onViewAllNotices={() => {
              handleTabChange("notices");
            }}
            onViewAllAnnouncements={() => {
              handleTabChange("announcements");
            }}
          />

          {/* Card 3: Academic Quote Card */}
          <NoticesQuoteCard />
        </div>
      </div>

      {/* Notice Details Modal */}
      <NoticeDetailsModal
        isOpen={!!selectedNotice}
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
        onEditNotice={handleStartEdit}
        onDeleteNotice={(item) => setNoticeToDelete(item)}
      />

      {/* Create / Edit Notice Modal */}
      <CreateNoticeModal
        isOpen={isCreateNoticeOpen}
        noticeToEdit={noticeToEdit}
        onClose={() => {
          setIsCreateNoticeOpen(false);
          setNoticeToEdit(null);
        }}
        onSubmitNotice={handleSaveNotice}
      />

      {/* Create / Edit Announcement Modal */}
      <CreateAnnouncementModal
        isOpen={isCreateAnnouncementOpen}
        announcementToEdit={noticeToEdit}
        onClose={() => {
          setIsCreateAnnouncementOpen(false);
          setNoticeToEdit(null);
        }}
        onSubmitAnnouncement={handleSaveAnnouncement}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!noticeToDelete}
        notice={noticeToDelete}
        onClose={() => setNoticeToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* Mobile Filter Drawer */}
      <MobileNoticeFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={handleSidebarCategoryChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        dateRangeFilter={dateRangeFilter}
        onDateRangeFilterChange={handleDateRangeFilterChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#063327] dark:bg-[#031C16] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-500/50 animate-in slide-in-from-bottom-3 duration-300">
          {toastMessage.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
