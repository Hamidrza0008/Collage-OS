"use client";

import { Bell, Calendar, ArrowRight } from "lucide-react";

export default function NeverMissEventCta({ onOpenNotificationModal }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#063327] via-[#05291F] to-[#021813] border border-emerald-800/40 p-4.5 shadow-sm text-white transition-all">
      {/* Decorative background glow & shapes */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#159B72]/15 rounded-full blur-xl pointer-events-none" />

      {/* Top row: Header & Icon badge */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div>
          <h3 className="text-[16px] font-bold text-white leading-tight">
            Never Miss <br />
            an Event!
          </h3>
          <p className="text-xs text-emerald-100/75 mt-1.5 max-w-[190px] leading-snug">
            Enable notifications to get updates about upcoming events.
          </p>
        </div>

        {/* Top-right Icon Badge */}
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300 shadow-xs">
          <Calendar className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* Bottom row: Button & Bell Graphic */}
      <div className="mt-4 flex items-center justify-between gap-2 relative z-10">
        <button
          type="button"
          onClick={onOpenNotificationModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#0B3024] hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <span>Enable Notifications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Stylized bell illustration badge */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-amber-300 shadow-inner">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </div>
      </div>
    </div>
  );
}
