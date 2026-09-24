"use client";

import { useState, useEffect, useRef } from "react";
import ProfileHero from "./ProfileHero";
import ProfileTabs from "./ProfileTabs";
import AboutMeCard from "./AboutMeCard";
import QuickInfoCard from "./QuickInfoCard";
import ProfileStats from "./ProfileStats";
import UpcomingAssignmentsCard from "./UpcomingAssignmentsCard";
import RecentActivityCard from "./RecentActivityCard";
import BadgesAchievementsCard from "./BadgesAchievementsCard";
import SkillsCard from "./SkillsCard";
import ProfileProjectsCard from "./ProfileProjectsCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import SocialLinksCard from "./SocialLinksCard";
import PersonalInterestsCard from "./PersonalInterestsCard";
import CampusAIPromoCard from "./CampusAIPromoCard";
import { CheckCircle2 } from "lucide-react";
import { PROFILE_DATA } from "./profileData";
import ProfileSkeleton from "./ProfileSkeleton";
import EditQuoteModal from "./EditQuoteModal";
import FollowersModal from "./FollowersModal";
import { EditProfileModal } from "../settings/SettingsModals";

const TAB_TO_ID = {
  Overview: "profile-overview",
  About: "profile-about",
  Skills: "profile-skills",
  Projects: "profile-projects",
  Achievements: "profile-achievements",
  Activity: "profile-activity",
};

export default function Profile({ isLoading = false }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [userProfile, setUserProfile] = useState(PROFILE_DATA.user);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditQuoteOpen, setIsEditQuoteOpen] = useState(false);
  const [followersModal, setFollowersModal] = useState({ isOpen: false, type: "followers" });
  const [toastMessage, setToastMessage] = useState(null);

  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);
  const data = PROFILE_DATA;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setUserProfile((prev) => ({ ...prev, avatar: newAvatarUrl }));
    showToast("Profile avatar updated successfully!");
  };

  const handleSaveQuote = (newQuote) => {
    setUserProfile((prev) => ({ ...prev, quote: newQuote }));
    showToast("Profile quote updated successfully!");
  };

  const handleSaveProfile = (updatedData) => {
    setUserProfile((prev) => ({
      ...prev,
      name: updatedData.name,
      branch: updatedData.branch,
      semester: updatedData.semester,
      phone: updatedData.phone,
    }));
    showToast("Profile details updated successfully!");
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    isProgrammaticScroll.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    if (tab === "Overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetId = TAB_TO_ID[tab];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      // When near the top, default to Overview
      if (window.scrollY < 180) {
        setActiveTab("Overview");
        return;
      }

      const sections = [
        { tab: "About", id: "profile-about" },
        { tab: "Projects", id: "profile-projects" },
        { tab: "Activity", id: "profile-activity" },
        { tab: "Achievements", id: "profile-achievements" },
        { tab: "Skills", id: "profile-skills" },
      ];

      let currentActive = null;
      let minDistance = Infinity;

      for (const { tab, id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (rect.top <= 280 && rect.bottom > 60) {
            if (distance < minDistance) {
              minDistance = distance;
              currentActive = tab;
            }
          }
        }
      }

      if (currentActive) {
        setActiveTab(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div id="profile-overview" className="w-full max-w-[1440px] mx-auto pb-10 scroll-mt-24">
      {/* Two-Column Master Grid from the very top (Left ~2/3, Right ~1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* ======================================================== */}
        {/* LEFT / CENTER COLUMN (~2/3 width -> lg:col-span-8)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-4.5">
          {/* 1. Profile Hero (starts at the exact same top position as ProfileCompletion) */}
          <ProfileHero
            user={userProfile}
            onAvatarChange={handleAvatarChange}
            onEditQuote={() => setIsEditQuoteOpen(true)}
            onEditProfile={() => setIsEditProfileOpen(true)}
            onOpenFollowers={(type) => setFollowersModal({ isOpen: true, type })}
            onSelectTab={handleSelectTab}
          />

          {/* 2. Horizontal Profile Tabs (Overview, About, Skills, Projects, Achievements, Activity) */}
          <ProfileTabs
            tabs={data.tabs}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
          />

          {/* 3. Row 1: About Me (left, scroll target for About) + Quick Info (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <div id="profile-about" className="scroll-mt-24 flex flex-col">
              <AboutMeCard about={data.about} />
            </div>
            <div className="flex flex-col">
              <QuickInfoCard info={data.quickInfo} />
            </div>
          </div>

          {/* 4. Row 2: Profile Statistics (left 3 cards) + Upcoming Assignments (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <div className="flex flex-col">
              <ProfileStats stats={data.stats} />
            </div>
            <div className="flex flex-col">
              <UpcomingAssignmentsCard data={data.upcomingAssignments} />
            </div>
          </div>

          {/* 5. Projects Section (Scroll target for Projects tab) */}
          <div id="profile-projects" className="scroll-mt-24">
            <ProfileProjectsCard
              projects={data.projects}
              onProjectClick={(proj) => {
                showToast(`Project details for "${proj.title}" will open here in Phase 1.`);
              }}
            />
          </div>

          {/* 6. Lower Row: Recent Activity (left, target for Activity) + Badges (target for Achievements) & Skills (target for Skills) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            <div id="profile-activity" className="scroll-mt-24">
              <RecentActivityCard activities={data.recentActivity} />
            </div>

            <div className="space-y-4 sm:space-y-4.5">
              <div id="profile-achievements" className="scroll-mt-24">
                <BadgesAchievementsCard achievements={data.achievements} />
              </div>
              <div id="profile-skills" className="scroll-mt-24">
                <SkillsCard skills={data.skills} />
              </div>
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={{
          name: userProfile.name,
          branch: userProfile.branch,
          semester: userProfile.semester,
          phone: userProfile.phone || "+91 98765 43210",
        }}
        onSave={handleSaveProfile}
      />

      {/* Edit Quote Modal */}
      <EditQuoteModal
        isOpen={isEditQuoteOpen}
        currentQuote={userProfile.quote}
        onClose={() => setIsEditQuoteOpen(false)}
        onSave={handleSaveQuote}
      />

      {/* Followers & Following Modal */}
      <FollowersModal
        isOpen={followersModal.isOpen}
        type={followersModal.type}
        onClose={() => setFollowersModal({ isOpen: false, type: "followers" })}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#06241F] text-white dark:bg-[#20D39B] dark:text-[#06241F] text-xs font-semibold shadow-xl border border-white/10 dark:border-black/10 animate-fade-in pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#06241F] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
