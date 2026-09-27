"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Info,
  Calendar,
  FolderGit2,
  Users2,
  CheckCircle2,
} from "lucide-react";

import CommunityGroupHero from "./CommunityGroupHero";
import CommunityGroupAbout from "./CommunityGroupAbout";
import CommunityGroupFeed from "./CommunityGroupFeed";
import CommunityGroupEvents from "./CommunityGroupEvents";
import CommunityGroupProjects from "./CommunityGroupProjects";
import CommunityGroupMembers from "./CommunityGroupMembers";
import CommunityGroupSidebar from "./CommunityGroupSidebar";
import RequestToJoinModal from "./RequestToJoinModal";
import LeaveCommunityConfirmModal from "./LeaveCommunityConfirmModal";
import ReportCommunityModal from "./ReportCommunityModal";
import AllMembersModal from "./AllMembersModal";
import {
  getCommunityMembershipState,
  saveCommunityMembership,
  getRelatedCommunities,
} from "./communityGroupData";

export default function CommunityGroupAssembler({ initialCommunity }) {
  const [community, setCommunity] = useState(initialCommunity);
  const [activeTab, setActiveTab] = useState("feed"); // 'feed' | 'about' | 'events' | 'projects' | 'members'
  
  // Membership & follow state
  const [membershipStatus, setMembershipStatus] = useState(
    initialCommunity.membershipStatus || "not_joined"
  );
  const [isFollowing, setIsFollowing] = useState(
    initialCommunity.isFollowing || false
  );
  const [memberCount, setMemberCount] = useState(initialCommunity.memberCount);

  // Modals state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAllMembersModalOpen, setIsAllMembersModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync with local storage on mount
  useEffect(() => {
    if (!initialCommunity?.id) return;
    const local = getCommunityMembershipState(initialCommunity.id);
    if (local) {
      if (local.status) setMembershipStatus(local.status);
      if (typeof local.isFollowing === "boolean") setIsFollowing(local.isFollowing);
    }
  }, [initialCommunity?.id]);

  // Handle Join click
  const handleJoinClick = () => {
    if (community.membershipType === "Request") {
      setIsRequestModalOpen(true);
    } else if (community.membershipType === "Closed") {
      showToast("Membership for this club is currently closed.");
    } else {
      // Direct open join
      setMembershipStatus("joined");
      setMemberCount((prev) => prev + 1);
      saveCommunityMembership(community.id, {
        status: "joined",
        role: "member",
        isFollowing: true,
      });
      setIsFollowing(true);
      showToast(`Welcome! You are now a member of ${community.name}.`);
    }
  };

  // Handle Request submission
  const handleRequestSubmit = (data) => {
    setMembershipStatus("requested");
    saveCommunityMembership(community.id, {
      status: "requested",
      requestData: data,
    });
    showToast("Application submitted! The organizers will review your request.");
  };

  // Handle Leave confirm
  const handleLeaveConfirm = () => {
    setMembershipStatus("not_joined");
    setMemberCount((prev) => Math.max(0, prev - 1));
    saveCommunityMembership(community.id, {
      status: "not_joined",
      role: null,
    });
    showToast(`You have left ${community.name}.`);
  };

  // Handle Follow toggle
  const handleFollowToggle = () => {
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    saveCommunityMembership(community.id, {
      isFollowing: nextState,
    });
    showToast(
      nextState
        ? `Following ${community.name} updates.`
        : `Unfollowed ${community.name}.`
    );
  };

  // Handle Report submitted
  const handleReportSubmitted = (reason) => {
    showToast(`Report received. Thank you for notifying us.`);
  };

  const relatedCommunities = getRelatedCommunities(community.id, 4);

  const TABS = [
    { id: "feed", label: "Discussions & Posts", icon: MessageSquare, count: community.posts?.length || 0 },
    { id: "about", label: "About", icon: Info },
    { id: "events", label: "Events", icon: Calendar, count: community.events?.length || 0 },
    { id: "projects", label: "Projects", icon: FolderGit2, count: community.projects?.length || 0 },
    { id: "members", label: "Members", icon: Users2, count: memberCount },
  ];

  return (
    <div className="min-h-screen bg-[#F1FAF6] dark:bg-[#021512] text-emerald-950 dark:text-emerald-50 transition-colors py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-900 text-white dark:bg-emerald-800 rounded-2xl shadow-2xl border border-emerald-700/50 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Compact Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/student/feed"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900/70 dark:text-emerald-100/70 hover:text-emerald-950 dark:hover:text-emerald-50 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Campus Feed</span>
          </Link>

          <span className="text-[11px] font-medium text-emerald-800/60 dark:text-emerald-100/50 hidden sm:inline-block">
            Campus Hub / {community.category} / {community.name}
          </span>
        </div>

        {/* Community Hero */}
        <CommunityGroupHero
          community={community}
          membershipStatus={membershipStatus}
          isFollowing={isFollowing}
          memberCount={memberCount}
          onJoinClick={handleJoinClick}
          onLeaveClick={() => setIsLeaveModalOpen(true)}
          onFollowToggle={handleFollowToggle}
          onReportClick={() => setIsReportModalOpen(true)}
          onShareClick={() => showToast("Community link copied to clipboard!")}
        />

        {/* 2/3 Main Content + 1/3 Sticky Right Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main 2/3 Column */}
          <main className="lg:col-span-2 space-y-6">
            {/* Interactive Tab Navigation Bar */}
            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-sm">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-emerald-900/70 dark:text-emerald-100/70 hover:text-emerald-950 dark:hover:text-emerald-50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {typeof tab.count === "number" && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-emerald-950/5 dark:bg-emerald-500/10 text-emerald-900/60 dark:text-emerald-100/60"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <div className="space-y-6">
              {activeTab === "feed" && (
                <CommunityGroupFeed
                  communityId={community.id}
                  communityName={community.name}
                  posts={community.posts || []}
                  announcements={community.announcements || []}
                  canPost={membershipStatus === "joined"}
                  onJoinPrompt={handleJoinClick}
                />
              )}

              {activeTab === "about" && (
                <CommunityGroupAbout community={community} />
              )}

              {activeTab === "events" && (
                <CommunityGroupEvents
                  events={community.events || []}
                  communityName={community.name}
                />
              )}

              {activeTab === "projects" && (
                <CommunityGroupProjects
                  projects={community.projects || []}
                  communityName={community.name}
                />
              )}

              {activeTab === "members" && (
                <CommunityGroupMembers
                  members={community.members || []}
                  memberCount={memberCount}
                  onViewAll={() => setIsAllMembersModalOpen(true)}
                />
              )}
            </div>
          </main>

          {/* Right 1/3 Sidebar */}
          <aside className="lg:sticky lg:top-20 space-y-6">
            <CommunityGroupSidebar
              community={community}
              membershipStatus={membershipStatus}
              isFollowing={isFollowing}
              memberCount={memberCount}
              onJoinClick={handleJoinClick}
              onLeaveClick={() => setIsLeaveModalOpen(true)}
              onFollowToggle={handleFollowToggle}
              onViewAllMembers={() => setIsAllMembersModalOpen(true)}
              relatedCommunities={relatedCommunities}
            />
          </aside>
        </div>
      </div>

      {/* Modals */}
      <RequestToJoinModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleRequestSubmit}
        communityName={community.name}
      />

      <LeaveCommunityConfirmModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleLeaveConfirm}
        communityName={community.name}
        role={community.userRole}
      />

      <ReportCommunityModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        communityName={community.name}
        onReportSubmitted={handleReportSubmitted}
      />

      <AllMembersModal
        isOpen={isAllMembersModalOpen}
        onClose={() => setIsAllMembersModalOpen(false)}
        members={community.members || []}
        communityName={community.name}
      />
    </div>
  );
}
