"use client";

import { useState, useMemo, useEffect } from "react";
import { CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import MyReportsHeader from "./MyReportsHeader";
import MyReportsMetrics from "./MyReportsMetrics";
import MyReportsFilterBar from "./MyReportsFilterBar";
import MyReportsList from "./MyReportsList";
import MyReportsPagination from "./MyReportsPagination";
import MyReportsSidebarRail from "./MyReportsSidebarRail";
import CaseDetailDrawer from "./CaseDetailDrawer";
import ClaimVerificationModal from "./ClaimVerificationModal";
import PossibleMatchModal from "./PossibleMatchModal";
import EditReportModal from "./EditReportModal";
import CancelReportModal from "./CancelReportModal";
import MobileMyReportsFilterDrawer from "./MobileMyReportsFilterDrawer";
import MyReportsSkeleton from "./MyReportsSkeleton";
import ReportLostItemModal from "../ReportLostItemModal";
import ReportFoundItemModal from "../ReportFoundItemModal";
import {
  loadMyReports,
  saveMyReports,
  computeMyReportsMetrics,
  filterAndSortMyReports,
} from "./myReportsData";

const PAGE_SIZE = 6;

export default function MyReportsAssembler() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Filter & Pagination States
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("recently-updated");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Drawers
  const [caseDrawerReport, setCaseDrawerReport] = useState(null);
  const [possibleMatchReport, setPossibleMatchReport] = useState(null);
  const [claimVerifyReport, setClaimVerifyReport] = useState(null);
  const [editReportTarget, setEditReportTarget] = useState(null);
  const [cancelReportTarget, setCancelReportTarget] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isReportLostOpen, setIsReportLostOpen] = useState(false);
  const [isReportFoundOpen, setIsReportFoundOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  // Initial Load from LocalStorage
  useEffect(() => {
    try {
      const data = loadMyReports();
      setReports(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load my reports:", err);
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  // Sync to LocalStorage on updates
  const updateReportsAndPersist = (updater) => {
    setReports((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveMyReports(next);
      return next;
    });
  };

  // Dynamic Summary Metrics
  const metrics = useMemo(() => {
    return computeMyReportsMetrics(reports);
  }, [reports]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const all = reports.length;
    const lost = reports.filter((r) => r.type === "Lost Report").length;
    const found = reports.filter((r) => r.type === "Found Report").length;
    const claims = reports.filter((r) => r.type === "Claim Request" || (r.claimId && r.claimStatus !== "Not Claimed")).length;
    const resolved = reports.filter((r) => r.status === "Resolved").length;
    const needsAction = reports.filter((r) => r.needsAction || r.status === "Possible Match Found" || r.status === "Verification Pending").length;
    return { all, lost, found, claims, resolved, needsAction };
  }, [reports]);

  // Active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedStatus !== "All") count++;
    if (sortBy !== "recently-updated") count++;
    return count;
  }, [selectedCategory, selectedStatus, sortBy]);

  // Filtered & Sorted Reports
  const filteredReports = useMemo(() => {
    return filterAndSortMyReports(reports, {
      tab: activeTab,
      search: searchQuery,
      category: selectedCategory,
      status: selectedStatus,
      sortBy,
    });
  }, [reports, activeTab, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Paginated 6 items
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredReports.slice(start, start + PAGE_SIZE);
  }, [filteredReports, currentPage]);

  // Handlers with automatic reset to Page 1
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSortBy("recently-updated");
    setCurrentPage(1);
    showToast("Filters reset to default.");
  };

  const handleSelectMetric = (targetTab, statusFilter) => {
    setActiveTab(targetTab);
    if (statusFilter) {
      setSelectedStatus(statusFilter);
    } else {
      setSelectedStatus("All");
    }
    setCurrentPage(1);
  };

  // Case Drawer & Modals Trigger
  const handleViewCase = (report) => {
    setCaseDrawerReport(report);
  };

  const handleReviewMatch = (report) => {
    setPossibleMatchReport(report);
  };

  const handleClaimVerify = (report) => {
    setClaimVerifyReport(report);
  };

  const handleEditReport = (report) => {
    setEditReportTarget(report);
  };

  const handleCancelReport = (report) => {
    setCancelReportTarget(report);
  };

  // Action: Save Edited Report
  const handleSaveReport = (reportId, updatedData) => {
    const timestamp = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + ", " + new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    updateReportsAndPersist((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          date: timestamp,
          title: "Report Details Updated",
          description: "Student updated item description or distinguishing features.",
          actor: "Hamid Rza (You)",
        };
        return {
          ...r,
          ...updatedData,
          updatedAt: timestamp,
          rawUpdatedAt: new Date().toISOString(),
          timeline: [...(r.timeline || []), newTimelineEvent],
        };
      })
    );
    showToast("Report details updated successfully.");
  };

  // Action: Confirm Cancel Report
  const handleConfirmCancel = (reportId) => {
    const timestamp = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + ", " + new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    updateReportsAndPersist((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          date: timestamp,
          title: "Report Cancelled by Student",
          description: "Case closed upon student request.",
          actor: "Hamid Rza (You)",
        };
        return {
          ...r,
          status: "Cancelled",
          canEdit: false,
          canCancel: false,
          needsAction: false,
          updatedAt: timestamp,
          rawUpdatedAt: new Date().toISOString(),
          resolution: {
            type: "Report Closed",
            resolvedAt: timestamp,
            resolvedBy: "Hamid Rza (You)",
            notes: "Report voluntarily cancelled by student.",
          },
          timeline: [...(r.timeline || []), newTimelineEvent],
        };
      })
    );
    showToast("Report cancelled and moved to history.");
  };

  // Action: Submit Claim Verification
  const handleSubmitClaim = (reportId, claimData) => {
    updateReportsAndPersist((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          date: claimData.submittedAt,
          title: "Ownership Evidence Submitted",
          description: `Verification details provided under claim ${claimData.claimId}.`,
          actor: "Hamid Rza (You)",
        };
        return {
          ...r,
          claimId: claimData.claimId,
          claimSubmittedAt: claimData.submittedAt,
          claimStatus: "Under Verification",
          status: "Verification In Progress",
          needsAction: false,
          updatedAt: claimData.submittedAt,
          rawUpdatedAt: new Date().toISOString(),
          verification: {
            submittedDetails: claimData.distinguishingFeature,
            documentName: claimData.mockFileName,
            purchaseDate: claimData.purchaseOrLossDate,
            location: claimData.lostLocationDetails,
            reference: claimData.proofReference,
            verifiedBy: null,
            verificationNote: "Review in progress by Campus Custodian Office.",
            otherClaimActivity: false,
          },
          timeline: [...(r.timeline || []), newTimelineEvent],
        };
      })
    );
    showToast("Claim submitted for verification.");
  };

  // Action: Confirm Match as Claim
  const handleConfirmMatchAsClaim = (report) => {
    setPossibleMatchReport(null);
    setClaimVerifyReport(report);
  };

  // Action: Dismiss Match
  const handleDismissMatch = (reportId) => {
    const timestamp = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + ", " + new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    updateReportsAndPersist((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const newTimelineEvent = {
          id: `tl-${Date.now()}`,
          date: timestamp,
          title: "Match Dismissed by Student",
          description: "Potential match reviewed and marked as not belonging to student.",
          actor: "Hamid Rza (You)",
        };
        return {
          ...r,
          status: "Searching",
          needsAction: false,
          possibleMatch: null,
          updatedAt: timestamp,
          rawUpdatedAt: new Date().toISOString(),
          timeline: [...(r.timeline || []), newTimelineEvent],
        };
      })
    );
    setPossibleMatchReport(null);
    showToast("Match dismissed. Search remains active.");
  };

  // New Report Submissions from Hub Modals
  const handleReportLostSubmit = (newItem) => {
    const newCaseId = `LF-2026-0${Math.floor(200 + Math.random() * 800)}`;
    const newReport = {
      id: `rep-${Date.now()}`,
      caseId: newCaseId,
      linkedItemId: newItem.id || `item-${Date.now()}`,
      type: "Lost Report",
      itemName: newItem.title,
      category: newItem.category,
      description: newItem.description,
      location: newItem.location,
      reportedAt: newItem.date,
      rawReportedAt: new Date().toISOString(),
      updatedAt: newItem.date,
      rawUpdatedAt: new Date().toISOString(),
      status: "Report Submitted",
      claimStatus: "Not Claimed",
      image: newItem.image,
      hasImage: Boolean(newItem.image),
      distinguishingFeatures: "",
      contactPreference: "College Email",
      canEdit: true,
      canCancel: true,
      needsAction: false,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: newItem.date,
          title: "Lost Report Submitted",
          description: `Lost item report filed by Hamid Rza for ${newItem.title}.`,
          actor: "Hamid Rza (You)",
        },
      ],
    };

    updateReportsAndPersist((prev) => [newReport, ...prev]);
    setIsReportLostOpen(false);
    showToast(`Lost item report ${newCaseId} created successfully!`);
  };

  const handleReportFoundSubmit = (newItem) => {
    const newCaseId = `LF-2026-0${Math.floor(200 + Math.random() * 800)}`;
    const newReport = {
      id: `rep-${Date.now()}`,
      caseId: newCaseId,
      linkedItemId: newItem.id || `item-${Date.now()}`,
      type: "Found Report",
      itemName: newItem.title,
      category: newItem.category,
      description: newItem.description,
      location: newItem.location,
      reportedAt: newItem.date,
      rawReportedAt: new Date().toISOString(),
      updatedAt: newItem.date,
      rawUpdatedAt: new Date().toISOString(),
      status: "Report Submitted",
      claimStatus: "Not Claimed",
      image: newItem.image,
      hasImage: Boolean(newItem.image),
      distinguishingFeatures: "",
      contactPreference: "College Email",
      canEdit: true,
      canCancel: false,
      needsAction: false,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: newItem.date,
          title: "Found Report Submitted",
          description: `Found item report filed by Hamid Rza for ${newItem.title}.`,
          actor: "Hamid Rza (You)",
        },
      ],
    };

    updateReportsAndPersist((prev) => [newReport, ...prev]);
    setIsReportFoundOpen(false);
    showToast(`Found item report ${newCaseId} created successfully!`);
  };

  // Loading State
  if (isLoading) {
    return <MyReportsSkeleton />;
  }

  // Friendly Error State
  if (hasError) {
    return (
      <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-8 sm:p-12 text-center max-w-lg mx-auto my-12 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            We couldn&rsquo;t load your reports
          </h2>
          <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
            There was a temporary problem reading your stored Lost &amp; Found cases.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setHasError(false);
              const data = loadMyReports();
              setReports(data);
              setIsLoading(false);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#107A59] transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063327] text-white border border-emerald-500/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header */}
      <MyReportsHeader
        onOpenReportLost={() => setIsReportLostOpen(true)}
        onOpenReportFound={() => setIsReportFoundOpen(true)}
      />

      {/* 2. Summary Metrics */}
      <MyReportsMetrics
        metrics={metrics}
        activeTab={activeTab}
        onSelectMetric={handleSelectMetric}
      />

      {/* 3. Main Workspace: Desktop 2/3 + 1/3 arrangement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Main 2/3): Tabs, Search, List, Pagination */}
        <div className="lg:col-span-8 space-y-4">
          {/* Status Tabs, Search, and Filters */}
          <MyReportsFilterBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
            activeFilterCount={activeFilterCount}
            tabCounts={tabCounts}
          />

          {/* List of Report Cards / Contextual Empty States */}
          <MyReportsList
            reports={paginatedReports}
            activeTab={activeTab}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onOpenReportLost={() => setIsReportLostOpen(true)}
            onViewCase={handleViewCase}
            onReviewMatch={handleReviewMatch}
            onClaimVerify={handleClaimVerify}
            onEditReport={handleEditReport}
            onCancelReport={handleCancelReport}
          />

          {/* Real Pagination */}
          <MyReportsPagination
            currentPage={currentPage}
            totalItems={filteredReports.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        {/* Right Rail (1/3): Summary, Action Required, Recent, Guidelines */}
        <div className="lg:col-span-4">
          <MyReportsSidebarRail
            reports={reports}
            metrics={metrics}
            onReviewMatch={handleReviewMatch}
            onClaimVerify={handleClaimVerify}
            onViewCase={handleViewCase}
          />
        </div>
      </div>

      {/* Drawers and Modals */}
      <CaseDetailDrawer
        isOpen={Boolean(caseDrawerReport)}
        onClose={() => setCaseDrawerReport(null)}
        report={caseDrawerReport}
        onReviewMatch={handleReviewMatch}
        onClaimVerify={handleClaimVerify}
        onEditReport={handleEditReport}
        onCancelReport={handleCancelReport}
      />

      <PossibleMatchModal
        isOpen={Boolean(possibleMatchReport)}
        onClose={() => setPossibleMatchReport(null)}
        report={possibleMatchReport}
        onConfirmMatchAsClaim={handleConfirmMatchAsClaim}
        onDismissMatch={handleDismissMatch}
      />

      <ClaimVerificationModal
        isOpen={Boolean(claimVerifyReport)}
        onClose={() => setClaimVerifyReport(null)}
        report={claimVerifyReport}
        onSubmitClaim={handleSubmitClaim}
      />

      <EditReportModal
        isOpen={Boolean(editReportTarget)}
        onClose={() => setEditReportTarget(null)}
        report={editReportTarget}
        onSaveReport={handleSaveReport}
      />

      <CancelReportModal
        isOpen={Boolean(cancelReportTarget)}
        onClose={() => setCancelReportTarget(null)}
        report={cancelReportTarget}
        onConfirmCancel={handleConfirmCancel}
      />

      <MobileMyReportsFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
      />

      {/* Reusable Report Modals from Hub */}
      <ReportLostItemModal
        isOpen={isReportLostOpen}
        onClose={() => setIsReportLostOpen(false)}
        onSubmitReport={handleReportLostSubmit}
      />

      <ReportFoundItemModal
        isOpen={isReportFoundOpen}
        onClose={() => setIsReportFoundOpen(false)}
        onSubmitReport={handleReportFoundSubmit}
      />
    </div>
  );
}
