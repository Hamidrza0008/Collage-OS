"use client";

export default function EventDetailsSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-16 lg:pb-12 space-y-4 animate-pulse">
      {/* Back button skeleton */}
      <div className="w-28 h-4 rounded bg-gray-200 dark:bg-[#06241F]" />

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Column (~2/3) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Hero Banner Skeleton */}
          <div className="w-full h-64 sm:h-80 rounded-2xl bg-gray-200 dark:bg-[#06241F]" />

          {/* Overview Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-36 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-full h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="w-5/6 h-4 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="h-16 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              <div className="h-16 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              <div className="h-16 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
            </div>
          </div>

          {/* Highlights Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-40 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              ))}
            </div>
          </div>

          {/* Schedule Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-48 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="space-y-3 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              ))}
            </div>
          </div>

          {/* Speakers Skeleton */}
          <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 space-y-3">
            <div className="w-44 h-5 rounded bg-gray-200 dark:bg-[#06241F]" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-gray-200 dark:bg-[#06241F]" />
              ))}
            </div>
          </div>

          {/* Venue Skeleton */}
          <div className="w-full h-48 rounded-2xl bg-gray-200 dark:bg-[#06241F]" />
        </div>

        {/* Right Sidebar (~1/3) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="w-full h-48 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
          <div className="w-full h-44 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
          <div className="w-full h-40 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
          <div className="w-full h-52 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] p-4" />
        </div>
      </div>
    </div>
  );
}
