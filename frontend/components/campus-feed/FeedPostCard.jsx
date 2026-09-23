"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  CornerDownRight,
  ShieldCheck,
} from "lucide-react";
import FeedPostMedia from "./FeedPostMedia";
import FeedPostMenu from "./FeedPostMenu";

export default function FeedPostCard({
  post,
  onLikeToggle,
  onAddComment,
  onSaveToggle,
  onDeletePost,
  onHidePost,
  onOpenReport,
  onRegisterEvent,
  onVotePoll,
  onShare,
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    onAddComment(post.id, {
      author: "Hamid Rza",
      avatar: "/assets/layout/profile-avatar.jpg",
      text: commentInput.trim(),
      time: "Just now",
    });

    setCommentInput("");
    setShowComments(true);
  };

  // Category badge style generator
  const getBadgeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "academic":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "event":
        return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-500/30";
      case "announcement":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "placement":
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-500/30";
      case "sports":
        return "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-500/30";
      case "community":
        return "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-500/30";
      case "poll":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      default:
        return "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-500/30";
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 sm:p-5 shadow-xs hover:border-emerald-500/40 transition-colors">
      {/* Top Header: Avatar, Name, Badge, Metadata | Right: Type Badge, 3-dot Menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-500/20">
            <Image
              src={post.author?.avatar || "/assets/layout/profile-avatar.jpg"}
              alt={post.author?.name || "Author"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                {post.author?.name}
              </span>
              {post.author?.role && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {post.author.role}
                </span>
              )}
            </div>

            <div className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>
                {post.author?.department} • {post.author?.semester}
              </span>
              <span>•</span>
              <span>{post.createdAt}</span>
              {post.source && (
                <>
                  <span>•</span>
                  <span>{post.source}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Post Type Badge + Three-dot Menu */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
              post.type
            )}`}
          >
            {post.type}
          </span>
          <FeedPostMenu
            post={post}
            onSaveToggle={onSaveToggle}
            onOpenReport={onOpenReport}
            onDeletePost={onDeletePost}
            onHidePost={onHidePost}
          />
        </div>
      </div>

      {/* Main Post Text Content */}
      <div className="mt-3 text-xs sm:text-[13px] text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      {/* Optional Rich Media / Event / Mess Menu / Poll */}
      <FeedPostMedia
        post={post}
        onRegisterEvent={onRegisterEvent}
        onVotePoll={onVotePoll}
      />

      {/* Engagement Actions Row: Like, Comment, Share */}
      <div className="mt-4 pt-3 flex items-center gap-6 border-t border-[#E8F1ED] dark:border-[#10372F] text-xs">
        {/* Like Button */}
        <button
          type="button"
          onClick={() => onLikeToggle(post.id)}
          className={`flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
            post.isLiked
              ? "text-rose-600 font-bold"
              : "text-[#658278] dark:text-[#789991] hover:text-rose-500 font-medium"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              post.isLiked ? "fill-rose-600 text-rose-600" : ""
            }`}
          />
          <span>{post.likesCount}</span>
        </button>

        {/* Comment Button */}
        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-[#658278] dark:text-[#789991] hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors cursor-pointer select-none"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.commentsCount}</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={() => onShare(post)}
          className="flex items-center gap-1.5 text-[#658278] dark:text-[#789991] hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors cursor-pointer select-none"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Latest Comment Preview (when collapsed) */}
      {!showComments && post.latestComment && (
        <div
          onClick={() => setShowComments(true)}
          className="mt-3 p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between text-xs cursor-pointer hover:border-emerald-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
              <Image
                src={post.latestComment.avatar || "/assets/layout/profile-avatar.jpg"}
                alt={post.latestComment.author}
                fill
                className="object-cover"
              />
            </div>
            <div className="truncate text-[11px] sm:text-xs">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] mr-1.5">
                {post.latestComment.author}:
              </span>
              <span className="text-[#36594C] dark:text-[#B5CCC5]">
                {post.latestComment.text}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#658278] dark:text-[#789991] shrink-0 ml-2">
            {post.latestComment.time}
          </span>
        </div>
      )}

      {/* Expanded Comments Section */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-2.5 animate-in fade-in duration-200">
          {/* List of comments */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((c, idx) => (
                <div
                  key={c.id || idx}
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16]"
                >
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image
                      src={c.avatar || "/assets/layout/profile-avatar.jpg"}
                      alt={c.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                        {c.author}
                      </span>
                      <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-[#36594C] dark:text-[#B5CCC5] text-[11px] mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#658278] py-1 text-center">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
              <Image
                src="/assets/layout/profile-avatar.jpg"
                alt="Hamid Rza"
                fill
                className="object-cover"
              />
            </div>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 h-8 px-3 rounded-lg bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-3 h-8 rounded-lg bg-[#159B72] hover:bg-[#087A5B] disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
