"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function StayConnectedCard({ onJoinCommunity }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#063327] border border-emerald-800/40 p-4 sm:p-5 shadow-xs text-white">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col space-y-3">
        {/* Title & Tagline */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Network</span>
          </div>
          <h3 className="text-lg sm:text-[19px] font-black leading-tight tracking-tight text-white">
            Stay Connected<br />Stay Updated
          </h3>
          <p className="text-xs text-emerald-100/80 leading-relaxed max-w-xs pt-0.5">
            Follow your friends, join groups, and never miss what&apos;s happening across your department and campus clubs.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            onClick={onJoinCommunity}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#063327] text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Join Campus Community</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#063327]" />
          </button>
        </div>

        {/* Illustration graphic */}
        <div className="relative w-full h-28 sm:h-32 mt-1 rounded-xl overflow-hidden bg-emerald-950/40 border border-emerald-700/30 flex items-center justify-center">
          <Image
            src="/assets/campus-feed/community-illustration.png"
            alt="Campus students collaborating"
            fill
            className="object-contain object-bottom p-1.5"
          />
        </div>
      </div>
    </div>
  );
}
