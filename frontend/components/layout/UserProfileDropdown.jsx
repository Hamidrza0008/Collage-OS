"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Settings,
  Bookmark,
  Sun,
  Moon,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function UserProfileDropdown({
  isOpen,
  onClose,
  user,
  onToast,
}) {
  const { isDark, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[58px] right-2 sm:right-4 w-[260px] sm:w-[280px] rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      {/* User Header */}
      <div className="p-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] shrink-0">
          <Image
            src={user.avatar || "/assets/layout/profile-avatar.jpg"}
            alt={user.name || "User Avatar"}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
            {user.name}
          </h4>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
            hamid.rza@college.edu
          </p>
          <span className="inline-block text-[10px] font-semibold text-[#159B72] dark:text-[#20D39B] mt-0.5">
            {user.subtitle}
          </span>
        </div>
      </div>

      {/* Menu Links */}
      <div className="p-1.5 space-y-0.5 text-xs">
        <Link
          href="/student/profile"
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <span className="font-medium">My Profile</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        </Link>

        <Link
          href="/student/settings"
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <span className="font-medium">Account Settings</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose();
            onToast("Saved Items Hub (/student/saved) coming in Phase 4");
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <span className="font-medium">Saved Items</span>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991] font-semibold bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
            Soon
          </span>
        </button>

        <button
          type="button"
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
          <span className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B]">
            Switch
          </span>
        </button>

        <Link
          href="/student/settings"
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <span className="font-medium">Help &amp; FAQs</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        </Link>
      </div>

      {/* Footer / Sign out */}
      <div className="p-1.5 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24]">
        <button
          type="button"
          onClick={() => {
            onClose();
            onToast("Session signed out (Demo Mode)");
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
