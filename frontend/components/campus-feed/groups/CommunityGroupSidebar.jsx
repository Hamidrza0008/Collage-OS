"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  UserCheck,
  UserPlus,
  Clock,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { ALL_EVENTS } from "@/components/events/eventsData";

export default function CommunityGroupSidebar({
  group,
  relatedCommunities = [],
  onJoinClick,
  onFollowToggle,
  onShare,
}) {
  const isJoined = group.membershipStatus === "joined";
  const isRequested = group.membershipStatus === "requested";

  // Resolve spotlight upcoming event
  const spotlightEventId = group.linkedEventIds?.[0];
  const spotlightEvent = spotlightEventId
    ? ALL_EVENTS.find((e) => e.id === spotlightEventId)
    : null;

  return (
    <aside className="w-full space-y-5 lg:sticky lg:top-20">
      {/* 1. Quick Join / Follow Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Membership Status
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onJoinClick}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5 ${
              isJoined
                ? "bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/30"
                : isRequested
                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
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
                <span>Requested</span>
              </>
            ) : group.membershipType === "Request" ? (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Request to Join</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join Group</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onFollowToggle}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              group.isFollowing
                ? "bg-[#F7FBF9] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border-[#D8E8E2] dark:border-[#10372F]"
                : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#A3BFB5] border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24]"
            }`}
          >
            {group.isFollowing ? "Following" : "Follow"}
          </button>

          <button
            type="button"
            onClick={onShare}
            className="p-2 text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white rounded-xl border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer"
            title="Share group"
            aria-label="Share group"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-[#658278] dark:text-[#789991] text-center pt-1">
          {group.membershipType === "Request"
            ? "Requires organiser review before approval."
            : "Open to all enrolled students on campus."}
        </p>
      </div>

      {/* 2. Community Facts */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Community Facts
        </h3>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
              Members
            </span>
            <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
              {group.memberCount}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
              Events Hosted
            </span>
            <span className="text-base font-extrabold text-[#159B72] dark:text-[#20D39B] block mt-0.5">
              {group.eventCount}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
              Active Projects
            </span>
            <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
              {group.projectCount}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
            <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
              Founded
            </span>
            <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
              {group.foundedYear}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Core Team / Organizers */}
      {group.leaders && group.leaders.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Organizers &amp; Core Team
          </h3>

          <div className="space-y-2.5">
            {group.leaders.map((lead) => (
              <Link
                key={lead.id}
                href={`/student/profile/${lead.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D]">
                  <Image
                    src={lead.avatar || "/assets/layout/profile-avatar.jpg"}
                    alt={lead.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                      {lead.name}
                    </h4>
                    {lead.isVerified && (
                      <CheckCircle2 className="w-3 h-3 text-[#159B72] shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate">
                    {lead.role} • {lead.department}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. Upcoming Event Spotlight */}
      {spotlightEvent && (
        <div className="p-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B]">
              Next Event
            </span>
            <span className="text-[10px] text-[#658278] dark:text-[#789991]">
              {spotlightEvent.date}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
            {spotlightEvent.title}
          </h4>

          <Link
            href={`/student/events/${spotlightEvent.id}`}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF3EB] dark:hover:bg-[#073327] transition-colors"
          >
            <span>View Event &amp; Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 5. Related Communities (You May Also Like) */}
      {relatedCommunities && relatedCommunities.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Related Communities
          </h3>

          <div className="space-y-2">
            {relatedCommunities.map((rel) => (
              <Link
                key={rel.id}
                href={rel.route}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#10372F] transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-[#DDF3EB] dark:bg-[#073327]">
                    {rel.logo ? (
                      <Image
                        src={rel.logo}
                        alt={rel.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-[#159B72]">
                        {rel.shortName?.slice(0, 2) || "CG"}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] truncate">
                      {rel.name}
                    </h4>
                    <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                      {rel.memberCount} members
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-[#159B72] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
