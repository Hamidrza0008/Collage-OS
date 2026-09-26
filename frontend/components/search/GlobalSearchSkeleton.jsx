"use client";

export default function GlobalSearchSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Column (2/3) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Header Skeleton */}
          <div className="w-full h-36 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Category Tabs Skeleton */}
          <div className="w-full h-14 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />

          {/* Filter Bar Skeleton */}
          <div className="w-full h-10 rounded-xl skeleton-base skeleton-shimmer" />

          {/* Result Cards Skeletons */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full h-32 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]"
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar Skeleton (1/3) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="w-full h-48 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-40 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-48 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
        </div>
      </div>
    </div>
  );
}
