"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  MessageSquare,
  Sparkles,
  Menu,
  BookOpen,
  CheckSquare,
  Calendar,
} from "lucide-react";

export default function MobileBottomNav({ role = "student", onOpenMenu }) {
  const pathname = usePathname();
  const isFaculty = role === "faculty" || pathname?.startsWith("/faculty");

  const studentNav = [
    { label: "Home", href: "/student", icon: Home, exact: true },
    { label: "Academics", href: "/student/academics", icon: Layers },
    { label: "Feed", href: "/student/feed", icon: MessageSquare },
    { label: "AI", href: "/student/campus-ai", icon: Sparkles, highlight: true },
  ];

  const facultyNav = [
    { label: "Home", href: "/faculty", icon: Home, exact: true },
    { label: "Classes", href: "/faculty/classes", icon: BookOpen },
    { label: "Attendance", href: "/faculty/attendance", icon: CheckSquare },
    { label: "Timetable", href: "/faculty/timetable", icon: Calendar },
  ];

  const currentNav = isFaculty ? facultyNav : studentNav;

  const isItemActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname?.startsWith(`${item.href}/`);
  };

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#021512]/95 backdrop-blur-md border-t border-[#D8E8E2] dark:border-[#10372F] shadow-[0_-4px_20px_rgba(11,48,36,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)] transition-colors"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0.5rem))" }}
    >
      <div className="grid grid-cols-5 items-center h-14 max-w-md mx-auto px-1">
        {currentNav.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                active
                  ? "text-[#159B72] dark:text-[#20D39B] font-bold"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              {/* Active top accent pill */}
              {active && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]" />
              )}

              <div
                className={`relative flex items-center justify-center w-8 h-7 rounded-lg transition-transform ${
                  active ? "scale-105" : "hover:scale-105"
                } ${
                  item.highlight && !active
                    ? "text-[#159B72] dark:text-[#20D39B]"
                    : ""
                }`}
              >
                <Icon
                  className="w-5 h-5"
                  strokeWidth={active ? 2.3 : 1.9}
                />
                {item.highlight && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B] animate-pulse" />
                )}
              </div>
              <span className="text-[10px] tracking-tight leading-none mt-0.5 font-medium truncate max-w-[56px]">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* 5th slot: Menu Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open Full Navigation Menu"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-7 rounded-lg">
            <Menu className="w-5 h-5" strokeWidth={1.9} />
          </div>
          <span className="text-[10px] tracking-tight leading-none mt-0.5 font-medium">
            Menu
          </span>
        </button>
      </div>
    </nav>
  );
}
