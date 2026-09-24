"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Bell, Sun, Moon, ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import FontSwitcherDropdown from "./FontSwitcherDropdown";
import { STUDENT_USER } from "./navConfig";

export default function Navbar({ onMenuToggle, user = STUDENT_USER }) {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full h-[68px] px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 sm:gap-4 backdrop-blur-md transition-all duration-200 ${
        isScrolled
          ? "bg-[#F7FBF9]/95 dark:bg-[#061F1B]/95 border-b border-[#D8E8E2] dark:border-[#16463D] shadow-[0_2px_12px_rgba(11,48,36,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
          : "bg-[#F7FBF9]/85 dark:bg-[#061F1B]/85 border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 shadow-none"
      }`}
    >
      {/* Mobile Search Overlay Bar */}
      {isMobileSearchOpen ? (
        <div className="flex sm:hidden items-center gap-2 w-full animate-in fade-in duration-150">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#658278] dark:text-[#789991]" strokeWidth={2} />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Search anything..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#FFFFFF] dark:bg-[#0A2A24] border border-[#159B72] dark:border-[#20D39B] text-[13px] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 rounded-xl text-[#658278] dark:text-[#789991] hover:bg-[#DDF3EB] dark:hover:bg-[#082A24]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          {/* Left Area: Mobile Menu Toggle + Logo (Mobile only) + Search Bar */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-[660px]">
            {/* Mobile Hamburger Menu */}
            <button
              type="button"
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#DDF3EB] dark:hover:bg-[#082A24] transition-colors shrink-0"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile-only College OS Brand Tag */}
            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <Image
                src={isDark ? "/assets/layout/logo-dark.svg" : "/assets/layout/logo-light.svg"}
                alt="Logo"
                width={22}
                height={22}
                className="object-contain"
              />
              <span className="text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight truncate">
                College OS
              </span>
            </div>

            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#DDF3EB] dark:hover:bg-[#082A24] transition-colors ml-auto"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-[#658278] dark:text-[#789991]" strokeWidth={2} />
            </button>

            {/* Desktop / Tablet Search Input Container (Unchanged) */}
            <div className="hidden sm:block relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#658278] dark:text-[#789991]" strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Search anything... (e.g. assignments, students, events, notices)"
                className="w-full h-10 pl-10 pr-12 rounded-xl bg-[#FFFFFF] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] text-[13px] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] shadow-[0_1px_2px_rgba(11,48,36,0.03)] dark:shadow-none focus:outline-none focus:border-[#159B72] dark:focus:border-[#20D39B] focus:ring-2 focus:ring-[#159B72]/15 dark:focus:ring-[#20D39B]/15 transition-all"
              />
              {/* Keyboard shortcut indicator */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#658278] dark:text-[#789991] bg-[#F1F8F5] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-md">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Right Area: Notification, Theme Toggle, Divider, User Profile */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#DDF3EB]/60 dark:hover:bg-[#075A43]/50 hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-[19px] h-[19px]" strokeWidth={1.9} />
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[15px] h-[15px] px-1 rounded-full bg-[#E5484D] text-white text-[9px] font-bold leading-none shadow-xs">
            3
          </span>
        </button>

        {/* Real Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[#36594C] dark:text-[#20D39B] hover:bg-[#DDF3EB]/60 dark:hover:bg-[#075A43]/50 hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-all active:scale-95 cursor-pointer"
          title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-[19px] h-[19px] text-[#20D39B]" strokeWidth={2} />
          ) : (
            <Moon className="w-[19px] h-[19px] text-[#36594C]" strokeWidth={1.9} />
          )}
        </button>

        {/* Global Live Font Switcher Dropdown */}
        <FontSwitcherDropdown variant="navbar" />

        {/* Divider */}
        <div className="h-6 w-[1px] bg-[#D8E8E2] dark:bg-[#16463D] mx-1 hidden sm:block" />

        {/* User Profile Card */}
        <div className="flex items-center gap-2.5 pl-1 py-1 rounded-xl hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] cursor-pointer transition-colors group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] shrink-0">
            <Image
              src={user.avatar || "/assets/layout/profile-avatar.jpg"}
              alt={user.name || "User Avatar"}
              width={36}
              height={36}
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[13px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] leading-tight group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors">
              {user.name}
            </span>
            <span className="text-[11px] text-[#658278] dark:text-[#789991] leading-tight mt-0.5">
              {user.subtitle}
            </span>
          </div>
          <ChevronDown
            className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] group-hover:text-[#0B3024] dark:group-hover:text-[#F1FAF6] transition-colors shrink-0"
            strokeWidth={2}
          />
        </div>
      </div>
    </header>
  );
}
