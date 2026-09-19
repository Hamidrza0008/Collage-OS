"use client";

import Image from "next/image";
import {
  Home,
  User,
  Layers,
  ClipboardCheck,
  Bell,
  Calendar,
  LayoutGrid,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Settings,
  Leaf,
  X,
} from "lucide-react";
import NavItem from "./NavItem";
import { useTheme } from "../providers/ThemeProvider";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/", isActive: true },
  { label: "My Profile", icon: User, href: "/profile" },
  { label: "Academics", icon: Layers, href: "/academics", hasSubmenu: true },
  { label: "Assignments", icon: ClipboardCheck, href: "/assignments" },
  { label: "Notices & Announcements", icon: Bell, href: "/notices" },
  { label: "Events", icon: Calendar, href: "/events" },
  { label: "Projects", icon: LayoutGrid, href: "/projects" },
  { label: "Internships & Hackathons", icon: Briefcase, href: "/internships" },
  { label: "Lost & Found", icon: ShieldCheck, href: "/lost-and-found" },
  { label: "Campus Feed", icon: MessageSquare, href: "/feed" },
  { label: "Campus AI", icon: Sparkles, href: "/campus-ai", badge: "New" },
];

export default function Sidebar({ isOpen, onClose }) {
  const { isDark } = useTheme();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: w-[260px] to prevent truncation, 100vh overflow-hidden */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[260px] shrink-0 bg-[#FFFFFF] dark:bg-[#021512] border-r border-[#D8E8E2] dark:border-[#10372F] flex flex-col justify-between overflow-hidden transition-all duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Upper Section: Branding Header + Slim Navigation */}
        <div className="flex flex-col shrink-0">
          {/* Logo & Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  src={isDark ? "/assets/layout/logo-dark.svg" : "/assets/layout/logo-light.svg"}
                  alt="College OS Logo"
                  width={30}
                  height={30}
                  className="object-contain transition-opacity duration-200"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight tracking-tight transition-colors">
                  College OS
                </span>
                <span className="text-[9.5px] font-medium text-[#658278] dark:text-[#789991] tracking-wider mt-0.5 transition-colors">
                  Learn &bull; Connect &bull; Grow
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links: Slim and compact */}
          <nav className="px-3 py-1 space-y-0.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={item.isActive}
                hasSubmenu={item.hasSubmenu}
                badge={item.badge}
                onClick={onClose}
              />
            ))}

            {/* Settings Item: Grouped directly below Campus AI */}
            <div className="pt-1 mt-1 border-t border-[#E8F1ED] dark:border-[#10372F]">
              <NavItem
                icon={Settings}
                label="Settings"
                href="/settings"
                onClick={onClose}
              />
            </div>
          </nav>
        </div>

        {/* Tall Full-Bleed Campus Artwork (~35-40% height) with Dynamic Text & Leaf Overlay */}
        <div className="relative w-full mt-auto overflow-hidden shrink-0 h-64 sm:h-72">
          {/* Subtle top gradient fade into sidebar background */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/60 to-transparent dark:from-[#021512] dark:via-[#021512]/60 dark:to-transparent pointer-events-none z-10 transition-all duration-200" />

          {/* Full-bleed Tall Campus Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isDark ? "/assets/layout/sidebar-campus-dark.jpg" : "/assets/layout/sidebar-campus-light.jpg"}
            alt="Campus Architecture"
            className="w-full h-full object-cover object-bottom select-none transition-opacity duration-300"
          />

          {/* Dynamic Quote & Leaf Icon Overlay */}
          <div className="absolute bottom-4 left-4 z-10 flex flex-col items-start space-y-0.5 pointer-events-none">
            <span className="text-xs font-semibold text-emerald-950 dark:text-[#F1FAF6] tracking-tight drop-shadow-xs">
              Better Students
            </span>
            <span className="text-xs font-semibold text-emerald-950 dark:text-[#B5CCC5] tracking-tight drop-shadow-xs">
              Better Tomorrow
            </span>
            <div className="mt-1 w-5 h-5 rounded bg-emerald-700 dark:bg-[#20D39B] flex items-center justify-center shadow-xs">
              <Leaf className="w-3.5 h-3.5 text-white dark:text-[#021512]" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
