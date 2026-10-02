'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import PublicStudentProfileHero from './PublicStudentProfileHero';
import PublicProfileAbout from './PublicProfileAbout';
import PublicProfileSkills from './PublicProfileSkills';
import PublicProfileProjects from './PublicProfileProjects';
import PublicProfileAchievements from './PublicProfileAchievements';
import PublicProfileAcademicSnapshot from './PublicProfileAcademicSnapshot';
import PublicProfileCampusContributions from './PublicProfileCampusContributions';
import PublicProfileActivity from './PublicProfileActivity';
import PublicProfileUtilitySidebar from './PublicProfileUtilitySidebar';
import MobilePublicProfileActionBar from './MobilePublicProfileActionBar';
import ConnectMessageModal from './ConnectMessageModal';
import FollowersModal from '../FollowersModal';
import {
  getPeerConnectionStatus,
  subscribeToPeerConnections,
  isSelfStudent,
} from '@/components/profile/peerConnectionStore';
import { loadProfileEditState } from '@/components/profile/edit/editProfileData';

export default function PublicStudentProfileAssembler({ profile, relatedStudents = [] }) {
  const [activeProfile, setActiveProfile] = useState(profile);
  const isSelf = isSelfStudent(profile?.id);
  const [connectionStatus, setConnectionStatus] = useState(() =>
    getPeerConnectionStatus(profile?.id)
  );
  const [activeModal, setActiveModal] = useState(null); // 'connect' | 'message' | 'followers' | 'following' | null
  const [toastMessage, setToastMessage] = useState(null);

  // Sync edits saved from /student/profile/edit for student-1
  useEffect(() => {
    if (!profile?.id || profile.id !== "student-1") return;

    const syncProfile = () => {
      try {
        const saved = loadProfileEditState();
        if (saved) {
          setActiveProfile((prev) => {
            const links = [];
            if (saved.socialLinks?.github) {
              links.push({
                platform: "GitHub",
                handle: saved.socialLinks.github.replace(/^https?:\/\//, ""),
                url: saved.socialLinks.github,
                type: "github",
              });
            }
            if (saved.socialLinks?.linkedin) {
              links.push({
                platform: "LinkedIn",
                handle: saved.socialLinks.linkedin.replace(/^https?:\/\//, ""),
                url: saved.socialLinks.linkedin,
                type: "linkedin",
              });
            }
            if (saved.socialLinks?.portfolio) {
              links.push({
                platform: "Portfolio",
                handle: saved.socialLinks.portfolio.replace(/^https?:\/\//, ""),
                url: saved.socialLinks.portfolio,
                type: "portfolio",
              });
            }

            return {
              ...prev,
              name: saved.name || prev.name,
              username: saved.username || prev.username,
              avatar: saved.avatar || prev.avatar,
              headline: saved.headline || prev.headline,
              quote: saved.quote || prev.quote,
              bio: saved.bio || prev.bio,
              careerFocus: saved.careerFocus || prev.careerFocus,
              interests: saved.interests || prev.interests,
              skills: saved.skills || prev.skills,
              projects: saved.projects || prev.projects,
              achievements: saved.achievements || prev.achievements,
              campusContributions: saved.campusContributions || prev.campusContributions,
              socialLinks: links.length > 0 ? links : prev.socialLinks,
            };
          });
        }
      } catch {}
    };

    syncProfile();
    window.addEventListener("college_os_profile_updated", syncProfile);
    window.addEventListener("storage", syncProfile);

    return () => {
      window.removeEventListener("college_os_profile_updated", syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, [profile?.id]);

  // Load and subscribe to connection state from peerConnectionStore
  useEffect(() => {
    if (!profile?.id || isSelf) return;
    setConnectionStatus(getPeerConnectionStatus(profile.id));

    const unsubscribe = subscribeToPeerConnections((detail) => {
      if (!detail?.targetStudentId || detail.targetStudentId === profile.id) {
        setConnectionStatus(getPeerConnectionStatus(profile.id));
      }
    });

    return () => unsubscribe();
  }, [profile?.id, isSelf]);

  const isConnected = connectionStatus === 'connected';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleConnect = () => {
    if (isSelf) return;
    setActiveModal('connect');
  };

  const handleConnectSubmit = (data) => {
    showToast(`Connection request sent to ${profile.name}!`);
  };

  const handleMessageSubmit = (data) => {
    showToast(`Message delivered to ${profile.name}!`);
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: `${profile.name} - Student Profile on College OS`,
      text: `${profile.headline} at ${profile.college}`,
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        showToast('Profile link copied to clipboard!');
      } catch {
        showToast('Unable to copy profile link.');
      }
    } else {
      showToast('Profile link copied!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#021512] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-6">
        {/* Compact Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/student/feed"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 dark:text-[#A7C7BC] dark:hover:text-[#20D39B] transition-colors py-1 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Campus Feed</span>
          </Link>

          <span className="text-xs font-mono text-gray-400 dark:text-[#10372F] hidden sm:inline">
            Campus ID: {profile.id}
          </span>
        </div>

        {/* Master Desktop Grid: 2/3 Main Content + 1/3 Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Column (2/3) */}
          <main className="lg:col-span-2 space-y-6">
            {/* 1. Public Profile Hero */}
            <PublicStudentProfileHero
              profile={activeProfile}
              isConnected={isConnected}
              connectionStatus={connectionStatus}
              isSelf={isSelf}
              onConnect={handleToggleConnect}
              onMessage={() => setActiveModal('message')}
              onShare={handleShare}
              onOpenFollowers={(type) => setActiveModal(type)}
            />

            {/* 2. About & Background */}
            <PublicProfileAbout profile={activeProfile} />

            {/* 3. Skills & Technical Expertise */}
            <PublicProfileSkills skills={activeProfile.skills} />

            {/* 4. Projects & Portfolio */}
            <PublicProfileProjects projects={activeProfile.projects} />

            {/* 5. Achievements & Honors */}
            <PublicProfileAchievements achievements={activeProfile.achievements} />

            {/* 6. Academic Identity Snapshot */}
            <PublicProfileAcademicSnapshot
              education={activeProfile.education}
              department={activeProfile.department}
              branch={activeProfile.branch}
              semester={activeProfile.semester}
              batch={activeProfile.batch}
              college={activeProfile.college}
            />

            {/* 7. Campus Contributions & Leadership */}
            <PublicProfileCampusContributions contributions={activeProfile.campusContributions} />

            {/* 8. Activity / Campus Presence */}
            <PublicProfileActivity activity={activeProfile.activity} />
          </main>

          {/* Right Sidebar Rail (1/3) - Sticky on Desktop */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-6">
            <PublicProfileUtilitySidebar
              profile={activeProfile}
              isConnected={isConnected}
              connectionStatus={connectionStatus}
              isSelf={isSelf}
              onConnect={handleToggleConnect}
              onMessage={() => setActiveModal('message')}
              onShare={handleShare}
              onOpenFollowers={(type) => setActiveModal(type)}
              relatedStudents={relatedStudents}
            />
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <MobilePublicProfileActionBar
        profile={activeProfile}
        isConnected={isConnected}
        connectionStatus={connectionStatus}
        isSelf={isSelf}
        onConnect={handleToggleConnect}
        onMessage={() => setActiveModal('message')}
        onShare={handleShare}
      />

      {/* Connect / Message Modal */}
      <ConnectMessageModal
        isOpen={activeModal === 'connect' || activeModal === 'message'}
        onClose={() => setActiveModal(null)}
        profile={activeProfile}
        mode={activeModal === 'message' ? 'message' : 'connect'}
        sourceContext="profile"
        onSend={activeModal === 'message' ? handleMessageSubmit : handleConnectSubmit}
      />

      {/* Reused Followers / Following Modal */}
      <FollowersModal
        isOpen={activeModal === 'followers' || activeModal === 'following'}
        onClose={() => setActiveModal(null)}
        type={activeModal || 'followers'}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white dark:bg-[#06241F] dark:text-[#D8E8E2] border border-gray-700 dark:border-[#10372F] shadow-xl text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
