"use client";

import Skeleton from "./Skeleton";

/**
 * SkeletonText Component
 * Renders multiple or single lines of text with varying widths for realistic typography loading.
 */
export default function SkeletonText({
  lines = 2,
  widths = ["100%", "75%"],
  height = "h-3.5",
  gap = "gap-2",
  className = "",
  rounded = "rounded-md",
}) {
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => {
        const width = Array.isArray(widths)
          ? widths[index % widths.length]
          : widths;
        return (
          <Skeleton
            key={index}
            rounded={rounded}
            className={`${height} ${typeof width === "string" && width.startsWith("w-") ? width : ""}`}
            style={typeof width === "string" && !width.startsWith("w-") ? { width } : undefined}
          />
        );
      })}
    </div>
  );
}
