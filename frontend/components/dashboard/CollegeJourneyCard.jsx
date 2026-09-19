"use client";

import Image from "next/image";

export default function CollegeJourneyCard() {
  return (
    <div className="relative p-3 rounded-xl overflow-hidden bg-gradient-to-r from-[#031A16] to-[#082A24] dark:from-[#021512] dark:to-[#06241F] text-white border border-[#16463D] shadow-2xs flex items-center justify-between gap-3">
      <div className="space-y-0.5 z-10">
        <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider block">
          Your College &bull; Your Journey
        </span>
        <h3 className="text-sm font-extrabold tracking-tight text-white leading-tight">
          College OS.
        </h3>
        <p className="text-[10.5px] text-emerald-100/70">
          Explore. Learn. Grow.
        </p>
      </div>

      <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 border border-emerald-500/20 shadow-2xs">
        <Image
          src="/assets/dashboard/journey-campus.jpg"
          alt="College Architecture"
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
    </div>
  );
}
