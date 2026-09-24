"use client";

import {
  Shield,
  Key,
  ShieldCheck,
  Clock,
  Lock,
  Globe,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function SecurityRegionCard({
  onChangePassword,
  onViewLoginActivity,
  onViewDataPrivacy,
  language,
  onLanguageChange,
  timeZone,
  onTimeZoneChange,
}) {
  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 shadow-xs space-y-4">
      {/* 1. Privacy & Security Section */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Privacy &amp; Security
            </h2>
            <p className="text-[11px] sm:text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Keep your account safe and secure.
            </p>
          </div>
        </div>

        {/* Action Items List */}
        <div className="space-y-1.5 pt-1">
          {/* Change Password */}
          <button
            type="button"
            onClick={onChangePassword}
            className="w-full text-left py-1.5 px-2 rounded-xl flex items-center justify-between hover:bg-[#F1F8F5] dark:hover:bg-[#0A2A24] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Key className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  Change Password
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  Update your account password
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* Two-Factor Authentication */}
          <div className="w-full py-1.5 px-2 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  Two-Factor Authentication
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  Add an extra layer of security
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 shrink-0">
              Coming Soon
            </span>
          </div>

          {/* Login Activity */}
          <button
            type="button"
            onClick={onViewLoginActivity}
            className="w-full text-left py-1.5 px-2 rounded-xl flex items-center justify-between hover:bg-[#F1F8F5] dark:hover:bg-[#0A2A24] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  Login Activity
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  View recent login sessions
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* Data Privacy */}
          <button
            type="button"
            onClick={onViewDataPrivacy}
            className="w-full text-left py-1.5 px-2 rounded-xl flex items-center justify-between hover:bg-[#F1F8F5] dark:hover:bg-[#0A2A24] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  Data Privacy
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  Manage your data and sharing preferences
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>

      {/* 2. Language & Region Section */}
      <div className="space-y-3 pt-3 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Language &amp; Region
            </h2>
            <p className="text-[11px] sm:text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Set your preferred language and region.
            </p>
          </div>
        </div>

        {/* 2 Select Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Language Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#658278] dark:text-[#789991]">
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full appearance-none px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] focus:border-emerald-500/60 outline-none pr-8 cursor-pointer shadow-2xs"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#658278] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Time Zone Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#658278] dark:text-[#789991]">
              Time Zone
            </label>
            <div className="relative">
              <select
                value={timeZone}
                onChange={(e) => onTimeZoneChange(e.target.value)}
                className="w-full appearance-none px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] focus:border-emerald-500/60 outline-none pr-8 cursor-pointer shadow-2xs"
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                <option value="UTC (Coordinated Universal)">UTC</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#658278] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
