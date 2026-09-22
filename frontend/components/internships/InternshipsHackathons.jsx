"use client";

import { useState, useMemo } from "react";
import OpportunitiesHero from "./OpportunitiesHero";
import OpportunityTabsAndSearch from "./OpportunityTabsAndSearch";
import OpportunityFilterDrawer from "./OpportunityFilterDrawer";
import InternshipsSection from "./InternshipsSection";
import HackathonsSection from "./HackathonsSection";
import QuickActionsCard from "./QuickActionsCard";
import FeaturedOpportunitiesCard from "./FeaturedOpportunitiesCard";
import TopSkillsInDemandCard from "./TopSkillsInDemandCard";
import CareerCtaCard from "./CareerCtaCard";
import SubmitOpportunityCta from "./SubmitOpportunityCta";
import OpportunityDetailsModal from "./OpportunityDetailsModal";
import ApplyRegisterModal from "./ApplyRegisterModal";
import SubmitOpportunityModal from "./SubmitOpportunityModal";
import QuickActionModals from "./QuickActionModals";
import InternshipsSkeleton from "./InternshipsSkeleton";
import {
  INITIAL_INTERNSHIPS,
  INITIAL_HACKATHONS,
} from "./internshipsData";
import { CheckCircle2 } from "lucide-react";

// Pure filter function outside component
function filterOpportunities(list, { activeTab, searchQuery, selectedSkill, advancedFilters }) {
  return list.filter((item) => {
    // 1. Open to All tab filter
    if (activeTab === "open-to-all" && !item.openToAll) {
      return false;
    }

    // 2. Search query (title, company, description, skills, location)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchComp = item.company.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchSkills = item.skills?.some((s) => s.toLowerCase().includes(q));
      const matchLoc = item.location?.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);

      if (!matchTitle && !matchComp && !matchDesc && !matchSkills && !matchLoc && !matchBadge) {
        return false;
      }
    }

    // 3. Top skill in demand filter
    if (selectedSkill) {
      const hasSkill = item.skills?.some(
        (s) => s.toLowerCase() === selectedSkill.toLowerCase()
      );
      if (!hasSkill) return false;
    }

    // 4. Advanced Filters: Work Mode
    if (
      advancedFilters.workMode !== "All" &&
      item.workMode &&
      !item.workMode.toLowerCase().includes(advancedFilters.workMode.toLowerCase())
    ) {
      return false;
    }

    // 5. Advanced Filters: Location
    if (
      advancedFilters.location !== "All" &&
      item.location &&
      !item.location.toLowerCase().includes(advancedFilters.location.toLowerCase())
    ) {
      return false;
    }

    // 6. Advanced Filters: Duration
    if (
      advancedFilters.duration !== "All" &&
      item.durationCategory &&
      item.durationCategory !== advancedFilters.duration
    ) {
      return false;
    }

    // 7. Advanced Filters: Eligibility
    if (
      advancedFilters.eligibility !== "All" &&
      advancedFilters.eligibility !== "Open to All" &&
      item.eligibility &&
      !item.eligibility.toLowerCase().includes(advancedFilters.eligibility.toLowerCase())
    ) {
      return false;
    }

    // 8. Advanced Filters: Skills Multi-select
    if (advancedFilters.skills && advancedFilters.skills.length > 0) {
      const matchesAnySkill = advancedFilters.skills.some((sk) =>
        item.skills?.some((s) => s.toLowerCase().includes(sk.toLowerCase()))
      );
      if (!matchesAnySkill) return false;
    }

    return true;
  });
}

export default function InternshipsHackathons({ isLoading = false }) {
  // Master Datasets State
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS);
  const [hackathons, setHackathons] = useState(INITIAL_HACKATHONS);

  // Interaction Sets
  const [savedIds, setSavedIds] = useState(
    new Set([
      ...INITIAL_INTERNSHIPS.filter((i) => i.saved).map((i) => i.id),
      ...INITIAL_HACKATHONS.filter((h) => h.saved).map((h) => h.id),
    ])
  );
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [registeredIds, setRegisteredIds] = useState(new Set());

  // Filter States
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'internships' | 'hackathons' | 'open-to-all'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    workMode: "All",
    location: "All",
    duration: "All",
    eligibility: "All",
    skills: [],
  });

  // Independent Pagination States (Max 4 items per page per section)
  const [internshipsPage, setInternshipsPage] = useState(1);
  const [hackathonsPage, setHackathonsPage] = useState(1);

  // Modals States
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunityToApply, setOpportunityToApply] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeQuickModal, setActiveQuickModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.workMode !== "All") count++;
    if (advancedFilters.location !== "All") count++;
    if (advancedFilters.duration !== "All") count++;
    if (advancedFilters.eligibility !== "All") count++;
    if (advancedFilters.skills?.length > 0) count += advancedFilters.skills.length;
    if (selectedSkill) count++;
    return count;
  }, [advancedFilters, selectedSkill]);

  // Filtered Datasets using pure filter function
  const filteredInternships = useMemo(
    () =>
      filterOpportunities(internships, {
        activeTab,
        searchQuery,
        selectedSkill,
        advancedFilters,
      }),
    [internships, activeTab, searchQuery, selectedSkill, advancedFilters]
  );

  const filteredHackathons = useMemo(
    () =>
      filterOpportunities(hackathons, {
        activeTab,
        searchQuery,
        selectedSkill,
        advancedFilters,
      }),
    [hackathons, activeTab, searchQuery, selectedSkill, advancedFilters]
  );

  // Applied opportunities array for "My Applications"
  const appliedOpportunities = useMemo(() => {
    const list = [];
    internships.forEach((i) => {
      if (appliedIds.has(i.id)) list.push(i);
    });
    hackathons.forEach((h) => {
      if (registeredIds.has(h.id)) list.push(h);
    });
    return list;
  }, [internships, hackathons, appliedIds, registeredIds]);

  // =========================================================================
  // Handlers with automatic reset to Page 1 (Rules 20 & 21)
  // =========================================================================
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setInternshipsPage(1);
    setHackathonsPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setInternshipsPage(1);
    setHackathonsPage(1);
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setInternshipsPage(1);
    setHackathonsPage(1);
    if (skill) {
      showToast(`Filtered opportunities for skill: ${skill}`);
    } else {
      showToast("Cleared skill filter");
    }
  };

  const handleApplyAdvancedFilters = (newFilters) => {
    setAdvancedFilters(newFilters);
    setInternshipsPage(1);
    setHackathonsPage(1);
    showToast("Filters applied successfully");
  };

  const handleClearFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSelectedSkill("");
    setAdvancedFilters({
      workMode: "All",
      location: "All",
      duration: "All",
      eligibility: "All",
      skills: [],
    });
    setInternshipsPage(1);
    setHackathonsPage(1);
    showToast("Reset all filters");
  };

  // Interactions: Bookmark toggle
  const handleToggleBookmark = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed opportunity from saved bookmarks");
      } else {
        next.add(id);
        showToast("Opportunity bookmarked successfully! 🔖");
      }
      return next;
    });
  };

  // Interactions: Apply / Register trigger
  const handleOpenApplyOrRegister = (opportunity) => {
    setOpportunityToApply(opportunity);
  };

  const handleApplySuccess = (opportunityId, actionType) => {
    if (actionType === "registered") {
      setRegisteredIds((prev) => new Set([...prev, opportunityId]));
      showToast("Registration Confirmed! Pass sent to student email. 🎟️");
    } else {
      setAppliedIds((prev) => new Set([...prev, opportunityId]));
      showToast("Application Submitted successfully! Track in My Applications. 🚀");
    }
  };

  // Quick Actions Handler
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "apply-internship":
        handleTabChange("internships");
        const elInt = document.getElementById("internships-section");
        if (elInt) elInt.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "register-hackathon":
        handleTabChange("hackathons");
        const elHack = document.getElementById("hackathons-section");
        if (elHack) elHack.scrollIntoView({ behavior: "smooth", block: "start" });
        break;

      case "my-applications":
        setActiveQuickModal("my-applications");
        break;

      case "saved-opportunities":
        if (savedIds.size === 0) {
          showToast("No saved opportunities yet. Click the bookmark icon on any card!");
        } else {
          showToast(`Showing ${savedIds.size} bookmarked opportunities`);
        }
        break;

      case "resume-builder":
        setActiveQuickModal("resume-builder");
        break;

      case "career-resources":
        setActiveQuickModal("career-resources");
        break;

      default:
        break;
    }
  };

  // Submit New Opportunity Callback
  const handleOpportunitySubmitted = (newOpp) => {
    if (newOpp.type === "hackathon") {
      setHackathons((prev) => [newOpp, ...prev]);
      setActiveTab("hackathons");
      setHackathonsPage(1);
    } else {
      setInternships((prev) => [newOpp, ...prev]);
      setActiveTab("internships");
      setInternshipsPage(1);
    }
    showToast(`Opportunity "${newOpp.title}" posted to student portal!`);
  };

  const handleSelectFeaturedOpportunity = (oppId) => {
    const found =
      internships.find((i) => i.id === oppId) ||
      hackathons.find((h) => h.id === oppId);
    if (found) {
      setSelectedOpportunity(found);
    }
  };

  if (isLoading) {
    return <InternshipsSkeleton />;
  }

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* ========================================================================= */}
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3                */}
      {/* Both columns start at the EXACT SAME TOP VERTICAL LEVEL                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Tabs/Search + Internships + Hackathons + CTA      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Hero Banner (Restricted strictly to 2/3 column) */}
          <OpportunitiesHero />

          {/* 2. Main Navigation Tabs + Search + Filter Button */}
          <OpportunityTabsAndSearch
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onToggleFilters={() => setIsFilterDrawerOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {/* 3. Internships Section (Shown if tab is 'all', 'internships', or 'open-to-all') */}
          {(activeTab === "all" || activeTab === "internships" || activeTab === "open-to-all") && (
            <InternshipsSection
              internships={filteredInternships}
              currentPage={internshipsPage}
              onPageChange={(page) => {
                setInternshipsPage(page);
                const el = document.getElementById("internships-section");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onViewDetails={(item) => setSelectedOpportunity(item)}
              onApply={handleOpenApplyOrRegister}
              onToggleBookmark={handleToggleBookmark}
              savedIds={savedIds}
              appliedIds={appliedIds}
              onViewAll={() => handleTabChange("internships")}
              onResetFilters={handleClearFilters}
            />
          )}

          {/* 4. Hackathons Section (Shown if tab is 'all', 'hackathons', or 'open-to-all') */}
          {(activeTab === "all" || activeTab === "hackathons" || activeTab === "open-to-all") && (
            <HackathonsSection
              hackathons={filteredHackathons}
              currentPage={hackathonsPage}
              onPageChange={(page) => {
                setHackathonsPage(page);
                const el = document.getElementById("hackathons-section");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onViewDetails={(item) => setSelectedOpportunity(item)}
              onRegister={handleOpenApplyOrRegister}
              onToggleBookmark={handleToggleBookmark}
              savedIds={savedIds}
              registeredIds={registeredIds}
              onViewAll={() => handleTabChange("hackathons")}
              onResetFilters={handleClearFilters}
            />
          )}

          {/* 5. Submit Opportunity Banner CTA */}
          <SubmitOpportunityCta onOpenModal={() => setIsSubmitModalOpen(true)} />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at TOP level beside Hero                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Quick Actions Card */}
          <QuickActionsCard
            onAction={handleQuickAction}
            onViewAll={() => handleClearFilters()}
          />

          {/* 2. Featured Opportunities Card */}
          <FeaturedOpportunitiesCard
            onSelectOpportunity={handleSelectFeaturedOpportunity}
            onViewAll={() => handleClearFilters()}
          />

          {/* 3. Top Skills in Demand Card */}
          <TopSkillsInDemandCard
            selectedSkill={selectedSkill}
            onSelectSkill={handleSkillSelect}
            onViewAll={() => setSelectedSkill("")}
          />

          {/* 4. Career CTA Card */}
          <CareerCtaCard
            onExplore={() => {
              handleClearFilters();
              const el = document.getElementById("internships-section");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Interactive Modals & Toast Notification                                    */}
      {/* ========================================================================= */}
      {selectedOpportunity && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onApplyOrRegister={(opp) => {
            setSelectedOpportunity(null);
            handleOpenApplyOrRegister(opp);
          }}
          onToggleBookmark={handleToggleBookmark}
          isSaved={savedIds.has(selectedOpportunity.id)}
          isAppliedOrRegistered={
            appliedIds.has(selectedOpportunity.id) ||
            registeredIds.has(selectedOpportunity.id)
          }
        />
      )}

      {opportunityToApply && (
        <ApplyRegisterModal
          isOpen={!!opportunityToApply}
          onClose={() => setOpportunityToApply(null)}
          opportunity={opportunityToApply}
          onSubmitSuccess={handleApplySuccess}
        />
      )}

      <SubmitOpportunityModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleOpportunitySubmitted}
      />

      <OpportunityFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={handleApplyAdvancedFilters}
        onClearFilters={handleClearFilters}
      />

      <QuickActionModals
        activeModal={activeQuickModal}
        onClose={() => setActiveQuickModal(null)}
        appliedOpportunities={appliedOpportunities}
        onSelectOpportunity={handleSelectFeaturedOpportunity}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
