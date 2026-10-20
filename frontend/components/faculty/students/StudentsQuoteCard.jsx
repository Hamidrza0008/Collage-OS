"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function StudentsQuoteCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#EBF7F2] to-[#E0F2EA] dark:from-[#063327] dark:to-[#04251C] rounded-2xl border border-[#D5EFE4] dark:border-[#10372F] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Decorative Leaf Icon */}
      <div className="w-7 h-7 rounded-lg bg-[#159B72]/15 flex items-center justify-center text-[#159B72] mb-3">
        <Leaf className="w-4 h-4 fill-[#159B72]/20" />
      </div>

      {/* Quote text */}
      <blockquote className="space-y-1">
        <p className="font-serif italic text-[15px] sm:text-[15.5px] font-medium text-[#0B3024] dark:text-[#E8F7F0] leading-snug">
          &ldquo;Great things happen when curious minds connect.&rdquo;
        </p>
      </blockquote>

      {/* Bottom Leaf accent */}
      <div className="flex justify-end mt-2">
        <Leaf className="w-3.5 h-3.5 text-[#159B72]/40 fill-[#159B72]/20" />
      </div>
    </div>
  );
}
