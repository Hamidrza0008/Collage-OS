"use client";

import React, { useState } from "react";
import AssignmentsHeroBanner from "./AssignmentsHeroBanner";
import AssignmentsKPICards from "./AssignmentsKPICards";
import AssignmentsTableSection from "./AssignmentsTableSection";
import AssignmentsQuickActions from "./AssignmentsQuickActions";
import AssignmentsUpcomingDeadlines from "./AssignmentsUpcomingDeadlines";
import AssignmentsAnalyticsCard from "./AssignmentsAnalyticsCard";
import AssignmentsAICard from "./AssignmentsAICard";
import CreateAssignmentModal from "./CreateAssignmentModal";
import AssignmentDetailsModal from "./AssignmentDetailsModal";
import { CheckCircle2 } from "lucide-react";

export default function FacultyAssignmentsAssembler() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 1. Hero Banner */}
      <AssignmentsHeroBanner />

      {/* 2. Top 4 KPI Metrics */}
      <AssignmentsKPICards />

      {/* 3. 2-Column Grid: Left (Assignments Table) + Right (Quick Actions, Deadlines, Analytics, AI) */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column (Main Section) */}
        <div className="flex-1 w-full min-w-0">
          <AssignmentsTableSection
            onSelectAssignment={(item) => setSelectedAssignment(item)}
          />
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0 space-y-5 sm:space-y-6">
          <AssignmentsQuickActions
            onCreateNewClick={() => setIsCreateModalOpen(true)}
          />
          <AssignmentsUpcomingDeadlines />
          <AssignmentsAnalyticsCard />
          <AssignmentsAICard />
        </div>
      </div>

      {/* Create New Assignment Modal */}
      <CreateAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(msg) => showToast(msg)}
      />

      {/* Assignment Details / Submissions Inspection Modal */}
      <AssignmentDetailsModal
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onToast={(msg) => showToast(msg)}
      />

      {/* Success Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063327] text-white border border-emerald-500/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
