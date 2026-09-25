'use client';

import React from 'react';
import Link from 'next/link';
import { UserX, ArrowLeft, Search, Users } from 'lucide-react';

export default function PublicProfileNotFound({ id }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-8 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B] flex items-center justify-center mx-auto mb-5 border border-emerald-100 dark:border-[#159B72]/30">
          <UserX className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-bold text-gray-900 dark:text-[#D8E8E2] mb-2">
          Student Not Found
        </h1>

        <p className="text-sm text-gray-600 dark:text-[#A7C7BC] leading-relaxed mb-6">
          {id ? (
            <>
              The student profile matching{' '}
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#021512] font-mono text-xs text-emerald-600 dark:text-[#20D39B]">
                {id}
              </code>{' '}
              could not be found or has restricted visibility settings.
            </>
          ) : (
            'The requested student profile is unavailable or does not exist.'
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/student/feed"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campus Feed
          </Link>

          <Link
            href="/student/projects"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm border border-gray-200 dark:border-[#10372F] text-gray-700 dark:text-[#D8E8E2] hover:bg-gray-50 dark:hover:bg-[#10372F]/50 transition-all"
          >
            <Users className="w-4 h-4" />
            Explore Student Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
