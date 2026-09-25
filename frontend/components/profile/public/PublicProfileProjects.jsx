'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderGit2,
  Star,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function PublicProfileProjects({ projects = [] }) {
  if (!projects || projects.length === 0) {
    return (
      <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
              Projects &amp; Portfolio
            </h2>
            <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
              Student technical projects and collaborative repositories
            </p>
          </div>
        </div>
        <div className="py-8 text-center text-xs text-gray-500 dark:text-[#A7C7BC]">
          No public projects published yet.
        </div>
      </section>
    );
  }

  const featured = projects.find((p) => p.isFeatured) || projects[0];
  const regularProjects = projects.filter((p) => p.id !== featured.id);

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B]">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
              Projects &amp; Portfolio
            </h2>
            <p className="text-xs text-gray-500 dark:text-[#A7C7BC]">
              Featured builds, campus tools, and collaborative team projects
            </p>
          </div>
        </div>

        <Link
          href="/student/projects"
          className="text-xs font-semibold text-emerald-600 dark:text-[#20D39B] hover:underline flex items-center gap-1"
        >
          Explore Projects
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Featured Project Showcase */}
      {featured && (
        <div className="rounded-2xl border-2 border-emerald-500/30 dark:border-[#159B72]/40 bg-gradient-to-br from-emerald-50/40 via-white to-gray-50 dark:from-[#06241F] dark:via-[#082A24] dark:to-[#021512] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-[#10372F] dark:text-[#20D39B] border border-emerald-300/60 dark:border-[#159B72]/40">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Project
            </span>

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#A7C7BC]">
              {featured.likes > 0 && (
                <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {featured.likes}
                </span>
              )}
              {featured.status && (
                <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-[#20D39B]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {featured.status}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-[#F1FAF6]">
              <Link
                href={`/student/projects/${featured.id}`}
                className="hover:text-emerald-600 dark:hover:text-[#20D39B] hover:underline transition-colors"
              >
                {featured.title}
              </Link>
            </h3>
            {featured.tagline && (
              <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-[#20D39B] mt-1">
                {featured.tagline}
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#A7C7BC] mt-2 leading-relaxed">
              {featured.description}
            </p>
          </div>

          {/* Tags */}
          {featured.tags && featured.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {featured.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-[#021512] text-gray-700 dark:text-[#D8E8E2] border border-gray-200 dark:border-[#10372F]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Contributors & Action Links */}
          <div className="pt-3 border-t border-gray-200/60 dark:border-[#10372F]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Contributors Avatars */}
            {featured.contributors && featured.contributors.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-[#A7C7BC] font-medium">
                  Team:
                </span>
                <div className="flex items-center -space-x-2">
                  {featured.contributors.map((member) => (
                    <Link
                      key={member.id}
                      href={`/student/profile/${member.id}`}
                      title={`${member.name} (${member.role || 'Member'})`}
                      className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-[#06241F] hover:scale-110 hover:z-10 transition-transform shadow-xs"
                    >
                      <Image
                        src={member.avatar || '/assets/layout/profile-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              {featured.githubUrl && (
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-600 dark:text-[#A7C7BC] hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  Code
                </a>
              )}
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-600 dark:text-[#20D39B] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Preview
                </a>
              )}
              <Link
                href={`/student/projects/${featured.id}`}
                className="py-1.5 px-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs flex items-center gap-1"
              >
                <span>View Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Other Projects Grid */}
      {regularProjects.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-[#A7C7BC]">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regularProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col justify-between p-4.5 rounded-xl border border-gray-200 dark:border-[#10372F] bg-gray-50/50 dark:bg-[#021512]/50 hover:bg-white dark:hover:bg-[#06241F] hover:border-emerald-400 dark:hover:border-[#159B72] transition-all shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-[#F1FAF6] line-clamp-1">
                      <Link
                        href={`/student/projects/${project.id}`}
                        className="hover:text-emerald-600 dark:hover:text-[#20D39B] hover:underline transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h4>
                    {project.likes > 0 && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        {project.likes}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-[#A7C7BC] line-clamp-2 leading-relaxed">
                    {project.tagline || project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-[#06241F] text-gray-600 dark:text-[#A7C7BC] border border-gray-200 dark:border-[#10372F]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200/60 dark:border-[#10372F]/60 flex items-center justify-between text-xs">
                  {/* Contributors */}
                  {project.contributors && project.contributors.length > 0 ? (
                    <div className="flex items-center -space-x-1.5">
                      {project.contributors.map((m) => (
                        <Link
                          key={m.id}
                          href={`/student/profile/${m.id}`}
                          title={m.name}
                          className="relative w-6 h-6 rounded-full overflow-hidden border border-white dark:border-[#06241F] hover:scale-110 hover:z-10 transition-transform"
                        >
                          <Image
                            src={m.avatar || '/assets/layout/profile-avatar.jpg'}
                            alt={m.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400">Solo Project</span>
                  )}

                  <Link
                    href={`/student/projects/${project.id}`}
                    className="font-semibold text-emerald-600 dark:text-[#20D39B] hover:underline flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
