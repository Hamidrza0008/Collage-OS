"use client";

import React, { useState, useMemo } from "react";
import ResourcesHeroBanner from "./ResourcesHeroBanner";
import ResourcesCategoryPills from "./ResourcesCategoryPills";
import ResourcesSearchBar from "./ResourcesSearchBar";
import FeaturedResourcesSection from "./FeaturedResourcesSection";
import RecentUploadsTable from "./RecentUploadsTable";
import ResourcesSidebarQuickActions from "./ResourcesSidebarQuickActions";
import ResourcesSidebarStorage from "./ResourcesSidebarStorage";
import ResourcesSidebarLinks from "./ResourcesSidebarLinks";
import ResourcesSidebarQuote from "./ResourcesSidebarQuote";
import UploadResourceModal from "./UploadResourceModal";
import ShareWithClassModal from "./ShareWithClassModal";
import CreateFolderModal from "./CreateFolderModal";
import ResourceDetailsModal from "./ResourceDetailsModal";
import { INITIAL_RECENT_UPLOADS } from "./facultyResourcesData";
import { CheckCircle2 } from "lucide-react";

export default function FacultyResourcesAssembler() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [uploads, setUploads] = useState(INITIAL_RECENT_UPLOADS);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync category pill selection with search bar category dropdown
  const handleCategoryPillSelect = (catId) => {
    setActiveCategory(catId);
    setCategoryFilter(catId === "all" ? "all" : catId);
  };

  const handleDropdownCategoryChange = (catVal) => {
    setCategoryFilter(catVal);
    setActiveCategory(catVal);
  };

  const handleDownload = (item) => {
    showToast(`Downloading "${item.title}" (${item.size || "File"})...`);
  };

  const handleUploadSubmit = (newResource) => {
    setUploads((prev) => [newResource, ...prev]);
    showToast(`Uploaded "${newResource.title}" successfully!`);
  };

  // Filtered recent uploads
  const filteredUploads = useMemo(() => {
    let result = [...uploads];

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Semester filter
    if (semesterFilter !== "all") {
      result = result.filter(
        (item) => item.semester === semesterFilter || item.semester === "All Sem"
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.format.toLowerCase().includes(q) ||
          item.author.name.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortOrder === "oldest") {
      result.reverse();
    }

    return result;
  }, [uploads, categoryFilter, semesterFilter, searchQuery, sortOrder]);

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 1. Hero Banner */}
      <ResourcesHeroBanner />

      {/* 2. Main 2-Column Grid matching Screenshot */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column (approx 70% width on xl) */}
        <div className="flex-1 w-full min-w-0 space-y-5 sm:space-y-6">
          {/* A. Horizontal Category Chips Carousel */}
          <ResourcesCategoryPills
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryPillSelect}
          />

          {/* B. Search & Filters Bar */}
          <ResourcesSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleDropdownCategoryChange}
            semesterFilter={semesterFilter}
            onSemesterFilterChange={setSemesterFilter}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />

          {/* C. Featured Resources Section */}
          <FeaturedResourcesSection
            onSelectResource={(item) => setSelectedResource(item)}
            onDownloadResource={handleDownload}
            onViewAll={() => {
              setActiveCategory("all");
              setCategoryFilter("all");
            }}
          />

          {/* D. Recent Uploads Section */}
          <RecentUploadsTable
            uploads={filteredUploads}
            onSelectResource={(item) => setSelectedResource(item)}
            onDownloadResource={handleDownload}
            onViewAll={() => {
              setActiveCategory("all");
              setCategoryFilter("all");
            }}
          />
        </div>

        {/* Right Column: Sidebar (Quick Actions, Storage Usage, Useful Links, Quote) (approx 30% width on xl) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* Quick Actions (2x2 grid) */}
          <ResourcesSidebarQuickActions
            onUploadClick={() => setIsUploadModalOpen(true)}
            onShareClick={() => setIsShareModalOpen(true)}
            onCreateFolderClick={() => setIsFolderModalOpen(true)}
            onViewDownloadsClick={() =>
              showToast("Opening downloads activity analytics...")
            }
          />

          {/* Storage Usage Widget */}
          <ResourcesSidebarStorage usedGB={68.4} totalGB={100} percentage={68} />

          {/* Useful Links Widget */}
          <ResourcesSidebarLinks />

          {/* Academic Journey Quote Card */}
          <ResourcesSidebarQuote />
        </div>
      </div>

      {/* Upload Resource Modal */}
      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmitUpload={handleUploadSubmit}
      />

      {/* Share with Class Modal */}
      <ShareWithClassModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShareCompleted={(msg) => showToast(msg)}
      />

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onFolderCreated={(msg) => showToast(msg)}
      />

      {/* Resource Details Preview Modal */}
      <ResourceDetailsModal
        isOpen={!!selectedResource}
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onDownload={handleDownload}
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
