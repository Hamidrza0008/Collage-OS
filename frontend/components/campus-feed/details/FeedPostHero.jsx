"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Flag,
  Globe,
  CheckCircle2,
  Tag,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import FeedPostMedia from "../FeedPostMedia";

export default function FeedPostHero({
  post,
  onLikeToggle,
  onSaveToggle,
  onShare,
  onOpenReport,
  onScrollToComments,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authorProfile, linkedEntity } = post;

  // Category badge style
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

  const authorProfileUrl = authorProfile?.id
    ? `/student/profile/${authorProfile.id}`
    : `/student/profile/student-1`;

  return (
    <article className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-7 shadow-xs">
      {/* Top Navigation: Compact Back Button */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <Link
          href="/student/feed"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Campus Feed</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Visibility indicator */}
          <div className="inline-flex items-center gap-1 text-[11px] text-[#658278] dark:text-[#789991]">
            <Globe className="w-3 h-3 text-[#159B72] dark:text-[#20D39B]" />
            <span>{post.visibility || "Campus Wide"}</span>
          </div>

          {/* Post options dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
              aria-label="Post options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    onSaveToggle();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
                >
                  {post.isSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                      <span className="font-semibold text-[#159B72] dark:text-[#20D39B]">
                        Saved
                      </span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Post</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onShare();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </button>

                <div className="h-px bg-[#E8F1ED] dark:bg-[#10372F] my-1" />

                <button
                  type="button"
                  onClick={() => {
                    onOpenReport();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report Post</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link
            href={authorProfileUrl}
            className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D] hover:ring-2 hover:ring-[#159B72] transition-all cursor-pointer"
            title={`View ${post.author?.name}'s profile`}
          >
            <Image
              src={post.author?.avatar || "/assets/layout/profile-avatar.jpg"}
              alt={post.author?.name || "Author"}
              fill
              className="object-cover"
            />
          </Link>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={authorProfileUrl}
                className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors cursor-pointer"
              >
                {post.author?.name}
              </Link>
              {authorProfile?.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              )}
              {post.author?.role && (
                <span className="inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                  {post.author.role}
                </span>
              )}
            </div>

            <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              {post.author?.department}{" "}
              {post.author?.semester && `• ${post.author.semester}`} • {post.createdAt}
            </p>
          </div>
        </div>

        {/* Post Type Badge */}
        {post.type && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(
              post.type
            )}`}
          >
            {post.type}
          </span>
        )}
      </div>

      {/* Main Post Body */}
      <div className="mt-4 text-sm sm:text-base text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed whitespace-pre-line space-y-3 font-normal">
        {post.content}
      </div>

      {/* Embedded Rich Media */}
      <div className="mt-4">
        <FeedPostMedia post={post} />
      </div>

      {/* Connected Entity Context Card (if referenced) */}
      {linkedEntity && (
        <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#159B72] dark:text-[#20D39B] block">
                {linkedEntity.typeLabel}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {linkedEntity.title}
              </h4>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                {linkedEntity.subtitle}
              </p>
            </div>
          </div>
          <Link
            href={linkedEntity.route}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-all self-start sm:self-center shrink-0 cursor-pointer shadow-xs"
          >
            <span>{linkedEntity.actionText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Post Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-4 flex items-center gap-1.5 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#658278] dark:text-[#789991] bg-[#F1FAF6] dark:bg-[#06241F] px-2 py-0.5 rounded-lg border border-[#D8E8E2] dark:border-[#16463D]"
            >
              <Tag className="w-2.5 h-2.5 text-[#159B72] dark:text-[#20D39B]" />
              <span>#{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Actions Row: Like, Comment, Share, Bookmark */}
      <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#E8F1ED] dark:border-[#10372F] text-xs sm:text-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like Button */}
          <button
            type="button"
            onClick={onLikeToggle}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer select-none active:scale-95 ${
              post.isLiked
                ? "text-rose-600 font-bold"
                : "text-[#658278] dark:text-[#789991] hover:text-rose-500 font-medium"
            }`}
            aria-label="Like post"
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                post.isLiked ? "fill-rose-600 text-rose-600 scale-110" : ""
              }`}
            />
            <span>{post.likesCount}</span>
          </button>

          {/* Comment Count / Scroll to comments */}
          <button
            type="button"
            onClick={onScrollToComments}
            className="flex items-center gap-1.5 text-[#658278] dark:text-[#789991] hover:text-[#159B72] dark:hover:text-[#20D39B] font-medium transition-colors cursor-pointer select-none"
            aria-label="View comments"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{post.commentsCount} comments</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={onShare}
            className="flex items-center gap-1.5 text-[#658278] dark:text-[#789991] hover:text-[#159B72] dark:hover:text-[#20D39B] font-medium transition-colors cursor-pointer select-none"
            aria-label="Share post"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Bookmark / Save */}
        <button
          type="button"
          onClick={onSaveToggle}
          className={`flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors ${
            post.isSaved
              ? "text-[#159B72] dark:text-[#20D39B]"
              : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
          }`}
          aria-label={post.isSaved ? "Saved post" : "Save post"}
        >
          {post.isSaved ? (
            <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#159B72] dark:text-[#20D39B]" />
          ) : (
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
          <span className="hidden sm:inline">
            {post.isSaved ? "Saved" : "Save"}
          </span>
        </button>
      </div>
    </article>
  );
}
