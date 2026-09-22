"use client";

export default function ProjectsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors animate-pulse">
      {/* 2-Column Grid: Main 2/3 + Right Sidebar 1/3 starting at SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =================================================================== */}
        {/* MAIN 2/3 COLUMN SKELETON                                            */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Hero Skeleton (~96px height) */}
          <div className="w-full h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. Tabs + Search Toolbar Skeleton */}
          <div className="w-full h-14 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 3. Category Chips + Sort Skeleton */}
          <div className="w-full h-9 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-7 rounded-full skeleton-base skeleton-shimmer"
                />
              ))}
            </div>
            <div className="w-28 h-7 rounded-xl skeleton-base skeleton-shimmer shrink-0" />
          </div>

          {/* 4. 3x3 Project Grid Skeleton (Exactly 9 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-56 p-4 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-24 h-5 rounded-lg bg-gray-300 dark:bg-emerald-950/40" />
                  <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-emerald-950/40" />
                </div>

                <div className="flex items-start gap-3 my-2">
                  <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-emerald-950/40 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-full h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                </div>

                <div className="flex gap-1.5 my-1">
                  <div className="w-12 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  <div className="w-12 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  <div className="w-12 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                </div>

                <div className="pt-2 border-t border-gray-200/60 dark:border-emerald-900/30 flex items-center justify-between">
                  <div className="w-20 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  <div className="w-24 h-7 rounded-lg bg-gray-300 dark:bg-emerald-950/40" />
                </div>
              </div>
            ))}
          </div>

          {/* 5. Project Idea CTA Skeleton */}
          <div className="w-full h-20 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />
        </div>

        {/* =================================================================== */}
        {/* RIGHT 1/3 SIDEBAR SKELETON                                          */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Project Stats Skeleton */}
          <div className="w-full h-44 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. Top Projects Skeleton */}
          <div className="w-full h-64 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 3. Quick Actions Skeleton */}
          <div className="w-full h-52 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 4. Collaboration CTA Skeleton */}
          <div className="w-full h-44 rounded-2xl skeleton-base skeleton-shimmer border border-emerald-800/40" />
        </div>
      </div>
    </div>
  );
}
