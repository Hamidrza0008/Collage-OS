"use client";

export default function FeedPostDetailsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-16 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-6">
          {/* Post Hero Skeleton */}
          <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-7 space-y-4">
            {/* Top Back Nav Skeleton */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
              <div className="w-32 h-4 rounded-md skeleton-base skeleton-shimmer" />
              <div className="w-20 h-4 rounded-md skeleton-base skeleton-shimmer" />
            </div>

            {/* Author Header Skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full skeleton-base skeleton-shimmer shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="w-40 h-4 rounded-md skeleton-base skeleton-shimmer" />
                <div className="w-28 h-3 rounded-md skeleton-base skeleton-shimmer" />
              </div>
              <div className="w-16 h-6 rounded-full skeleton-base skeleton-shimmer" />
            </div>

            {/* Post Content Skeleton */}
            <div className="space-y-2 pt-2">
              <div className="w-full h-4 rounded-md skeleton-base skeleton-shimmer" />
              <div className="w-5/6 h-4 rounded-md skeleton-base skeleton-shimmer" />
              <div className="w-4/6 h-4 rounded-md skeleton-base skeleton-shimmer" />
            </div>

            {/* Media Skeleton */}
            <div className="w-full h-56 rounded-2xl skeleton-base skeleton-shimmer mt-4" />

            {/* Actions Row Skeleton */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8F1ED] dark:border-[#10372F]">
              <div className="flex items-center gap-6">
                <div className="w-16 h-5 rounded-md skeleton-base skeleton-shimmer" />
                <div className="w-20 h-5 rounded-md skeleton-base skeleton-shimmer" />
                <div className="w-14 h-5 rounded-md skeleton-base skeleton-shimmer" />
              </div>
              <div className="w-12 h-5 rounded-md skeleton-base skeleton-shimmer" />
            </div>
          </div>

          {/* Discussion Section Skeleton */}
          <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
              <div className="w-36 h-5 rounded-md skeleton-base skeleton-shimmer" />
              <div className="w-20 h-6 rounded-xl skeleton-base skeleton-shimmer" />
            </div>

            {/* Comment Composer Skeleton */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full skeleton-base skeleton-shimmer shrink-0" />
              <div className="flex-1 h-20 rounded-xl skeleton-base skeleton-shimmer" />
            </div>

            {/* Comment Cards Skeleton */}
            <div className="space-y-3 pt-2">
              <div className="w-full h-24 rounded-xl skeleton-base skeleton-shimmer" />
              <div className="w-full h-24 rounded-xl skeleton-base skeleton-shimmer" />
              <div className="w-full h-24 rounded-xl skeleton-base skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Right Sidebar (1/3) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-5">
          <div className="w-full h-56 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-36 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="w-full h-64 rounded-2xl skeleton-base skeleton-shimmer border border-[#D8E8E2] dark:border-[#10372F]" />
        </div>
      </div>
    </div>
  );
}
