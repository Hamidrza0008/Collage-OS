"use client";

import { ArrowRight, Megaphone, Sparkles } from "lucide-react";

export default function StayInformedCtaCard({ onViewAllNotices }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#063327] via-[#04281E] to-[#021A14] border border-emerald-800/40 p-5 shadow-xs text-white">
      {/* Background Decorative Glow & Foliage Ambience */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative SVG Graphic on the Right (Stylized Megaphone & Foliage) */}
      <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 pointer-events-none select-none opacity-85 dark:opacity-90">
        <svg
          width="100"
          height="100"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform hover:scale-105 transition-transform duration-500"
        >
          {/* Foliage leaves background */}
          <path
            d="M85 30C85 30 110 40 105 75C100 110 70 105 70 105C70 105 60 75 75 50C90 25 85 30 85 30Z"
            fill="#10B981"
            fillOpacity="0.25"
          />
          <path
            d="M95 55C95 55 115 65 110 90C105 115 85 110 85 110C85 110 80 90 90 70C100 50 95 55 95 55Z"
            fill="#34D399"
            fillOpacity="0.3"
          />
          <path
            d="M60 65C60 65 80 75 75 95C70 115 50 110 50 110C50 110 45 95 55 80C65 65 60 65 60 65Z"
            fill="#059669"
            fillOpacity="0.2"
          />

          {/* 3D Megaphone Body */}
          <g transform="translate(15, 15) rotate(-15 45 45)">
            {/* Sound waves */}
            <path
              d="M75 30C80 35 80 50 75 55"
              stroke="#A7F3D0"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M82 25C90 32 90 53 82 60"
              stroke="#6EE7B7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Megaphone Cone */}
            <path
              d="M30 35L65 22V63L30 50V35Z"
              fill="#ECFDF5"
              stroke="#047857"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Front rim */}
            <ellipse
              cx="65"
              cy="42.5"
              rx="4"
              ry="20.5"
              fill="#10B981"
              stroke="#047857"
              strokeWidth="2"
            />
            {/* Handle */}
            <path
              d="M40 50V68C40 70 43 72 45 72C47 72 50 70 50 68V54"
              fill="#065F46"
              stroke="#047857"
              strokeWidth="2"
            />
            {/* Back piece */}
            <rect
              x="20"
              y="37"
              width="11"
              height="11"
              rx="2.5"
              fill="#047857"
              stroke="#065F46"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>

      {/* Text & Button Layer */}
      <div className="relative z-10 max-w-[200px] sm:max-w-[220px]">
        <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight leading-snug">
          Stay Informed
          <span className="block text-emerald-300">Stay Ahead</span>
        </h3>

        <p className="text-xs text-emerald-100/80 mt-1.5 leading-relaxed font-normal">
          Check the latest notices, announcements and never miss an important update.
        </p>

        <button
          type="button"
          onClick={onViewAllNotices}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold transition-all shadow-sm group cursor-pointer"
        >
          <span>View All Notices</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
