'use client';

import React from 'react';

export default function OpportunitySkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      {/* Back button skeleton */}
      <div className="w-40 h-5 bg-gray-200 dark:bg-[#10372F] rounded-lg" />

      {/* Main Grid: 2/3 Content + 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-[#10372F]" />
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
                  <div className="w-64 h-6 bg-gray-200 dark:bg-[#10372F] rounded" />
                  <div className="w-48 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 dark:border-[#10372F]/60">
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            </div>
          </div>

          {/* Overview Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-4">
            <div className="w-36 h-5 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
              <div className="w-5/6 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
              <div className="w-4/6 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            </div>
          </div>

          {/* Responsibilities Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-3">
            <div className="w-44 h-5 bg-gray-200 dark:bg-[#10372F] rounded mb-2" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-11/12 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-4/5 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
          </div>

          {/* Eligibility Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-4">
            <div className="w-48 h-5 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
              <div className="h-14 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            </div>
          </div>

          {/* Skills Match Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-4">
            <div className="w-44 h-5 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="h-20 bg-gray-100 dark:bg-[#021512] rounded-xl" />
            <div className="flex gap-2">
              <div className="w-16 h-7 bg-gray-200 dark:bg-[#10372F] rounded-full" />
              <div className="w-20 h-7 bg-gray-200 dark:bg-[#10372F] rounded-full" />
              <div className="w-24 h-7 bg-gray-200 dark:bg-[#10372F] rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar Column (1/3) */}
        <div className="space-y-6">
          {/* CTA Card Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-4">
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
              <div className="w-16 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            </div>
            <div className="w-full h-12 bg-gray-200 dark:bg-[#10372F] rounded-xl" />
            <div className="w-40 h-3 bg-gray-200 dark:bg-[#10372F] rounded mx-auto" />
          </div>

          {/* Quick Facts Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-3">
            <div className="w-32 h-4 bg-gray-200 dark:bg-[#10372F] rounded mb-3" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
            <div className="w-full h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
          </div>

          {/* Company Card Skeleton */}
          <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 space-y-3">
            <div className="w-28 h-4 bg-gray-200 dark:bg-[#10372F] rounded mb-2" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#10372F]" />
              <div className="space-y-1.5">
                <div className="w-32 h-4 bg-gray-200 dark:bg-[#10372F] rounded" />
                <div className="w-20 h-3 bg-gray-200 dark:bg-[#10372F] rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
