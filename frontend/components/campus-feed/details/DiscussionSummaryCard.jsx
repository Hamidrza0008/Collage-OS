"use client";

import { MessageCircle, Heart, MessageSquareReply, ShieldAlert } from "lucide-react";

export default function DiscussionSummaryCard({ post, comments = [] }) {
  const topCommentsCount = comments.length;
  const repliesCount = comments.reduce(
    (acc, c) => acc + (c.replies ? c.replies.length : 0),
    0
  );

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Discussion Summary
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B]">
          Active Today
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
            Comments
          </span>
          <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
            {topCommentsCount}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
            Replies
          </span>
          <span className="text-base font-extrabold text-[#0B3024] dark:text-[#F1FAF6] block mt-0.5">
            {repliesCount}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F]">
          <span className="text-[10px] text-[#658278] dark:text-[#789991] block">
            Likes
          </span>
          <span className="text-base font-extrabold text-rose-600 block mt-0.5">
            {post.likesCount || 0}
          </span>
        </div>
      </div>

      {/* Campus Community Guidelines Note */}
      <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#658278] dark:text-[#789991] leading-relaxed">
          Be respectful and constructive. College OS maintains a peer-moderated academic community.
        </p>
      </div>
    </div>
  );
}
