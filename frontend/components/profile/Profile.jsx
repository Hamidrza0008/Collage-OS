"use client";

import { useState } from "react";
import ProfileHero from "./ProfileHero";
import ProfileTabs from "./ProfileTabs";
import AboutMeCard from "./AboutMeCard";
import QuickInfoCard from "./QuickInfoCard";
import ProfileStats from "./ProfileStats";
import UpcomingAssignmentsCard from "./UpcomingAssignmentsCard";
import RecentActivityCard from "./RecentActivityCard";
import BadgesAchievementsCard from "./BadgesAchievementsCard";
import SkillsCard from "./SkillsCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import SocialLinksCard from "./SocialLinksCard";
import PersonalInterestsCard from "./PersonalInterestsCard";
import CampusAIPromoCard from "./CampusAIPromoCard";
import { PROFILE_DATA } from "./profileData";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const data = PROFILE_DATA;

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-10">
      {/* Two-Column Master Grid from the very top (Left ~2/3, Right ~1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* ======================================================== */}
        {/* LEFT / CENTER COLUMN (~2/3 width -> lg:col-span-8)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-4.5">
          {/* 1. Profile Hero (starts at the exact same top position as ProfileCompletion) */}
          <ProfileHero user={data.user} />

          {/* 2. Horizontal Profile Tabs (Overview, About, Skills...) */}
          <ProfileTabs
            tabs={data.tabs}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />

          {/* 3. Row 1: About Me (left) + Quick Info (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <AboutMeCard about={data.about} />
            <QuickInfoCard info={data.quickInfo} />
          </div>

          {/* 4. Row 2: Profile Statistics (left 3 cards) + Upcoming Assignments (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <ProfileStats stats={data.stats} />
            <UpcomingAssignmentsCard data={data.upcomingAssignments} />
          </div>

          {/* 5. Row 3: Recent Activity (left) + (Badges & Achievements + Skills on right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            <RecentActivityCard activities={data.recentActivity} />

            <div className="space-y-4 sm:space-y-4.5">
              <BadgesAchievementsCard achievements={data.achievements} />
              <SkillsCard skills={data.skills} />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SIDEBAR COLUMN (~1/3 width -> lg:col-span-4)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-4.5">
          {/* 1. Profile Completion (starts at the exact same top position as ProfileHero) */}
          <ProfileCompletionCard completion={data.completion} />

          {/* 2. Social Links */}
          <SocialLinksCard links={data.socialLinks} />

          {/* 3. Personal Interests */}
          <PersonalInterestsCard interests={data.interests} />

          {/* 4. Campus AI Promotional Card */}
          <CampusAIPromoCard promo={data.campusAiPromo} />
        </div>
      </div>
    </div>
  );
}
