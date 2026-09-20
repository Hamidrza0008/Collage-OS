"use client";

import { useState, useMemo } from "react";
import AssignmentsHero from "./AssignmentsHero";
import AssignmentFilters from "./AssignmentFilters";
import AssignmentList from "./AssignmentList";
import AssignmentPagination from "./AssignmentPagination";
import UpcomingDeadlinesCard from "./UpcomingDeadlinesCard";
import SubmissionStatsCard from "./SubmissionStatsCard";
import AssignmentCalendarCard from "./AssignmentCalendarCard";
import QuickActionsCard from "./QuickActionsCard";
import AssignmentDetailsModal from "./AssignmentDetailsModal";
import UploadAssignmentModal from "./UploadAssignmentModal";
import { ALL_ASSIGNMENTS, SUBJECTS_LIST } from "./assignmentsData";
import { CheckCircle2 } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Assignments() {
  const [assignments, setAssignments] = useState(ALL_ASSIGNMENTS);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic counts derived from current assignments state
  const counts = useMemo(() => {
    return {
      all: assignments.length,
      pending: assignments.filter((a) => a.status === "pending").length,
      submitted: assignments.filter((a) => a.status === "submitted").length,
      overdue: assignments.filter((a) => a.status === "overdue").length,
    };
  }, [assignments]);

  // Filtered assignments based on tab, subject, and search query
  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      // Tab filter
      if (activeTab === "pending" && item.status !== "pending") return false;
      if (activeTab === "submitted" && item.status !== "submitted") return false;
      if (activeTab === "overdue" && item.status !== "overdue") return false;

      // Subject filter
      if (
        selectedSubject !== "All Subjects" &&
        item.subject.toLowerCase() !== selectedSubject.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubject = item.subject.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubject && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [assignments, activeTab, selectedSubject, searchQuery]);

  // Total pages based on filtered results
  const totalPages = Math.ceil(filteredAssignments.length / ITEMS_PER_PAGE);

  // Derive safeCurrentPage during render (ensuring no out-of-bound pages without cascading effects)
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  // Sliced assignments for the current active page (exactly 6 max)
  const paginatedAssignments = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAssignments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAssignments, safeCurrentPage]);

  // Reset pagination on tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  // Reset pagination on search change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Reset pagination on subject change
  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage(1);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle status for 3-dot menu or submission action
  const handleToggleStatus = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id === assignmentId) {
          const isNowSubmitted = item.status !== "submitted";
          return {
            ...item,
            status: isNowSubmitted ? "submitted" : "pending",
            dueStatus: isNowSubmitted
              ? "Submitted"
              : item.urgency === "urgent"
              ? "Due in 2 days"
              : "Pending",
            urgency: isNowSubmitted ? "submitted" : "urgent",
          };
        }
        return item;
      })
    );
    showToast("Assignment status updated successfully.");
  };

  // Quick action handler
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "view-all":
        setActiveTab("all");
        setSelectedSubject("All Subjects");
        setSearchQuery("");
        setCurrentPage(1);
        showToast("Showing all assignments.");
        break;
      case "upload":
        setIsUploadModalOpen(true);
        break;
      case "syllabus":
        showToast("Downloading syllabus & assignments bundle...");
        break;
      case "calendar":
        showToast("Viewing academic calendar for August 2025.");
        break;
      default:
        break;
    }
  };

  // Handle select from upcoming deadlines card
  const handleSelectUpcoming = (title) => {
    const found = assignments.find((a) =>
      a.title.toLowerCase().includes(title.toLowerCase())
    );
    if (found) {
      setSelectedAssignment(found);
    }
  };

  // Handle upload success
  const handleUploadSuccess = (data) => {
    const newAssignment = {
      id: Date.now(),
      subject: data.subject,
      title: data.title,
      description: "Uploaded by student via Quick Actions portal.",
      tags: ["Uploaded", "Self-study"],
      dueStatus: "Submitted",
      dueDate: "Today, 11:59 PM",
      marks: 10,
      priority: "Medium Priority",
      priorityType: "medium",
      status: "submitted",
      urgency: "submitted",
      icon: "code",
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    setCurrentPage(1);
    showToast(`"${data.title}" submitted successfully!`);
  };

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* ========================================================================= */}
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3                */}
      {/* Both columns start at the EXACT SAME top vertical level                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Filters + Assignment Cards + Pagination           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Assignments Hero Banner */}
          <AssignmentsHero pendingCount={counts.pending} />

          {/* 2. Assignment Filter & Tab Bar */}
          <AssignmentFilters
            activeTab={activeTab}
            onTabChange={handleTabChange}
            counts={counts}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedSubject={selectedSubject}
            onSubjectChange={handleSubjectChange}
          />

          {/* 3. Assignment Cards List (Paginated - max 6 cards per page) */}
          <div id="assignment-list-container" className="space-y-3.5">
            <AssignmentList
              assignments={paginatedAssignments}
              onViewDetails={(item) => setSelectedAssignment(item)}
              onToggleStatus={handleToggleStatus}
              onDownloadResources={(title) =>
                showToast(`Downloading resources for "${title}"...`)
              }
            />

            {/* 4. Pagination Controls (Directly below cards; hidden when filtered items <= 6) */}
            {filteredAssignments.length > ITEMS_PER_PAGE && (
              <AssignmentPagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalItems={filteredAssignments.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  const el = document.getElementById("assignment-list-container");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at TOP beside Assignments Hero                  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* 1. Upcoming Deadlines Card */}
          <UpcomingDeadlinesCard onSelectAssignment={handleSelectUpcoming} />

          {/* 2. Submission Stats Card */}
          <SubmissionStatsCard />

          {/* 3. Assignment Calendar Card */}
          <AssignmentCalendarCard
            onDateSelect={(day) =>
              showToast(`Selected August ${day}, 2025 deadlines.`)
            }
          />

          {/* 4. Quick Actions Card */}
          <QuickActionsCard onAction={handleQuickAction} />
        </div>
      </div>

      {/* Assignment Details & Submission Modal */}
      {selectedAssignment && (
        <AssignmentDetailsModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onSubmitWork={(id) => {
            handleToggleStatus(id);
            setSelectedAssignment(null);
          }}
        />
      )}

      {/* Quick Action Upload Assignment Modal */}
      <UploadAssignmentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
        subjects={SUBJECTS_LIST.filter((s) => s !== "All Subjects")}
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
