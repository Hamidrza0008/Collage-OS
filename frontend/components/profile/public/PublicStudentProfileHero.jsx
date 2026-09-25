'use client';

import React from 'react';
import Image from 'next/image';
import {
  CheckCircle,
  Building2,
  GraduationCap,
  Calendar,
  Share2,
  MessageSquare,
  UserPlus,
  UserCheck,
  Sparkles,
  ShieldCheck,
  FolderGit2,
  Award,
  Users
} from 'lucide-react';
import { useTheme } from '../../providers/ThemeProvider';

export default function PublicStudentProfileHero({
  profile,
  isConnected,
  isConnecting,
  onConnect,
  onMessage,
  onShare,
  onOpenFollowers,
}) {
  const { isDark } = useTheme();

  return (
    <section
      aria-label="Public Profile Hero"
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-card border border-[#D8E8E2]/80 dark:border-[#16463D]/80 bg-white dark:bg-[#06241F] transition-all"
    >
      {/* Background Campus Banner with Subtle Gradient */}
      <div className="relative h-36 sm:h-44 md:h-52 w-full overflow-hidden bg-gradient-to-r from-emerald-900 via-[#0A3029] to-[#041D18]">
        <Image
          src={isDark ? '/assets/profile/dark/hero-campus.jpg' : '/assets/profile/light/hero-campus.jpg'}
          alt="Campus Banner"
          fill
          priority
          className="object-cover object-center opacity-40 dark:opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges: Verification & Campus ID */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {profile.isVerified && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Campus Student
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative px-5 sm:px-8 pb-6 md:pb-8 pt-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-16 sm:-mt-20">
          {/* Avatar and Basic Identity */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5">
            {/* Avatar with Glow and Ring */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white dark:border-[#06241F] shadow-xl shrink-0 bg-emerald-100 dark:bg-[#0A3029]">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-emerald-700 dark:text-[#20D39B]">
                  {profile.name?.slice(0, 2).toUpperCase() || 'ST'}
                </div>
              )}
            </div>

            {/* Name, Handle & Headline */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-[#F1FAF6] tracking-tight">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <CheckCircle
                    className="w-5 h-5 text-emerald-500 fill-emerald-500/20 shrink-0"
                    title="Verified Student"
                  />
                )}
                {profile.username && (
                  <span className="text-xs sm:text-sm font-mono text-gray-500 dark:text-[#A7C7BC]">
                    {profile.username}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-[#20D39B]">
                {profile.headline || `${profile.branch} Student • Engineering`}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-[#A7C7BC] pt-0.5">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                  {profile.department || 'Computer Science'}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                  {profile.semester} &bull; Batch {profile.batch}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions (Connect / Message / Share) */}
          <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0">
            {/* Connect / Connected Button */}
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-[0.98] ${
                isConnected
                  ? 'bg-emerald-50 dark:bg-[#10372F] text-emerald-700 dark:text-[#20D39B] border border-emerald-300 dark:border-[#159B72]'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              }`}
            >
              {isConnected ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
                </>
              )}
            </button>

            {/* Message Action */}
            <button
              onClick={onMessage}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-gray-200 dark:border-[#16463D] text-gray-700 dark:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-[#10372F]/50 flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Message</span>
            </button>

            {/* Share Profile */}
            <button
              onClick={onShare}
              aria-label="Share Profile"
              className="p-2.5 rounded-xl border border-gray-200 dark:border-[#16463D] text-gray-600 dark:text-[#A7C7BC] hover:text-emerald-600 dark:hover:text-[#20D39B] hover:bg-gray-50 dark:hover:bg-[#10372F]/50 transition-colors"
              title="Share profile link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quote / Tagline Pill */}
        {profile.quote && (
          <div className="mt-5 p-3 rounded-xl bg-gray-50 dark:bg-[#021512]/60 border border-gray-100 dark:border-[#10372F]/60 flex items-center gap-2.5 text-xs text-gray-600 dark:text-[#A7C7BC]">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="italic font-medium">&ldquo;{profile.quote}&rdquo;</span>
          </div>
        )}

        {/* Public Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-[#10372F]/60">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/70 dark:bg-[#021512]/40">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-[#F1FAF6]">
                {profile.stats?.projects ?? profile.projects?.length ?? 0}
              </p>
              <span className="text-[11px] text-gray-500 dark:text-[#A7C7BC]">Public Projects</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/70 dark:bg-[#021512]/40">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-[#F1FAF6]">
                {profile.stats?.achievements ?? profile.achievements?.length ?? 0}
              </p>
              <span className="text-[11px] text-gray-500 dark:text-[#A7C7BC]">Achievements</span>
            </div>
          </div>

          <button
            onClick={() => onOpenFollowers && onOpenFollowers('followers')}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/70 dark:bg-[#021512]/40 text-left hover:bg-emerald-50/50 dark:hover:bg-[#10372F]/40 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-[#F1FAF6]">
                {profile.stats?.followers ?? 0}
              </p>
              <span className="text-[11px] text-gray-500 dark:text-[#A7C7BC]">Followers</span>
            </div>
          </button>

          <button
            onClick={() => onOpenFollowers && onOpenFollowers('following')}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/70 dark:bg-[#021512]/40 text-left hover:bg-emerald-50/50 dark:hover:bg-[#10372F]/40 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-[#F1FAF6]">
                {profile.stats?.following ?? 0}
              </p>
              <span className="text-[11px] text-gray-500 dark:text-[#A7C7BC]">Following</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
