"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, ArrowLeft, CheckCircle2 } from "lucide-react";
import NotificationHeader from "./NotificationHeader";
import NotificationSummaryCards from "./NotificationSummaryCards";
import NotificationFilters from "./NotificationFilters";
import NotificationList from "./NotificationList";
import NotificationRightSidebar from "./NotificationRightSidebar";
import ClearReadConfirmModal from "./ClearReadConfirmModal";
import MobileNotificationFilterDrawer from "./MobileNotificationFilterDrawer";
import {
  getStoredNotifications,
  markNotificationAsRead,
  markNotificationAsUnread,
  markAllNotificationsAsRead,
  clearReadNotifications,
  resetNotificationsToSeed,
  getNotificationCounts,
  getDateGroup,
} from "./notificationData";

const ITEMS_PER_PAGE = 7;

export default function NotificationCenterAssembler() {
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Filter & Search & Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Load and subscribe to notification changes
  useEffect(() => {
    try {
      const initial = getStoredNotifications();
      setNotifications(initial);
      setIsLoaded(true);
      setHasError(false);
    } catch {
      setHasError(true);
      setIsLoaded(true);
    }

    const handleSync = () => {
      try {
        const updated = getStoredNotifications();
        setNotifications(updated);
      } catch (err) {
        console.error("Failed to sync notifications:", err);
      }
    };

    window.addEventListener("college_os_notifications_updated", handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener("college_os_notifications_updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Dynamic Metrics derived from active notification dataset
  const counts = useMemo(() => {
    return getNotificationCounts(notifications);
  }, [notifications]);

  // Read count for clear read button
  const readCount = useMemo(() => {
    return notifications.filter((n) => n.read).length;
  }, [notifications]);

  // Category counts for pills and sidebar
  const categoryCounts = useMemo(() => {
    const map = {
      all: notifications.length,
      unread: notifications.filter((n) => !n.read).length,
      action_required: notifications.filter((n) => n.actionRequired).length,
    };

    notifications.forEach((n) => {
      map[n.type] = (map[n.type] || 0) + 1;
    });

    return map;
  }, [notifications]);

  // Action required items for quick sidebar checklist
  const actionRequiredItems = useMemo(() => {
    return notifications.filter((n) => n.actionRequired);
  }, [notifications]);

  // Handlers for search/filter/sort with page reset
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // State mutations
  const handleMarkAsRead = (id) => {
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
    showToast("Notification marked as read");
  };

  const handleMarkAsUnread = (id) => {
    const updated = markNotificationAsUnread(id);
    setNotifications(updated);
    showToast("Notification marked as unread");
  };

  const handleMarkAllAsRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
    showToast("All notifications marked as read");
  };

  const handleClearRead = () => {
    const updated = clearReadNotifications();
    setNotifications(updated);
    showToast(`Cleared ${readCount} read notifications`);
    setCurrentPage(1);
  };

  const handleResetSeedData = () => {
    const seeds = resetNotificationsToSeed();
    setNotifications(seeds);
    handleResetFilters();
    showToast("Notification inbox reset to default demo data");
  };

  // Priority ranking weights
  const priorityWeights = {
    urgent: 4,
    "action-required": 3,
    important: 2,
    normal: 1,
  };

  // Filtered & Sorted notifications
  const filteredNotifications = useMemo(() => {
    let list = [...notifications];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const inTitle = item.title?.toLowerCase().includes(q);
        const inMsg = item.message?.toLowerCase().includes(q);
        const inSource = item.source?.toLowerCase().includes(q);
        const inTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        const inMetadata =
          item.metadata &&
          Object.values(item.metadata).some((v) =>
            String(v).toLowerCase().includes(q)
          );
        return inTitle || inMsg || inSource || inTags || inMetadata;
      });
    }

    // 2. Category / status filter
    if (activeCategory === "unread") {
      list = list.filter((item) => !item.read);
    } else if (activeCategory === "action_required") {
      list = list.filter((item) => item.actionRequired);
    } else if (activeCategory !== "all") {
      list = list.filter((item) => item.type === activeCategory);
    }

    // 3. Sorting
    list.sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "priority") {
        const weightA = priorityWeights[a.priority] || 1;
        const weightB = priorityWeights[b.priority] || 1;
        if (weightB !== weightA) return weightB - weightA;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // default: newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return list;
  }, [notifications, searchQuery, activeCategory, sortBy]);

  // Pagination calculation
  const totalCount = filteredNotifications.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Group paginated items by calendar period
  const groupedNotifications = useMemo(() => {
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: [],
    };

    paginatedNotifications.forEach((item) => {
      const g = getDateGroup(item.createdAt);
      if (groups[g]) {
        groups[g].push(item);
      } else {
        groups.earlier.push(item);
      }
    });

    return groups;
  }, [paginatedNotifications]);

  // Context-aware empty state type
  const emptyType = useMemo(() => {
    if (searchQuery.trim()) return "search";
    if (activeCategory === "unread") return "unread";
    if (activeCategory === "action_required") return "action_required";
    if (activeCategory !== "all") return "category";
    return "general";
  }, [searchQuery, activeCategory]);

  // Error boundary state
  if (hasError) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Notifications couldn&apos;t be loaded
        </h2>
        <p className="text-sm text-[#4A685D] dark:text-[#8BAAA0] max-w-md mt-1 mb-6">
          We encountered a temporary problem while retrieving your notifications. Please try again.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetSeedData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] hover:bg-[#0E7A58] dark:hover:bg-[#18B885] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#A3BFB5] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-16 transition-colors">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0B3024] dark:bg-[#073327] text-white border border-[#159B72]/40 shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-[#20D39B] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clear Read Confirmation Modal */}
      <ClearReadConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearRead}
        readCount={readCount}
      />

      {/* Mobile Filter Drawer */}
      <MobileNotificationFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeCategory={activeCategory}
        onApplyCategory={handleCategoryChange}
        sortBy={sortBy}
        onApplySort={handleSortChange}
        onResetFilters={handleResetFilters}
      />

      <div className="space-y-6">
        {/* Page Header */}
        <NotificationHeader
          unreadCount={counts.unread}
          readCount={readCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onOpenClearReadModal={() => setIsClearModalOpen(true)}
          onResetSeedData={handleResetSeedData}
        />

        {/* 4 Summary Metric Cards */}
        <NotificationSummaryCards
          counts={counts}
          activeFilter={activeCategory}
          onSelectQuickFilter={handleCategoryChange}
        />

        {/* 2/3 Main Content + 1/3 Right Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (2/3) */}
          <main className="lg:col-span-8 xl:col-span-8 space-y-5">
            {/* Filters & Search Toolbar */}
            <NotificationFilters
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
              categoryCounts={categoryCounts}
            />

            {/* Notification Grouped Feed & Pagination */}
            <NotificationList
              groupedNotifications={groupedNotifications}
              totalCount={totalCount}
              currentPage={validCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              startIndex={startIndex}
              endIndex={endIndex}
              onMarkAsRead={handleMarkAsRead}
              onMarkAsUnread={handleMarkAsUnread}
              onShowToast={showToast}
              emptyType={emptyType}
              searchQuery={searchQuery}
              onResetFilters={handleResetFilters}
            />
          </main>

          {/* Right Rail Sidebar (1/3) */}
          <div className="lg:col-span-4 xl:col-span-4">
            <NotificationRightSidebar
              counts={counts}
              actionRequiredItems={actionRequiredItems}
              categoryCounts={categoryCounts}
              activeCategory={activeCategory}
              onSelectCategory={handleCategoryChange}
              onMarkAllAsRead={handleMarkAllAsRead}
              onOpenClearReadModal={() => setIsClearModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
