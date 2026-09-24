"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  ArrowRight,
  Heart,
  Star,
  ExternalLink,
} from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProfileProjectsCard({ projects = [], onProjectClick }) {
  const [likes, setLikes] = useState(() =>
    projects.reduce((acc, p) => ({ ...acc, [p.id]: p.likes || 0 }), {})
  );
  const [liked, setLiked] = useState({});

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => {
      const isCurrentlyLiked = !!prev[id];
      setLikes((curr) => ({
        ...curr,
        [id]: isCurrentlyLiked ? curr[id] - 1 : curr[id] + 1,
      }));
      return { ...prev, [id]: !isCurrentlyLiked };
    });
  };

  const handleCardClick = (project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <LayoutGrid className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Featured Projects
          </h2>
        </div>

        <Link
          href="/student/projects"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#159B72] dark:text-[#20D39B] hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Projects Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleCardClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(project);
              }
            }}
            className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 hover:shadow-2xs transition-all flex flex-col justify-between group cursor-pointer text-left"
          >
            <div>
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] shrink-0"
                    title="View GitHub repository"
                  >
                    <GithubIcon />
                  </a>
                )}
              </div>

              <p className="text-[10.5px] text-[#658278] dark:text-[#789991] line-clamp-2 leading-snug mb-2.5">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-[#ECF9F4] dark:bg-[#0C352C] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Stats & Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E8F1ED] dark:border-[#10372F] text-[10.5px]">
              <div className="flex items-center gap-2.5 text-[#658278] dark:text-[#789991]">
                <span className="inline-flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{project.stars}</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleLike(project.id, e)}
                  className={`inline-flex items-center gap-0.5 hover:text-rose-500 transition-colors ${
                    liked[project.id] ? "text-rose-500 font-semibold" : ""
                  }`}
                >
                  <Heart
                    className={`w-3 h-3 ${
                      liked[project.id] ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>{likes[project.id]}</span>
                </button>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[#159B72] dark:text-[#20D39B] hover:underline font-medium"
                >
                  <span>Live</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
