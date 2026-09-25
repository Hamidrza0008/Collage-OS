'use client';

import React from 'react';

export default function PublicProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      {/* Back button skeleton */}
      <div className="w-32 h-5 bg-gray-200 dark:bg-[#10372F] rounded-lg" />

      {/* Hero skeleton */}
      <div className="rounded-3xl bg-white dark:bg-[#06241F] border border-gray-200 dark:border-[#10372F] overflow-hidden">
        <div className="h-44 bg-gray-200 dark:bg-[#10372F]" />
        <div className="p-6 sm:p-8 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gray-300 dark:bg-[#021512] border-4 border-white dark:border-[#06241F]" />
              <div className="space-y-2 pb-2">
                <div className="w-48 h-6 bg-gray-200 dark:bg-[#10372F] rounded" />
                <div className="w-36 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
                <div className="w-64 h-3 bg-gray-200 dark:bg-[#10372F] rounded" />
              </div>
            </div>
            <div className="flex gap-2.5 pb-2">
              <div className="w-28 h-10 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
              <div className="w-28 h-10 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-[#10372F]/60">
            <div className="h-16 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            <div className="h-16 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            <div className="h-16 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            <div className="h-16 bg-gray-100 dark:bg-[#021512] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Main Grid: 2/3 Content + 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-3">
            <div className="w-36 h-5 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-5/6 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
          </div>

          {/* Skills Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-4">
            <div className="w-44 h-5 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="flex flex-wrap gap-2">
              <div className="w-24 h-8 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
              <div className="w-28 h-8 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
              <div className="w-20 h-8 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
              <div className="w-32 h-8 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
            </div>
          </div>

          {/* Projects Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-4">
            <div className="w-48 h-5 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="h-40 bg-gray-100 dark:bg-[#021512] rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-32 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-32 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton (1/3) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-3">
            <div className="w-32 h-4 bg-gray-200 dark:bg-[#10372F] rounded mb-3" />
            <div className="w-full h-10 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
            <div className="w-full h-10 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
          </div>

          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-3">
            <div className="w-32 h-4 bg-gray-200 dark:bg-[#10372F] rounded mb-3" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
