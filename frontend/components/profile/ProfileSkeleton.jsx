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
 * ProfileSkeleton
 * Preserves the exact 2-column layout and card proportions of the My Profile page.
 */
export default function ProfileSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-10">
      {/* Two-Column Master Grid: Left ~2/3 (lg:col-span-8), Right ~1/3 (lg:col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* ======================================================== */}
        {/* LEFT / CENTER COLUMN (~2/3 width)                        */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-4.5">
          {/* 1. Profile Hero Skeleton */}
          <SkeletonCard padding="p-0" className="overflow-hidden">
            {/* Cover Banner */}
            <Skeleton className="h-32 sm:h-36 w-full rounded-none" />
            {/* Avatar & Details Area */}
            <div className="px-5 pb-5 pt-0 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-3">
                <SkeletonCircle
                  size="w-24 h-24 sm:w-28 sm:h-28"
                  className="border-4 border-white dark:border-[#06241F]"
                />
                <SkeletonButton width="w-28" height="h-9" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-6 w-44 rounded-md" />
                  <SkeletonBadge width="w-16" height="h-5" />
                </div>
                <Skeleton className="h-3.5 w-60 rounded-md" />
                <div className="flex flex-wrap gap-2 pt-1">
                  <SkeletonBadge width="w-24" height="h-5" />
                  <SkeletonBadge width="w-28" height="h-5" />
                  <SkeletonBadge width="w-20" height="h-5" />
                </div>
              </div>
            </div>
          </SkeletonCard>

          {/* 2. Profile Tabs Bar Skeleton */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBadge key={i} width="w-24" height="h-8" className="rounded-xl" />
            ))}
          </div>

          {/* 3. Row 1: About Me + Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {/* About Me Skeleton */}
            <SkeletonCard padding="p-4 sm:p-5" className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <SkeletonCircle size="w-4 h-4" />
                </div>
                {/* Quote Card Skeleton */}
                <div className="p-3 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-1.5">
                  <Skeleton className="h-3 w-4/5 rounded-md" />
                  <Skeleton className="h-2.5 w-2/5 rounded-md" />
                </div>
                <SkeletonText lines={3} widths={["100%", "92%", "78%"]} height="h-3" />
              </div>
            </SkeletonCard>

            {/* Quick Info Skeleton */}
            <SkeletonCard padding="p-4 sm:p-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
                <Skeleton className="h-4 w-24 rounded-md" />
                <SkeletonCircle size="w-4 h-4" />
              </div>
              <div className="space-y-2.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1">
                    <Skeleton className="h-3 w-20 rounded-md" />
                    <Skeleton className="h-3 w-28 rounded-md" />
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>

          {/* 4. Row 2: Profile Statistics + Upcoming Assignments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} padding="p-3.5" className="text-center space-y-2">
                  <SkeletonCircle size="w-7 h-7" className="mx-auto" />
                  <Skeleton className="h-5 w-12 mx-auto rounded-md" />
                  <Skeleton className="h-2.5 w-14 mx-auto rounded-md" />
                </SkeletonCard>
              ))}
            </div>

            {/* Upcoming Assignments Skeleton */}
            <SkeletonCard padding="p-4 sm:p-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F] mb-3">
                <Skeleton className="h-4 w-36 rounded-md" />
                <SkeletonBadge width="w-12" height="h-4" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex justify-between items-center">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-32 rounded-md" />
                      <Skeleton className="h-2.5 w-20 rounded-md" />
                    </div>
                    <SkeletonBadge width="w-14" height="h-5" />
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>

          {/* 5. Projects Section Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] mb-4">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-2.5 w-48 rounded-md" />
              </div>
              <SkeletonButton width="w-24" height="h-7" rounded="rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] space-y-2.5">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-4 w-36 rounded-md" />
                    <SkeletonBadge width="w-12" height="h-4" />
                  </div>
                  <SkeletonText lines={2} widths={["100%", "75%"]} height="h-2.5" />
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1">
                      <SkeletonBadge width="w-10" height="h-4" />
                      <SkeletonBadge width="w-12" height="h-4" />
                    </div>
                    <div className="flex -space-x-1.5">
                      <SkeletonCircle size="w-5 h-5" />
                      <SkeletonCircle size="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 6. Lower Row: Activity + Badges & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            {/* Recent Activity Skeleton */}
            <SkeletonCard padding="p-4 sm:p-5">
              <Skeleton className="h-4 w-28 mb-3 rounded-md" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <SkeletonCircle size="w-6 h-6" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-3 w-40 rounded-md" />
                      <Skeleton className="h-2 w-16 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonCard>

            {/* Badges & Skills Subcolumn */}
            <div className="space-y-4 sm:space-y-4.5">
              {/* Badges Skeleton */}
              <SkeletonCard padding="p-4 sm:p-5">
                <Skeleton className="h-4 w-36 mb-3 rounded-md" />
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="p-2 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] text-center space-y-1.5">
                      <SkeletonCircle size="w-8 h-8" className="mx-auto" />
                      <Skeleton className="h-2 w-12 mx-auto rounded-md" />
                    </div>
                  ))}
                </div>
              </SkeletonCard>

              {/* Skills Skeleton */}
              <SkeletonCard padding="p-4 sm:p-5">
                <Skeleton className="h-4 w-24 mb-3 rounded-md" />
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <SkeletonBadge key={idx} width="w-16" height="h-6" className="rounded-lg" />
                  ))}
                </div>
              </SkeletonCard>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SIDEBAR COLUMN (~1/3 width)                        */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-4.5">
          {/* 1. Profile Completion Card Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-32 rounded-md" />
              <SkeletonBadge width="w-12" height="h-4" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <SkeletonCircle size="w-16 h-16" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-2.5 w-36 rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1">
                  <SkeletonCircle size="w-4 h-4" />
                  <Skeleton className="h-3 w-40 rounded-md" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 2. Social Links Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-24 mb-3 rounded-md" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <SkeletonCircle size="w-5 h-5" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                  <SkeletonCircle size="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* 3. Personal Interests Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5">
            <Skeleton className="h-4 w-28 mb-3 rounded-md" />
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <SkeletonBadge key={idx} width="w-20" height="h-6" className="rounded-lg" />
              ))}
            </div>
          </SkeletonCard>

          {/* 4. Campus AI Promo Skeleton */}
          <SkeletonCard padding="p-4 sm:p-5" className="min-h-[140px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SkeletonCircle size="w-5 h-5" />
                <Skeleton className="h-4 w-28 rounded-md" />
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
