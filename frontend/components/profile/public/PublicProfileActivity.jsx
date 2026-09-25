'use client';

import React from 'react';
import { Activity, Clock, FolderGit2, Award, BookOpen, Sparkles } from 'lucide-react';

export default function PublicProfileActivity({ activity = [] }) {
  if (!activity || activity.length === 0) return null;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'project':
        return <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'achievement':
        return <Award className="w-3.5 h-3.5 text-amber-500" />;
      case 'open-source':
        return <Sparkles className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            Campus Presence &amp; Activity
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
            Public milestones, open contributions, and verified campus activity
          </p>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-[#10372F]">
        {activity.map((item, idx) => (
          <div key={item.id || idx} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white dark:bg-[#06241F] border-2 border-emerald-500 flex items-center justify-center group-hover:scale-125 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="p-1 rounded-md bg-gray-100 dark:bg-[#021512] shrink-0">
                  {getActivityIcon(item.type)}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-[#F1FAF6]">
                  {item.title}
                </h3>
                {item.time && (
                  <span className="text-[11px] text-gray-400 dark:text-[#A7C7BC] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                )}
              </div>

              {item.detail && (
                <p className="text-xs text-gray-600 dark:text-[#A7C7BC] leading-relaxed pl-6">
                  {item.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
