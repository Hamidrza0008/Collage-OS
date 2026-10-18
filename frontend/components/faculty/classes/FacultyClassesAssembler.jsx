"use client";

import React from "react";
import ClassesHeroBanner from "./ClassesHeroBanner";
import ClassesKPICards from "./ClassesKPICards";
import AssignedClassesList from "./AssignedClassesList";
import ClassesSidebarToday from "./ClassesSidebarToday";
import ClassesQuickActions from "./ClassesQuickActions";
import ClassesTeachingResources from "./ClassesTeachingResources";
import ClassesFooter from "./ClassesFooter";

export default function FacultyClassesAssembler() {
  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-6">
      {/* 1. Hero Banner */}
      <ClassesHeroBanner />

      {/* 2. 4 Top KPI Metric Cards */}
      <ClassesKPICards />

      {/* 3. 2-Column Grid: Assigned Classes (Left) & Sidebar (Right) */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Assigned Classes Section */}
        <div className="flex-1 w-full min-w-0">
          <AssignedClassesList />
        </div>

        {/* Right Column: Today's Classes, Quick Actions, Teaching Resources */}
        <div className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0 space-y-5 sm:space-y-6">
          <ClassesSidebarToday />
          <ClassesQuickActions />
          <ClassesTeachingResources />
        </div>
      </div>

      {/* 4. Footer with Breadcrumb and Better Teachers Better Tomorrow slogan */}
      <ClassesFooter />
    </div>
  );
}
