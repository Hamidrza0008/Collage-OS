"use client";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-12 animate-pulse space-y-4">
      {/* Back button skeleton */}
      <div className="w-32 h-6 rounded-lg bg-gray-200/80 dark:bg-[#0A2E27]" />

      {/* Master 2/3 + 1/3 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main 2/3 Column Skeleton */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hero Banner Skeleton */}
          <div className="rounded-3xl border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#06241F] overflow-hidden">
            <div className="w-full h-56 sm:h-72 bg-gray-200 dark:bg-[#0A2E27]" />
            <div className="p-6 space-y-3">
              <div className="w-3/4 h-6 rounded-lg bg-gray-200 dark:bg-[#0A2E27]" />
              <div className="w-full h-4 rounded-lg bg-gray-200/70 dark:bg-[#082A24]" />
              <div className="w-1/2 h-4 rounded-lg bg-gray-200/70 dark:bg-[#082A24]" />
              <div className="flex gap-2 pt-2">
                <div className="w-28 h-9 rounded-xl bg-gray-200 dark:bg-[#0A2E27]" />
                <div className="w-28 h-9 rounded-xl bg-gray-200 dark:bg-[#0A2E27]" />
              </div>
            </div>
          </div>

          {/* Meta Chips */}
          <div className="flex gap-2">
            <div className="w-24 h-7 rounded-xl bg-gray-200/80 dark:bg-[#082A24]" />
            <div className="w-28 h-7 rounded-xl bg-gray-200/80 dark:bg-[#082A24]" />
            <div className="w-20 h-7 rounded-xl bg-gray-200/80 dark:bg-[#082A24]" />
          </div>

          {/* Overview Skeleton */}
          <div className="p-6 rounded-3xl border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#06241F] space-y-4">
            <div className="w-32 h-5 rounded bg-gray-200 dark:bg-[#0A2E27]" />
            <div className="w-full h-16 rounded-xl bg-gray-100 dark:bg-[#082A24]" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-2xl bg-gray-100 dark:bg-[#082A24]" />
              <div className="h-24 rounded-2xl bg-gray-100 dark:bg-[#082A24]" />
            </div>
          </div>

          {/* Documentation Skeleton */}
          <div className="p-6 rounded-3xl border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#06241F] space-y-4">
            <div className="w-40 h-5 rounded bg-gray-200 dark:bg-[#0A2E27]" />
            <div className="space-y-2">
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-[#082A24]" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-[#082A24]" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-[#082A24]" />
            </div>
          </div>

          {/* Media Showcase Skeleton */}
          <div className="p-6 rounded-3xl border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#06241F] space-y-3">
            <div className="w-32 h-5 rounded bg-gray-200 dark:bg-[#0A2E27]" />
            <div className="w-full h-64 rounded-2xl bg-gray-200 dark:bg-[#0A2E27]" />
          </div>
        </div>

        {/* Right 1/3 Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#06241F] space-y-3">
            <div className="w-28 h-5 rounded bg-gray-200 dark:bg-[#0A2E27]" />
            <div className="space-y-2">
              <div className="h-4 rounded bg-gray-100 dark:bg-[#082A24]" />
              <div className="h-4 rounded bg-gray-100 dark:bg-[#082A24]" />
              <div className="h-4 rounded bg-gray-100 dark:bg-[#082A24]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 dark:border-[#10372F] bg-white dark:bg-[#06241F] space-y-3">
            <div className="w-32 h-5 rounded bg-gray-200 dark:bg-[#0A2E27]" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-xl bg-gray-100 dark:bg-[#082A24]" />
              <div className="h-14 rounded-xl bg-gray-100 dark:bg-[#082A24]" />
            </div>
          </div>

          <div className="h-40 rounded-2xl bg-emerald-950/40 border border-emerald-900/50" />
        </div>
      </div>
    </div>
  );
}
