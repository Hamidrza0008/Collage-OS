"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  Home,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

const emptySubscribe = () => () => {};

export default function NotFound() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Idiomatic React 19 hydration-safe check without cascading renders
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isFaculty = isAuthenticated && user?.role === "faculty";
  const isStudent = isAuthenticated && user?.role === "student";

  const primaryHref = isFaculty
    ? "/faculty"
    : isStudent
    ? "/student"
    : "/auth/student";

  const primaryLabel = isFaculty
    ? "Return to Faculty Portal"
    : isStudent
    ? "Return to Student Portal"
    : "Student Portal Sign In";

  return (
    <main className="min-h-screen bg-[#F7FBF9] dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Top Institutional Header */}
      <header className="w-full border-b border-[#D8E8E2] dark:border-[#10372F] bg-white/70 dark:bg-[#021512]/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={isAuthenticated ? primaryHref : "/auth/student"}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40">
              <Image
                src={isClient && isDark ? "/assets/layout/logo-dark.svg" : "/assets/layout/logo-light.svg"}
                alt="College OS Logo"
                width={26}
                height={26}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                College OS
              </span>
              <span className="text-[10px] font-medium text-[#658278] dark:text-[#789991] tracking-wider uppercase">
                Institutional Gateway
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2 rounded-xl text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#E8F3EE] dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {isClient && isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-800 dark:text-[#B5CCC5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 md:py-16">
        <div className="w-full max-w-2xl text-center">
          {/* Badge & Decorative Icon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wide mb-6">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>HTTP 404 • Resource Not Located</span>
          </div>

          {/* Large Typographic 404 */}
          <div className="relative mb-2">
            <h1 className="text-8xl sm:text-9xl md:text-[140px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#0A6C5C] via-[#0D8270] to-[#044036] dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-600 select-none drop-shadow-sm">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-20">
              <span className="text-9xl font-mono text-emerald-900 dark:text-emerald-200">
                ∅
              </span>
            </div>
          </div>

          {/* Heading and Clarification */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6] mb-3">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-[#46685B] dark:text-[#9BB8AD] max-w-lg mx-auto leading-relaxed mb-8">
            The institutional record, portal section, or campus page you requested
            does not exist, has been relocated, or is temporarily restricted.
          </p>

          {/* Primary & Secondary Recovery Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-10">
            <Link
              href={primaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#004D40] hover:bg-[#00382E] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white dark:text-[#021512] font-semibold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-[#031A16]"
            >
              <Home className="w-4 h-4" />
              <span>{isLoading ? "Loading..." : primaryLabel}</span>
            </Link>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#06201B] hover:bg-[#F1F8F5] dark:hover:bg-[#0A2E26] text-[#0B3024] dark:text-[#E1F1EB] border border-[#D8E8E2] dark:border-[#16463D] font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Contextual Institutional Directory Card */}
          <div className="bg-white/90 dark:bg-[#06201B]/90 border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 sm:p-6 text-left shadow-xs backdrop-blur-xs max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
              <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Institutional Quick Navigation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {isAuthenticated ? (
                isFaculty ? (
                  <>
                    <Link
                      href="/faculty/marks"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs font-semibold text-[#0B3024] dark:text-[#E1F1EB] group"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Marks & Grading
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <Link
                      href="/faculty/timetable"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs font-semibold text-[#0B3024] dark:text-[#E1F1EB] group"
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Teaching Timetable
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/student/academics"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs font-semibold text-[#0B3024] dark:text-[#E1F1EB] group"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Academics & Attendance
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <Link
                      href="/student/campus-feed"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs font-semibold text-[#0B3024] dark:text-[#E1F1EB] group"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Campus Community
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </>
                )
              ) : (
                <>
                  <Link
                    href="/auth/student"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs font-semibold text-[#0B3024] dark:text-[#E1F1EB] group"
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Student Portal Sign In
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="/auth/faculty"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs font-semibold text-[#0B3024] dark:text-[#E1F1EB] group"
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Faculty & Staff Sign In
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* Support Helpdesk Callout */}
            <div className="mt-4 pt-3.5 border-t border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#658278] dark:text-[#789991]">
              <span className="flex items-center gap-1.5">
                <LifeBuoy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Campus IT Helpdesk:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300">
                  helpdesk@csmu.ac.in
                </span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>CSMU College OS v2.4</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Footer */}
      <footer className="w-full py-4 border-t border-[#D8E8E2] dark:border-[#10372F] bg-white/40 dark:bg-[#021512]/40 text-center text-xs text-[#658278] dark:text-[#789991]">
        <p>© 2026 College OS • Chhatrapati Shivaji Maharaj University • All Rights Reserved</p>
      </footer>
    </main>
  );
}
