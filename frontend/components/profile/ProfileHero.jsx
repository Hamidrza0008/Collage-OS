"use client";

import Image from "next/image";
import {
  Camera,
  Check,
  Building2,
  Pencil,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function ProfileHero({ user }) {
  const { isDark } = useTheme();

  return (
    <section aria-label="Profile Banner" className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-card border border-[#D8E8E2]/60 dark:border-[#16463D]/60 bg-[#06241F]">
      {/* Background Campus Image */}
      <div className="absolute inset-0 select-none">
        <Image
          src={isDark ? "/assets/profile/dark/hero-campus.jpg" : "/assets/profile/light/hero-campus.jpg"}
          alt="College Campus Banner"
          fill
          priority
          className="object-cover object-right-bottom transition-opacity duration-300"
        />
        {/* Emerald / Dark Forest Gradient Overlay (Fading from Left to Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03261F] via-[#053D32]/95 md:via-[#053D32]/85 to-black/30 md:to-transparent" />
        
        {/* Subtle decorative leaf / foliage ambient SVG tint on left */}
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-radial from-[#159B72]/20 to-transparent rounded-full pointer-events-none blur-xl" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Side: Avatar + Student Details */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 md:gap-6 min-w-0">
          {/* Avatar with thick ring and camera badge */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28">
            <div className="relative w-full h-full rounded-full overflow-hidden border-[3.5px] border-white dark:border-[#021512] shadow-lg">
              <Image
                src={user?.avatar || "/assets/profile/avatar.jpg"}
                alt={user?.name || "Student Avatar"}
                fill
                priority
                className="object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#159B72] dark:bg-[#20D39B] border-2 border-white dark:border-[#021512] flex items-center justify-center text-white dark:text-[#021512] shadow-sm hover:scale-105 active:scale-95 transition-transform"
              title="Change Profile Photo"
              aria-label="Change Profile Photo"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Student Info Block */}
          <div className="text-white space-y-1 min-w-0">
            {/* Name + Verified Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-white leading-tight">
                {user?.name}
              </h1>
              {user?.isVerified && (
                <span
                  className="w-5 h-5 rounded-full bg-[#159B72] dark:bg-[#20D39B] flex items-center justify-center text-white dark:text-[#021512] shadow-xs shrink-0"
                  title="Verified Student"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </div>

            {/* Degree & Sem */}
            <p className="text-xs sm:text-sm font-medium text-white/90 tracking-wide">
              {user?.degree} &bull; {user?.semester} &bull; {user?.branch}
            </p>

            {/* College Name */}
            <div className="flex items-center gap-1.5 text-xs text-white/80 pt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#20D39B] shrink-0" />
              <span className="truncate">{user?.college}</span>
            </div>

            {/* Motivational Quote */}
            <div className="flex items-center gap-2 text-xs italic text-white/85 pt-1 group">
              <span className="truncate">&ldquo;{user?.quote}&rdquo;</span>
              <button
                type="button"
                className="opacity-70 group-hover:opacity-100 hover:text-[#20D39B] transition-opacity shrink-0"
                title="Edit status quote"
                aria-label="Edit status quote"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Edit Profile Button & Stat Pills */}
        <div className="flex flex-row md:flex-col justify-between md:items-end gap-4 md:gap-5 shrink-0">
          {/* Edit Profile Button */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 dark:bg-[#021512]/60 dark:hover:bg-[#021512]/80 border border-white/25 backdrop-blur-md text-white text-xs font-medium shadow-xs hover:border-white/40 active:scale-95 transition-all"
          >
            <Pencil className="w-3.5 h-3.5 text-[#20D39B]" />
            <span>Edit Profile</span>
          </button>

          {/* Stat Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/35 dark:bg-[#021512]/50 border border-white/15 backdrop-blur-xs text-center min-w-[68px] sm:min-w-[74px]">
              <span className="block text-base sm:text-lg font-bold text-white leading-tight">
                {user?.stats?.projects}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-white/75 leading-none">
                Projects
              </span>
            </div>

            <div className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/35 dark:bg-[#021512]/50 border border-white/15 backdrop-blur-xs text-center min-w-[68px] sm:min-w-[74px]">
              <span className="block text-base sm:text-lg font-bold text-white leading-tight">
                {user?.stats?.followers}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-white/75 leading-none">
                Followers
              </span>
            </div>

            <div className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/35 dark:bg-[#021512]/50 border border-white/15 backdrop-blur-xs text-center min-w-[68px] sm:min-w-[74px]">
              <span className="block text-base sm:text-lg font-bold text-white leading-tight">
                {user?.stats?.following}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-white/75 leading-none">
                Following
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
