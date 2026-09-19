"use client";

import { LayoutGrid, ArrowRight, Heart, Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Campus Connect",
    desc: "Student community platform",
    tags: ["Next.js", "MongoDB"],
    author: "Hamid Rza",
    initialLikes: 42,
  },
  {
    id: 2,
    title: "Smart Attendance",
    desc: "Automated attendance tracking",
    tags: ["React", "Node.js"],
    author: "Rahul & Team",
    initialLikes: 38,
  },
  {
    id: 3,
    title: "Campus Marketplace",
    desc: "Peer-to-peer campus exchange",
    tags: ["Next.js", "Express"],
    author: "Priya S.",
    initialLikes: 29,
  },
];

export default function StudentProjects() {
  const [likes, setLikes] = useState({ 1: 42, 2: 38, 3: 29 });
  const [liked, setLiked] = useState({});

  const toggleLike = (id, e) => {
    e.preventDefault();
    setLiked((prev) => {
      const isCurrentlyLiked = !!prev[id];
      setLikes((currLikes) => ({
        ...currLikes,
        [id]: isCurrentlyLiked ? currLikes[id] - 1 : currLikes[id] + 1,
      }));
      return { ...prev, [id]: !isCurrentlyLiked };
    });
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
              <LayoutGrid className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Student Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#159B72] dark:text-[#20D39B] hover:text-[#087A5B] dark:hover:text-[#4AE3B5] transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Project Items List - Compact 1-line */}
        <div className="mt-2.5 space-y-1.5">
          {INITIAL_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="py-1.5 px-2 rounded-lg bg-[#F7FBF9]/60 dark:bg-[#031A16]/40 border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#D8E8E2] dark:hover:border-[#16463D] transition-all flex items-center justify-between gap-2 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
                    {proj.title}
                  </h3>
                  <span className="text-[9.5px] px-1 py-0.2 rounded bg-[#E8F1ED] dark:bg-[#0A2A24] text-[#36594C] dark:text-[#B5CCC5] shrink-0 font-medium">
                    {proj.tags[0]}
                  </span>
                </div>
                <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
                  {proj.author} &bull; {proj.desc}
                </p>
              </div>

              {/* Like Button */}
              <button
                type="button"
                onClick={(e) => toggleLike(proj.id, e)}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium transition-all shrink-0 ${
                  liked[proj.id]
                    ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40"
                    : "text-[#658278] dark:text-[#789991] hover:text-rose-500"
                }`}
              >
                <Heart
                  className={`w-3 h-3 ${liked[proj.id] ? "fill-rose-500 text-rose-500" : ""}`}
                />
                <span>{likes[proj.id]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
