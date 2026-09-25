"use client";

import { Eye, ShieldCheck, Lock, Globe, Building } from "lucide-react";

export default function EditProfileVisibility({
  visibility = {
    profile: "Public",
    projects: "Public",
    achievements: "Public",
    activity: "Public",
    socialLinks: "Visible",
  },
  onChangeVisibility,
}) {
  const handleChange = (key, val) => {
    onChangeVisibility({
      ...visibility,
      [key]: val,
    });
  };

  const VISIBILITY_OPTIONS = [
    {
      value: "Public",
      label: "Public",
      desc: "Visible to all students, recruiters, and web visitors",
      icon: Globe,
    },
    {
      value: "Campus Only",
      label: "Campus Only",
      desc: "Visible only to authenticated students & faculty at XYZ College",
      icon: Building,
    },
    {
      value: "Private",
      label: "Private",
      desc: "Visible only to you and academic mentors",
      icon: Lock,
    },
  ];

  return (
    <div id="section-visibility" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-6">
      <div className="pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Profile & Portfolio Visibility</span>
        </h2>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
          Fine-tune who can discover your profile, inspect projects, and view achievements.
        </p>
      </div>

      {/* Main Profile Visibility Radio Cards */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]">
          Overall Public Profile Status
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VISIBILITY_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = (visibility.profile || "Public") === opt.value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange("profile", opt.value)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[#159B72]/10 dark:bg-[#20D39B]/10 border-[#159B72] dark:border-[#20D39B] ring-1 ring-[#159B72]/30"
                    : "bg-[#F8FAFC] dark:bg-[#021512] border-[#D8E8E2] dark:border-[#10372F] hover:border-[#159B72]/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected
                        ? "text-[#159B72] dark:text-[#20D39B]"
                        : "text-[#06241F]/70 dark:text-[#D8E8E2]/70"
                    }`}
                  />
                  <span className="text-xs font-bold text-[#06241F] dark:text-white">
                    {opt.label}
                  </span>
                </div>
                <p className="text-[11px] text-[#06241F]/70 dark:text-[#D8E8E2]/70 leading-normal">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Granular Section Visibility Table */}
      <div className="space-y-3 pt-2">
        <span className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]">
          Granular Section Controls
        </span>

        <div className="divide-y divide-[#D8E8E2]/60 dark:divide-[#10372F]/60 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] overflow-hidden bg-[#F8FAFC]/50 dark:bg-[#021512]/50">
          {/* Projects */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#06241F] dark:text-white">
                Showcase Projects
              </p>
              <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                Display curated projects on your public profile card
              </p>
            </div>
            <select
              value={visibility.projects || "Public"}
              onChange={(e) => handleChange("projects", e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white cursor-pointer"
            >
              <option value="Public">Public</option>
              <option value="Campus Only">Campus Only</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Achievements */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#06241F] dark:text-white">
                Achievements & Awards
              </p>
              <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                Display hackathons, certifications, and campus accolades
              </p>
            </div>
            <select
              value={visibility.achievements || "Public"}
              onChange={(e) => handleChange("achievements", e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white cursor-pointer"
            >
              <option value="Public">Public</option>
              <option value="Campus Only">Campus Only</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Activity */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#06241F] dark:text-white">
                Activity & Contributions
              </p>
              <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                Recent project releases and campus feed interactions
              </p>
            </div>
            <select
              value={visibility.activity || "Public"}
              onChange={(e) => handleChange("activity", e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white cursor-pointer"
            >
              <option value="Public">Public</option>
              <option value="Campus Only">Campus Only</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Social Links */}
          <div className="p-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#06241F] dark:text-white">
                Social & Portfolio Links
              </p>
              <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                Show GitHub, LinkedIn, and personal website links
              </p>
            </div>
            <select
              value={visibility.socialLinks || "Visible"}
              onChange={(e) => handleChange("socialLinks", e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white cursor-pointer"
            >
              <option value="Visible">Visible</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
