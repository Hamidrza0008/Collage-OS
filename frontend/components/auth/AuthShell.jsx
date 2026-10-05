"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sun, Moon, Briefcase, GraduationCap } from "lucide-react";
import AuthBrandPanel from "./AuthBrandPanel";
import { useTheme } from "../providers/ThemeProvider";

export default function AuthShell({
  children,
  brandProps = {},
  topNavAction, // { label: "Already have an account?", actionLabel: "Login", href: "/auth/student" }
  showFacultyLink = true,
  isStaffMode = false,
}) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7FBF9] dark:bg-[#031A16] transition-colors duration-200 overflow-x-hidden">
      {/* Left Visual / Branding Column */}
      <div className="w-full lg:w-[50%] xl:w-[48%] shrink-0">
        <AuthBrandPanel {...brandProps} />
      </div>

      {/* Right Authentication Column */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12 relative min-h-screen">
        {/* Top Navigation Bar */}
        <header className="w-full max-w-[560px] mx-auto flex items-center justify-between gap-3 pb-6 pt-2">
          {/* Faculty / Staff Access Link */}
          <div>
            {showFacultyLink && !isStaffMode ? (
              <Link
                href="/auth/staff/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#36594C] dark:text-[#A7C8BD] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors group px-2.5 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                <span>Login as Faculty &amp; College Staff</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : isStaffMode ? (
              <Link
                href="/auth/student"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#36594C] dark:text-[#A7C8BD] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors group px-2.5 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                <span>Return to Student Portal</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : null}
          </div>

          {/* Action Link & Theme Toggle */}
          <div className="flex items-center gap-3">
            {topNavAction && (
              <div className="text-right text-xs sm:text-[13px] hidden sm:block">
                <span className="text-[#658278] dark:text-[#789991] mr-1.5">
                  {topNavAction.label}
                </span>
                <Link
                  href={topNavAction.href}
                  className="font-bold text-[#159B72] dark:text-[#20D39B] hover:text-[#0F7A58] dark:hover:text-[#34E4AE] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{topNavAction.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Theme Toggle Pill */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#36594C] dark:text-[#A7C8BD] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-all cursor-pointer"
              title={`Switch to ${isDark ? "Light" : "Dark"} theme`}
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#20D39B]" /> : <Moon className="w-4 h-4 text-[#36594C]" />}
            </button>
          </div>
        </header>

        {/* Mobile topNav fallback for small screens */}
        {topNavAction && (
          <div className="sm:hidden w-full max-w-[560px] mx-auto text-center text-xs pb-3 -mt-2">
            <span className="text-[#658278] dark:text-[#789991] mr-1.5">
              {topNavAction.label}
            </span>
            <Link
              href={topNavAction.href}
              className="font-bold text-[#159B72] dark:text-[#20D39B] hover:underline inline-flex items-center gap-1"
            >
              <span>{topNavAction.actionLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Center Main Card */}
        <main className="flex-1 flex items-center justify-center my-auto py-4">
          {children}
        </main>

        {/* Bottom Safety / Encryption Footer Note */}
        <footer className="w-full max-w-[560px] mx-auto text-center py-4 text-[11px] text-[#658278] dark:text-[#789991]">
          <span>College OS Institutional Authentication Protocol &bull; Encrypted Session</span>
        </footer>
      </div>
    </div>
  );
}
