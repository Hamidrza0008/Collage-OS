"use client";

import Skeleton from "./Skeleton";

/**
 * SkeletonButton Component
 * Button-shaped skeleton placeholder with responsive sizing.
 */
export default function SkeletonButton({
  width = "w-24",
  height = "h-9",
  rounded = "rounded-xl",
  className = "",
}) {
  return (
    <Skeleton
      rounded={rounded}
      className={`${width} ${height} shrink-0 ${className}`}
    />
  );
}
