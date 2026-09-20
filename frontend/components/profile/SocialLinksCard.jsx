"use client";

import { Share2, ExternalLink, Globe } from "lucide-react";

// Platform icons
function GithubIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function SocialLinksCard({ links = [] }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Share2 className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Social Links
        </h2>
      </div>

      {/* Links List */}
      <div className="space-y-2">
        {links.map((link, index) => {
          const isGithub = link.type === "github";
          const isLinkedin = link.type === "linkedin";

          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 hover:bg-[#F1F8F5]/60 dark:hover:bg-[#082A24]/60 transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isGithub
                      ? "bg-[#0B3024] text-white dark:bg-white dark:text-[#0B3024]"
                      : isLinkedin
                      ? "bg-[#0A66C2] text-white"
                      : "bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512]"
                  }`}
                >
                  {isGithub ? (
                    <GithubIcon />
                  ) : isLinkedin ? (
                    <LinkedinIcon />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-tight">
                    {link.platform}
                  </h4>
                  <span className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate block">
                    {link.handle}
                  </span>
                </div>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors shrink-0" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
