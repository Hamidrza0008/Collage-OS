"use client";

import React from "react";

export default function CommunityGroupSkeleton() {
  return (
    <div className="min-h-screen bg-[#F1FAF6] dark:bg-[#021512] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        {/* Compact Back navigation */}
        <div className="h-6 w-36 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-lg" />

        {/* Hero Card Skeleton */}
        <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl overflow-hidden shadow-sm">
          <div className="h-36 sm:h-48 md:h-56 bg-emerald-950/10 dark:bg-emerald-500/10" />
          <div className="px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-emerald-950/20 dark:bg-emerald-500/20 border-4 border-white dark:border-[#021512]" />
                <div className="space-y-2 pb-1">
                  <div className="h-7 w-48 sm:w-64 bg-emerald-950/15 dark:bg-emerald-500/20 rounded-lg" />
                  <div className="h-4 w-32 sm:w-40 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-md" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-28 bg-emerald-950/15 dark:bg-emerald-500/20 rounded-xl" />
                <div className="h-9 w-24 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
                <div className="h-9 w-9 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
              </div>
            </div>
            <div className="h-4 w-3/4 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-md mt-4" />
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-emerald-950/5 dark:border-emerald-500/10">
              <div className="h-4 w-24 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-md" />
              <div className="h-4 w-24 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-md" />
              <div className="h-4 w-24 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-md" />
            </div>
          </div>
        </div>

        {/* 2/3 Main & 1/3 Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs skeleton */}
            <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl">
              <div className="h-8 w-20 bg-emerald-950/15 dark:bg-emerald-500/20 rounded-xl" />
              <div className="h-8 w-20 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
              <div className="h-8 w-20 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
              <div className="h-8 w-20 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
              <div className="h-8 w-20 bg-emerald-950/10 dark:bg-emerald-500/10 rounded-xl" />
            </div>

            {/* Post cards skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-950/15 dark:bg-emerald-500/20" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-32 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
                      <div className="h-3 w-20 bg-emerald-950/10 dark:bg-emerald-500/10 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-emerald-950/10 dark:bg-emerald-500/10 rounded" />
                    <div className="h-4 w-5/6 bg-emerald-950/10 dark:bg-emerald-500/10 rounded" />
                  </div>
                  <div className="h-40 w-full bg-emerald-950/5 dark:bg-emerald-500/10 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="h-5 w-32 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
              <div className="grid grid-cols-2 gap-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-emerald-950/5 dark:bg-emerald-500/10 rounded-xl"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0B3024]/40 border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="h-5 w-28 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-950/15 dark:bg-emerald-500/20" />
                    <div className="space-y-1 flex-1">
                      <div className="h-3 w-24 bg-emerald-950/15 dark:bg-emerald-500/20 rounded" />
                      <div className="h-2.5 w-16 bg-emerald-950/10 dark:bg-emerald-500/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
