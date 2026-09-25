"use client";

import Link from "next/link";
import { ArrowLeft, BookX } from "lucide-react";

export default function SubjectNotFound({ code }) {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#041D18] flex items-center justify-center mb-4">
        <BookX className="w-8 h-8 text-gray-400 dark:text-[#5C786E]" />
      </div>
      <h1 className="text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mb-2">
        Subject Not Found
      </h1>
      <p className="text-sm text-[#5C786E] dark:text-[#8AA89F] text-center max-w-sm mb-6">
        The course <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{code}</strong> does not exist in your current semester enrollment.
      </p>
      <Link
        href="/student/academics"
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] text-xs font-bold hover:bg-emerald-800 dark:hover:bg-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Academics
      </Link>
    </div>
  );
}
