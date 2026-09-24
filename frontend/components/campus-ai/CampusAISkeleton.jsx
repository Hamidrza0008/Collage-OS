"use client";

export default function CampusAISkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors animate-pulse">
      {/* 2-Column Grid: Main 2/3 + Right Sidebar 1/3 starting at SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =================================================================== */}
        {/* MAIN 2/3 COLUMN SKELETON                                            */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Hero Skeleton (~96px height) */}
          <div className="w-full h-24 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. Tabs + Mode Dropdowns Toolbar Skeleton */}
          <div className="w-full h-10 rounded-xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 3. Assistant Greeting Card Skeleton */}
          <div className="w-full h-44 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D] p-5 space-y-3">
            <div className="w-32 h-5 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
            <div className="w-3/4 h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
            <div className="flex gap-2 pt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-16 h-6 rounded-full bg-gray-300 dark:bg-emerald-900/40" />
              ))}
            </div>
          </div>

          {/* 4. Quick Prompts Header & 2x2 Grid Skeleton */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="w-28 h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
              <div className="w-14 h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
              ))}
            </div>
          </div>

          {/* 5. Composer Box Skeleton */}
          <div className="w-full h-16 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 6. Footer Banner Skeleton */}
          <div className="w-full h-11 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
        </div>

        {/* =================================================================== */}
        {/* RIGHT 1/3 SIDEBAR SKELETON: Starts at SAME TOP LEVEL beside Hero    */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. How Campus AI Works Card Skeleton */}
          <div className="w-full h-44 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. Sample Questions Card Skeleton */}
          <div className="w-full h-44 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 3. Recent Queries Card Skeleton */}
          <div className="w-full h-44 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 4. Campus AI CTA Card Skeleton */}
          <div className="w-full h-32 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#16463D]" />
        </div>
      </div>
    </div>
  );
}
