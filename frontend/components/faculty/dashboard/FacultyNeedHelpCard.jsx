"use client";

import React from "react";
import Link from "next/link";
import { Headphones, ArrowRight } from "lucide-react";

export default function FacultyNeedHelpCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B4031] via-[#0E513F] to-[#083024] p-5 text-white shadow-md border border-[#16634E]/30">
      {/* Decorative botanical circle motif */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
      <div className="absolute right-3 bottom-3 opacity-20 pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="30" stroke="#20D39B" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M40 20C40 20 48 30 48 40C48 50 40 60 40 60C40 60 32 50 32 40C32 30 40 20 40 20Z" fill="#20D39B" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/20">
            <Headphones className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Need Help?
            </h3>
            <p className="text-[11.5px] text-emerald-100/85">
              Facing any issues? Reach out to support.
            </p>
          </div>
        </div>

        <Link
          href="mailto:support@college.edu?subject=Faculty%20Portal%20Support"
          className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 active:scale-[0.99] border border-white/20 backdrop-blur-md text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <span>Contact Support</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
