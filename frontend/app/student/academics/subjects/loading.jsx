export default function SubjectCatalogLoading() {
  return (
    <div className="w-full min-h-screen py-6 space-y-5 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full h-36 rounded-2xl bg-gray-100 dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />

      {/* Filters Skeleton */}
      <div className="w-full h-32 rounded-2xl bg-gray-100 dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-56 rounded-2xl bg-gray-100 dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F]"
          />
        ))}
      </div>
    </div>
  );
}
