'use client';

import React from 'react';
import { User, Compass, Target, Heart } from 'lucide-react';

export default function PublicProfileAbout({ profile }) {
  if (!profile.bio && (!profile.interests || profile.interests.length === 0)) {
    return null;
  }

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
          <User className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            About &amp; Background
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
            Student biography, career focus, and academic interests
          </p>
        </div>
      </div>

      {/* Bio text */}
      {profile.bio && (
        <p className="text-sm text-gray-600 dark:text-[#D8E8E2] leading-relaxed">
          {profile.bio}
        </p>
      )}

      {/* Structured Details: Career Focus & Campus Orientation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {profile.careerFocus && (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#021512]/50 border border-gray-100 dark:border-[#10372F]/60 flex items-start gap-3">
            <Target className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-[#A7C7BC]">
                Primary Career Focus
              </span>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-[#D8E8E2] mt-0.5">
                {profile.careerFocus}
              </p>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#021512]/50 border border-gray-100 dark:border-[#10372F]/60 flex items-start gap-3">
          <Compass className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-[#A7C7BC]">
              Campus Track
            </span>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-[#D8E8E2] mt-0.5">
              {profile.department} &bull; {profile.semester}
            </p>
          </div>
        </div>
      </div>

      {/* Interests Chips */}
      {profile.interests && profile.interests.length > 0 && (
        <div className="pt-2">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-[#A7C7BC] flex items-center gap-1.5 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Areas of Interest
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50/60 dark:bg-[#10372F]/40 text-emerald-800 dark:text-[#D8E8E2] border border-emerald-200/50 dark:border-[#159B72]/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
