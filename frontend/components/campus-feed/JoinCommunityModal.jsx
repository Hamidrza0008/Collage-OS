"use client";

import { useState } from "react";
import { X, Users, Sparkles, Check } from "lucide-react";

export default function JoinCommunityModal({ isOpen, onClose, onShowToast }) {
  const [joinedCommunities, setJoinedCommunities] = useState({
    "c-1": true,
    "c-3": true,
  });

  if (!isOpen) return null;

  const communities = [
    {
      id: "c-1",
      name: "Google Developer Student Club (GDSC)",
      category: "Tech & Coding",
      members: "420 members",
      description: "Workshops, hackathons, and Google technologies community.",
    },
    {
      id: "c-2",
      name: "Robotics & IoT Innovators Society",
      category: "Hardware & Robotics",
      members: "210 members",
      description: "Building autonomous bots, drones, and embedded systems.",
    },
    {
      id: "c-3",
      name: "CodeVibe - DSA & CP Pod",
      category: "Academics & Placements",
      members: "580 members",
      description: "Daily LeetCode discussions and mock interview preparation.",
    },
    {
      id: "c-4",
      name: "Rangmanch Cultural & Drama Club",
      category: "Arts & Culture",
      members: "190 members",
      description: "Annual college festival drama, street plays, and music sessions.",
    },
    {
      id: "c-5",
      name: "College Athletics & Sports Guild",
      category: "Sports & Fitness",
      members: "340 members",
      description: "Inter-college leagues, tournaments, and team practice schedules.",
    },
  ];

  const handleToggleJoin = (id, name) => {
    const isCurrentlyJoined = joinedCommunities[id];
    setJoinedCommunities((prev) => ({
      ...prev,
      [id]: !isCurrentlyJoined,
    }));

    if (!isCurrentlyJoined) {
      onShowToast(`Joined "${name}" community!`);
    } else {
      onShowToast(`Left "${name}" community.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Campus Communities &amp; Groups
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#658278] dark:text-[#789991] mt-2 mb-3">
          Connect with active campus clubs, study groups, and student chapters to collaborate on projects and events.
        </p>

        {/* Communities List */}
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
          {communities.map((c) => {
            const isJoined = joinedCommunities[c.id];

            return (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {c.name}
                    </h5>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                    {c.description}
                  </p>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 block pt-0.5">
                    {c.members}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleJoin(c.id, c.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isJoined
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                      : "bg-[#159B72] hover:bg-[#087A5B] text-white shadow-xs"
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Joined</span>
                    </>
                  ) : (
                    <span>+ Join</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-[#D8E8E2] dark:border-[#16463D] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
