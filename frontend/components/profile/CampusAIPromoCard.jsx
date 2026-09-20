"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function CampusAIPromoCard({ promo }) {
  const { isDark } = useTheme();

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#16463D] p-4 sm:p-5 bg-gradient-to-br from-[#05382B] via-[#042A21] to-[#021813] text-white shadow-card">
      {/* Background Glow Orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#20D39B]/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Left Text & CTA */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1 text-[#20D39B] text-[10px] font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Assistant</span>
          </div>

          <h3 className="text-sm sm:text-[15px] font-bold text-white leading-snug">
            Get More from
            <br />
            Campus AI
          </h3>

          <p className="text-[10.5px] sm:text-[11px] text-[#B5CCC5] mt-1.5 mb-3.5 leading-snug">
            {promo?.description ||
              "Your personal AI assistant for college queries, notes, and more."}
          </p>

          <Link
            href="/student/campus-ai"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0B3024] text-xs font-bold shadow-xs hover:gap-2 active:scale-95 transition-all group"
          >
            <span>Try Campus AI</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159B72] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Right 3D Mascot Image */}
        <div className="relative w-24 h-28 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={isDark ? "/assets/profile/dark/campus-ai-robot.png" : "/assets/profile/light/campus-ai-robot.png"}
            alt="Campus AI Mascot"
            fill
            className="object-cover object-center transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}
