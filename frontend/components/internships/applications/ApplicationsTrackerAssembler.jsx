"use client";

import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

import ApplicationsHeader from "./ApplicationsHeader";
import ApplicationsMetrics from "./ApplicationsMetrics";
import ApplicationsFilterBar from "./ApplicationsFilterBar";
import ApplicationsList from "./ApplicationsList";
import ApplicationsPagination from "./ApplicationsPagination";
import ApplicationsSidebarRail from "./ApplicationsSidebarRail";
import ApplicationDetailDrawer from "./ApplicationDetailDrawer";
import WithdrawApplicationModal from "./WithdrawApplicationModal";
import ApplicationNotesModal from "./ApplicationNotesModal";
import MobileApplicationsFilterDrawer from "./MobileApplicationsFilterDrawer";

import {
  INITIAL_APPLICATIONS,
  loadApplicationsState,
  saveApplicationsState,
  calculateApplicationMetrics,
} from "./applicationsData";

const ITEMS_PER_PAGE = 6;

export default function ApplicationsTrackerAssembler() {
  // Primary applications state
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedWorkMode, setSelectedWorkMode] = useState("all");
  const [sortBy, setSortBy] = useState("recently-updated");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers state
  const [selectedAppForDetail, setSelectedAppForDetail] = useState(null);
  const [withdrawingApp, setWithdrawingApp] = useState(null);
  const [editingNotesApp, setEditingNotesApp] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadApplicationsState();
    setApplications(loaded);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Tab Counts computation
  const tabCounts = useMemo(() => {
    return {
      all: applications.length,
      active: applications.filter((a) =>
        [
          "Submitted",
          "Under Review",
          "Shortlisted",
          "Assessment Pending",
          "Assessment Completed",
          "Interview Scheduled",
          "Interview Completed",
          "Waitlisted",
        ].includes(a.status)
      ).length,
      interviews: applications.filter((a) =>
        ["Interview Scheduled", "Interview Completed"].includes(a.status)
      ).length,
      selected: applications.filter((a) =>
        ["Offer Received", "Selected"].includes(a.status)
      ).length,
      rejected: applications.filter((a) =>
        ["Rejected", "Expired / Closed"].includes(a.status)
      ).length,
      withdrawn: applications.filter((a) => a.status === "Withdrawn").length,
    };
  }, [applications]);

  // Summary Metrics computation
  const metrics = useMemo(() => {
    return calculateApplicationMetrics(applications);
  }, [applications]);

  // Filtering, Searching, and Sorting Pipeline
  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];

    // 1. Tab Filtering
    if (activeTab === "active") {
      result = result.filter((a) =>
        [
          "Submitted",
          "Under Review",
          "Shortlisted",
          "Assessment Pending",
          "Assessment Completed",
          "Interview Scheduled",
          "Interview Completed",
          "Waitlisted",
        ].includes(a.status)
      );
    } else if (activeTab === "interviews") {
      result = result.filter((a) =>
        ["Interview Scheduled", "Interview Completed"].includes(a.status)
      );
    } else if (activeTab === "selected") {
      result = result.filter((a) =>
        ["Offer Received", "Selected"].includes(a.status)
      );
    } else if (activeTab === "rejected") {
      result = result.filter((a) =>
        ["Rejected", "Expired / Closed"].includes(a.status)
      );
    } else if (activeTab === "withdrawn") {
      result = result.filter((a) => a.status === "Withdrawn");
    }

    // 2. Search Query Filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.opportunityTitle?.toLowerCase().includes(q) ||
          a.company?.toLowerCase().includes(q) ||
          a.applicationId?.toLowerCase().includes(q) ||
          a.type?.toLowerCase().includes(q) ||
          a.location?.toLowerCase().includes(q)
      );
    }

    // 3. Opportunity Type Filtering
    if (selectedType !== "all") {
      result = result.filter(
        (a) => a.type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // 4. Work Mode Filtering
    if (selectedWorkMode !== "all") {
      result = result.filter(
        (a) => a.workMode?.toLowerCase() === selectedWorkMode.toLowerCase()
      );
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === "company-asc") {
        return (a.company || "").localeCompare(b.company || "");
      }
      if (sortBy === "company-desc") {
        return (b.company || "").localeCompare(a.company || "");
      }
      if (sortBy === "newest-applied") {
        return new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0);
      }
      if (sortBy === "oldest-applied") {
        return new Date(a.appliedAt || 0) - new Date(b.appliedAt || 0);
      }
      if (sortBy === "deadline-soonest") {
        return new Date(a.deadline || 0) - new Date(b.deadline || 0);
      }
      // default: recently updated
      return a.updatedAt === "Just now" ? -1 : 1;
    });

    return result;
  }, [applications, activeTab, searchQuery, selectedType, selectedWorkMode, sortBy]);

  // Reset page when filter/search/tab changes
  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleWorkModeChange = (mode) => {
    setSelectedWorkMode(mode);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedType("all");
    setSelectedWorkMode("all");
    setSortBy("recently-updated");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedType !== "all" ||
    selectedWorkMode !== "all" ||
    sortBy !== "recently-updated" ||
    Boolean(searchQuery);

  // Pagination slicing
  const totalPages = Math.ceil(filteredAndSortedApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedApplications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedApplications, currentPage]);

  // Action handlers
  const handleWithdrawConfirm = (appToWithdraw) => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const updated = applications.map((a) => {
      if (a.id === appToWithdraw.id) {
        return {
          ...a,
          status: "Withdrawn",
          currentStage: "Withdrawn by Applicant",
          nextAction: "Application withdrawn — no further action required",
          nextActionDue: null,
          withdrawable: false,
          updatedAt: "Just now",
          timeline: [
            ...(a.timeline || []),
            {
              date: today,
              title: "Application Withdrawn",
              description: "Applicant chose to withdraw this application.",
            },
          ],
        };
      }
      return a;
    });

    setApplications(updated);
    saveApplicationsState(updated);
    setWithdrawingApp(null);
    if (selectedAppForDetail?.id === appToWithdraw.id) {
      setSelectedAppForDetail((prev) => ({
        ...prev,
        status: "Withdrawn",
        withdrawable: false,
      }));
    }
    showToast("Application withdrawn successfully.");
  };

  const handleSaveNotes = (appId, newNote) => {
    const updated = applications.map((a) => {
      if (a.id === appId) {
        return {
          ...a,
          notes: newNote,
          updatedAt: "Just now",
        };
      }
      return a;
    });

    setApplications(updated);
    saveApplicationsState(updated);
    if (selectedAppForDetail?.id === appId) {
      setSelectedAppForDetail((prev) => ({ ...prev, notes: newNote }));
    }
    showToast("Notes updated.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#021512] transition-colors pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
        {/* 1. Header */}
        <ApplicationsHeader totalCount={applications.length} />

        {/* 2. Top Summary Metrics */}
        <ApplicationsMetrics
          metrics={metrics}
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
        />

        {/* 3. Search and Filters Bar */}
        <ApplicationsFilterBar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          tabCounts={tabCounts}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          selectedWorkMode={selectedWorkMode}
          onWorkModeChange={handleWorkModeChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* 4. Desktop Master Grid: Left 2/3 List + Right 1/3 Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main List Column (2/3 -> lg:col-span-8) */}
          <main className="lg:col-span-8 space-y-4">
            <ApplicationsList
              applications={paginatedApplications}
              activeTab={activeTab}
              searchQuery={searchQuery}
              onResetSearch={() => setSearchQuery("")}
              onViewApplication={(app) => setSelectedAppForDetail(app)}
              onWithdraw={(app) => setWithdrawingApp(app)}
              onEditNotes={(app) => setEditingNotesApp(app)}
            />

            {/* Pagination Controls */}
            <ApplicationsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedApplications.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
            />
          </main>

          {/* Right Summary Rail (1/3 -> lg:col-span-4, sticky on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
            <ApplicationsSidebarRail
              applications={applications}
              onViewApplication={(app) => setSelectedAppForDetail(app)}
            />
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#06241F] text-white dark:bg-[#10372F] dark:text-[#20D39B] border border-[#159B72]/40 shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-[#20D39B] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 p-0.5 hover:opacity-75 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Detail Slide-over Drawer */}
      <ApplicationDetailDrawer
        application={selectedAppForDetail}
        isOpen={Boolean(selectedAppForDetail)}
        onClose={() => setSelectedAppForDetail(null)}
        onWithdraw={(app) => {
          setSelectedAppForDetail(null);
          setWithdrawingApp(app);
        }}
        onSaveNotes={handleSaveNotes}
      />

      {/* Withdraw Confirmation Modal */}
      <WithdrawApplicationModal
        isOpen={Boolean(withdrawingApp)}
        application={withdrawingApp}
        onClose={() => setWithdrawingApp(null)}
        onConfirm={handleWithdrawConfirm}
      />

      {/* Candidate Notes Modal */}
      <ApplicationNotesModal
        isOpen={Boolean(editingNotesApp)}
        application={editingNotesApp}
        onClose={() => setEditingNotesApp(null)}
        onSave={handleSaveNotes}
      />

      {/* Mobile Filter Drawer */}
      <MobileApplicationsFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        selectedWorkMode={selectedWorkMode}
        onWorkModeChange={handleWorkModeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
