'use client';

import React from 'react';
import { Users2, Calendar, Award } from 'lucide-react';

export default function PublicProfileCampusContributions({ contributions = [] }) {
  if (!contributions || contributions.length === 0) return null;

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
          <Users2 className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            Campus Contributions &amp; Leadership
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
            Club responsibilities, student mentorship, and community leadership
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {contributions.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-gray-100 dark:border-[#10372F]/60 bg-gray-50/50 dark:bg-[#021512]/40 space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-[#F1FAF6]">
                  {item.title}
                </h3>
                {item.organization && (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-[#20D39B]">
                    {item.organization}
                  </p>
                )}
              </div>
              {item.period && (
                <span className="text-[11px] font-medium text-gray-500 dark:text-[#A7C7BC] flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
              )}
            </div>

            {item.description && (
              <p className="text-xs text-gray-600 dark:text-[#A7C7BC] leading-relaxed pt-0.5">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
