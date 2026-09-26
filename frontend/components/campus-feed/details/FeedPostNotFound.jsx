"use client";

import Link from "next/link";
import { MessageSquareOff, ArrowLeft } from "lucide-react";

export default function FeedPostNotFound() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-xs">
        <MessageSquareOff className="w-7 h-7" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6]">
        Post not found
      </h2>
      <p className="text-xs sm:text-sm text-[#4A685D] dark:text-[#8BAAA0] max-w-sm mt-1 mb-6 leading-relaxed">
        The discussion may have been removed or is no longer available to your account.
      </p>
      <Link
        href="/student/feed"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] hover:bg-[#0E7A58] dark:hover:bg-[#18B885] transition-all shadow-xs active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Campus Feed</span>
      </Link>
    </div>
  );
}
