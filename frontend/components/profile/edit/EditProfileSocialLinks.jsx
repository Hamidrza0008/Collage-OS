"use client";

import { Globe, AlertCircle } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function EditProfileSocialLinks({
  socialLinks = {},
  errors = {},
  onChangeLink,
}) {
  return (
    <div id="section-links" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-5">
      <div className="pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
          Portfolio & External Links
        </h2>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
          Connect your GitHub repositories, LinkedIn network, and personal portfolio site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* GitHub */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-github"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            GitHub Profile URL
          </label>
          <div className="relative">
            <GithubIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06241F] dark:text-white pointer-events-none" />
            <input
              id="input-github"
              type="url"
              value={socialLinks.github || ""}
              onChange={(e) => onChangeLink("github", e.target.value)}
              placeholder="https://github.com/username"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all ${
                errors.github
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
              }`}
            />
          </div>
          {errors.github && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.github}
            </p>
          )}
        </div>

        {/* LinkedIn */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-linkedin"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            LinkedIn Profile URL
          </label>
          <div className="relative">
            <LinkedinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0077b5] pointer-events-none" />
            <input
              id="input-linkedin"
              type="url"
              value={socialLinks.linkedin || ""}
              onChange={(e) => onChangeLink("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all ${
                errors.linkedin
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
              }`}
            />
          </div>
          {errors.linkedin && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.linkedin}
            </p>
          )}
        </div>

        {/* Portfolio / Personal Website */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-portfolio"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Portfolio / Personal Website
          </label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
            <input
              id="input-portfolio"
              type="url"
              value={socialLinks.portfolio || ""}
              onChange={(e) => onChangeLink("portfolio", e.target.value)}
              placeholder="https://yourname.dev"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all ${
                errors.portfolio
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
              }`}
            />
          </div>
          {errors.portfolio && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.portfolio}
            </p>
          )}
        </div>

        {/* Twitter / X or other link */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-twitter"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            X / Twitter or Other Public Link
          </label>
          <div className="relative">
            <TwitterIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1DA1F2] pointer-events-none" />
            <input
              id="input-twitter"
              type="url"
              value={socialLinks.twitter || ""}
              onChange={(e) => onChangeLink("twitter", e.target.value)}
              placeholder="https://x.com/username"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
