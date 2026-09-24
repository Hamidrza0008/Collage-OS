"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  Heart,
  CornerDownRight,
  Smile,
  ShieldCheck,
} from "lucide-react";

export default function ProjectDiscussion({
  initialComments = [],
  onMemberClick,
}) {
  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: {
        name: "Hamid Rza",
        avatar: "/assets/layout/profile-avatar.jpg",
        role: "CSE • 7th Sem",
      },
      time: "Just now",
      text: commentInput.trim(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
  };

  const handleToggleCommentLike = (commentId) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likes: isLiked ? (c.likes || 0) + 1 : Math.max(0, (c.likes || 1) - 1),
          };
        }
        return c;
      })
    );
  };

  const handlePostReply = (commentId) => {
    const text = replyInput[commentId]?.trim();
    if (!text) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: `r-${Date.now()}`,
                author: {
                  name: "Hamid Rza",
                  avatar: "/assets/layout/profile-avatar.jpg",
                  role: "Lead Developer",
                },
                time: "Just now",
                text,
                likes: 0,
              },
            ],
          };
        }
        return c;
      })
    );

    setReplyInput((prev) => ({ ...prev, [commentId]: "" }));
    setActiveReplyId(null);
  };

  return (
    <section
      id="project-discussion"
      aria-label="Project Discussion"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Project Discussion
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
              Peer reviews, architecture questions, and collaboration feedback
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F0F8F5] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </span>
      </div>

      {/* Write Comment Box */}
      <form onSubmit={handlePostComment} className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-emerald-500/20">
            <Image
              src="/assets/layout/profile-avatar.jpg"
              alt="Hamid Rza"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <textarea
              rows={3}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Ask a technical question, suggest an idea, or share feedback on this project..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] outline-none focus:border-[#159B72]/60 dark:focus:border-[#20D39B]/60 transition-all resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#658278] dark:text-[#8BAEA3]">
                Respect campus community guidelines
              </span>
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#0E825E] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Post Comment</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] space-y-3"
          >
            {/* Top row: Author Info */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onMemberClick && onMemberClick(comment.author)}
                  className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-emerald-500/20 hover:scale-105 transition-transform cursor-pointer text-left"
                >
                  <Image
                    src={comment.author?.avatar || "/assets/layout/profile-avatar.jpg"}
                    alt={comment.author?.name || "Author"}
                    fill
                    className="object-cover"
                  />
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => onMemberClick && onMemberClick(comment.author)}
                    className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors cursor-pointer text-left"
                  >
                    {comment.author?.name}
                  </button>
                  <p className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">
                    {comment.author?.role} &bull; {comment.time}
                  </p>
                </div>
              </div>

              {/* Like Comment */}
              <button
                type="button"
                onClick={() => handleToggleCommentLike(comment.id)}
                className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  comment.isLiked
                    ? "text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40"
                    : "text-[#658278] dark:text-[#8BAEA3] hover:text-rose-600"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    comment.isLiked ? "fill-current text-rose-500" : ""
                  }`}
                />
                <span>{comment.likes || 0}</span>
              </button>
            </div>

            {/* Comment Text */}
            <p className="text-xs text-[#355248] dark:text-[#CBD5E1] leading-relaxed">
              {comment.text}
            </p>

            {/* Reply Action */}
            <div className="flex items-center gap-3 pt-1 text-[11px]">
              <button
                type="button"
                onClick={() =>
                  setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
                }
                className="text-[#159B72] dark:text-[#20D39B] font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <CornerDownRight className="w-3 h-3" />
                <span>{activeReplyId === comment.id ? "Cancel Reply" : "Reply"}</span>
              </button>
            </div>

            {/* Reply Input Box */}
            {activeReplyId === comment.id && (
              <div className="flex items-center gap-2 pl-4 pt-1">
                <input
                  type="text"
                  value={replyInput[comment.id] || ""}
                  onChange={(e) =>
                    setReplyInput((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  placeholder={`Reply to ${comment.author?.name}...`}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handlePostReply(comment.id);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => handlePostReply(comment.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#159B72] text-white text-xs font-semibold cursor-pointer"
                >
                  Send
                </button>
              </div>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-4 sm:pl-6 space-y-2 border-l-2 border-[#D8E8E2] dark:border-[#10372F] mt-2">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#E8F3EE] dark:border-[#10372F] space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                          {reply.author?.name}
                        </span>
                        <span className="text-[10px] text-[#658278] dark:text-[#8BAEA3]">
                          &bull; {reply.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11.5px] text-[#4C6B61] dark:text-[#CBD5E1]">
                      {reply.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
