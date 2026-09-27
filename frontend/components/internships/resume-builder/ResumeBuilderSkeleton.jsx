"use client";

import React from "react";

export default function ResumeBuilderSkeleton() {
  return (
    <div className="min-h-screen bg-[#F1FAF6] dark:bg-[#021512] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl p-6 space-y-4">
          <div className="h-4 w-36 bg-emerald-950/10 dark:bg-emerald-500/10 rounded" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-7 w-56 bg-emerald-950/15 dark:bg-emerald-500/20 rounded-lg" />
              <div className="h-4 w-80 bg-emerald-950/10 dark:bg-emerald-500/10 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-32 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
              <div className="h-9 w-24 bg-emerald-950/15 dark:bg-emerald-500/20 rounded-xl" />
              <div className="h-9 w-28 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
            </div>
          </div>
        </div>

        {/* 2/3 Main Editor + 1/3 Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols ≈ 2/3) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl p-6 space-y-4">
              <div className="h-5 w-44 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
                <div className="h-10 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl p-6 space-y-4">
              <div className="h-5 w-36 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
              <div className="h-24 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-2xl" />
            </div>

            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl p-6 space-y-4">
              <div className="h-5 w-40 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-12 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols ≈ 1/3) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl p-6 space-y-3">
              <div className="h-5 w-36 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
              <div className="h-2 w-full bg-emerald-950/10 dark:bg-emerald-500/10 rounded-full" />
              <div className="space-y-2 pt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 bg-emerald-950/5 dark:bg-emerald-500/10 rounded-lg" />
                ))}
              </div>
            </div>

            <div className="h-[450px] bg-white dark:bg-[#0B3024]/30 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
