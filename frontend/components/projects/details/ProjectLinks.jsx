"use client";

import {
  Link2,
  ExternalLink,
  Globe,
  BookOpen,
  FileCode,
} from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function ProjectLinks({ links = [] }) {
  if (!links || links.length === 0) return null;

  const getLinkIcon = (type) => {
    switch (type) {
      case "github":
        return <GithubIcon className="w-4 h-4 text-[#0B3024] dark:text-[#F1FAF6]" />;
      case "live":
        return <Globe className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />;
      case "docs":
        return <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      default:
        return <Link2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <section
      aria-label="Project Resources & Links"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Link2 className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Official Links &amp; Resources
          </h2>
          <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
            Verified external portals and code repositories
          </p>
        </div>
      </div>

      {/* Links List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 hover:bg-[#F0F8F5] dark:hover:bg-[#0A2E27] transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                {getLinkIcon(link.type)}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                  {link.label}
                </h3>
                <p className="text-[10px] text-[#658278] dark:text-[#8BAEA3] truncate">
                  {link.description || link.url}
                </p>
              </div>
            </div>

            <ExternalLink className="w-3.5 h-3.5 text-[#658278] dark:text-[#8BAEA3] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors shrink-0 ml-2" />
          </a>
        ))}
      </div>
    </section>
  );
}
