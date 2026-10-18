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
  showFacultyLink = false,
  showThemeToggle = false,
  showFooter = false,
  isStaffMode = false,
  cardMaxWidth = "max-w-[480px]",
}) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col lg:flex-row bg-[#F7FBF9] dark:bg-[#031A16] transition-colors duration-200 overflow-y-auto lg:overflow-hidden">
      {/* Left Visual / Branding Column */}
      <div className="w-full lg:w-[48%] xl:w-[47%] shrink-0 h-full max-h-screen overflow-hidden">
        <AuthBrandPanel {...brandProps} />
      </div>

      {/* Right Authentication Column */}
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-6 xl:px-8 py-3 sm:py-4 relative h-full max-h-screen overflow-y-auto lg:overflow-hidden bg-[#F8FAF9] dark:bg-[#031A16]">
        {/* Top Navigation Bar */}
        <header className={`w-full ${cardMaxWidth} mx-auto flex items-center justify-between gap-3 pb-1 pt-0 shrink-0`}>
          {/* Optional Faculty / Staff Access Link */}
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

          {/* Action Link & Optional Theme Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            {topNavAction && (
              <div className="text-right text-xs sm:text-[13px]">
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

            {/* Optional Theme Toggle Pill */}
            {showThemeToggle && (
              <button
                type="button"
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#36594C] dark:text-[#A7C8BD] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-all cursor-pointer"
                title={`Switch to ${isDark ? "Light" : "Dark"} theme`}
                aria-label="Toggle color theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-[#20D39B]" /> : <Moon className="w-4 h-4 text-[#36594C]" />}
              </button>
            )}
          </div>
        </header>

        {/* Center Main Card */}
        <main className="flex-1 flex items-center justify-center my-auto w-full py-1 min-h-0">
          {children}
        </main>

        {/* Optional Bottom Safety / Encryption Footer Note */}
        {showFooter && (
          <footer className={`w-full ${cardMaxWidth} mx-auto text-center py-1.5 text-[11px] text-[#658278] dark:text-[#789991] shrink-0`}>
            <span>College OS Institutional Authentication Protocol &bull; Encrypted Session</span>
          </footer>
        )}
      </div>
    </div>
  );
}
