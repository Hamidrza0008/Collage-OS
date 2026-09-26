"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PostContextCard({ linkedEntity }) {
  if (!linkedEntity) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] block">
            {linkedEntity.typeLabel}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            {linkedEntity.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-[#658278] dark:text-[#789991] leading-relaxed">
        {linkedEntity.subtitle}
      </p>

      <Link
        href={linkedEntity.route}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors"
      >
        <span>{linkedEntity.actionText}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
