"use client";

import Link from "next/link";
import { Shield, ChevronRight, AlertTriangle, KeyRound, Lock, Info } from "lucide-react";

export default function SecurityHeader() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#021512] shadow-xs p-5 sm:p-6 transition-all">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5C786E] dark:text-[#8AA89F] mb-3">
        <Link
          href="/student/settings"
          className="hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors font-medium flex items-center gap-1"
        >
          <span>Settings</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#A0BCB2] dark:text-[#3B665B] shrink-0" />
        <span className="text-[#0B3024] dark:text-[#E2F1EC] font-semibold">
          Security &amp; Connected Accounts
        </span>
      </nav>

      {/* Title & Badge */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[#159B72] dark:text-[#20D39B] text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Account Security &amp; Access Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Security &amp; Connected Accounts
          </h1>
          <p className="text-xs sm:text-sm text-[#5C786E] dark:text-[#8AA89F] mt-1 max-w-2xl leading-relaxed">
            Manage your student account credentials, two-factor authentication, active browser sessions, and authorized third-party OAuth provider connections.
          </p>
        </div>

        {/* Status indicator pills */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7FBF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F]">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C786E] dark:text-[#8AA89F]">
                Credential Scope
              </span>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Client Local UI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
            <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Backend Status
              </span>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-200">
                Demo Simulation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Mandatory Local Demo Disclaimer */}
      <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
          <span className="font-bold">Local Demo Mode:</span> Security settings, credentials, and session states are simulated locally within this browser session. No authentication backend is connected.
        </div>
      </div>
    </div>
  );
}
