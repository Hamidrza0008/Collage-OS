"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import FeedPostHero from "./FeedPostHero";
import PostDiscussionSection from "./PostDiscussionSection";
import PostAuthorSidebarCard from "./PostAuthorSidebarCard";
import PostContextCard from "./PostContextCard";
import RelatedPostsCard from "./RelatedPostsCard";
import DiscussionSummaryCard from "./DiscussionSummaryCard";
import ReportCommentModal from "./ReportCommentModal";
import DeleteCommentConfirmModal from "./DeleteCommentConfirmModal";
import ReportPostModal from "../ReportPostModal";
import FeedPostNotFound from "./FeedPostNotFound";
import {
  getFeedPostById,
  getRelatedPosts,
  saveStoredInteraction,
} from "./feedPostDetailsData";

export default function FeedPostDetailsAssembler({ postId }) {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals & interaction states
  const [isReportPostOpen, setIsReportPostOpen] = useState(false);
  const [commentToReport, setCommentToReport] = useState(null);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const commentInputRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Load post details & related posts
  useEffect(() => {
    if (!postId) {
      setIsLoaded(true);
      return;
    }

    const loadedPost = getFeedPostById(postId);
    if (loadedPost) {
      setPost(loadedPost);
      setRelatedPosts(getRelatedPosts(loadedPost, 3));
    } else {
      setPost(null);
    }
    setIsLoaded(true);
  }, [postId]);

  // Scroll to comment composer
  const handleScrollToComments = () => {
    if (commentInputRef.current) {
      commentInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      commentInputRef.current.focus();
    }
  };

  // 1. Like toggle
  const handleLikeToggle = () => {
    if (!post) return;
    const newIsLiked = !post.isLiked;
    const newLikesCount = newIsLiked
      ? (post.likesCount || 0) + 1
      : Math.max(0, (post.likesCount || 0) - 1);

    const updated = {
      ...post,
      isLiked: newIsLiked,
      likesCount: newLikesCount,
    };

    setPost(updated);
    saveStoredInteraction(post.id, {
      isLiked: newIsLiked,
      likesCount: newLikesCount,
    });

    showToast(newIsLiked ? "Liked post" : "Unliked post");
  };

  // 2. Save / Bookmark toggle
  const handleSaveToggle = () => {
    if (!post) return;
    const newIsSaved = !post.isSaved;
    const updated = {
      ...post,
      isSaved: newIsSaved,
    };

    setPost(updated);
    saveStoredInteraction(post.id, { isSaved: newIsSaved });
    showToast(
      newIsSaved
        ? "Post saved to your bookmarks"
        : "Post removed from bookmarks"
    );
  };

  // 3. Share post
  const handleShare = () => {
    if (!post || typeof window === "undefined") return;
    const canonicalUrl = `${window.location.origin}/student/feed/${post.id}`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(canonicalUrl)
        .then(() => {
          showToast("Discussion link copied to clipboard!");
        })
        .catch(() => {
          showToast("Discussion link ready to share");
        });
    } else {
      showToast("Discussion link ready");
    }
  };

  // 4. Add Top-Level Comment
  const handleAddComment = (text) => {
    if (!post) return;

    const newComment = {
      id: `c-local-${Date.now()}`,
      author: {
        id: "student-1",
        name: "Hamid Rza",
        avatar: "/assets/profile/avatar.jpg",
        role: "Student",
        department: "CSE",
      },
      createdAt: "Just now",
      timestamp: Date.now(),
      text,
      likesCount: 0,
      isLiked: false,
      isOwn: true,
      replies: [],
    };

    const updatedComments = [newComment, ...(post.comments || [])];
    const totalReplies = updatedComments.reduce(
      (acc, c) => acc + (c.replies ? c.replies.length : 0),
      0
    );

    const updatedPost = {
      ...post,
      comments: updatedComments,
      commentsCount: updatedComments.length + totalReplies,
    };

    setPost(updatedPost);
    saveStoredInteraction(post.id, { comments: updatedComments });
    showToast("Comment posted!");
  };

  // 5. Add Nested Reply
  const handleAddReply = (parentCommentId, text) => {
    if (!post) return;

    const newReply = {
      id: `r-local-${Date.now()}`,
      author: {
        id: "student-1",
        name: "Hamid Rza",
        avatar: "/assets/profile/avatar.jpg",
        role: "Student",
        department: "CSE",
      },
      createdAt: "Just now",
      timestamp: Date.now(),
      text,
      likesCount: 0,
      isLiked: false,
      isOwn: true,
    };

    const updatedComments = (post.comments || []).map((c) => {
      if (c.id === parentCommentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      }
      return c;
    });

    const totalReplies = updatedComments.reduce(
      (acc, c) => acc + (c.replies ? c.replies.length : 0),
      0
    );

    const updatedPost = {
      ...post,
      comments: updatedComments,
      commentsCount: updatedComments.length + totalReplies,
    };

    setPost(updatedPost);
    saveStoredInteraction(post.id, { comments: updatedComments });
    showToast("Reply sent!");
  };

  // 6. Edit Own Comment
  const handleEditComment = (commentId, newText) => {
    if (!post) return;

    const updatedComments = (post.comments || []).map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          text: newText,
          edited: true,
        };
      }
      return c;
    });

    const updatedPost = {
      ...post,
      comments: updatedComments,
    };

    setPost(updatedPost);
    saveStoredInteraction(post.id, { comments: updatedComments });
    showToast("Comment updated");
  };

  // 7. Delete Own Comment
  const handleDeleteCommentConfirm = () => {
    if (!post || !commentToDeleteId) return;

    const updatedComments = (post.comments || []).filter(
      (c) => c.id !== commentToDeleteId
    );

    const totalReplies = updatedComments.reduce(
      (acc, c) => acc + (c.replies ? c.replies.length : 0),
      0
    );

    const updatedPost = {
      ...post,
      comments: updatedComments,
      commentsCount: updatedComments.length + totalReplies,
    };

    setPost(updatedPost);
    saveStoredInteraction(post.id, { comments: updatedComments });
    showToast("Comment deleted");
    setCommentToDeleteId(null);
  };

  // 8. Like Top-Level Comment
  const handleLikeComment = (commentId) => {
    if (!post) return;

    const updatedComments = (post.comments || []).map((c) => {
      if (c.id === commentId) {
        const isLiked = !c.isLiked;
        return {
          ...c,
          isLiked,
          likesCount: isLiked ? (c.likesCount || 0) + 1 : Math.max(0, (c.likesCount || 0) - 1),
        };
      }
      return c;
    });

    setPost({ ...post, comments: updatedComments });
    saveStoredInteraction(post.id, { comments: updatedComments });
  };

  // 9. Like Nested Reply
  const handleLikeReply = (parentCommentId, replyId) => {
    if (!post) return;

    const updatedComments = (post.comments || []).map((c) => {
      if (c.id === parentCommentId) {
        const updatedReplies = (c.replies || []).map((r) => {
          if (r.id === replyId) {
            const isLiked = !r.isLiked;
            return {
              ...r,
              isLiked,
              likesCount: isLiked ? (r.likesCount || 0) + 1 : Math.max(0, (r.likesCount || 0) - 1),
            };
          }
          return r;
        });
        return { ...c, replies: updatedReplies };
      }
      return c;
    });

    setPost({ ...post, comments: updatedComments });
    saveStoredInteraction(post.id, { comments: updatedComments });
  };

  // 10. Report handlers
  const handleReportPostSubmit = (id, reason, details) => {
    showToast(`Post reported for: ${reason}`);
    setIsReportPostOpen(false);
  };

  const handleReportCommentSubmit = (commentId, reason, details) => {
    showToast(`Comment reported for: ${reason}`);
    setCommentToReport(null);
  };

  if (isLoaded && !post) {
    return <FeedPostNotFound />;
  }

  if (!post) return null;

  return (
    <div className="w-full pb-16 transition-colors">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0B3024] dark:bg-[#073327] text-white border border-[#159B72]/40 shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-[#20D39B] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Report Post Modal */}
      <ReportPostModal
        isOpen={isReportPostOpen}
        onClose={() => setIsReportPostOpen(false)}
        post={post}
        onReportSubmit={handleReportPostSubmit}
      />

      {/* Report Comment Modal */}
      <ReportCommentModal
        isOpen={Boolean(commentToReport)}
        onClose={() => setCommentToReport(null)}
        comment={commentToReport}
        onReportSubmit={handleReportCommentSubmit}
      />

      {/* Delete Comment Confirmation Modal */}
      <DeleteCommentConfirmModal
        isOpen={Boolean(commentToDeleteId)}
        onClose={() => setCommentToDeleteId(null)}
        onConfirm={handleDeleteCommentConfirm}
      />

      {/* 2/3 Main Content + 1/3 Right Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content Column (2/3) */}
        <main className="lg:col-span-8 xl:col-span-8 space-y-6">
          {/* Post Hero & Media */}
          <FeedPostHero
            post={post}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onShare={handleShare}
            onOpenReport={() => setIsReportPostOpen(true)}
            onScrollToComments={handleScrollToComments}
          />

          {/* Full Discussion Section with Comments & Replies */}
          <PostDiscussionSection
            comments={post.comments || []}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onEditComment={handleEditComment}
            onDeleteComment={(id) => setCommentToDeleteId(id)}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
            onOpenReportComment={(comment) => setCommentToReport(comment)}
            commentInputRef={commentInputRef}
          />
        </main>

        {/* Right Rail Sidebar (1/3) */}
        <aside className="lg:col-span-4 xl:col-span-4 space-y-5 lg:sticky lg:top-20">
          {/* About Author Card */}
          <PostAuthorSidebarCard authorProfile={post.authorProfile} />

          {/* Discussion Summary Card */}
          <DiscussionSummaryCard post={post} comments={post.comments || []} />

          {/* Connected Context Card (if referenced) */}
          <PostContextCard linkedEntity={post.linkedEntity} />

          {/* Related Campus Discussions */}
          <RelatedPostsCard relatedPosts={relatedPosts} />
        </aside>
      </div>
    </div>
  );
}
