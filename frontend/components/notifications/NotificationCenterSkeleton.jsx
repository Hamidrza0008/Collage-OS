"use client";

export default function NotificationCenterSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="w-full h-20 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

        {/* 4 Summary Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="h-24 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
        </div>

        {/* Main Grid: Left 2/3 + Right 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-4">
            {/* Filter / Search Bar Skeleton */}
            <div className="w-full h-12 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
            <div className="w-full h-8 rounded-xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

            {/* Notification Cards Skeleton */}
            <div className="space-y-3 pt-2">
              <div className="w-24 h-4 rounded-md skeleton-base skeleton-shimmer" />
              <div className="w-full h-28 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
              <div className="w-full h-28 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
              <div className="w-full h-28 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
              <div className="w-24 h-4 rounded-md skeleton-base skeleton-shimmer mt-4" />
              <div className="w-full h-28 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
              <div className="w-full h-28 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
            </div>
          </div>

          {/* Right Sidebar (1/3) */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-4">
            <div className="w-full h-44 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
            <div className="w-full h-56 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
            <div className="w-full h-48 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          </div>
        </div>
      </div>
    </div>
  );
}
