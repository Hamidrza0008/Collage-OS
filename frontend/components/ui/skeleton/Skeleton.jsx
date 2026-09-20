"use client";

/**
 * Base Skeleton Component
 * Renders a shimmering surface that respects dark/light theme tokens and reduced motion preferences.
 */
export default function Skeleton({
  className = "",
  rounded = "rounded-lg",
  shimmer = true,
  style,
  children,
  ...props
}) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={`skeleton-base ${shimmer ? "skeleton-shimmer" : ""} ${rounded} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
