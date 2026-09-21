"use client";

import { Users, ArrowRight } from "lucide-react";

export default function SubmitEventCta({ onOpenProposalModal }) {
  return (
    <div className="w-full rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors">
      {/* Left: Icon + Text */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-[#DDF4EB] dark:bg-[#0A3D30] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 shadow-xs">
          <Users className="w-5 h-5" />
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="text-sm sm:text-[14.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
            Have an Event Idea?
          </h4>
          <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-0.5 leading-snug font-normal">
            Propose your own event and bring your ideas to life. We&apos;re always excited to support student initiatives!
          </p>
        </div>
      </div>

      {/* Right: Submit Button */}
      <button
        type="button"
        onClick={onOpenProposalModal}
        className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
      >
        <span>Submit Proposal</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
