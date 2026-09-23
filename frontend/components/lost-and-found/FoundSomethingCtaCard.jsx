"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FoundSomethingCtaCard({ onReportFound }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#063327] via-[#042A20] to-[#021812] border border-emerald-800/40 p-5 shadow-xs text-white">
      {/* Background/Right Backpack Visual Layer */}
      <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-40 pointer-events-none select-none overflow-hidden opacity-90">
        <Image
          src="/assets/lost-and-found/found-backpack.png"
          alt="Found Item Backpack"
          fill
          sizes="160px"
          className="object-contain object-right-bottom scale-110 translate-x-2 translate-y-2"
        />
        {/* Subtle gradient to fade behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042A20] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[65%] flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight leading-snug">
            Found something<br />on campus?
          </h3>
          <p className="text-xs text-emerald-100/80 mt-1.5 leading-relaxed font-normal">
            Report it. It could be<br />someone&apos;s important item.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onReportFound}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#042A20] hover:bg-emerald-50 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <span>Report Found Item</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159B72]" />
          </button>
        </div>
      </div>
    </div>
  );
}
