"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Bookmark,
  BookmarkCheck,
  Flag,
  EyeOff,
  Trash2,
  Edit3,
} from "lucide-react";

export default function FeedPostMenu({
  post,
  onSaveToggle,
  onOpenReport,
  onDeletePost,
  onHidePost,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isOwnPost = post.author?.name === "Hamid Rza";

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Post options"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
          {/* Save / Bookmark Post */}
          <button
            type="button"
            onClick={() => {
              onSaveToggle(post.id);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
          >
            {post.isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
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

          {/* Context Options */}
          {isOwnPost ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onDeletePost(post.id);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Post</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onHidePost(post.id);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] cursor-pointer"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Post</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenReport(post);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report Post</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
