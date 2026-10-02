"use client";

export default function SecuritySkeleton() {
  return (
    <div className="w-full min-h-screen py-6 space-y-5 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full h-40 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#10372F] p-6 space-y-3">
        <div className="w-32 h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
        <div className="w-64 h-7 rounded bg-gray-300 dark:bg-emerald-900/40" />
        <div className="w-full max-w-xl h-4 rounded bg-gray-300 dark:bg-emerald-900/40" />
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols): Password & 2FA & Audit Log */}
        <div className="lg:col-span-8 space-y-5">
          {/* Password Card Skeleton */}
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#10372F] p-5 space-y-4">
            <div className="w-48 h-5 rounded bg-gray-300 dark:bg-emerald-900/40" />
            <div className="space-y-3 pt-2">
              <div className="w-full h-10 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
              <div className="w-full h-10 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
              <div className="w-full h-10 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
            </div>
          </div>

          {/* 2FA Card Skeleton */}
          <div className="h-56 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#10372F] p-5 space-y-4">
            <div className="w-56 h-5 rounded bg-gray-300 dark:bg-emerald-900/40" />
            <div className="w-full h-16 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
            <div className="w-36 h-9 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
          </div>

          {/* Audit Log Skeleton */}
          <div className="h-48 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#10372F] p-5 space-y-3">
            <div className="w-40 h-5 rounded bg-gray-300 dark:bg-emerald-900/40" />
            <div className="space-y-2 pt-2">
              <div className="w-full h-8 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
              <div className="w-full h-8 rounded-lg bg-gray-300 dark:bg-emerald-900/40" />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Active Sessions & Connected Accounts */}
        <div className="lg:col-span-4 space-y-5">
          {/* Active Sessions Skeleton */}
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#10372F] p-5 space-y-4">
            <div className="w-40 h-5 rounded bg-gray-300 dark:bg-emerald-900/40" />
            <div className="w-full h-20 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
            <div className="w-full h-20 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
          </div>

          {/* Connected Accounts Skeleton */}
          <div className="h-72 rounded-2xl bg-gray-200 dark:bg-emerald-950/40 border border-[#D8E8E2] dark:border-[#10372F] p-5 space-y-4">
            <div className="w-44 h-5 rounded bg-gray-300 dark:bg-emerald-900/40" />
            <div className="space-y-2.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-12 rounded-xl bg-gray-300 dark:bg-emerald-900/40" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
