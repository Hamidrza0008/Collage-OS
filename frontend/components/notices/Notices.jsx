"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import NoticesHero from "./NoticesHero";
import NoticeFilters from "./NoticeFilters";
import NoticeList from "./NoticeList";
import NoticePagination from "./NoticePagination";
import LatestUpdatesCard from "./LatestUpdatesCard";
import NoticeCategoriesCard from "./NoticeCategoriesCard";
import NoticeQuickActionsCard from "./NoticeQuickActionsCard";
import StayInformedCtaCard from "./StayInformedCtaCard";
import NoticeDetailsModal from "./NoticeDetailsModal";
import NotificationSettingsModal from "./NotificationSettingsModal";
import ContactAdminModal from "./ContactAdminModal";
import { ALL_NOTICES, ALL_ANNOUNCEMENTS } from "./noticesData";
import { CheckCircle2 } from "lucide-react";
import NoticesSkeleton from "./NoticesSkeleton";

const ITEMS_PER_PAGE = 6;

export default function Notices({ isLoading = false }) {
  const router = useRouter();
  const [notices, setNotices] = useState(ALL_NOTICES);
  const [announcements, setAnnouncements] = useState(ALL_ANNOUNCEMENTS);
  const [activeTab, setActiveTab] = useState("notices"); // 'notices' | 'announcements'
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Toast State
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isContactAdminModalOpen, setIsContactAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Base list depending on active tab
  const baseList = activeTab === "notices" ? notices : announcements;

  // Filtered list based on Department, Category, and Search Query
  const filteredNotices = useMemo(() => {
    return baseList.filter((item) => {
      // Department filter
      if (
        selectedDepartment !== "All Departments" &&
        item.department.toLowerCase() !== selectedDepartment.toLowerCase()
      ) {
        return false;
      }

      // Category filter
      if (
        selectedCategory !== "All Categories" &&
        selectedCategory !== "All" &&
        item.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDept = item.department.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesDept && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [baseList, selectedDepartment, selectedCategory, searchQuery]);

  // Total pages based on filtered results
  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);

  // Safe current page derivation (prevents out of bounds without cascading effects)
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  // Sliced items for the current page (max 6 items)
  const paginatedNotices = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNotices, safeCurrentPage]);

  // Handlers with automatic reset to Page 1
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveTab("notices");
    setSelectedDepartment("All Departments");
    setSelectedCategory("All Categories");
    setSearchQuery("");
    setCurrentPage(1);
    showToast("Showing all notices.");
  };

  // Actions
  const handleSelectUpdate = (title) => {
    const found = [...notices, ...announcements].find((item) =>
      item.title.toLowerCase().includes(title.toLowerCase().slice(0, 15))
    );
    if (found) {
      router.push(`/student/notices/${found.id}`);
    }
  };

  const handleMarkAsRead = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unread: false } : a))
    );
    showToast("Notice marked as read.");
  };

  const handleShare = (notice) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${notice.title} - College OS: ${window.location.origin}/student/notices`
      );
    }
    showToast("Notice link copied to clipboard!");
  };

  const handleDownloadFile = (fileName) => {
    showToast(`Downloading "${fileName}"...`);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "calendar":
        showToast("Opening academic schedule & calendar...");
        break;
      case "download":
        showToast("Downloading compiled official notices bundle (PDF)...");
        break;
      case "notifications":
        setIsNotificationsModalOpen(true);
        break;
      case "contact":
        setIsContactAdminModalOpen(true);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <NoticesSkeleton />;
  }

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* ========================================================================= */}
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3                */}
      {/* Both columns start at the EXACT SAME top vertical level                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Filters + Notice Cards List + Pagination          */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Notices & Announcements Hero Banner */}
          <NoticesHero />

          {/* 2. Controls / Filter Navigation Bar */}
          <NoticeFilters
            activeTab={activeTab}
            onTabChange={handleTabChange}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          {/* 3. Notice Cards List (Paginated - max 6 cards per page) */}
          <div id="notices-list-container" className="space-y-3.5">
            <NoticeList
              notices={paginatedNotices}
              onViewDetails={(item) => router.push(`/student/notices/${item.id}`)}
              onDownloadAttachments={(item) => {
                const firstFile = item.files?.[0]?.name || `${item.title}.pdf`;
                handleDownloadFile(firstFile);
              }}
              onMarkAsRead={handleMarkAsRead}
              onShare={handleShare}
            />

            {/* 4. Pagination (Rendered directly BELOW cards; hidden when filtered items <= 6) */}
            {filteredNotices.length > ITEMS_PER_PAGE && (
              <NoticePagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalItems={filteredNotices.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  const el = document.getElementById("notices-list-container");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at TOP beside Notices Hero                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* 1. Latest Updates Card */}
          <LatestUpdatesCard
            onSelectUpdate={handleSelectUpdate}
            onViewAll={handleResetFilters}
          />

          {/* 2. Categories Card (controls same category filter as top dropdown) */}
          <NoticeCategoriesCard
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />

          {/* 3. Quick Actions Card */}
          <NoticeQuickActionsCard onAction={handleQuickAction} />

          {/* 4. Stay Informed / Campus CTA Card */}
          <StayInformedCtaCard onViewAllNotices={handleResetFilters} />
        </div>
      </div>

      {/* Notice Details Modal */}
      {selectedNotice && (
        <NoticeDetailsModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
          onDownloadFile={handleDownloadFile}
          onMarkAsRead={handleMarkAsRead}
          onShare={handleShare}
        />
      )}

      {/* Quick Action: Notification Preferences Modal */}
      <NotificationSettingsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        onSave={() => showToast("Notification preferences updated successfully.")}
      />

      {/* Quick Action: Contact Administration Modal */}
      <ContactAdminModal
        isOpen={isContactAdminModalOpen}
        onClose={() => setIsContactAdminModalOpen(false)}
        onSubmitSuccess={(data) =>
          showToast(`Inquiry regarding "${data.subject}" sent to ${data.department}.`)
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
