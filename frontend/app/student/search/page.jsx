import { Suspense } from "react";
import GlobalSearchAssembler from "@/components/search/GlobalSearchAssembler";
import GlobalSearchSkeleton from "@/components/search/GlobalSearchSkeleton";

export const metadata = {
  title: "Search & Discovery | College OS",
  description:
    "Find students, tech projects, career opportunities, events, notices, courses, and campus discussions.",
};

export default function GlobalSearchPage() {
  return (
    <Suspense fallback={<GlobalSearchSkeleton />}>
      <GlobalSearchAssembler />
    </Suspense>
  );
}
