"use client";

export default function SettingsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors animate-pulse">
      {/* 2-Column Grid: Main 2/3 + Right Sidebar 1/3 starting at SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =================================================================== */}
        {/* MAIN 2/3 COLUMN SKELETON                                            */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Hero Banner Skeleton (~96px height) */}
          <div className="w-full h-24 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. 2x2 Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Settings Skeleton */}
            <div className="h-80 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] p-5 space-y-3">
              <div className="w-36 h-5 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
              <div className="w-full h-16 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
              <div className="space-y-2 pt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
                ))}
              </div>
            </div>

            {/* Appearance Skeleton */}
            <div className="h-80 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] p-5 space-y-4">
              <div className="w-32 h-5 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
                <div className="h-14 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
              </div>
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-300 dark:bg-emerald-900/40" />
                ))}
              </div>
              <div className="space-y-2 pt-2">
                <div className="w-full h-8 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
                <div className="w-full h-8 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
              </div>
            </div>

            {/* Notifications Skeleton */}
            <div className="h-80 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] p-5 space-y-3">
              <div className="w-36 h-5 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
              <div className="space-y-2.5 pt-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full h-7 rounded bg-gray-300 dark:bg-emerald-900/40" />
                ))}
              </div>
            </div>

            {/* Privacy & Region Skeleton */}
            <div className="h-80 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] p-5 space-y-3">
              <div className="w-36 h-5 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
              <div className="space-y-2 pt-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full h-6 rounded bg-gray-300 dark:bg-emerald-900/40" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3">
                <div className="h-10 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
                <div className="h-10 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
              </div>
            </div>
          </div>

          {/* 3. Footer Skeleton */}
          <div className="w-full h-8 rounded-xl bg-gray-200 dark:bg-emerald-950/40" />
        </div>

        {/* =================================================================== */}
        {/* RIGHT 1/3 SIDEBAR SKELETON: Starts at SAME TOP LEVEL beside Hero    */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Actions Skeleton */}
          <div className="h-44 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* Account Progress Skeleton */}
          <div className="h-44 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* Help & Support Skeleton */}
          <div className="h-40 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* Feedback CTA Skeleton */}
          <div className="h-20 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
        </div>
      </div>
    </div>
  );
}
