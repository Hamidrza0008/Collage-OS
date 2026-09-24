"use client";

import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";

export default function LiveDemoCtaCard({ demoUrl }) {
  const url = demoUrl || "https://college-os.dev";

  return (
    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-[#062F27] via-[#053D32] to-[#021814] text-white border border-[#16463D] p-5 shadow-md flex flex-col justify-between space-y-4">
      {/* Subtle background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#159B72]/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center gap-1.5 z-10">
        <Sparkles className="w-3.5 h-3.5 text-[#20D39B]" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#20D39B]">
          Live Sandbox
        </span>
      </div>

      {/* Title */}
      <div className="z-10 space-y-1">
        <h3 className="text-base sm:text-lg font-extrabold leading-tight tracking-tight text-white">
          See the project in action.
        </h3>
        <p className="text-xs text-white/80 leading-relaxed">
          Test interactive student workflows, academic analytics, and real-time state.
        </p>
      </div>

      {/* Visual Preview Snapshot */}
      <div className="relative w-full h-28 rounded-xl overflow-hidden border border-white/15 select-none bg-black/40">
        <Image
          src="/assets/projects/light/hero-banner.jpg"
          alt="Product Sandbox Preview"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* CTA Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#20D39B] hover:bg-[#159B72] text-[#021512] hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer z-10"
      >
        <span>Open Live Demo</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
