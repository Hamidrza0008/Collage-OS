"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  Pin,
  ExternalLink,
  Folder,
  LayoutGrid,
  Briefcase,
  Calendar,
  Bell,
  ClipboardCheck,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

function formatSavedDate(isoString) {
  if (!isoString) return "Saved recently";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Saved just now";
    if (diffHours < 24) return `Saved ${diffHours}h ago`;
    if (diffDays === 1) return "Saved yesterday";
    if (diffDays < 7) return `Saved ${diffDays} days ago`;

    return `Saved on ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    })}`;
  } catch {
    return "Saved recently";
  }
}

export default function SavedItemCard({
  item,
  isBulkMode,
  isSelected,
  onToggleSelect,
  onRemove,
  onTogglePin,
  onAssignCollection,
  collections = [],
}) {
  const [isCollectionMenuOpen, setIsCollectionMenuOpen] = useState(false);

  const {
    id,
    entityType,
    entityId,
    title,
    subtitle,
    description,
    image,
    route,
    tags = [],
    metadata = {},
    status,
    availability,
    isAvailable,
    savedAt,
    isPinned,
    collectionId,
  } = item;

  // Find collection name
  const currentCollection = collections.find((c) => c.id === collectionId);

  // Type-specific badge color and icon
  const getTypeConfig = () => {
    switch (entityType) {
      case "project":
        return {
          label: "Project",
          icon: LayoutGrid,
          badgeCls: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
        };
      case "opportunity":
        return {
          label: metadata?.type || "Opportunity",
          icon: Briefcase,
          badgeCls: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        };
      case "event":
        return {
          label: "Event",
          icon: Calendar,
          badgeCls: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        };
      case "notice":
        return {
          label: "Notice",
          icon: Bell,
          badgeCls: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
        };
      case "assignment":
        return {
          label: "Assignment",
          icon: ClipboardCheck,
          badgeCls: "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
        };
      case "feedPost":
        return {
          label: "Discussion",
          icon: MessageSquare,
          badgeCls: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
        };
      case "community":
        return {
          label: "Community",
          icon: ShieldCheck,
          badgeCls: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        };
      case "course":
        return {
          label: "Course",
          icon: BookOpen,
          badgeCls: "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800",
        };
      default:
        return {
          label: "Saved Item",
          icon: Bookmark,
          badgeCls: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
        };
    }
  };

  const typeConfig = getTypeConfig();
  const TypeIcon = typeConfig.icon;

  // Status indicator
  const getStatusBadge = () => {
    if (!isAvailable) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
          <AlertCircle className="w-3 h-3 text-gray-500" />
          <span>Unavailable</span>
        </span>
      );
    }

    if (availability === "Archived" || availability === "Closed" || availability === "Completed") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span>{availability}</span>
        </span>
      );
    }

    if (status === "Closing Soon" || status === "Urgent" || status === "Important") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <span>{status}</span>
        </span>
      );
    }

    if (status) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <span>{status}</span>
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl border transition-all ${
        isSelected
          ? "bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20"
          : isPinned
          ? "bg-white dark:bg-[#031C17] border-emerald-300 dark:border-emerald-700/80 shadow-xs"
          : "bg-white dark:bg-[#021512] border-[#D8E8E2] dark:border-[#10372F] hover:border-emerald-400 dark:hover:border-emerald-700/80 hover:shadow-xs"
      }`}
    >
      {/* Top Bar: Checkbox / Pin / Type Badge / Status / Actions */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Bulk Selection Checkbox */}
            {isBulkMode && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelect}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-700 cursor-pointer"
              />
            )}

            {/* Type Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${typeConfig.badgeCls}`}
            >
              <TypeIcon className="w-3 h-3" />
              <span>{typeConfig.label}</span>
            </span>

            {/* Status / Availability Badge */}
            {getStatusBadge()}

            {/* Pinned Badge */}
            {isPinned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                <Pin className="w-2.5 h-2.5 fill-current" />
                <span>Pinned</span>
              </span>
            )}
          </div>

          {/* Quick Actions (Pin toggle & Unsave) */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Pin / Unpin button */}
            <button
              type="button"
              onClick={onTogglePin}
              title={isPinned ? "Unpin item" : "Pin item to top"}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isPinned
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Pin className={`w-3.5 h-3.5 ${isPinned ? "fill-current" : ""}`} />
            </button>

            {/* Remove / Unsave Bookmark button */}
            <button
              type="button"
              onClick={() => onRemove(item)}
              title={`Remove ${title} from saved items`}
              aria-label={`Remove ${title} from saved items`}
              className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Content Row: Thumbnail + Info */}
        <div className="flex items-start gap-3">
          {/* Thumbnail / Icon preview */}
          {image ? (
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-gray-100 dark:bg-gray-800 shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center shrink-0 text-[#159B72] dark:text-[#20D39B]">
              <TypeIcon className="w-5 h-5" />
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="min-w-0 flex-1">
            {isAvailable && route ? (
              <Link
                href={route}
                className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors line-clamp-1 group/title"
              >
                {title}
              </Link>
            ) : (
              <span className="text-sm sm:text-base font-bold text-gray-500 dark:text-gray-400 line-clamp-1">
                {title}
              </span>
            )}

            {subtitle && (
              <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-medium mt-0.5 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Short Description */}
        {description && (
          <p className="text-xs text-[#658278] dark:text-[#789991] mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F7FBF9] dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] text-[#658278] dark:text-[#789991] font-medium">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata strip, Collection pill, Canonical link */}
      <div className="mt-3.5 pt-2.5 border-t border-[#E8F1ED] dark:border-[#10372F]/60 flex items-center justify-between gap-2 flex-wrap text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Saved date */}
          <span className="text-[11px] text-[#658278] dark:text-[#789991] font-medium">
            {formatSavedDate(savedAt)}
          </span>

          {/* Collection Assignment Tag / Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCollectionMenuOpen(!isCollectionMenuOpen)}
              className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                currentCollection
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] border-emerald-200 dark:border-emerald-800"
                  : "bg-gray-100 dark:bg-[#06241F] text-[#658278] dark:text-[#789991] border-dashed border-[#D8E8E2] dark:border-[#16463D] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              <Folder className="w-2.5 h-2.5" />
              <span>{currentCollection ? currentCollection.name : "Add to folder"}</span>
            </button>

            {isCollectionMenuOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-44 bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl shadow-xl p-1 z-50">
                <div className="px-2 py-1 text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                  Organize in Collection
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAssignCollection(item, null);
                    setIsCollectionMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  None (Unfiled)
                </button>
                {collections.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => {
                      onAssignCollection(item, col.id);
                      setIsCollectionMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs rounded-md truncate ${
                      col.id === collectionId
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] font-bold"
                        : "text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* View Canonical Route CTA */}
        {isAvailable && route ? (
          <Link
            href={route}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:translate-x-0.5 transition-transform"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
          >
            Remove from Saved
          </button>
        )}
      </div>
    </div>
  );
}
