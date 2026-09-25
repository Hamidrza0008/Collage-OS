'use client';

import React from 'react';
import { Award, Trophy, Medal, CheckCircle2, Calendar } from 'lucide-react';

export default function PublicProfileAchievements({ achievements = [] }) {
  if (!achievements || achievements.length === 0) {
    return (
      <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
              Achievements &amp; Honors
            </h2>
            <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
              Hackathons, coding contests, and verified campus recognitions
            </p>
          </div>
        </div>
        <div className="py-8 text-center text-xs text-gray-500 dark:text-[#A7C7BC]">
          No public achievements added yet.
        </div>
      </section>
    );
  }

  const getCategoryBadge = (category) => {
    switch (category?.toLowerCase()) {
      case 'hackathon':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/40';
      case 'competition':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/40';
      case 'certification':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/40';
      case 'open source':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40';
      default:
        return 'bg-teal-50 text-teal-700 dark:bg-[#10372F] dark:text-[#20D39B] border-teal-200 dark:border-[#159B72]/40';
    }
  };

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
          <Trophy className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            Achievements &amp; Honors
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
            Hackathon podiums, certifications, and technical distinctions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-4.5 rounded-xl border border-gray-200/80 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#021512]/50 hover:bg-white dark:hover:bg-[#06241F] hover:border-amber-400/50 dark:hover:border-amber-500/30 transition-all shadow-xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadge(item.category)}`}>
                {item.category || 'Honors'}
              </span>

              {item.date && (
                <span className="text-[11px] font-medium text-gray-500 dark:text-[#A7C7BC] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#F1FAF6] leading-snug">
                {item.title}
              </h3>
              {item.issuer && (
                <p className="text-xs font-semibold text-emerald-600 dark:text-[#20D39B] mt-0.5">
                  {item.issuer}
                </p>
              )}
            </div>

            {item.description && (
              <p className="text-xs text-gray-600 dark:text-[#A7C7BC] leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
