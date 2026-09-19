"use client";

import WelcomeHero from "./WelcomeHero";
import SummaryStatCards from "./SummaryStatCards";
import TodayTimetable from "./TodayTimetable";
import UpcomingAssignments from "./UpcomingAssignments";
import AttendanceOverview from "./AttendanceOverview";
import AcademicPerformance from "./AcademicPerformance";
import StudentProjects from "./StudentProjects";
import RecentNotices from "./RecentNotices";
import UpcomingEvents from "./UpcomingEvents";
import RecommendedOpportunities from "./RecommendedOpportunities";
import InternshipPromoBanner from "./InternshipPromoBanner";

import StudentProfileCard from "./StudentProfileCard";
import CampusAICard from "./CampusAICard";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import CollegeJourneyCard from "./CollegeJourneyCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-3.5 2xl:gap-4 w-full max-w-[1720px] mx-auto pb-6">
      {/* ========================================================================= */}
      {/* CENTER / MAIN DASHBOARD AREA (~72-75% on Desktop)                         */}
      {/* ========================================================================= */}
      <div className="flex-1 min-w-0 w-full space-y-3.5">
        {/* 1. Hero / Welcome Section */}
        <WelcomeHero />

        {/* 2. Key Metrics Summary Stat Cards */}
        <SummaryStatCards />

        {/* 3. Main Content Row: Today's Timetable + Upcoming Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <TodayTimetable />
          <UpcomingAssignments />
        </div>

        {/* 4. Lower Main Dashboard Row: Attendance + Performance + Student Projects (Replaces "My Wants") */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          <AttendanceOverview />
          <AcademicPerformance />
          <StudentProjects />
        </div>

        {/* 5. Lower Information Section: Notices + Events + Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          <RecentNotices />
          <UpcomingEvents />
          <RecommendedOpportunities />
        </div>

        {/* 6. Bottom Feature Promotional Banner */}
        <InternshipPromoBanner />
      </div>

      {/* ========================================================================= */}
      {/* RIGHT UTILITY PANEL (~25-28% on Desktop, stacks on Tablet / Mobile)        */}
      {/* ========================================================================= */}
      <div className="w-full xl:w-[310px] 2xl:w-[330px] shrink-0 space-y-3.5">
        {/* 1. Student Profile Card */}
        <StudentProfileCard />

        {/* 2. Campus AI Assistant Widget */}
        <CampusAICard />

        {/* 3. Quick Actions 2x3 Grid */}
        <QuickActions />

        {/* 4. Recent Activity Feed */}
        <RecentActivity />

        {/* 5. College OS Branding / Journey Card */}
        <CollegeJourneyCard />
      </div>
    </div>
  );
}
