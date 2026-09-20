"use client";

import AssignmentCard from "./AssignmentCard";
import { ClipboardCheck } from "lucide-react";

export default function AssignmentList({
  assignments,
  onViewDetails,
  onToggleStatus,
  onDownloadResources,
}) {
  if (assignments.length === 0) {
    return (
      <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-10 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
          <ClipboardCheck className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No assignments found
        </h3>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-1 max-w-sm">
          No assignments match your current search or filter criteria. Try selecting another tab or clearing search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onViewDetails={onViewDetails}
          onToggleStatus={onToggleStatus}
          onDownloadResources={onDownloadResources}
        />
      ))}
    </div>
  );
}
