"use client";

import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard,
} from "@/components/ui/skeleton";

/**
 * NoticesSkeleton
 * Replicates the 2/3 + 1/3 top-aligned layout of the Notices & Announcements Hub with 6 card skeletons.
 */
export default function NoticesSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12">
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3 Starting at the SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Filters + 6 Notice Skeleton Cards + Pagination     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Notices Hero Banner Skeleton */}
          <SkeletonCard padding="p-5 sm:p-6" className="relative overflow-hidden min-h-[104px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-6 w-56 rounded-md" />
                  <SkeletonBadge width="w-20" height="h-5" />
                </div>
                <Skeleton className="h-3.5 w-72 rounded-md" />
              </div>
              <SkeletonButton width="w-32" height="h-9" rounded="rounded-xl" />
            </div>
          </SkeletonCard>

          {/* 2. Notice Filter Bar Skeleton */}
          <SkeletonCard padding="p-3.5 sm:p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Tabs: Notices vs Announcements */}
              <div className="flex items-center gap-2">
                <SkeletonBadge width="w-24" height="h-8" className="rounded-xl" />
                <SkeletonBadge width="w-32" height="h-8" className="rounded-xl" />
              </div>
              {/* Department, Category & Search Inputs */}
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-9 w-36 rounded-xl" />
                <Skeleton className="h-9 w-32 rounded-xl" />
                <Skeleton className="h-9 w-full sm:w-48 rounded-xl" />
              </div>
            </div>
          </SkeletonCard>

          {/* 3. Notice Cards List Skeleton (Exactly 6 cards matching pagination) */}
          <div className="space-y-3.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} padding="p-4 sm:p-5" className="space-y-3">
                {/* Header: Category icon, category pill, department, timestamp, pinned badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <SkeletonCircle size="w-9 h-9" className="rounded-xl" />
                    <div className="flex flex-wrap items-center gap-1.5">
                      <SkeletonBadge width="w-16" height="h-5" />
                      <SkeletonBadge width="w-24" height="h-5" />
                      <Skeleton className="h-2.5 w-20 rounded-xs" />
                    </div>
                  </div>
                  <SkeletonBadge width="w-16" height="h-5" />
                </div>

                {/* Notice Title & Preview Lines */}
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                  <SkeletonText lines={2} widths={["100%", "82%"]} height="h-3" />
                </div>

                {/* Footer: Attachment button, Share, Read More */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-[#E8F1ED] dark:border-[#10372F]">
                  <div className="flex items-center gap-2">
                    <SkeletonBadge width="w-28" height="h-6" className="rounded-lg" />
                  </div>
                  <div className="flex items-center gap-2">
                    <SkeletonCircle size="w-7 h-7" />
                    <SkeletonButton width="w-24" height="h-7" rounded="rounded-lg" />
                  </div>
                </div>
              </SkeletonCard>
            ))}
          </div>

          {/* 4. Pagination Skeleton */}
          <div className="flex items-center justify-between px-2 py-3">
            <Skeleton className="h-3.5 w-44 rounded-md" />
            <div className="flex items-center gap-1.5">
              <SkeletonButton width="w-16" height="h-7" rounded="rounded-lg" />
              <SkeletonCircle size="w-7 h-7" />
              <SkeletonCircle size="w-7 h-7" />
              <SkeletonButton width="w-16" height="h-7" rounded="rounded-lg" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 COLUMN: Starts at TOP beside Notices Hero                       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* 1. Latest Updates Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-4 h-4" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              <SkeletonBadge width="w-14" height="h-4" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-1 pb-2 border-b border-[#E8F1ED]/60 dark:border-[#10372F]/60 last:border-none">
                  <Skeleton className="h-3 w-4/5 rounded-md" />
                  <Skeleton className="h-2 w-20 rounded-md" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 2. Notice Categories Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-36 mb-3 rounded-md" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <SkeletonCircle size="w-4 h-4" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                  <SkeletonBadge width="w-6" height="h-4" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 3. Quick Actions Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-28 mb-3 rounded-md" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <SkeletonCircle size="w-5 h-5" />
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                  <SkeletonCircle size="w-4 h-4" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 4. Stay Informed / CTA Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5" className="min-h-[140px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-6 h-6" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              <SkeletonText lines={2} widths={["100%", "85%"]} height="h-2.5" />
            </div>
            <SkeletonButton width="w-full" height="h-8" rounded="rounded-xl" className="mt-3" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}
