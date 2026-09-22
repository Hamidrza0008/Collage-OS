"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CollaborationCard({ onExplore }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#063327] via-[#05291F] to-[#021813] border border-emerald-800/40 p-4 shadow-sm text-white transition-all">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#159B72]/15 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
        {/* Top: Title & Description */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 mb-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Campus Community</span>
          </div>

          <h3 className="text-lg font-bold text-white leading-tight">
            Collaborate <br />
            Build <br />
            Make an Impact
          </h3>

          <p className="text-xs text-emerald-100/75 mt-2 max-w-[190px] leading-snug">
            Great things happen when curious minds work together.
          </p>
        </div>

        {/* Bottom: Button + Illustration */}
        <div className="mt-4 flex items-end justify-between gap-2">
          <button
            type="button"
            onClick={onExplore}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#0B3024] hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs cursor-pointer hover:shadow-sm"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3 h-3 text-[#159B72]" />
          </button>

          {/* Student Collaboration Illustration */}
          <div className="relative w-24 h-20 shrink-0 rounded-xl overflow-hidden shadow-xs border border-emerald-600/30">
            <Image
              src="/assets/projects/collaboration-students.png"
              alt="Students collaborating"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
