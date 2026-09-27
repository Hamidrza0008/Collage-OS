"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  Calendar,
  Share2,
  UserPlus,
  UserCheck,
  Clock,
  MoreHorizontal,
  Flag,
  Sparkles,
  MapPin,
  Building2,
} from "lucide-react";

export default function CommunityGroupHero({
  group,
  onJoinClick,
  onFollowToggle,
  onShare,
  onOpenReport,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isJoined = group.membershipStatus === "joined";
  const isRequested = group.membershipStatus === "requested";

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] overflow-hidden shadow-xs">
      {/* Top Back Navigation Bar */}
      <div className="px-5 py-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
        <Link
          href="/student/feed"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Campus Feed</span>
        </Link>

        <span className="text-[11px] font-semibold text-[#658278] dark:text-[#789991]">
          {group.officialStatus || "Campus Community"}
        </span>
      </div>

      {/* Cover Image Banner */}
      <div className="relative w-full h-40 sm:h-52 bg-[#021512] overflow-hidden">
        {group.coverImage ? (
          <Image
            src={group.coverImage}
            alt={group.name}
            fill
            className="object-cover opacity-85"
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-[#0B3024] to-[#159B72] opacity-80" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category Pill on Banner */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#06241F]/80 backdrop-blur-md text-[#20D39B] border border-[#20D39B]/30 shadow-xs">
            {group.category}
          </span>
        </div>
      </div>

      {/* Community Identity & Actions Area */}
      <div className="px-5 sm:px-7 pb-6 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
          {/* Logo Avatar */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-[#06241F] shadow-md bg-white dark:bg-[#082A24] shrink-0">
            {group.logo ? (
              <Image
                src={group.logo}
                alt={group.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] font-bold text-xl">
                {group.shortName?.slice(0, 2) || "CG"}
              </div>
            )}
          </div>

          {/* Action Buttons: Join, Follow, Share, More */}
          <div className="flex items-center flex-wrap gap-2 self-start sm:self-end">
            {/* Join / Requested / Joined Button */}
            <button
              type="button"
              onClick={onJoinClick}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isJoined
                  ? "bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/30 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                  : isRequested
                  ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/40"
                  : "bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] hover:bg-[#0E7A58] dark:hover:bg-[#18B885]"
              }`}
            >
              {isJoined ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Joined</span>
                </>
              ) : isRequested ? (
                <>
                  <Clock className="w-3.5 h-3.5" />
                  <span>Request Sent</span>
                </>
              ) : group.membershipType === "Request" ? (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Request to Join</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Join Community</span>
                </>
              )}
            </button>

            {/* Follow / Following Button */}
            <button
              type="button"
              onClick={onFollowToggle}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                group.isFollowing
                  ? "bg-[#F7FBF9] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border-[#D8E8E2] dark:border-[#10372F]"
                  : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#A3BFB5] border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24]"
              }`}
            >
              {group.isFollowing ? "Following" : "Follow"}
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={onShare}
              className="p-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#A3BFB5] hover:text-[#0B3024] dark:hover:text-white hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              title="Share community"
              aria-label="Share community"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* More Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#A3BFB5] hover:text-[#0B3024] dark:hover:text-white hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
                aria-label="Community options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      onShare();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Community Link</span>
                  </button>

                  <div className="h-px bg-[#E8F1ED] dark:bg-[#10372F] my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      onOpenReport();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report Community</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title, Badges & Tagline */}
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              {group.name}
            </h1>
            {group.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Community</span>
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#4A685D] dark:text-[#8BAAA0] max-w-3xl leading-relaxed">
            {group.tagline}
          </p>

          {/* Quick Info Bar */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap mt-3 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] text-xs text-[#658278] dark:text-[#789991]">
            <div className="flex items-center gap-1.5 font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
              <span>{group.memberCount} members</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
              <span>{group.department}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
              <span>{group.campus}</span>
            </div>

            <div className="inline-flex items-center gap-1 text-[#159B72] dark:text-[#20D39B] font-semibold ml-auto sm:ml-0">
              <span className="w-2 h-2 rounded-full bg-[#159B72] dark:bg-[#20D39B] animate-pulse" />
              <span>{group.activityLevel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
