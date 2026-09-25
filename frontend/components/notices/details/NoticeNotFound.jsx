"use client";

import Link from "next/link";
import { ArrowLeft, FileQuestion, ArrowRight } from "lucide-react";

export default function NoticeNotFound({ noticeId }) {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-black text-[#0B3024] dark:text-[#F1FAF6]">
          Notice Not Found
        </h2>

        <p className="text-xs sm:text-sm text-[#55786B] dark:text-[#8FAFA4] mt-2 leading-relaxed">
          The requested circular <span className="font-mono font-bold text-[#159B72]">"{noticeId}"</span> could not be located in the university notification repository. It may have expired, been archived, or the link may be incorrect.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/student/notices"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Notices</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
