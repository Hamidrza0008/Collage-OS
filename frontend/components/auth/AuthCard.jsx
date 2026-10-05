"use client";

import React from "react";
import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
  showLogo = true,
  badge,
}) {
  return (
    <div className="w-full max-w-[560px] mx-auto bg-white dark:bg-[#06241F] rounded-2xl sm:rounded-3xl border border-[#D8E8E2] dark:border-[#16463D] shadow-xl shadow-[#0B3024]/4 dark:shadow-black/20 p-6 sm:p-8 lg:p-10 transition-colors duration-200">
      {/* Card Header Branding */}
      {showLogo && (
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#DDF3EB] dark:bg-[#075A43]/50 flex items-center justify-center p-1.5 border border-[#159B72]/20">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <path
                d="M28.5 12C28.5 12 21.2 12.3 16.5 17C11.8 21.7 11.5 29 11.5 29C11.5 29 18.8 28.7 23.5 24C28.2 19.3 28.5 12 28.5 12Z"
                fill="#159B72"
              />
              <path d="M12 28.5L20.5 20" stroke="#DDF3EB" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            College OS
          </span>
          {badge && (
            <span className="ml-auto text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] bg-[#DDF4EB] dark:bg-[#075A43]/40 px-2 py-0.5 rounded-full border border-[#159B72]/20">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Title & Subtitle */}
      {title && (
        <div className="mb-6 space-y-1.5">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13.5px] text-[#36594C] dark:text-[#A7C8BD] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Content Slot */}
      <div className="space-y-5">{children}</div>
    </div>
  );
}
