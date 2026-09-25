"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, ArrowRight, Check, UserPlus } from "lucide-react";
import { PEOPLE_YOU_MAY_KNOW } from "./feedData";

export default function PeopleYouMayKnowCard({ onShowToast }) {
  const [followingMap, setFollowingMap] = useState({
    "user-1": false,
    "user-2": false,
    "user-3": false,
    "user-4": false,
  });

  const handleToggleFollow = (user) => {
    const isNowFollowing = !followingMap[user.id];
    setFollowingMap((prev) => ({
      ...prev,
      [user.id]: isNowFollowing,
    }));

    if (onShowToast) {
      if (isNowFollowing) {
        onShowToast(`You are now following ${user.name}`);
      } else {
        onShowToast(`Unfollowed ${user.name}`);
      }
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] p-4 sm:p-4.5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            People You May Know
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onShowToast && onShowToast("Showing all recommended students")}
          className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* People List */}
      <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F] mt-1">
        {PEOPLE_YOU_MAY_KNOW.map((person) => {
          const isFollowing = followingMap[person.id];

          return (
            <div
              key={person.id}
              className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#031A16] px-1.5 -mx-1.5 rounded-xl transition-all"
            >
              <Link
                href={`/student/profile/${person.id}`}
                className="flex items-center gap-2.5 min-w-0 group"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-emerald-500/20 group-hover:ring-2 group-hover:ring-emerald-500/40 transition-all">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-600 dark:group-hover:text-[#20D39B] transition-colors truncate">
                    {person.name}
                  </h4>
                  <p className="text-[10px] text-[#658278] dark:text-[#789991]">
                    {person.department} • {person.semester}
                  </p>
                </div>
              </Link>

              {/* Follow Button */}
              <button
                type="button"
                onClick={() => handleToggleFollow(person)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isFollowing
                    ? "bg-[#E8F1ED] dark:bg-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] border border-emerald-500/30 flex items-center gap-1"
                    : "bg-[#159B72] hover:bg-[#087A5B] text-white shadow-2xs flex items-center gap-1"
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
