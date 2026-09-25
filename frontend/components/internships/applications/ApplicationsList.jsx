"use client";

import Link from "next/link";
import { Briefcase, SearchX, ArrowRight, FolderSearch } from "lucide-react";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationsList({
  applications = [],
  activeTab,
  searchQuery,
  onResetSearch,
  onViewApplication,
  onWithdraw,
  onEditNotes,
}) {
  if (applications.length === 0) {
    if (searchQuery) {
      return (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <SearchX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#06241F] dark:text-white">
              No applications match &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60 max-w-sm mx-auto">
              Check for typos or try searching by company name, role title, or application ID.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetSearch}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#159B72]/10 hover:bg-[#159B72]/20 dark:bg-[#20D39B]/10 dark:hover:bg-[#20D39B]/20 text-[#159B72] dark:text-[#20D39B] transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      );
    }

    return (
      <div className="p-8 sm:p-12 text-center rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xs space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#159B72] dark:text-[#20D39B] mx-auto flex items-center justify-center">
          <FolderSearch className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#06241F] dark:text-white">
            {activeTab === "all"
              ? "You haven't applied to any opportunities yet."
              : `No ${activeTab} applications found.`}
          </h3>
          <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60 max-w-md mx-auto">
            {activeTab === "all"
              ? "Explore verified software internships, research fellowships, and student hackathons to kickstart your career."
              : "Switch status tabs or explore new campus openings."}
          </p>
        </div>
        <Link
          href="/student/internships"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer shadow-2xs"
        >
          <span>Explore Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <ApplicationCard
          key={app.id || app.applicationId}
          application={app}
          onViewApplication={onViewApplication}
          onWithdraw={onWithdraw}
          onEditNotes={onEditNotes}
        />
      ))}
    </div>
  );
}
