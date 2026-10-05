"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, UserCheck, GraduationCap, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function AuthBrandPanel({
  badgeText = "Student Account Activation",
  badgeIcon = GraduationCap,
  headline = ["Activate Your", "College OS Account"],
  description = "Your college has already registered your details. Verify your identity using your enrollment number and college email to get started.",
  topHandwrittenText = "Your College Identity Awaits ♡",
  bottomHandwrittenText = "Same Campus, Bigger Dreams 🍃",
  features = [
    {
      icon: ShieldCheck,
      title: "Verified Identity",
      subtitle: "Using your college records",
      iconBg: "bg-[#159B72] text-white",
    },
    {
      icon: Mail,
      title: "Secure OTP",
      subtitle: "Sent to your college email",
      iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      icon: Lock,
      title: "Create Password",
      subtitle: "Your account, your control",
      iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
    },
    {
      icon: UserCheck,
      title: "Get Started",
      subtitle: "Access your campus dashboard",
      iconBg: "bg-[#DDF4EB] dark:bg-[#0C3029] text-[#159B72] dark:text-[#20D39B]",
    },
  ],
}) {
  const { isDark } = useTheme();
  const BadgeIcon = badgeIcon;

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[640px] lg:min-h-screen p-6 sm:p-8 lg:p-12 overflow-hidden bg-gradient-to-br from-[#EAF5EF] via-[#F4FAF7] to-[#E2F0E8] dark:from-[#021512] dark:via-[#031A16] dark:to-[#06241F] transition-colors duration-200">
      {/* Top Bar: Brand Logo & Handwritten Script */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* College OS Brand */}
        <Link href="/auth/student" className="group inline-flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-[#DDF3EB] dark:bg-[#075A43]/50 flex items-center justify-center p-2 border border-[#159B72]/20 shadow-xs transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <path
                d="M28.5 12C28.5 12 21.2 12.3 16.5 17C11.8 21.7 11.5 29 11.5 29C11.5 29 18.8 28.7 23.5 24C28.2 19.3 28.5 12 28.5 12Z"
                fill="#159B72"
              />
              <path d="M12 28.5L20.5 20" stroke="#DDF3EB" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B3024] dark:text-[#F1FAF6] block leading-none">
              College OS
            </span>
            <span className="text-[11px] font-semibold text-[#36594C] dark:text-[#8AAEA1] tracking-wider uppercase mt-1 block">
              Learn &bull; Connect &bull; Grow
            </span>
          </div>
        </Link>

        {/* Top-Right Handwritten Script */}
        {topHandwrittenText && (
          <div className="hidden sm:block text-right pr-2">
            <span className="font-handwriting text-2xl sm:text-[26px] font-bold text-[#159B72] dark:text-[#20D39B] inline-block -rotate-3 select-none drop-shadow-2xs">
              {topHandwrittenText}
            </span>
          </div>
        )}
      </div>

      {/* Center Narrative Content */}
      <div className="relative z-10 my-6 sm:my-8 space-y-5 sm:space-y-6 max-w-xl">
        {/* Badge Pill */}
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF4EB]/80 dark:bg-[#075A43]/40 border border-[#159B72]/25 dark:border-[#20D39B]/30 backdrop-blur-xs text-[#0F7A58] dark:text-[#20D39B] text-xs sm:text-[13px] font-semibold tracking-wide shadow-2xs">
            <BadgeIcon className="w-4 h-4 shrink-0 text-[#159B72] dark:text-[#20D39B]" />
            <span>{badgeText}</span>
          </div>
        )}

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-[1.12]">
          {headline.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base text-[#36594C] dark:text-[#A7C8BD] leading-relaxed max-w-lg">
          {description}
        </p>

        {/* Feature Row / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {features.map((feat, idx) => {
            const FeatIcon = feat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-3 rounded-xl bg-white/70 dark:bg-[#06241F]/70 border border-[#D8E8E2]/80 dark:border-[#16463D]/80 backdrop-blur-xs shadow-xs transition-all duration-200 hover:-translate-y-0.5"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-2 shadow-2xs ${feat.iconBg}`}
                >
                  <FeatIcon className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-[#658278] dark:text-[#8AAEA1] leading-tight mt-1">
                  {feat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Illustration & Bottom Accent */}
      <div className="relative z-10 mt-auto pt-4">
        {/* Campus Illustration Graphic */}
        <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-xs border border-[#D8E8E2]/60 dark:border-[#16463D]/60 group">
          <Image
            src={isDark ? "/assets/auth/campus-illustration-dark.png" : "/assets/auth/campus-illustration.png"}
            alt="College OS Campus Community"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
          />
          {/* Subtle gradient overlays for smooth seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EAF5EF]/40 via-transparent to-transparent dark:from-[#031A16]/50 pointer-events-none" />

          {/* Bottom-Right Handwritten Script floating on illustration */}
          {bottomHandwrittenText && (
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20">
              <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#E8F6F0] bg-white/85 dark:bg-[#031A16]/85 backdrop-blur-md px-3 py-1 rounded-xl shadow-xs border border-[#159B72]/20 inline-block -rotate-2 select-none">
                {bottomHandwrittenText}
              </span>
            </div>
          )}
        </div>

        {/* Footer Brand Baseline */}
        <div className="flex items-center justify-between pt-4 text-xs text-[#658278] dark:text-[#8AAEA1]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#159B72]/15 dark:bg-[#20D39B]/15 flex items-center justify-center p-0.5">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
                  fill="#159B72"
                />
              </svg>
            </div>
            <span className="font-semibold text-[#0B3024] dark:text-[#E8F6F0]">College OS</span>
            <span>|</span>
            <span className="hidden sm:inline">AI-Powered Digital Campus Platform</span>
            <span className="sm:hidden">Digital Campus</span>
          </div>
          <span className="text-[11px] font-medium text-[#159B72] dark:text-[#20D39B]">v1.1 Active</span>
        </div>
      </div>
    </div>
  );
}
