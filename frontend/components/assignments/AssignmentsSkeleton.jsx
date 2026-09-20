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
 * AssignmentsSkeleton
 * Renders an exact 6-card paginated assignment feed with the 2/3 + 1/3 top-aligned desktop layout.
 */
export default function AssignmentsSkeleton() {
  return (
    <div className="w-full min-h-screen pb-12">
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3 Starting at the SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Filters + 6 Assignment Skeleton Cards + Pagination */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Assignments Hero Banner Skeleton */}
          <SkeletonCard padding="p-5 sm:p-6" className="relative overflow-hidden min-h-[104px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-6 w-48 rounded-md" />
                  <SkeletonBadge width="w-24" height="h-5" />
                </div>
                <Skeleton className="h-3.5 w-64 rounded-md" />
              </div>
              <SkeletonButton width="w-32" height="h-9" rounded="rounded-xl" />
            </div>
          </SkeletonCard>

          {/* 2. Filter & Tab Bar Skeleton */}
          <SkeletonCard padding="p-3.5 sm:p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Filter Tabs Skeleton (All, Pending, Submitted, Overdue) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <SkeletonBadge key={idx} width="w-24" height="h-8" className="rounded-xl" />
                ))}
              </div>
              {/* Search & Subject Filter Dropdowns Skeleton */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Skeleton className="h-9 w-full md:w-52 rounded-xl" />
                <Skeleton className="h-9 w-36 rounded-xl shrink-0" />
              </div>
            </div>
          </SkeletonCard>

          {/* 3. Assignment Cards List Skeleton (Exactly 6 cards matching pagination) */}
          <div className="space-y-3.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} padding="p-4 sm:p-5" className="space-y-3">
                {/* Card Header: Subject code, Marks, Urgency badge, Context menu */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <SkeletonBadge width="w-20" height="h-5" className="rounded-md" />
                    <SkeletonBadge width="w-16" height="h-5" className="rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <SkeletonBadge width="w-24" height="h-5" />
                    <SkeletonCircle size="w-7 h-7" />
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-3/4 sm:w-2/3 rounded-md" />
                  <SkeletonText lines={2} widths={["100%", "85%"]} height="h-3" />
                </div>

                {/* Card Footer: Tags, Deadline, Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <SkeletonBadge width="w-14" height="h-4" />
                    <SkeletonBadge width="w-16" height="h-4" />
                    <div className="flex items-center gap-1 ml-1">
                      <SkeletonCircle size="w-3.5 h-3.5" />
                      <Skeleton className="h-2.5 w-24 rounded-xs" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <SkeletonButton width="w-24" height="h-7" rounded="rounded-lg" />
                    <SkeletonButton width="w-28" height="h-7" rounded="rounded-lg" />
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
        {/* RIGHT 1/3 COLUMN: Starts at TOP beside Assignments Hero                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* 1. Upcoming Deadlines Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-4 h-4" />
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
              <SkeletonBadge width="w-8" height="h-4" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-32 rounded-md" />
                    <SkeletonBadge width="w-16" height="h-4" />
                  </div>
                  <Skeleton className="h-2.5 w-24 rounded-md" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 2. Submission Stats Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-32 mb-3 rounded-md" />
            <div className="flex items-center gap-4 mb-3">
              <SkeletonCircle size="w-20 h-20" />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between">
                  <Skeleton className="h-2.5 w-16 rounded-md" />
                  <Skeleton className="h-2.5 w-8 rounded-md" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-2.5 w-16 rounded-md" />
                  <Skeleton className="h-2.5 w-8 rounded-md" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-2.5 w-16 rounded-md" />
                  <Skeleton className="h-2.5 w-8 rounded-md" />
                </div>
              </div>
            </div>
          </SkeletonCard>

          {/* 3. Assignment Calendar Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex justify-between items-center mb-3">
              <Skeleton className="h-4 w-24 rounded-md" />
              <div className="flex gap-1">
                <SkeletonCircle size="w-5 h-5" />
                <SkeletonCircle size="w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center py-1">
              {Array.from({ length: 35 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-full rounded-md" />
              ))}
            </div>
          </SkeletonCard>

          {/* 4. Quick Actions Card Skeleton */}
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
        </div>
      </div>
    </div>
  );
}
