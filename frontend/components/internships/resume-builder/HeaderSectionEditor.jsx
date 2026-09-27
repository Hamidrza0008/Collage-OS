"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Globe } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function HeaderSectionEditor({ resume, onChangeResume }) {
  const header = resume.header || {};

  const updateHeader = (fields) => {
    onChangeResume({
      ...resume,
      header: {
        ...header,
        ...fields,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <User className="w-4 h-4" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Personal &amp; Contact Header
          </h3>
        </div>
        <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
          Imported from student profile
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Full Name
          </label>
          <input
            type="text"
            value={header.name || ""}
            onChange={(e) => updateHeader({ name: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Professional Subtitle / Headline
          </label>
          <input
            type="text"
            value={header.headline || ""}
            onChange={(e) => updateHeader({ headline: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#658278]" />
              <span>Email Address</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#658278] cursor-pointer">
              <input
                type="checkbox"
                checked={header.includeEmail !== false}
                onChange={(e) => updateHeader({ includeEmail: e.target.checked })}
                className="w-3 h-3 text-emerald-600 rounded"
              />
              <span>Include</span>
            </label>
          </div>
          <input
            type="email"
            value={header.email || ""}
            onChange={(e) => updateHeader({ email: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#658278]" />
              <span>Phone Number</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#658278] cursor-pointer">
              <input
                type="checkbox"
                checked={header.includePhone !== false}
                onChange={(e) => updateHeader({ includePhone: e.target.checked })}
                className="w-3 h-3 text-emerald-600 rounded"
              />
              <span>Include</span>
            </label>
          </div>
          <input
            type="text"
            value={header.phone || ""}
            onChange={(e) => updateHeader({ phone: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Location */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#658278]" />
              <span>Location</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#658278] cursor-pointer">
              <input
                type="checkbox"
                checked={header.includeLocation !== false}
                onChange={(e) => updateHeader({ includeLocation: e.target.checked })}
                className="w-3 h-3 text-emerald-600 rounded"
              />
              <span>Include</span>
            </label>
          </div>
          <input
            type="text"
            value={header.location || ""}
            onChange={(e) => updateHeader({ location: e.target.value })}
            placeholder="e.g. Mumbai, India"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* GitHub */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-[#658278]" />
              <span>GitHub URL</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#658278] cursor-pointer">
              <input
                type="checkbox"
                checked={header.includeGithub !== false}
                onChange={(e) => updateHeader({ includeGithub: e.target.checked })}
                className="w-3 h-3 text-emerald-600 rounded"
              />
              <span>Include</span>
            </label>
          </div>
          <input
            type="url"
            value={header.github || ""}
            onChange={(e) => updateHeader({ github: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-[#658278]" />
              <span>LinkedIn URL</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#658278] cursor-pointer">
              <input
                type="checkbox"
                checked={header.includeLinkedin !== false}
                onChange={(e) => updateHeader({ includeLinkedin: e.target.checked })}
                className="w-3 h-3 text-emerald-600 rounded"
              />
              <span>Include</span>
            </label>
          </div>
          <input
            type="url"
            value={header.linkedin || ""}
            onChange={(e) => updateHeader({ linkedin: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Portfolio */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#658278]" />
              <span>Portfolio / Website</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#658278] cursor-pointer">
              <input
                type="checkbox"
                checked={header.includePortfolio !== false}
                onChange={(e) => updateHeader({ includePortfolio: e.target.checked })}
                className="w-3 h-3 text-emerald-600 rounded"
              />
              <span>Include</span>
            </label>
          </div>
          <input
            type="url"
            value={header.portfolio || ""}
            onChange={(e) => updateHeader({ portfolio: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>
    </div>
  );
}
