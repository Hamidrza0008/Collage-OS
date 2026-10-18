"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import ViewDownloadsModal from "./ViewDownloadsModal";
import ResourceDetailsModal from "./ResourceDetailsModal";
import { FEATURED_RESOURCES } from "./facultyResourcesData";
import {
  getStoredResourcesState,
  saveStoredResourcesState,
  recordDemoDownload,
} from "./resourcesStore";
import { CheckCircle2, Folder, FolderPlus } from "lucide-react";

export default function FacultyResourcesAssembler() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  // Persistent Demo States
  const [uploads, setUploads] = useState([]);
  const [folders, setFolders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);

  // Modals & Popovers
  const [selectedResource, setSelectedResource] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load persistent demo data on mount
  useEffect(() => {
    const initialState = getStoredResourcesState();
    setUploads(initialState.uploads);
    setFolders(initialState.folders);
    setDownloads(initialState.downloads);
    setIsStoreLoaded(true);
  }, []);

  // Sync state to localStorage whenever uploads or folders change
  useEffect(() => {
    if (isStoreLoaded) {
      saveStoredResourcesState({
        uploads,
        folders,
        downloads,
      });
    }
  }, [uploads, folders, downloads, isStoreLoaded]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync category pill selection with search bar category dropdown
  const handleCategoryPillSelect = (catId) => {
    setActiveCategory(catId);
    setCategoryFilter(catId);
  };

  const handleDropdownCategoryChange = (catVal) => {
    setCategoryFilter(catVal);
    setActiveCategory(catVal);
  };

  // Simulated download action with download history logging
  const handleDownload = (item) => {
    recordDemoDownload(item);
    setDownloads((prev) => [
      {
        id: `dl-${Date.now()}`,
        title: item.title,
        size: item.size || "1.5 MB",
        format: item.format || "PDF",
        category: item.category || "study-material",
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    showToast(`Downloading "${item.title}" (${item.size || "File"})... Demo download simulation.`);
  };

  const handleUploadSubmit = (newResource) => {
    setUploads((prev) => [newResource, ...prev]);
    showToast("Demo resource added locally. No server upload occurred.");
  };

  const handleDeleteResource = (resourceId) => {
    setUploads((prev) => prev.filter((item) => item.id !== resourceId));
    showToast("Demo resource record removed successfully.");
  };

  const handleFolderCreated = (newFolder) => {
    setFolders((prev) => [...prev, newFolder]);
    showToast(`Folder "${newFolder.name}" created successfully.`);
  };

  const handleClearDownloads = () => {
    setDownloads([]);
    const state = getStoredResourcesState();
    saveStoredResourcesState({ ...state, downloads: [] });
    showToast("Download activity history cleared.");
  };

  // Combined resources for modal selectors
  const allAvailableResources = useMemo(() => {
    const map = new Map();
    [...FEATURED_RESOURCES, ...uploads].forEach((item) => {
      if (!map.has(item.id)) map.set(item.id, item);
    });
    return Array.from(map.values());
  }, [uploads]);

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
      result = result.filter((item) => {
        const titleMatch = item.title?.toLowerCase().includes(q);
        const subMatch = item.subtitle?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const subjectMatch = item.subject?.toLowerCase().includes(q);
        const catMatch = item.category?.toLowerCase().includes(q);
        const tagMatch = item.tags?.some((t) => t.label?.toLowerCase().includes(q));
        const authorMatch =
          typeof item.author === "string"
            ? item.author.toLowerCase().includes(q)
            : item.author?.name?.toLowerCase().includes(q);

        return (
          titleMatch ||
          subMatch ||
          descMatch ||
          subjectMatch ||
          catMatch ||
          tagMatch ||
          authorMatch
        );
      });
    }

    // Sort order
    if (sortOrder === "oldest") {
      result.reverse();
    } else if (sortOrder === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "downloads") {
      result.sort((a, b) => (b.downloadsCount || 0) - (a.downloadsCount || 0));
    }

    return result;
  }, [uploads, categoryFilter, semesterFilter, searchQuery, sortOrder]);

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 1. Resources Hero Banner */}
      <ResourcesHeroBanner />

      {/* 2. Main 2-Column Responsive Layout matching Screenshot */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Main Content Area (approx 70-75% width on desktop) */}
        <div className="flex-1 w-full min-w-0 space-y-5 sm:space-y-6">
          {/* A. Horizontal Category Tiles */}
          <ResourcesCategoryPills
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryPillSelect}
          />

          {/* Optional Folders Indicator Pill Row (if folders exist) */}
          {folders.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Folder className="w-3.5 h-3.5 text-[#159B72]" />
                Folders ({folders.length}):
              </span>
              {folders.map((f) => (
                <span
                  key={f.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] shrink-0 shadow-2xs"
                >
                  <Folder className="w-3 h-3 text-[#159B72]" />
                  <span>{f.name}</span>
                  <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                    ({f.semester})
                  </span>
                </span>
              ))}
            </div>
          )}

          {/* B. Search and Filter Toolbar */}
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

          {/* C. Featured Resources */}
          <FeaturedResourcesSection
            onSelectResource={(item) => setSelectedResource(item)}
            onDownloadResource={handleDownload}
            onViewAll={() => {
              setActiveCategory("all");
              setCategoryFilter("all");
              setSemesterFilter("all");
              setSearchQuery("");
            }}
          />

          {/* D. Recent Uploads */}
          <RecentUploadsTable
            uploads={filteredUploads}
            onSelectResource={(item) => setSelectedResource(item)}
            onDownloadResource={handleDownload}
            onShareResource={(item) => {
              setSelectedResource(item);
              setIsShareModalOpen(true);
            }}
            onDeleteResource={handleDeleteResource}
            onViewAll={() => {
              setActiveCategory("all");
              setCategoryFilter("all");
              setSemesterFilter("all");
              setSearchQuery("");
            }}
          />
        </div>

        {/* Right Utility Rail (approx 25-30% width on desktop) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* Quick Actions (2x2 grid) */}
          <ResourcesSidebarQuickActions
            onUploadClick={() => setIsUploadModalOpen(true)}
            onShareClick={() => setIsShareModalOpen(true)}
            onCreateFolderClick={() => setIsFolderModalOpen(true)}
            onViewDownloadsClick={() => setIsDownloadsModalOpen(true)}
          />

          {/* Storage Usage Card */}
          <ResourcesSidebarStorage usedGB={68.4} totalGB={100} percentage={68} />

          {/* Useful Links Card */}
          <ResourcesSidebarLinks />

          {/* Academic Quote Card */}
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
        availableResources={allAvailableResources}
        initialResource={selectedResource}
        onClose={() => setIsShareModalOpen(false)}
        onShareCompleted={(msg) => showToast(msg)}
      />

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        existingFolders={folders}
        onClose={() => setIsFolderModalOpen(false)}
        onFolderCreated={handleFolderCreated}
      />

      {/* View Downloads Modal */}
      <ViewDownloadsModal
        isOpen={isDownloadsModalOpen}
        downloads={downloads}
        onClose={() => setIsDownloadsModalOpen(false)}
        onClearDownloads={handleClearDownloads}
      />

      {/* Resource Details Preview Modal */}
      <ResourceDetailsModal
        isOpen={!!selectedResource && !isShareModalOpen}
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onDownload={handleDownload}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#063327] dark:bg-[#021A15] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-500/40 animate-in slide-in-from-bottom-3 duration-300 max-w-md"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
