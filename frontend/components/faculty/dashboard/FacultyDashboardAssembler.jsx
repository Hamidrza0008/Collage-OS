"use client";

import React from "react";
import FacultyHeroBanner from "./FacultyHeroBanner";
import FacultyKPICards from "./FacultyKPICards";
import FacultyTodaysClasses from "./FacultyTodaysClasses";
import FacultyClassOverview from "./FacultyClassOverview";
import FacultyStudentActivity from "./FacultyStudentActivity";
import FacultyPendingTasks from "./FacultyPendingTasks";
import FacultyRecentAnnouncements from "./FacultyRecentAnnouncements";
import FacultyUpcomingEvents from "./FacultyUpcomingEvents";
import FacultyAIAssistant from "./FacultyAIAssistant";
import FacultyQuickLinks from "./FacultyQuickLinks";
import FacultyNeedHelpCard from "./FacultyNeedHelpCard";
import { useAuth } from "@/components/providers/AuthProvider";

export default function FacultyDashboardAssembler() {
  const { user } = useAuth();
  const facultyName = user?.name ? (user.name.startsWith("Dr.") ? user.name : `Dr. ${user.name}`) : "Dr. Mehta";

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 2-Column Desktop Grid: Main Column (Hero + KPIs + Left/Middle sections) & Right Column (AI + Quick Links + Support) */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left & Center Main Stream */}
        <div className="flex-1 w-full space-y-5 sm:space-y-6 min-w-0">
          {/* 1. Hero Banner */}
          <FacultyHeroBanner name={facultyName} />

          {/* 2. Top 4 KPI Metrics */}
          <FacultyKPICards />

          {/* 3. Split 2-Column Widgets Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Left Sub-Column */}
            <div className="space-y-5 sm:space-y-6">
              <FacultyTodaysClasses />
              <FacultyClassOverview />
              <FacultyStudentActivity />
            </div>

            {/* Middle Sub-Column */}
            <div className="space-y-5 sm:space-y-6">
              <FacultyPendingTasks />
              <FacultyRecentAnnouncements />
              <FacultyUpcomingEvents />
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full xl:w-[320px] 2xl:w-[360px] shrink-0 space-y-5 sm:space-y-6">
          <FacultyAIAssistant />
          <FacultyQuickLinks />
          <FacultyNeedHelpCard />
        </div>
      </div>
    </div>
  );
}
