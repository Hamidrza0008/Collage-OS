"use client";

/**
 * SkeletonCard Component
 * Structured container card matching the College OS design system borders, radius, and elevation.
 */
export default function SkeletonCard({
  className = "",
  children,
  padding = "p-4 sm:p-5",
}) {
  return (
    <div
      className={`bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl ${padding} shadow-xs ${className}`}
    >
      {children}
    </div>
  );
}
