"use client";

import { useState, useMemo } from "react";
import LostFoundHero from "./LostFoundHero";
import LostFoundTabsAndSearch from "./LostFoundTabsAndSearch";
import LostFoundCategoryChips from "./LostFoundCategoryChips";
import LostFoundList from "./LostFoundList";
import LostFoundMainCTA from "./LostFoundMainCTA";
import QuickStatsCard from "./QuickStatsCard";
import RecentItemsCard from "./RecentItemsCard";
import QuickActionsCard from "./QuickActionsCard";
import FoundSomethingCtaCard from "./FoundSomethingCtaCard";
import LostFoundFilterDrawer from "./LostFoundFilterDrawer";
import LostFoundDetailsModal from "./LostFoundDetailsModal";
import ContactOwnerModal from "./ContactOwnerModal";
import ClaimVerificationModal from "./my-reports/ClaimVerificationModal";
import ReportLostItemModal from "./ReportLostItemModal";
import ReportFoundItemModal from "./ReportFoundItemModal";
import LostFoundSkeleton from "./LostFoundSkeleton";
import {
  INITIAL_LOST_FOUND_ITEMS,
  filterLostFoundItems,
} from "./lostFoundData";
import {
  loadMyReports,
  saveMyReports,
} from "./my-reports/myReportsData";
import { CheckCircle2 } from "lucide-react";

export default function LostAndFound({ isLoading = false }) {
  // Master Dataset State
  const [items, setItems] = useState(INITIAL_LOST_FOUND_ITEMS);

  // Filter States
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'lost' | 'found'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    type: "All",
    category: "All",
    location: "All",
    status: "All",
    reportedBy: "All",
  });

  // Pagination State (Max 6 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  // Modals & Interaction States
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToContact, setItemToContact] = useState(null);
  const [claimReportTarget, setClaimReportTarget] = useState(null);
  const [isReportLostOpen, setIsReportLostOpen] = useState(false);
  const [isReportFoundOpen, setIsReportFoundOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Convert a public catalog Found item to a canonical report object compatible with ClaimVerificationModal
  const handleInitiateClaim = (item) => {
    const existingReports = loadMyReports();
    // Check if user already has an active report or claim for this item
    const existing = existingReports.find((r) => r.linkedItemId === item.id || r.id === item.id);
    if (existing) {
      setClaimReportTarget(existing);
      return;
    }

    // Resolve canonical claimable report representation
    const canonicalReport = {
      id: `rep-claim-${item.id}`,
      caseId: `LF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      linkedItemId: item.id,
      type: "Claim Request",
      itemName: item.title,
      category: item.category || "Others",
      description: item.description,
      location: item.location,
      reportedAt: item.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      rawReportedAt: item.rawDate || new Date().toISOString(),
      updatedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      rawUpdatedAt: new Date().toISOString(),
      status: "Searching",
      claimStatus: "Not Claimed",
      image: item.image,
      hasImage: Boolean(item.image),
      distinguishingFeatures: "",
      serialOrReference: "",
      contactPreference: "College Email",
      canEdit: true,
      canCancel: true,
      needsAction: false,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          title: "Claim Initiated from Catalog",
          description: `Ownership claim started for catalog item: ${item.title}`,
          actor: "Hamid Rza (You)",
        },
      ],
    };

    setClaimReportTarget(canonicalReport);
  };

  const handleSubmitClaimVerification = (reportId, claimData) => {
    const existingReports = loadMyReports();
    const existingIndex = existingReports.findIndex(
      (r) => r.id === reportId || (claimReportTarget && r.linkedItemId === claimReportTarget.linkedItemId)
    );

    const newTimelineEvent = {
      id: `tl-${Date.now()}`,
      date: claimData.submittedAt,
      title: "Ownership Evidence Submitted",
      description: `Verification details provided under claim ${claimData.claimId}.`,
      actor: "Hamid Rza (You)",
    };

    let updatedList;
    if (existingIndex >= 0) {
      updatedList = existingReports.map((r, idx) => {
        if (idx !== existingIndex) return r;
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
      });
    } else {
      const newClaimReport = {
        ...claimReportTarget,
        id: reportId,
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
        timeline: [...(claimReportTarget.timeline || []), newTimelineEvent],
      };
      updatedList = [newClaimReport, ...existingReports];
    }

    saveMyReports(updatedList);
    showToast(`Claim ${claimData.claimId} submitted for verification.`);
  };

  // Active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.type !== "All") count++;
    if (advancedFilters.category !== "All") count++;
    if (advancedFilters.location !== "All") count++;
    if (advancedFilters.status !== "All") count++;
    if (advancedFilters.reportedBy !== "All") count++;
    return count;
  }, [advancedFilters]);

  // Dynamic Item Counts
  const counts = useMemo(() => {
    const all = items.length;
    const lost = items.filter((i) => i.status.toLowerCase() === "lost").length;
    const found = items.filter((i) => i.status.toLowerCase() === "found").length;
    return { all, lost, found };
  }, [items]);

  // Dynamic Quick Stats
  const stats = useMemo(() => {
    const total = items.length;
    const found = items.filter((i) => i.status.toLowerCase() === "found").length;
    const lost = items.filter((i) => i.status.toLowerCase() === "lost").length;
    const resolved = items.filter((i) => i.status.toLowerCase() === "resolved").length;
    return { total, found, lost, resolved };
  }, [items]);

  // Filtered Datasets using pure filter function
  const filteredItems = useMemo(() => {
    return filterLostFoundItems(items, {
      tab: activeTab,
      category: selectedCategory,
      search: searchQuery,
      advancedFilters,
    });
  }, [items, activeTab, selectedCategory, searchQuery, advancedFilters]);

  // Paginated Items: exactly max 6 items for current page
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  // Handlers with automatic reset to Page 1 (Rule 22)
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryLabel) => {
    setSelectedCategory(categoryLabel);
    setCurrentPage(1);
  };

  const handleApplyAdvancedFilters = (newFilters) => {
    setAdvancedFilters(newFilters);
    setCurrentPage(1);
    showToast("Filters applied successfully");
  };

  const handleClearFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSelectedCategory("All");
    setAdvancedFilters({
      type: "All",
      category: "All",
      location: "All",
      status: "All",
      reportedBy: "All",
    });
    setCurrentPage(1);
    showToast("Reset all filters");
  };

  // Actions
  const handleReportLostSubmit = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    showToast("Lost item reported successfully.");
  };

  const handleReportFoundSubmit = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    showToast("Found item reported successfully.");
  };

  const handleContactSubmit = (contactData) => {
    showToast(`Claim/Inquiry sent regarding "${contactData.itemTitle}".`);
  };

  const handleMarkResolved = (itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: "Resolved" } : item
      )
    );
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem((prev) => ({ ...prev, status: "Resolved" }));
    }
    showToast("Listing marked as Resolved successfully! Case closed.");
  };

  const handleMyReports = () => {
    setActiveTab("all");
    setSelectedCategory("All");
    setSearchQuery("");
    setAdvancedFilters({
      type: "All",
      category: "All",
      location: "All",
      status: "All",
      reportedBy: "Me",
    });
    setCurrentPage(1);
    showToast("Showing your reported items");
  };

  if (isLoading) {
    return <LostFoundSkeleton />;
  }

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification Notification Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063327] text-white border border-emerald-500/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN LAYOUT: 2/3 MAIN COLUMN + 1/3 RIGHT SIDEBAR (Starts at same level)   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Tabs/Search + Category Chips + List + Main CTA    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-3.5">
          {/* 1. Hero Banner (Restricted strictly to 2/3 column) */}
          <LostFoundHero />

          {/* 2. Top Tabs + Search Field + Filters Button */}
          <LostFoundTabsAndSearch
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onToggleFilters={() => setIsFilterDrawerOpen(true)}
            activeFilterCount={activeFilterCount}
            counts={counts}
          />

          {/* 3. Category Filter Chips */}
          <LostFoundCategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {/* 4. Lost & Found Items List + Real Pagination (max 6/page) */}
          <LostFoundList
            items={paginatedItems}
            totalItems={filteredItems.length}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onViewDetails={(item) => setSelectedItem(item)}
            onContactOwner={(item) => setItemToContact(item)}
            onClaimItem={(item) => handleInitiateClaim(item)}
            activeTab={activeTab}
            searchQuery={searchQuery}
            onClearFilters={handleClearFilters}
          />

          {/* 5. Main Horizontal Bottom CTA */}
          <LostFoundMainCTA
            onOpenReportModal={() => setIsReportLostOpen(true)}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Sticky on Desktop (Starts beside Hero, stays visible)  */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-4 lg:sticky lg:top-[84px] self-start space-y-4 z-10">
          {/* 1. Quick Stats Card */}
          <QuickStatsCard
            stats={stats}
            onViewAll={handleClearFilters}
          />

          {/* 2. Recent Items Card */}
          <RecentItemsCard
            items={items}
            onSelectItem={(item) => setSelectedItem(item)}
            onViewAll={handleClearFilters}
          />

          {/* 3. Quick Actions Card */}
          <QuickActionsCard
            onReportLost={() => setIsReportLostOpen(true)}
            onReportFound={() => setIsReportFoundOpen(true)}
            onBrowseAll={handleClearFilters}
            onMyReports={handleMyReports}
          />

          {/* 4. Found Something Promotional CTA Card */}
          <FoundSomethingCtaCard
            onReportFound={() => setIsReportFoundOpen(true)}
          />
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* MODALS & DRAWERS                                                          */}
      {/* ========================================================================= */}

      {/* 1. Item Details Modal */}
      <LostFoundDetailsModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onContactOwner={(item) => setItemToContact(item)}
        onClaimItem={(item) => handleInitiateClaim(item)}
        onMarkResolved={handleMarkResolved}
      />

      {/* 2. Contact Owner / Claim Modal */}
      <ContactOwnerModal
        item={itemToContact}
        isOpen={Boolean(itemToContact)}
        onClose={() => setItemToContact(null)}
        onSubmitContact={handleContactSubmit}
      />

      {/* 3. Claim Item Verification Modal (MD-07) */}
      <ClaimVerificationModal
        isOpen={Boolean(claimReportTarget)}
        onClose={() => setClaimReportTarget(null)}
        report={claimReportTarget}
        onSubmitClaim={handleSubmitClaimVerification}
      />

      {/* 4. Report Lost Item Modal */}
      <ReportLostItemModal
        isOpen={isReportLostOpen}
        onClose={() => setIsReportLostOpen(false)}
        onSubmitReport={handleReportLostSubmit}
      />

      {/* 5. Report Found Item Modal */}
      <ReportFoundItemModal
        isOpen={isReportFoundOpen}
        onClose={() => setIsReportFoundOpen(false)}
        onSubmitReport={handleReportFoundSubmit}
      />

      {/* 6. Advanced Filter Drawer */}
      <LostFoundFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={handleApplyAdvancedFilters}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}
