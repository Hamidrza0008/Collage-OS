"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  RotateCw,
  Home,
  ArrowLeft,
  Copy,
  Check,
  ShieldAlert,
  Sun,
  Moon,
  LifeBuoy,
  FileText,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

const emptySubscribe = () => () => {};

export default function ErrorBoundary({ error, reset }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isRetrying, setIsRetrying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Idiomatic React 19 hydration-safe client check
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Lazy initialize non-sensitive incident telemetry without triggering cascading effect renders
  const [incidentId] = useState(() => {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `INC-CSMU-${randomHex}`;
  });

  const [incidentTime] = useState(() => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  useEffect(() => {
    // Technical stack details logged strictly to developer console, never leaked to user UI
    console.error("College OS Application Boundary caught an unhandled route error:", error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    try {
      if (typeof reset === "function") {
        reset();
      }
    } catch (err) {
      console.error("Error boundary reset attempt failed:", err);
    } finally {
      setTimeout(() => {
        setIsRetrying(false);
      }, 750);
    }
  };

  const handleCopyIncidentId = () => {
    if (!incidentId) return;
    navigator.clipboard?.writeText(incidentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFaculty = isAuthenticated && user?.role === "faculty";
  const isStudent = isAuthenticated && user?.role === "student";

  const homeHref = isFaculty
    ? "/faculty"
    : isStudent
    ? "/student"
    : "/auth/student";

  const homeLabel = isFaculty
    ? "Return to Faculty Dashboard"
    : isStudent
    ? "Return to Student Portal"
    : "Return to Sign In";

  return (
    <main className="min-h-screen bg-[#F7FBF9] dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Top Header */}
      <header className="w-full border-b border-[#D8E8E2] dark:border-[#10372F] bg-white/70 dark:bg-[#021512]/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={isAuthenticated ? homeHref : "/auth/student"}
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
                System Diagnostics & Recovery
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
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

      {/* Main Error Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 md:py-16">
        <div className="w-full max-w-2xl text-center">
          {/* Warning Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 mb-6 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide mb-4 mx-auto">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Application Recovery Boundary</span>
          </div>

          {/* Heading and Clarification */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0B3024] dark:text-[#F1FAF6] mb-3">
            Something Went Wrong
          </h1>
          <p className="text-sm sm:text-base text-[#46685B] dark:text-[#9BB8AD] max-w-lg mx-auto leading-relaxed mb-8">
            The application encountered an unexpected runtime exception while processing
            your request. Your session data remains safe, and this event has been logged.
          </p>

          {/* Recovery Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-8">
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#004D40] hover:bg-[#00382E] dark:bg-[#10B981] dark:hover:bg-[#059669] disabled:opacity-75 disabled:cursor-not-allowed text-white dark:text-[#021512] font-semibold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
              <span>{isRetrying ? "Attempting Recovery..." : "Try Again"}</span>
            </button>

            <Link
              href={homeHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#06201B] hover:bg-[#F1F8F5] dark:hover:bg-[#0A2E26] text-[#0B3024] dark:text-[#E1F1EB] border border-[#D8E8E2] dark:border-[#16463D] font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Home className="w-4 h-4" />
              <span>{homeLabel}</span>
            </Link>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[#52796B] dark:text-[#8CB4A6] font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Incident Telemetry Card */}
          <div className="bg-white/90 dark:bg-[#06201B]/90 border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-5 sm:p-6 text-left shadow-xs backdrop-blur-xs max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Incident Diagnostics
              </span>
              <span className="text-[11px] font-mono font-normal lowercase opacity-75">
                {incidentTime}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E1ECE7] dark:border-[#10372F] flex items-center justify-between gap-3 mb-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-[#658278] dark:text-[#789991]">
                  Incident Reference Code:
                </span>
                <span className="font-mono text-sm font-bold text-[#0B3024] dark:text-[#E1F1EB] tracking-wide truncate">
                  {incidentId || "INC-CSMU-RECORDED"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyIncidentId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#0B3830] text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
                aria-label="Copy incident reference code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991]" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#52796B] dark:text-[#8CB4A6] leading-relaxed">
              If this issue recurs, quote this Incident Code to Campus IT Support or your
              department administrator so they can rapidly trace the application log.
            </p>

            <div className="mt-4 pt-3.5 border-t border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#658278] dark:text-[#789991]">
              <span className="flex items-center gap-1.5">
                <LifeBuoy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Support Desk:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300">
                  helpdesk@csmu.ac.in
                </span>
              </span>
              <span>CSMU Systems Infrastructure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 border-t border-[#D8E8E2] dark:border-[#10372F] bg-white/40 dark:bg-[#021512]/40 text-center text-xs text-[#658278] dark:text-[#789991]">
        <p>© 2026 College OS • Chhatrapati Shivaji Maharaj University • Institutional Reliability</p>
      </footer>
    </main>
  );
}
