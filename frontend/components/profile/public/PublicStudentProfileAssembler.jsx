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

export default function PublicStudentProfileAssembler({ profile, relatedStudents = [] }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'connect' | 'message' | 'followers' | 'following' | null
  const [toastMessage, setToastMessage] = useState(null);

  // Load connection state from localStorage
  useEffect(() => {
    if (!profile?.id) return;
    try {
      const connKey = `collegeos_conn_${profile.id}`;
      const saved = localStorage.getItem(connKey);
      if (saved === 'true') {
        setIsConnected(true);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, [profile?.id]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      try {
        localStorage.removeItem(`collegeos_conn_${profile.id}`);
      } catch {}
      showToast(`Disconnected from ${profile.name}`);
      return;
    }

    // Open connection modal to add note or connect directly
    setActiveModal('connect');
  };

  const handleConnectSubmit = (data) => {
    setIsConnected(true);
    try {
      localStorage.setItem(`collegeos_conn_${profile.id}`, 'true');
    } catch {}
    showToast(`Connection request sent to ${profile.name}!`);
  };

  const handleMessageSubmit = (data) => {
    showToast(`Message sent to ${profile.name}!`);
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
              profile={profile}
              isConnected={isConnected}
              isConnecting={isConnecting}
              onConnect={handleToggleConnect}
              onMessage={() => setActiveModal('message')}
              onShare={handleShare}
              onOpenFollowers={(type) => setActiveModal(type)}
            />

            {/* 2. About & Background */}
            <PublicProfileAbout profile={profile} />

            {/* 3. Skills & Technical Expertise */}
            <PublicProfileSkills skills={profile.skills} />

            {/* 4. Projects & Portfolio */}
            <PublicProfileProjects projects={profile.projects} />

            {/* 5. Achievements & Honors */}
            <PublicProfileAchievements achievements={profile.achievements} />

            {/* 6. Academic Identity Snapshot */}
            <PublicProfileAcademicSnapshot
              education={profile.education}
              department={profile.department}
              branch={profile.branch}
              semester={profile.semester}
              batch={profile.batch}
              college={profile.college}
            />

            {/* 7. Campus Contributions & Leadership */}
            <PublicProfileCampusContributions contributions={profile.campusContributions} />

            {/* 8. Activity / Campus Presence */}
            <PublicProfileActivity activity={profile.activity} />
          </main>

          {/* Right Sidebar Rail (1/3) - Sticky on Desktop */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-6">
            <PublicProfileUtilitySidebar
              profile={profile}
              isConnected={isConnected}
              isConnecting={isConnecting}
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
        profile={profile}
        isConnected={isConnected}
        isConnecting={isConnecting}
        onConnect={handleToggleConnect}
        onMessage={() => setActiveModal('message')}
        onShare={handleShare}
      />

      {/* Connect / Message Modal */}
      <ConnectMessageModal
        isOpen={activeModal === 'connect' || activeModal === 'message'}
        onClose={() => setActiveModal(null)}
        profile={profile}
        mode={activeModal === 'message' ? 'message' : 'connect'}
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
