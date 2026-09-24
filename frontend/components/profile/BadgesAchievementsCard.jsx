"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";

export default function BadgesAchievementsCard({ achievements = [] }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Award className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Badges & Achievements
          </h2>
        </div>

        <Link
          href="#profile-achievements"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2]/80 dark:border-[#16463D] p-3 text-center flex flex-col items-center justify-between hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 hover:shadow-2xs transition-all group"
          >
            <div className="relative w-12 h-12 my-1 group-hover:scale-105 transition-transform">
              <Image
                src={item.badge}
                alt={item.title}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <div className="mt-1">
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] text-[#658278] dark:text-[#789991] mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
