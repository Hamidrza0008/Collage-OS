"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Bell,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";
import FeedPostMedia from "../FeedPostMedia";

export default function CommunityGroupFeed({
  group,
  posts = [],
  announcements = [],
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter posts based on activeTab
  const filteredPosts = posts.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "discussions") return p.type !== "Event" && p.type !== "Announcement";
    if (activeTab === "announcements") return p.type === "Announcement";
    if (activeTab === "events") return p.type === "Event" || Boolean(p.eventDetails);
    if (activeTab === "projects") return p.type === "Project" || p.id === "post-11";
    return true;
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  return (
    <div className="space-y-6">
      {/* Community Announcements Banner */}
      {announcements && announcements.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
              Community Notice Board
            </h3>
          </div>

          <div className="space-y-2.5">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.2 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                      {ann.importance === "high" ? "Priority" : "Notice"}
                    </span>
                    <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                      {ann.date} • by {ann.author}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-amber-950 dark:text-amber-100">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
                    {ann.summary}
                  </p>
                </div>

                {ann.route && (
                  <Link
                    href={ann.route}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#06241F] border border-amber-300/60 dark:border-amber-800/60 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-100/50 transition-colors shrink-0 self-start sm:self-center shadow-2xs cursor-pointer"
                  >
                    <span>{ann.actionText || "View Discussion"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Feed Toolbar Tabs */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#E8F1ED] dark:border-[#10372F] flex-wrap">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          {[
            { id: "all", label: "All Posts", icon: MessageSquare },
            { id: "discussions", label: "Discussions", icon: MessageCircle },
            { id: "announcements", label: "Announcements", icon: Bell },
            { id: "events", label: "Events", icon: Calendar },
            { id: "projects", label: "Projects", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setVisibleCount(6);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0B3024] dark:bg-[#20D39B] text-white dark:text-[#021512] shadow-xs"
                    : "bg-white dark:bg-[#06241F] text-[#4A685D] dark:text-[#8BAAA0] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-[#658278] dark:text-[#789991]">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {visiblePosts.length === 0 ? (
          <div className="py-12 px-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-center flex flex-col items-center justify-center">
            <MessageSquare className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] opacity-50 mb-2" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              No posts found in this filter
            </h4>
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
              Check back soon for new community updates and discussions.
            </p>
          </div>
        ) : (
          visiblePosts.map((post) => (
            <article
              key={post.id}
              className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs hover:border-[#159B72]/40 transition-colors"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Link
                    href={`/student/profile/${post.author?.name ? post.author.name.toLowerCase().replace(/\s+/g, "-") : "student-1"}`}
                    className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D]"
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
                        href={`/student/profile/${post.author?.name ? post.author.name.toLowerCase().replace(/\s+/g, "-") : "student-1"}`}
                        className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B]"
                      >
                        {post.author?.name}
                      </Link>
                      {post.author?.role && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                          {post.author.role}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                      {post.createdAt} • {group.name}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                  {post.type}
                </span>
              </div>

              {/* Post Content */}
              <div className="mt-3 text-xs sm:text-sm text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed whitespace-pre-line">
                {post.content}
              </div>

              {/* Media Preview if attached */}
              <FeedPostMedia post={post} />

              {/* Action Bar */}
              <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#E8F1ED] dark:border-[#10372F] text-xs">
                <div className="flex items-center gap-4 text-[#658278] dark:text-[#789991]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.likesCount || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.commentsCount || 0}</span>
                  </span>
                </div>

                <Link
                  href={`/student/feed/${post.id}`}
                  className="inline-flex items-center gap-1 font-bold text-[#159B72] dark:text-[#20D39B] hover:underline"
                >
                  <span>Open Discussion</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer shadow-2xs"
            >
              Load More Posts ({filteredPosts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
