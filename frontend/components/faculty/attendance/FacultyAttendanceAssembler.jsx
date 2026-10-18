"use client";

import React, { useState } from "react";
import AttendanceHeroBanner from "./AttendanceHeroBanner";
import AttendanceKPICards from "./AttendanceKPICards";
import AttendanceClassesList from "./AttendanceClassesList";
import AttendanceSummaryTable from "./AttendanceSummaryTable";
import AttendanceOverviewCard from "./AttendanceOverviewCard";
import AttendanceQuickActions from "./AttendanceQuickActions";
import AttendanceTodayClasses from "./AttendanceTodayClasses";
import AttendanceMarkModal from "./AttendanceMarkModal";
import { CheckCircle2 } from "lucide-react";

export default function FacultyAttendanceAssembler() {
  const [activeMarkClass, setActiveMarkClass] = useState(null);
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
      <AttendanceHeroBanner />

      {/* 2. Top 4 KPI Metrics */}
      <AttendanceKPICards />

      {/* 3. 2-Column Layout: Left (Classes & Summary Table) + Right (Overview, Quick Actions, Today's Classes) */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column (Main Section) */}
        <div className="flex-1 w-full space-y-5 sm:space-y-6 min-w-0">
          <AttendanceClassesList onMarkAttendance={(cls) => setActiveMarkClass(cls)} />
          <AttendanceSummaryTable />
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0 space-y-5 sm:space-y-6">
          <AttendanceOverviewCard />
          <AttendanceQuickActions
            onTakeAttendanceClick={() =>
              setActiveMarkClass({
                id: "dsa",
                code: "CSE-301",
                shortName: "DSA",
                fullName: "Data Structures & Algorithms",
                batch: "Sem 5 • B.Tech CSE",
              })
            }
          />
          <AttendanceTodayClasses />
        </div>
      </div>

      {/* Mark Attendance Modal */}
      {activeMarkClass && (
        <AttendanceMarkModal
          activeClass={activeMarkClass}
          onClose={() => setActiveMarkClass(null)}
          onSaveSuccess={(msg) => showToast(msg)}
        />
      )}

      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063327] text-white border border-emerald-500/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
