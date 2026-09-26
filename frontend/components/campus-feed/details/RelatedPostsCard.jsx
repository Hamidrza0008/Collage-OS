"use client";

import Link from "next/link";
import { MessageSquare, Heart, MessageCircle, ArrowRight } from "lucide-react";

export default function RelatedPostsCard({ relatedPosts = [] }) {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3.5">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B]">
          <MessageSquare className="w-4 h-4" />
        </div>
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Related Discussions
        </h3>
      </div>

      <div className="space-y-2.5">
        {relatedPosts.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            className="block p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 transition-all group"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold text-[#159B72] dark:text-[#20D39B] uppercase tracking-wider">
                {item.type}
              </span>
              <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                {item.createdAt}
              </span>
            </div>

            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-2 group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-snug">
              {item.content}
            </h4>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#E8F1ED] dark:border-[#10372F]/60 text-[11px] text-[#658278] dark:text-[#789991]">
              <span className="truncate max-w-[120px] font-medium text-[#36594C] dark:text-[#A3BFB5]">
                {item.author?.name}
              </span>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {item.likesCount || 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {item.commentsCount || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
