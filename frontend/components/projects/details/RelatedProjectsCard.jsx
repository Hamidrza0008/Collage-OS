"use client";

import Link from "next/link";
import { ArrowRight, Star, Layers, Sparkles } from "lucide-react";

export default function RelatedProjectsCard({ relatedProjects = [] }) {
  if (!relatedProjects || relatedProjects.length === 0) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Related Projects
          </h3>
        </div>
        <Link
          href="/student/projects"
          className="text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* 3 Compact Project Cards */}
      <div className="space-y-2.5">
        {relatedProjects.map((p) => {
          const targetSlug = p.title
            ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            : p.id;

          return (
            <Link
              key={p.id}
              href={`/student/projects/${p.id}`}
              className="block p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 hover:bg-[#F0F8F5] dark:hover:bg-[#0A2E27] transition-all group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-1">
                  {p.title}
                </h4>
                <ArrowRight className="w-3 h-3 text-[#658278] dark:text-[#8BAEA3] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
              </div>

              <p className="text-[10.5px] text-[#658278] dark:text-[#8BAEA3] line-clamp-2 leading-snug mb-2">
                {p.description}
              </p>

              <div className="flex items-center justify-between text-[10px] text-[#658278] dark:text-[#8BAEA3] pt-1.5 border-t border-gray-100 dark:border-[#10372F]/60">
                <span className="font-medium text-[#159B72] dark:text-[#20D39B]">
                  {p.category}
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{p.likes}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
