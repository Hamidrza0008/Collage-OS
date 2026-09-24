"use client";

import { Zap, User, Lock, Bell, Shield } from "lucide-react";

export default function QuickActionsCard({
  onEditProfile,
  onChangePassword,
  onNotificationSettings,
  onPrivacySettings,
}) {
  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Zap className="w-3.5 h-3.5 fill-emerald-500/20" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Quick Actions
          </h2>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Jump to important tasks.
          </p>
        </div>
      </div>

      {/* 2x2 Action Cards */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {/* Edit Profile */}
        <button
          type="button"
          onClick={onEditProfile}
          className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-left hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 transition-all group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-tight">
            Edit Profile
          </div>
          <div className="text-[10px] text-[#658278] dark:text-[#789991] mt-0.5 leading-tight">
            Update your details
          </div>
        </button>

        {/* Change Password */}
        <button
          type="button"
          onClick={onChangePassword}
          className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-left hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 transition-all group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-tight">
            Change Password
          </div>
          <div className="text-[10px] text-[#658278] dark:text-[#789991] mt-0.5 leading-tight">
            Keep your account safe
          </div>
        </button>

        {/* Notification Settings */}
        <button
          type="button"
          onClick={onNotificationSettings}
          className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-left hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 transition-all group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-tight">
            Notification Settings
          </div>
          <div className="text-[10px] text-[#658278] dark:text-[#789991] mt-0.5 leading-tight">
            Manage alerts
          </div>
        </button>

        {/* Privacy Settings */}
        <button
          type="button"
          onClick={onPrivacySettings}
          className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-left hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 transition-all group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-tight">
            Privacy Settings
          </div>
          <div className="text-[10px] text-[#658278] dark:text-[#789991] mt-0.5 leading-tight">
            Control your data
          </div>
        </button>
      </div>
    </div>
  );
}
