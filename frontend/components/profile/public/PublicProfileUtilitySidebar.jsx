'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserPlus,
  UserCheck,
  MessageSquare,
  Share2,
  Building2,
  GraduationCap,
  Calendar,
  Layers,
  ExternalLink,
  Globe,
  FolderGit2,
  Award,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function PublicProfileUtilitySidebar({
  profile,
  isConnected,
  isConnecting,
  onConnect,
  onMessage,
  onShare,
  onOpenFollowers,
  relatedStudents = [],
}) {
  return (
    <aside className="w-full space-y-6">
      {/* A. Primary Actions Card */}
      <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-5 shadow-sm space-y-3">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-[#A7C7BC] mb-2">
          Student Actions
        </h3>

        <button
          onClick={onConnect}
          disabled={isConnecting}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
            isConnected
              ? 'bg-emerald-50 dark:bg-[#10372F] text-emerald-700 dark:text-[#20D39B] border border-emerald-300 dark:border-[#159B72]'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
          }`}
        >
          {isConnected ? (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Connected with {profile.name?.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting...' : `Connect with ${profile.name?.split(' ')[0]}`}</span>
            </>
          )}
        </button>

        <button
          onClick={onMessage}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm border border-gray-200 dark:border-[#10372F] text-gray-700 dark:text-[#F1FAF6] hover:bg-gray-50 dark:hover:bg-[#10372F]/50 flex items-center justify-center gap-2 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          <span>Send Direct Message</span>
        </button>

        <button
          onClick={onShare}
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-[#A7C7BC] dark:hover:text-white flex items-center justify-center gap-1.5 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Profile Link</span>
        </button>
      </div>

      {/* B. Student Facts */}
      <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-5 shadow-sm space-y-4">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-[#A7C7BC]">
          Campus Facts
        </h3>
        <dl className="space-y-3 text-xs divide-y divide-gray-100 dark:divide-[#10372F]/50">
          <div className="flex items-center justify-between pt-1">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              Branch
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
              {profile.branch || 'CSE'}
            </dd>
          </div>

          <div className="flex items-center justify-between pt-3">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              Semester
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
              {profile.semester}
            </dd>
          </div>

          <div className="flex items-center justify-between pt-3">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              Graduation Batch
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
              {profile.batch}
            </dd>
          </div>

          <div className="flex items-center justify-between pt-3">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-500" />
              Institution
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2] text-right truncate max-w-[150px]">
              {profile.college || 'XYZ Engineering'}
            </dd>
          </div>
        </dl>
      </div>

      {/* C. Social & Portfolio Links */}
      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-5 shadow-sm space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-[#A7C7BC]">
            Portfolio &amp; Social
          </h3>

          <div className="space-y-2">
            {profile.socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl border border-gray-100 dark:border-[#10372F]/60 hover:border-emerald-400 dark:hover:border-[#159B72] hover:bg-emerald-50/30 dark:hover:bg-[#10372F]/30 transition-all text-xs text-gray-700 dark:text-[#D8E8E2]"
              >
                <div className="flex items-center gap-2.5 truncate">
                  {link.type === 'github' && <GithubIcon className="w-4 h-4 text-gray-700 dark:text-[#D8E8E2] shrink-0" />}
                  {link.type === 'linkedin' && <LinkedinIcon className="w-4 h-4 text-[#0077b5] shrink-0" />}
                  {link.type === 'portfolio' && <Globe className="w-4 h-4 text-emerald-500 shrink-0" />}
                  <span className="font-medium truncate">{link.platform}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* D. Related Students Card */}
      {relatedStudents && relatedStudents.length > 0 && (
        <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-[#A7C7BC]">
              Related Peers
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-[#20D39B] font-semibold">
              Same Department
            </span>
          </div>

          <div className="space-y-3">
            {relatedStudents.map((student) => (
              <Link
                key={student.id}
                href={`/student/profile/${student.id}`}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-gray-100 dark:border-[#10372F]/50 hover:border-emerald-400 dark:hover:border-[#159B72] hover:bg-gray-50/70 dark:hover:bg-[#021512]/60 transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-[#10372F] shrink-0">
                    <Image
                      src={student.avatar || '/assets/layout/profile-avatar.jpg'}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F1FAF6] group-hover:text-emerald-600 dark:group-hover:text-[#20D39B] transition-colors truncate">
                      {student.name}
                    </h4>
                    <p className="text-[10.5px] text-gray-500 dark:text-[#A7C7BC] truncate">
                      {student.branch}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
