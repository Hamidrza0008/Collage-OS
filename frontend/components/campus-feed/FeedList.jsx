"use client";

import { MessageSquareOff, RotateCcw } from "lucide-react";
import FeedPostCard from "./FeedPostCard";

export default function FeedList({
  posts,
  activeTab,
  selectedCategory,
  searchQuery,
  onClearFilters,
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
  if (posts.length === 0) {
    let emptyTitle = "No posts found";
    let emptySubtitle = "There are no campus updates matching your current criteria.";

    if (activeTab === "following") {
      emptyTitle = "No posts from people you follow yet";
      emptySubtitle =
        "Follow peers and clubs from 'People You May Know' in the sidebar to see their posts here.";
    } else if (selectedCategory && selectedCategory !== "All Posts") {
      emptyTitle = `No ${selectedCategory} posts found`;
      emptySubtitle = `There are currently no posts under the "${selectedCategory}" category. Try selecting "All Posts".`;
    } else if (searchQuery) {
      emptyTitle = `No posts match "${searchQuery}"`;
      emptySubtitle = "Try adjusting your search terms or keywords.";
    }

    return (
      <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <MessageSquareOff className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {emptyTitle}
        </h4>
        <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm">
          {emptySubtitle}
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Feed Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <FeedPostCard
          key={post.id}
          post={post}
          onLikeToggle={onLikeToggle}
          onAddComment={onAddComment}
          onSaveToggle={onSaveToggle}
          onDeletePost={onDeletePost}
          onHidePost={onHidePost}
          onOpenReport={onOpenReport}
          onRegisterEvent={onRegisterEvent}
          onVotePoll={onVotePoll}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
