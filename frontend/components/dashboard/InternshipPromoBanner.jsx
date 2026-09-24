"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function InternshipPromoBanner() {
  const { isDark } = useTheme();

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-[#DDF3EB]/90 via-[#ECF9F4]/80 to-[#DDF3EB]/50 dark:from-[#06241F] dark:via-[#082A24] dark:to-[#031A16] border border-[#159B72]/30 dark:border-[#16463D] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left Content */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 flex-1 min-w-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512] shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-[13.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-tight">
              Explore Internships & Hackathons
            </h2>
            <p className="text-[11px] text-[#36594C] dark:text-[#B5CCC5] truncate mt-0.5">
              Get closer to your dream career with top curated campus opportunities.
            </p>
          </div>
        </div>

        <Link
          href="/student/internships"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#159B72] hover:bg-[#087A5B] dark:bg-[#20D39B] dark:hover:bg-[#18B887] text-white dark:text-[#021512] text-[11.5px] font-bold shadow-2xs transition-all active:scale-95 shrink-0 self-start sm:self-auto group"
        >
          <span>View Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Right Artwork (Compact Horizontal Illustration) */}
      <div className="relative w-32 sm:w-44 md:w-56 h-14 sm:h-16 shrink-0 rounded-lg overflow-hidden hidden sm:block">
        <Image
          src={isDark ? "/assets/dashboard/promo-banner-dark.jpg" : "/assets/dashboard/promo-banner-light.jpg"}
          alt="Career and Hackathon Opportunities"
          fill
          className="object-cover object-center rounded-lg transition-opacity duration-300"
          sizes="224px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#DDF3EB]/70 to-transparent dark:from-[#06241F]/70 dark:to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
