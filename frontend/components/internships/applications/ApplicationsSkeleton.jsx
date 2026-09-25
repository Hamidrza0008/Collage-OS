"use client";

export default function ApplicationsSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="pb-6 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60 flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <div className="w-32 h-4 rounded-md bg-gray-200 dark:bg-[#10372F]" />
          <div className="w-56 h-8 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
          <div className="w-80 h-4 rounded-md bg-gray-200 dark:bg-[#10372F]" />
        </div>
        <div className="w-48 h-9 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-10 h-6 rounded-md bg-gray-200 dark:bg-[#10372F]" />
            </div>
            <div className="w-24 h-3.5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
            <div className="w-16 h-2.5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
          </div>
        ))}
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-24 h-9 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
        ))}
      </div>

      {/* Main 2/3 + 1/3 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] space-y-4"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#10372F] shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="w-48 h-5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
                  <div className="w-32 h-3.5 rounded-md bg-gray-200 dark:bg-[#10372F]" />
                </div>
                <div className="w-24 h-6 rounded-full bg-gray-200 dark:bg-[#10372F]" />
              </div>
              <div className="w-full h-8 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              <div className="w-full h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
            </div>
          ))}
        </div>

        {/* Right Rail (1/3) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="h-56 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />
          <div className="h-44 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />
        </div>
      </div>
    </div>
  );
}
