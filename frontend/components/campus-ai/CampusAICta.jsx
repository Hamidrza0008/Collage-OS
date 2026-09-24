"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export default function CampusAICta({ onStartChat }) {
  const { isDark } = useTheme();

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-700/40 bg-gradient-to-br from-[#06382B] via-[#042A20] to-[#021813] p-4 text-white shadow-xs">
      {/* Background soft ambient radial glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Left: Text & CTA Button */}
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-bold text-white leading-snug">
            Need help with<br />college-related queries?
          </h3>

          <p className="text-[11.5px] text-emerald-100/85 leading-snug">
            Ask Campus AI — your 24/7 assistant.
          </p>

          <div className="pt-1">
            <button
              type="button"
              onClick={onStartChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#0B3024] hover:bg-emerald-50 text-xs font-semibold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Start Chat</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>
        </div>

        {/* Right: AI Robot Mascot Illustration */}
        <div className="relative w-22 h-22 shrink-0 select-none pointer-events-none">
          <Image
            src={
              isDark
                ? "/assets/campus-ai/dark/robot-helper.jpg"
                : "/assets/campus-ai/light/robot-helper.jpg"
            }
            alt="Campus AI Assistant Robot"
            fill
            className="object-contain drop-shadow-md rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
