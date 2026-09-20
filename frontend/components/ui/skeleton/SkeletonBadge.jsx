"use client";

import Skeleton from "./Skeleton";

/**
 * SkeletonBadge Component
 * Pill-shaped skeleton for status indicators, categories, and tags.
 */
export default function SkeletonBadge({
  width = "w-16",
  height = "h-5",
  className = "",
}) {
  return (
    <Skeleton
      rounded="rounded-full"
      className={`${width} ${height} shrink-0 ${className}`}
    />
  );
}
