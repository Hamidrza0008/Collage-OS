"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Settings,
  Bookmark,
  Briefcase,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  ExternalLink,
  Pencil,
} from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { useAuth } from "../providers/AuthProvider";
import { getStoredNotifications } from "@/components/notifications/notificationData";
import { getSavedItems } from "@/components/saved/savedItemsStore";
import { loadApplicationsState } from "@/components/internships/applications/applicationsData";

// Profile avatar with fallback to student initials
function ProfileAvatar({ src, alt, name }) {
  const [hasError, setHasError] = useState(false);

  // Compute initials
  const initials = (name || "Hamid Rza")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!src || hasError) {
    return (
      <div
        className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center text-[#159B72] dark:text-[#20D39B] font-bold text-xs shrink-0 select-none shadow-2xs"
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] shrink-0 shadow-2xs">
      <Image
        src={src}
        alt={alt || name || "User Avatar"}
        fill
        sizes="40px"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function UserProfileDropdown({
  isOpen,
  onClose,
  user = {},
  onToast,
}) {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  // Sync counts with canonical stores
  const syncStoreCounts = useCallback(() => {
    try {
      // Notifications
      const notifs = getStoredNotifications();
      const unread = Array.isArray(notifs)
        ? notifs.filter((n) => !n.read).length
        : 0;
      setUnreadNotificationsCount(unread);

      // Saved Items
      const saved = getSavedItems();
      setSavedCount(Array.isArray(saved) ? saved.length : 0);

      // Applications
      const apps = loadApplicationsState();
      setApplicationsCount(Array.isArray(apps) ? apps.length : 0);
    } catch (err) {
      console.warn("Failed to sync profile dropdown metrics:", err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      syncStoreCounts();
    }
  }, [isOpen, syncStoreCounts]);

  // Listen for storage events
  useEffect(() => {
    window.addEventListener("college_os_notifications_updated", syncStoreCounts);
    window.addEventListener("college_os_saved_items_updated", syncStoreCounts);
    window.addEventListener("storage", syncStoreCounts);

    return () => {
      window.removeEventListener("college_os_notifications_updated", syncStoreCounts);
      window.removeEventListener("college_os_saved_items_updated", syncStoreCounts);
      window.removeEventListener("storage", syncStoreCounts);
    };
  }, [syncStoreCounts]);

  // Outside click & Escape handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayName = user.name || "Hamid Rza";
  const displayHeadline = user.headline || user.subtitle || "Full Stack Engineer & Open Source Builder";
  const username = user.username || "@hamidrza";
  const publicProfileId = user.id || "student-1";

  return (
    <div
      ref={dropdownRef}
      role="menu"
      aria-label="Student Account Menu"
      aria-orientation="vertical"
      className="absolute top-[calc(100%+8px)] right-0 w-[calc(100vw-24px)] max-w-[310px] sm:w-[310px] rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-[0_20px_50px_rgba(11,48,36,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col"
    >
      {/* Identity Header */}
      <div className="p-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center gap-3">
        <ProfileAvatar
          src={user.avatar || "/assets/profile/avatar.jpg"}
          alt={displayName}
          name={displayName}
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
            {displayName}
          </h4>
          <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
            {displayHeadline}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-semibold text-[#159B72] dark:text-[#20D39B]">
              {username}
            </span>
            <span className="text-[10px] text-[#85A297] dark:text-[#65857B]">
              • B.Tech (CSE)
            </span>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="p-1.5 space-y-0.5 text-xs max-h-[calc(100vh-160px)] overflow-y-auto">
        {/* Section 1: Profile Navigation */}
        <div className="space-y-0.5 pb-1 border-b border-[#E8F1ED]/80 dark:border-[#10372F]/80">
          <Link
            href="/student/profile"
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">My Profile</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href={`/student/profile/${publicProfileId}`}
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">View Public Profile</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/student/profile/edit"
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Pencil className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">Edit Profile</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Section 2: Student Workspaces & Counters */}
        <div className="space-y-0.5 py-1 border-b border-[#E8F1ED]/80 dark:border-[#10372F]/80">
          <Link
            href="/student/saved"
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">Saved Items</span>
            </div>
            <div className="flex items-center gap-1.5">
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {savedCount}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          <Link
            href="/student/internships/applications"
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">My Applications</span>
            </div>
            <div className="flex items-center gap-1.5">
              {applicationsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                  {applicationsCount}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          <Link
            href="/student/notifications"
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">Notifications</span>
            </div>
            <div className="flex items-center gap-1.5">
              {unreadNotificationsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#E5484D] text-white">
                  {unreadNotificationsCount}
                </span>
              )}
              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        </div>

        {/* Section 3: Preferences */}
        <div className="space-y-0.5 pt-1">
          <Link
            href="/student/settings"
            role="menuitem"
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              <span className="font-medium">Settings &amp; Preferences</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              toggleTheme();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              {isDark ? (
                <Sun className="w-4 h-4 text-[#20D39B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#36594C]" />
              )}
              <span className="font-medium">Theme: {isDark ? "Dark" : "Light"}</span>
            </div>
            <span className="text-[10.5px] font-semibold text-[#159B72] dark:text-[#20D39B] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
              Switch
            </span>
          </button>
        </div>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-1.5 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24]">
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onClose();
            logout();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
