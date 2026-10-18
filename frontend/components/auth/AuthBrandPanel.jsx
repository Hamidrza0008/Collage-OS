"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../providers/ThemeProvider";

export default function AuthBrandPanel({
  badgeText = null,
  badgeIcon = null,
  headline = ["Welcome Back,", "Student!"],
  description = "Your campus, your profile, your future — all in one place.",
  topHandwrittenText = "Learn • Connect\nGrow 🍃",
  bottomHandwrittenText = "Same Campus,\nBigger Dreams ♡",
  features = [],
}) {
  const { isDark } = useTheme();
  const BadgeIcon = badgeIcon;

  return (
    <div className="relative flex flex-col justify-between w-full h-full max-h-screen overflow-hidden bg-gradient-to-b from-[#EBF5EF] via-[#E4F2EB] to-[#DCEFE5] dark:from-[#021512] dark:via-[#031A16] dark:to-[#06241F] transition-colors duration-200">
      {/* Top Section with Padding */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-10 pt-5 sm:pt-6 lg:pt-7 flex flex-col shrink-0">
        {/* Brand Logo & Handwritten Script */}
        <div className="flex items-start justify-between gap-4">
          {/* College OS Brand */}
          <Link href="/auth/student" className="group inline-flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#159B72] flex items-center justify-center shadow-xs shrink-0 p-2 transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M20.5 3.5C20.5 3.5 13.2 3.8 8.7 8.3C4.2 12.8 3.8 20.2 3.8 20.2C3.8 20.2 11.2 19.8 15.7 15.3C20.2 10.8 20.5 3.5 20.5 3.5Z"
                  fill="white"
                />
                <path
                  d="M4.2 19.8L13.5 10.5"
                  stroke="#159B72"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M9.8 14.2L8 14.2"
                  stroke="#159B72"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M12.4 11.6L14.2 9.8"
                  stroke="#159B72"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M8.2 15.8L6.8 16.5"
                  stroke="#159B72"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B3024] dark:text-[#F1FAF6] block leading-none">
                College OS
              </span>
              <span className="text-[11px] sm:text-[11.5px] font-semibold text-[#52796F] dark:text-[#8AAEA1] tracking-normal mt-1 block">
                AI-Powered Digital Campus Platform
              </span>
            </div>
          </Link>

          {/* Top-Right Handwritten Script */}
          {topHandwrittenText && (
            <div className="hidden sm:block text-right pr-1">
              <span className="font-handwriting text-2xl sm:text-[28px] font-bold text-[#159B72] dark:text-[#20D39B] inline-block -rotate-3 select-none leading-none">
                <span>Learn • Connect</span>
                <span className="block mt-0.5">
                  Grow
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4.5 h-4.5 inline-block ml-1 text-[#159B72] dark:text-[#20D39B] -rotate-12"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Narrative & Feature Area */}
        <div className="mt-4 sm:mt-5 space-y-2.5 max-w-xl">
          {/* Optional Badge Pill */}
          {badgeText && BadgeIcon && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF4EB]/80 dark:bg-[#075A43]/40 border border-[#159B72]/25 dark:border-[#20D39B]/30 backdrop-blur-xs text-[#0F7A58] dark:text-[#20D39B] text-xs font-semibold tracking-wide shadow-2xs">
              <BadgeIcon className="w-3.5 h-3.5 shrink-0 text-[#159B72] dark:text-[#20D39B]" />
              <span>{badgeText}</span>
            </div>
          )}

          {/* Main Headline with dual colors matching Target UI */}
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-[1.12]">
            {Array.isArray(headline) ? (
              <>
                <span className="block text-[#0B3024] dark:text-[#F1FAF6]">{headline[0]}</span>
                <span className="block text-[#159B72] dark:text-[#20D39B]">{headline[1]}</span>
              </>
            ) : (
              <span className="text-[#0B3024] dark:text-[#F1FAF6]">{headline}</span>
            )}
          </h1>

          {/* Supporting Copy */}
          <p className="text-xs sm:text-[13.5px] text-[#52796F] dark:text-[#A7C8BD] leading-snug max-w-lg">
            {description}
          </p>

          {/* Feature Row / Grid */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 pt-1.5">
              {features.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-start p-2.5 sm:p-3 rounded-2xl bg-white/65 dark:bg-[#06241F]/65 border border-white/70 dark:border-[#16463D]/70 backdrop-blur-xs shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E8F5EF] dark:bg-[#075A43]/50 flex items-center justify-center shrink-0 mb-2 text-[#159B72] dark:text-[#20D39B]">
                      <FeatIcon className="w-4 h-4" />
                    </div>
                    <h4 className="text-[11.5px] sm:text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                      {feat.title}
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] text-[#52796F] dark:text-[#8AAEA1] leading-tight mt-1 whitespace-pre-line">
                      {feat.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Campus Illustration Graphic spanning full width anchored to bottom with natural soft blend */}
      <div className="relative w-full flex-1 min-h-[220px] max-h-[48vh] mt-auto overflow-hidden">
        <Image
          src={isDark ? "/assets/auth/campus-illustration-dark.png" : "/assets/auth/campus-illustration.png"}
          alt="College OS Campus Community"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover object-bottom select-none pointer-events-none"
        />

        {/* Soft seamless blend from background into illustration sky */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-[#EBF5EF] via-[#EBF5EF]/60 to-transparent dark:from-[#021512] dark:via-[#021512]/60 pointer-events-none z-10" />

        {/* Bottom Left Platform Info */}
        <div className="absolute bottom-3.5 sm:bottom-4 left-6 sm:left-8 lg:left-10 z-20 flex items-center gap-2 select-none">
          <div className="w-4.5 h-4.5 rounded-md bg-[#159B72] flex items-center justify-center p-0.5 text-white shadow-2xs">
            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
              <path
                d="M20.5 3.5C20.5 3.5 13.2 3.8 8.7 8.3C4.2 12.8 3.8 20.2 3.8 20.2C3.8 20.2 11.2 19.8 15.7 15.3C20.2 10.8 20.5 3.5 20.5 3.5Z"
                fill="white"
              />
              <path
                d="M4.2 19.8L13.5 10.5"
                stroke="#159B72"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#E8F6F0]">College OS</span>
          <span className="text-xs text-[#52796F] dark:text-[#8AAEA1]">|</span>
          <span className="text-[10.5px] font-medium text-[#52796F] dark:text-[#8AAEA1] hidden sm:inline">
            AI-Powered Digital Campus Platform
          </span>
        </div>

        {/* Bottom Right Handwritten Note */}
        {bottomHandwrittenText && (
          <div className="absolute bottom-3.5 sm:bottom-4 right-6 sm:right-8 lg:right-10 z-20 text-right">
            <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#159B72] dark:text-[#20D39B] inline-block -rotate-3 select-none drop-shadow-xs leading-tight whitespace-pre-line">
              {bottomHandwrittenText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
