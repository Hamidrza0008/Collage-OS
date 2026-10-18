"use client";

import React from "react";
import {
  Link as LinkIcon,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";
import { USEFUL_LINKS } from "./facultyResourcesData";

export default function ResourcesSidebarLinks() {
  const renderLinkIcon = (iconType) => {
    const className = "w-4 h-4 text-[#159B72] dark:text-[#20D39B]";
    switch (iconType) {
      case "library":
        return <BookOpen className={className} />;
      case "graduation":
        return <GraduationCap className={className} />;
      case "compass":
        return <Award className={className} />;
      case "github":
        return (
          <svg className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        );
      default:
        return <LinkIcon className={className} />;
    }
  };

  return (
    <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] p-5 shadow-2xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2 pb-0.5">
        <LinkIcon className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
        <h2 className="text-[14px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Useful Links
        </h2>
      </div>

      {/* Links List */}
      <div className="space-y-1">
        {USEFUL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#EBF6F1] dark:bg-[#0F4A3B] flex items-center justify-center shrink-0 border border-[#D8E8E2]/60 dark:border-[#16463D]">
                {renderLinkIcon(item.icon)}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors block truncate">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#789991] block truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <ExternalLink className="w-3.5 h-3.5 text-[#658278]/60 group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] shrink-0 ml-2 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
