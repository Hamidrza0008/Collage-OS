"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Heart,
  Send,
  CornerDownRight,
  MoreHorizontal,
  Edit2,
  Trash2,
  Flag,
  ArrowUpDown,
  Check,
  X,
} from "lucide-react";

export default function PostDiscussionSection({
  comments = [],
  onAddComment,
  onAddReply,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onLikeReply,
  onOpenReportComment,
  commentInputRef,
}) {
  const [commentText, setCommentText] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'most-liked'
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Submit new top-level comment
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(commentText.trim());
    setCommentText("");
  };

  // Submit reply to a top-level comment
  const handleSubmitReply = (parentCommentId) => {
    if (!replyText.trim()) return;

    onAddReply(parentCommentId, replyText.trim());
    setReplyText("");
    setReplyingToId(null);
  };

  // Start editing a comment
  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
    setActiveMenuId(null);
  };

  // Save edited comment
  const handleSaveEdit = (commentId) => {
    if (!editText.trim()) return;
    onEditComment(commentId, editText.trim());
    setEditingCommentId(null);
    setEditText("");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "oldest") {
      return (a.timestamp || 0) - (b.timestamp || 0);
    }
    if (sortBy === "most-liked") {
      return (b.likesCount || 0) - (a.likesCount || 0);
    }
    // default: newest
    return (b.timestamp || 0) - (a.timestamp || 0);
  });

  const visibleComments = sortedComments.slice(0, visibleCount);
  const hasMore = sortedComments.length > visibleCount;

  return (
    <section className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-7 shadow-xs space-y-6">
      {/* Section Header: Title & Sort Dropdown */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#159B72] dark:text-[#20D39B]" />
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Discussion ({comments.length})
          </h2>
        </div>

        {comments.length > 1 && (
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] absolute left-2.5 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-7 pr-6 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72] cursor-pointer appearance-none shadow-2xs"
              aria-label="Sort comments"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-liked">Most Liked</option>
            </select>
          </div>
        )}
      </div>

      {/* Main Comment Composer */}
      <form onSubmit={handleSubmitComment} className="flex items-start gap-3">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D]">
          <Image
            src="/assets/profile/avatar.jpg"
            alt="Hamid Rza"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <textarea
            ref={commentInputRef}
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your thoughts to this discussion... (markdown & mentions supported)"
            className="w-full p-3 text-xs sm:text-sm rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none focus:ring-2 focus:ring-[#159B72] dark:focus:ring-[#20D39B] transition-all resize-y min-h-[64px]"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#658278] dark:text-[#789991]">
              Posting publicly as <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">Hamid Rza</span>
            </span>

            <div className="flex items-center gap-2">
              {commentText.trim() && (
                <button
                  type="button"
                  onClick={() => setCommentText("")}
                  className="px-3 py-1.5 text-xs text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] hover:bg-[#0E7A58] dark:hover:bg-[#18B885] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Comment</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {comments.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#658278] dark:text-[#789991] bg-[#F7FBF9] dark:bg-[#082A24] rounded-2xl border border-[#E8F1ED] dark:border-[#10372F]">
            <MessageCircle className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] mx-auto mb-2 opacity-50" />
            <p className="font-semibold text-sm text-[#0B3024] dark:text-[#F1FAF6]">
              Be the first to join the discussion
            </p>
            <p className="mt-0.5">Share your insights, ask questions, or provide feedback.</p>
          </div>
        ) : (
          visibleComments.map((comment) => {
            const authorId = comment.author?.id || "student-1";
            const isEditing = editingCommentId === comment.id;

            return (
              <div
                key={comment.id}
                className="p-3.5 sm:p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] space-y-3"
              >
                {/* Comment Header: Avatar, Name, Timestamp, More Options */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Link
                      href={`/student/profile/${authorId}`}
                      className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D] hover:ring-2 hover:ring-[#159B72] transition-all"
                    >
                      <Image
                        src={comment.author?.avatar || "/assets/layout/profile-avatar.jpg"}
                        alt={comment.author?.name || "Author"}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Link
                          href={`/student/profile/${authorId}`}
                          className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors"
                        >
                          {comment.author?.name}
                        </Link>
                        {comment.isOwn && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B]">
                            You
                          </span>
                        )}
                        {comment.author?.department && (
                          <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                            • {comment.author.department}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#658278] dark:text-[#789991] flex items-center gap-1">
                        <span>{comment.createdAt}</span>
                        {comment.edited && <span>• (edited)</span>}
                      </span>
                    </div>
                  </div>

                  {/* Comment More Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === comment.id ? null : comment.id)
                      }
                      className="p-1 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
                      aria-label="Comment options"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>

                    {activeMenuId === comment.id && (
                      <div className="absolute right-0 mt-1 w-32 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl py-1 z-20 text-xs">
                        {comment.isOwn ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStartEdit(comment)}
                              className="w-full flex items-center gap-1.5 px-3 py-1.5 text-left text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteComment(comment.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-1.5 px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onOpenReportComment(comment);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-1.5 px-3 py-1.5 text-left text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
                          >
                            <Flag className="w-3.5 h-3.5" />
                            <span>Report</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Comment Body or Inline Edit Mode */}
                {isEditing ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={2}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#06241F] border border-[#159B72] dark:border-[#20D39B] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-2.5 py-1 text-xs text-[#658278] dark:text-[#789991] hover:text-[#0B3024] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(comment.id)}
                        className="px-3 py-1 text-xs font-bold rounded-lg bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs sm:text-[13px] text-[#36594C] dark:text-[#B5CCC5] leading-relaxed whitespace-pre-line pl-9 sm:pl-10">
                    {comment.text}
                  </p>
                )}

                {/* Comment Action Footer: Like button & Reply button */}
                <div className="flex items-center gap-4 pl-9 sm:pl-10 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => onLikeComment(comment.id)}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${
                      comment.isLiked
                        ? "text-rose-600 font-bold"
                        : "text-[#658278] dark:text-[#789991] hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        comment.isLiked ? "fill-rose-600 text-rose-600" : ""
                      }`}
                    />
                    <span>{comment.likesCount || 0}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setReplyingToId(replyingToId === comment.id ? null : comment.id)
                    }
                    className="flex items-center gap-1 text-[#658278] dark:text-[#789991] hover:text-[#159B72] dark:hover:text-[#20D39B] font-semibold cursor-pointer"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                </div>

                {/* Nested Replies Thread */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-6 sm:pl-10 space-y-2.5 pt-1 border-l-2 border-[#D8E8E2] dark:border-[#16463D] ml-4 sm:ml-5">
                    {comment.replies.map((reply) => {
                      const replyAuthorId = reply.author?.id || "student-1";

                      return (
                        <div
                          key={reply.id}
                          className="p-2.5 rounded-xl bg-white/70 dark:bg-[#06241F]/80 border border-[#E8F1ED] dark:border-[#10372F] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/student/profile/${replyAuthorId}`}
                                className="relative w-6 h-6 rounded-full overflow-hidden shrink-0"
                              >
                                <Image
                                  src={
                                    reply.author?.avatar || "/assets/layout/profile-avatar.jpg"
                                  }
                                  alt={reply.author?.name || "Author"}
                                  fill
                                  className="object-cover"
                                />
                              </Link>
                              <Link
                                href={`/student/profile/${replyAuthorId}`}
                                className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B]"
                              >
                                {reply.author?.name}
                              </Link>
                              {reply.isOwn && (
                                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#DDF3EB] text-[#159B72]">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                              {reply.createdAt}
                            </span>
                          </div>

                          <p className="text-xs text-[#36594C] dark:text-[#B5CCC5] leading-relaxed pl-8">
                            {reply.text}
                          </p>

                          <div className="pl-8 flex items-center gap-3 pt-0.5 text-xs">
                            <button
                              type="button"
                              onClick={() => onLikeReply(comment.id, reply.id)}
                              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                                reply.isLiked
                                  ? "text-rose-600 font-bold"
                                  : "text-[#658278] dark:text-[#789991] hover:text-rose-500"
                              }`}
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  reply.isLiked ? "fill-rose-600 text-rose-600" : ""
                                }`}
                              />
                              <span>{reply.likesCount || 0}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Inline Reply Composer for this comment */}
                {replyingToId === comment.id && (
                  <div className="pl-6 sm:pl-10 pt-2 ml-4 sm:ml-5 border-l-2 border-[#159B72] dark:border-[#20D39B]">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.author?.name}...`}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmitReply(comment.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] disabled:opacity-40 cursor-pointer"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyText("");
                        }}
                        className="p-1.5 text-[#658278] hover:text-[#0B3024] cursor-pointer"
                        aria-label="Cancel reply"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Load More Comments Button */}
        {hasMore && (
          <div className="text-center pt-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF3EB] dark:hover:bg-[#0a382c] transition-colors cursor-pointer shadow-2xs"
            >
              Load More Comments ({sortedComments.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
