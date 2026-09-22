"use client";

export default function InternshipsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors animate-pulse">
      {/* 2-Column Grid: Main 2/3 + Right Sidebar 1/3 starting at SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =================================================================== */}
        {/* MAIN 2/3 COLUMN SKELETON                                            */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Hero Skeleton (~96px height) */}
          <div className="w-full h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. Tabs + Search Toolbar Skeleton */}
          <div className="w-full h-14 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 3. Internships Section Header Skeleton */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-48 h-6 rounded-lg skeleton-base skeleton-shimmer" />
              <div className="w-16 h-5 rounded-lg skeleton-base skeleton-shimmer" />
            </div>

            {/* 4-column Card Row (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 p-3.5 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-5 h-5 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-300 dark:bg-emerald-950/40 my-1" />
                  <div className="space-y-1.5">
                    <div className="w-3/4 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-1/2 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                  <div className="flex gap-1 my-1">
                    <div className="w-10 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-10 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 dark:border-emerald-900/30 flex items-center justify-between">
                    <div className="w-16 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-16 h-6 rounded-lg bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Hackathons Section Header Skeleton */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="w-48 h-6 rounded-lg skeleton-base skeleton-shimmer" />
              <div className="w-16 h-5 rounded-lg skeleton-base skeleton-shimmer" />
            </div>

            {/* 4-column Card Row (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 p-3.5 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-5 h-5 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-300 dark:bg-emerald-950/40 my-1" />
                  <div className="space-y-1.5">
                    <div className="w-3/4 h-4 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-1/2 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                  <div className="flex gap-1 my-1">
                    <div className="w-10 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-10 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 dark:border-emerald-900/30 flex items-center justify-between">
                    <div className="w-16 h-3 rounded bg-gray-300 dark:bg-emerald-950/40" />
                    <div className="w-16 h-6 rounded-lg bg-gray-300 dark:bg-emerald-950/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Submit Opportunity Banner Skeleton */}
          <div className="w-full h-20 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />
        </div>

        {/* =================================================================== */}
        {/* RIGHT 1/3 SIDEBAR SKELETON                                          */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Quick Actions Skeleton */}
          <div className="w-full h-52 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 2. Featured Opportunities Skeleton */}
          <div className="w-full h-64 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 3. Top Skills Skeleton */}
          <div className="w-full h-40 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#16463D]" />

          {/* 4. Career CTA Skeleton */}
          <div className="w-full h-44 rounded-2xl skeleton-base skeleton-shimmer border border-emerald-800/40" />
        </div>
      </div>
    </div>
  );
}
