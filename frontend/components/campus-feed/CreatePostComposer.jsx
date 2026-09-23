"use client";

import Image from "next/image";
import {
  Image as ImageIcon,
  BarChart2,
  Megaphone,
  Calendar,
  Send,
} from "lucide-react";

export default function CreatePostComposer({ onOpenComposer }) {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-3.5 sm:p-4 shadow-xs">
      {/* Top Input Row */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-emerald-500/20">
          <Image
            src="/assets/layout/profile-avatar.jpg"
            alt="Hamid Rza"
            fill
            className="object-cover"
          />
        </div>

        <button
          type="button"
          onClick={() => onOpenComposer("text")}
          className="flex-1 h-10 px-4 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#658278] dark:text-[#789991] text-xs sm:text-[13px] flex items-center hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all text-left cursor-pointer"
        >
          <span>Share something with your campus...</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#E8F1ED] dark:bg-[#10372F] my-3" />

      {/* Bottom Options Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onOpenComposer("media")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden xs:inline">Photo/Video</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenComposer("poll")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Poll</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenComposer("announcement")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <Megaphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Announcement</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenComposer("event")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Event</span>
          </button>
        </div>

        {/* Right Post Button */}
        <button
          type="button"
          onClick={() => onOpenComposer("text")}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white font-medium text-xs shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <span>Post</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
