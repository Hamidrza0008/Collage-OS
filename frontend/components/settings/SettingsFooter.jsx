"use client";

import { Leaf } from "lucide-react";

export default function SettingsFooter() {
  return (
    <div className="pt-2 pb-1 flex items-center justify-center gap-2 text-xs text-[#658278] dark:text-[#789991]">
      <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        <Leaf className="w-3 h-3" />
      </div>
      <span>College OS</span>
      <span>•</span>
      <span>Built for a better campus experience</span>
    </div>
  );
}
