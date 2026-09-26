"use client";

import Image from "next/image";
import Link from "next/link";
import { User, CheckCircle2, ArrowRight, Code2, Users } from "lucide-react";

export default function PostAuthorSidebarCard({ authorProfile }) {
  if (!authorProfile) return null;

  const profileUrl = `/student/profile/${authorProfile.id}`;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B]">
          <User className="w-4 h-4" />
        </div>
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          About the Author
        </h3>
      </div>

      {/* Author Profile Overview */}
      <div className="flex items-start gap-3">
        <Link
          href={profileUrl}
          className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D] hover:ring-2 hover:ring-[#159B72] transition-all"
        >
          <Image
            src={authorProfile.avatar || "/assets/layout/profile-avatar.jpg"}
            alt={authorProfile.name}
            fill
            className="object-cover"
          />
        </Link>

        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              href={profileUrl}
              className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors"
            >
              {authorProfile.name}
            </Link>
            {authorProfile.isVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            )}
          </div>
          <p className="text-[11px] text-[#658278] dark:text-[#789991] leading-tight mt-0.5">
            {authorProfile.role} • {authorProfile.department}
          </p>
        </div>
      </div>

      {/* Bio / Headline */}
      {authorProfile.headline && (
        <p className="text-xs text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
          {authorProfile.headline}
        </p>
      )}

      {/* Public Skills */}
      {authorProfile.skills && authorProfile.skills.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
            Focus & Skills
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {authorProfile.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] text-[#36594C] dark:text-[#A3BFB5]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats summary */}
      <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
        <div className="p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#658278] dark:text-[#789991]">
            <Code2 className="w-3 h-3 text-[#159B72]" />
            <span>Projects</span>
          </div>
          <span className="text-sm font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
            {authorProfile.projectsCount || 4}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#658278] dark:text-[#789991]">
            <Users className="w-3 h-3 text-[#159B72]" />
            <span>Followers</span>
          </div>
          <span className="text-sm font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
            {authorProfile.followersCount || 85}
          </span>
        </div>
      </div>

      {/* View Public Profile CTA */}
      <Link
        href={profileUrl}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] hover:bg-[#cceedf] dark:hover:bg-[#0a4433] transition-colors shadow-2xs"
      >
        <span>View Full Profile</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
