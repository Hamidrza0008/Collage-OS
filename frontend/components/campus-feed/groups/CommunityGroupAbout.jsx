"use client";

import {
  Info,
  Calendar,
  Tag,
  ExternalLink,
  ShieldCheck,
  Globe,
  MessageSquare,
  Link2,
  Code2,
  Share2,
} from "lucide-react";

export default function CommunityGroupAbout({ community, group: propGroup }) {
  const group = propGroup || community || {};

  const getLinkIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "github":
        return Code2;
      case "discord":
        return MessageSquare;
      case "linkedin":
      case "instagram":
        return Share2;
      default:
        return Globe;
    }
  };

  const descriptionText = typeof group.description === "string"
    ? group.description
    : group.description?.mission || group.tagline || "Campus student community on College OS.";

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-7 shadow-xs space-y-6">
      {/* About Overview */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            About the Community
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
          {descriptionText}
        </p>
      </div>

      {/* Target & Schedule Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
        {group.meetingSchedule && (
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] block uppercase tracking-wider">
                Regular Meetups
              </span>
              <span className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
                {group.meetingSchedule}
              </span>
            </div>
          </div>
        )}

        {group.campus && (
          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] block uppercase tracking-wider">
                Affiliation &amp; Campus
              </span>
              <span className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
                {group.campus} • {group.department}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Focus Areas & Topics */}
      {group.tags && group.tags.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Topics &amp; Focus Areas
            </h3>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {group.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Community Guidelines */}
      {group.guidelines && group.guidelines.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Community Guidelines
            </h3>
          </div>
          <ul className="space-y-1.5 pl-6 list-disc text-xs text-[#658278] dark:text-[#789991] leading-relaxed">
            {group.guidelines.map((guide, idx) => (
              <li key={idx}>{guide}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Public Links & Channels */}
      {group.links && Object.keys(group.links).length > 0 && (
        <div className="pt-2 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-2">
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
            Official Channels &amp; Links
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(group.links).map(([platform, url]) => {
              const Icon = getLinkIcon(platform);
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#A3BFB5] hover:text-[#159B72] dark:hover:text-[#20D39B] hover:border-[#159B72]/50 transition-colors shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                  <span className="capitalize">{platform}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[#658278] dark:text-[#789991]" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
