"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CampusFeedHero from "./CampusFeedHero";
import CreatePostComposer from "./CreatePostComposer";
import FeedTabsAndFilter from "./FeedTabsAndFilter";
import FeedList from "./FeedList";
import FeedPagination from "./FeedPagination";
import CreatePostModal from "./CreatePostModal";
import ReportPostModal from "./ReportPostModal";
import EventRegisterModal from "./EventRegisterModal";
import JoinCommunityModal from "./JoinCommunityModal";
import CampusFeedSkeleton from "./CampusFeedSkeleton";

// Sidebar components
import TrendingCampusCard from "./TrendingCampusCard";
import PeopleYouMayKnowCard from "./PeopleYouMayKnowCard";
import QuickActionsCard from "./QuickActionsCard";
import StayConnectedCard from "./StayConnectedCard";

import { INITIAL_POSTS, filterFeedPosts } from "./feedData";
import { CheckCircle2 } from "lucide-react";

export default function CampusFeed({ isLoading = false }) {
  const router = useRouter();

  // Master Posts State
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Filter States
  const [activeTab, setActiveTab] = useState("for-you"); // 'for-you' | 'following' | 'latest'
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State: strictly max 6 posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  // Modals & Interaction States
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerInitialTab, setComposerInitialTab] = useState("text");
  const [postToReport, setPostToReport] = useState(null);
  const [eventToRegister, setEventToRegister] = useState(null);
  const [isJoinCommunityOpen, setIsJoinCommunityOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAuthorClick = (author) => {
    if (!author) return;
    const studentId = author.id || (author.name ? author.name.toLowerCase().replace(/\s+/g, "-") : "student-1");
    router.push(`/student/profile/${studentId}`);
  };

  // Filtered dataset
  const filteredPosts = useMemo(() => {
    return filterFeedPosts(posts, {
      tab: activeTab,
      category: selectedCategory,
      search: searchQuery,
    });
  }, [posts, activeTab, selectedCategory, searchQuery]);

  // Paginated Posts: exactly max 6 items for current page
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  // Tab & Filter Handlers with automatic reset to Page 1
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveTab("for-you");
    setSelectedCategory("All Posts");
    setSearchQuery("");
    setCurrentPage(1);
    showToast("Reset feed filters");
  };

  // Composer Handlers
  const handleOpenComposer = (tabType = "text") => {
    setComposerInitialTab(tabType);
    setIsComposerOpen(true);
  };

  const handleCreatePostSubmit = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setCurrentPage(1);
    showToast("Your post has been published.");
  };

  // Like Toggle
  const handleLikeToggle = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          const likesCount = isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1);
          return { ...p, isLiked, likesCount };
        }
        return p;
      })
    );
  };

  // Add Comment
  const handleAddComment = (postId, commentObj) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = [commentObj, ...(p.comments || [])];
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: updatedComments,
            latestComment: commentObj,
          };
        }
        return p;
      })
    );
    showToast("Comment posted.");
  };

  // Save / Bookmark Toggle
  const handleSaveToggle = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          showToast(isSaved ? "Post saved to bookmarks" : "Post removed from bookmarks");
          return { ...p, isSaved };
        }
        return p;
      })
    );
  };

  // Delete Post (for own post)
  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast("Post deleted.");
  };

  // Hide Post
  const handleHidePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast("Post hidden from your feed.");
  };

  // Report Post
  const handleReportSubmit = (postId, reason) => {
    showToast(`Post reported for "${reason}". Thank you.`);
  };

  // Event Registration
  const handleRegisterEvent = (post) => {
    setEventToRegister(post);
  };

  const handleEventRegisterConfirm = (eventTitle, track) => {
    showToast(`Registered for ${eventTitle} (${track})! E-pass issued.`);
  };

  // Vote on Poll
  const handleVotePoll = (postId, optionId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.poll) {
          const updatedOptions = p.poll.options.map((opt) => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          return {
            ...p,
            poll: {
              ...p.poll,
              totalVotes: p.poll.totalVotes + 1,
              userVotedOption: optionId,
              options: updatedOptions,
            },
          };
        }
        return p;
      })
    );
    showToast("Vote recorded!");
  };

  // Share Post
  const handleShare = (post) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/student/feed#${post.id}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast("Post link copied to clipboard");
        });
      } else {
        showToast("Post link copied");
      }
    }
  };

  // Trending Click Handler
  const handleSelectTrending = (category, searchKey) => {
    if (category && category !== "All Posts") {
      setSelectedCategory(category);
    }
    if (searchKey) {
      setSearchQuery(searchKey);
    }
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quick Action Polls Filter
  const handleFilterPolls = () => {
    setSelectedCategory("Poll");
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Showing active campus polls");
  };

  if (isLoading) {
    return <CampusFeedSkeleton />;
  }

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063327] text-white border border-emerald-500/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN LAYOUT: 2/3 MAIN COLUMN + 1/3 RIGHT SIDEBAR (Starts at same level)   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Composer + Tabs/Filter + Posts + Pagination       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Campus Feed Hero (Strictly confined to 2/3 column, NOT full width) */}
          <CampusFeedHero />

          {/* 2. Create Post Composer */}
          <CreatePostComposer onOpenComposer={handleOpenComposer} />

          {/* 3. Feed Tabs + Filter Dropdown */}
          <FeedTabsAndFilter
            activeTab={activeTab}
            onTabChange={handleTabChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* 4. Feed Posts List (Contextual empty state when 0 matches) */}
          <FeedList
            posts={paginatedPosts}
            activeTab={activeTab}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onClearFilters={handleClearFilters}
            onLikeToggle={handleLikeToggle}
            onAddComment={handleAddComment}
            onSaveToggle={handleSaveToggle}
            onDeletePost={handleDeletePost}
            onHidePost={handleHidePost}
            onOpenReport={(post) => setPostToReport(post)}
            onRegisterEvent={handleRegisterEvent}
            onVotePoll={handleVotePoll}
            onShare={handleShare}
            onAuthorClick={handleAuthorClick}
          />

          {/* 5. Pagination: Strictly max 6 posts per page */}
          <FeedPagination
            currentPage={currentPage}
            totalItems={filteredPosts.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at TOP level beside Hero                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Trending on Campus */}
          <TrendingCampusCard onSelectTrending={handleSelectTrending} />

          {/* 2. People You May Know */}
          <PeopleYouMayKnowCard onShowToast={showToast} />

          {/* 3. Quick Actions (2x2 Grid) */}
          <QuickActionsCard
            onOpenComposer={handleOpenComposer}
            onOpenJoinGroups={() => setIsJoinCommunityOpen(true)}
            onExploreStudents={() => {
              showToast("Explore Students directory opened");
            }}
            onFilterPolls={handleFilterPolls}
          />

          {/* 4. Stay Connected CTA */}
          <StayConnectedCard
            onJoinCommunity={() => setIsJoinCommunityOpen(true)}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}
      <CreatePostModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSubmit={handleCreatePostSubmit}
        initialTab={composerInitialTab}
      />

      <ReportPostModal
        isOpen={Boolean(postToReport)}
        onClose={() => setPostToReport(null)}
        post={postToReport}
        onReportSubmit={handleReportSubmit}
      />

      <EventRegisterModal
        isOpen={Boolean(eventToRegister)}
        onClose={() => setEventToRegister(null)}
        eventData={eventToRegister}
        onRegisterConfirm={handleEventRegisterConfirm}
      />

      <JoinCommunityModal
        isOpen={isJoinCommunityOpen}
        onClose={() => setIsJoinCommunityOpen(false)}
        onShowToast={showToast}
      />
    </div>
  );
}
