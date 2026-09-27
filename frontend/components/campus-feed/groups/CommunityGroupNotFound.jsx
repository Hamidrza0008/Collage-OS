"use client";

import React from "react";
import Link from "next/link";
import { Users2, ArrowLeft, Lock, Compass, Search } from "lucide-react";

export default function CommunityGroupNotFound({ isPrivate = false }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-[#021512] border border-emerald-950/10 dark:border-emerald-500/20 rounded-3xl p-8 text-center shadow-xl space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          {isPrivate ? <Lock className="w-8 h-8" /> : <Users2 className="w-8 h-8" />}
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-emerald-950 dark:text-emerald-50">
            {isPrivate ? "Access Restricted" : "Community Not Found"}
          </h1>
          <p className="text-xs text-emerald-800/70 dark:text-emerald-100/60 leading-relaxed max-w-sm mx-auto">
            {isPrivate
              ? "This community is private and accessible only by verified members or administrators. You do not have permission to view its discussions or member rosters."
              : "The campus community, club, or student society you are looking for does not exist or may have been renamed or archived."}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/student/feed"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-900/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campus Feed
          </Link>
          <Link
            href="/student/search?q=&type=communities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 border border-emerald-950/10 dark:border-emerald-500/20 transition-all"
          >
            <Search className="w-4 h-4" />
            Search Communities
          </Link>
        </div>
      </div>
    </div>
  );
}
