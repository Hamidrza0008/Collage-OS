"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search, Users, ArrowUpRight } from "lucide-react";

export default function AllMembersModal({
  isOpen,
  onClose,
  members = [],
  groupName = "Community",
}) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = members.filter((m) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.role?.toLowerCase().includes(q) ||
      m.department?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl p-5 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2] dark:border-[#10372F]">
          <div className="flex items-center gap-2 text-[#159B72] dark:text-[#20D39B]">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {groupName} Members ({members.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative my-3">
          <Search className="w-3.5 h-3.5 text-[#658278] dark:text-[#789991] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members by name, role or department..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
          />
        </div>

        {/* Members List */}
        <div className="space-y-2 overflow-y-auto pr-1 flex-1">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-xs text-[#658278] dark:text-[#789991]">
              No members matched your search.
            </p>
          ) : (
            filtered.map((member) => (
              <div
                key={member.id}
                className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#D8E8E2] dark:border-[#16463D]">
                    <Image
                      src={member.avatar || "/assets/layout/profile-avatar.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                      {member.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#E8F1ED] dark:bg-[#10372F] text-[#36594C] dark:text-[#A3BFB5]">
                    {member.role || "Member"}
                  </span>
                  <Link
                    href={`/student/profile/${member.id}`}
                    onClick={onClose}
                    className="p-1 rounded-lg text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF3EB] dark:hover:bg-[#073327] transition-colors"
                    title="View Profile"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-[#D8E8E2] dark:border-[#10372F] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#A3BFB5] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
