"use client";

import Skeleton from "./Skeleton";

/**
 * SkeletonCircle Component
 * Renders circular placeholders for avatars, gauge dials, icons, and status dots.
 */
export default function SkeletonCircle({
  size = "w-10 h-10",
  className = "",
  ...props
}) {
  return (
    <Skeleton
      rounded="rounded-full"
      className={`shrink-0 ${size} ${className}`}
      {...props}
    />
  );
}
