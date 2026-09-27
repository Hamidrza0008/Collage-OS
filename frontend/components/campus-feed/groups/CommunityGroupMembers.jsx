"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function CommunityGroupMembers({
  members = [],
  onViewAllClick,
}) {
  const previewMembers = members.slice(0, 6);

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Community Members ({members.length})
          </h3>
        </div>

        {members.length > 6 && (
          <button
            type="button"
            onClick={onViewAllClick}
            className="text-xs font-bold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {previewMembers.map((member) => (
          <Link
            key={member.id}
            href={`/student/profile/${member.id}`}
            className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex items-center gap-2.5 hover:border-[#159B72]/40 transition-all group"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D] group-hover:ring-2 group-hover:ring-[#159B72] transition-all">
              <Image
                src={member.avatar || "/assets/layout/profile-avatar.jpg"}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate">
                {member.name}
              </h4>
              <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate">
                {member.role || "Member"} • {member.department}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
