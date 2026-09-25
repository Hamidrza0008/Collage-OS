'use client';

import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  DollarSign,
  Award,
  Users,
  CheckCircle,
  ExternalLink,
  Bookmark,
  Share2,
  Flag,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export default function OpportunityUtilitySidebar({
  opportunity,
  isSaved,
  onToggleSave,
  onShare,
  onReport,
  onApply,
  userApplication,
  onViewApplication
}) {
  const isHackathon = opportunity.type === 'Hackathon' || opportunity.type === 'Competition';
  const isClosed = opportunity.applicationStatus === 'Closed';
  const hasApplied = Boolean(userApplication);

  // Status computation
  const statusLabel = hasApplied
    ? userApplication.status || 'Applied'
    : opportunity.applicationStatus || 'Application Open';

  return (
    <aside className="w-full space-y-6">
      {/* A. Apply / Register Primary Card */}
      <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 shadow-sm">
        {/* Deadline & Openings header */}
        <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-100 dark:border-[#10372F]/60">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-[#A7C7BC]">
              Deadline
            </span>
            <p className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2] flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              {opportunity.deadline}
            </p>
          </div>
          {opportunity.openings && (
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-[#A7C7BC]">
                Positions
              </span>
              <p className="text-sm font-bold text-emerald-600 dark:text-[#20D39B] flex items-center justify-end gap-1.5 mt-0.5">
                <Users className="w-4 h-4 shrink-0" />
                {opportunity.openings}
              </p>
            </div>
          )}
        </div>

        {/* Primary CTA */}
        {hasApplied ? (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-[#10372F]/50 border border-emerald-200 dark:border-[#159B72]/40 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#20D39B] uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" /> Application Submitted
              </span>
              <p className="text-xs text-gray-600 dark:text-[#A7C7BC] mt-1 font-mono">
                ID: {userApplication.id || 'APP-2026-904'}
              </p>
            </div>

            <button
              onClick={onViewApplication}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
            >
              <FileCheck className="w-4 h-4" />
              View Application Details
            </button>
          </div>
        ) : isClosed ? (
          <button
            disabled
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm cursor-not-allowed bg-gray-100 dark:bg-[#10372F]/40 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-[#10372F] flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Applications Closed
          </button>
        ) : (
          <button
            onClick={onApply}
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 active:scale-[0.99]"
          >
            <span>{isHackathon ? 'Register for Hackathon' : 'Apply Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Quick assurance info */}
        <p className="text-center text-xs text-gray-500 dark:text-[#A7C7BC] mt-4 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          Verified College OS Career Partner
        </p>
      </div>

      {/* B. Opportunity Quick Facts */}
      <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2] uppercase tracking-wider mb-4">
          Opportunity Facts
        </h3>
        <dl className="space-y-3.5 text-sm divide-y divide-gray-100 dark:divide-[#10372F]/50">
          <div className="flex items-center justify-between pt-1">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Role Type
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
              {opportunity.type}
            </dd>
          </div>

          <div className="flex items-center justify-between pt-3.5">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Duration
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
              {opportunity.duration}
            </dd>
          </div>

          <div className="flex items-center justify-between pt-3.5">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              Work Mode
            </dt>
            <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
              {opportunity.workMode || 'Remote'}
            </dd>
          </div>

          <div className="flex items-center justify-between pt-3.5">
            <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              {isHackathon ? 'Prize Pool' : 'Compensation'}
            </dt>
            <dd className="font-semibold text-emerald-600 dark:text-[#20D39B]">
              {opportunity.stipend || opportunity.salary || opportunity.prizePool || 'Competitive'}
            </dd>
          </div>

          {opportunity.startDate && (
            <div className="flex items-center justify-between pt-3.5">
              <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Start Date
              </dt>
              <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
                {opportunity.startDate}
              </dd>
            </div>
          )}

          {opportunity.eligibility?.gradYear && (
            <div className="flex items-center justify-between pt-3.5">
              <dt className="text-gray-500 dark:text-[#A7C7BC] flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" />
                Batch
              </dt>
              <dd className="font-semibold text-gray-900 dark:text-[#D8E8E2]">
                {opportunity.eligibility.gradYear}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* C. Application Status Card (if applied) */}
      {hasApplied && (
        <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-emerald-200 dark:border-[#159B72]/40 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2] uppercase tracking-wider mb-3">
            Application Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-[#A7C7BC]">Status</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#10372F] dark:text-[#20D39B]">
                {userApplication.status || 'Under Review'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-[#A7C7BC]">Submitted On</span>
              <span className="text-xs font-semibold text-gray-900 dark:text-[#D8E8E2]">
                {userApplication.submittedAt || 'Today'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-[#A7C7BC]">Next Stage</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-[#20D39B]">
                {opportunity.selectionProcess?.[1]?.title || 'Screening'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* D. Company / Organizer Card */}
      <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 dark:text-[#D8E8E2] uppercase tracking-wider mb-4">
          {isHackathon ? 'Organized By' : 'About Employer'}
        </h3>
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#10372F] flex items-center justify-center font-bold text-base text-emerald-600 dark:text-[#20D39B] border border-gray-200 dark:border-[#10372F] shrink-0">
            {opportunity.companyLogo ? (
              <img
                src={opportunity.companyLogo}
                alt={opportunity.company}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              opportunity.company?.[0] || 'C'
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-gray-900 dark:text-[#D8E8E2] flex items-center gap-1.5 truncate">
              {opportunity.company}
              {opportunity.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Organization" />
              )}
            </h4>
            <p className="text-xs text-gray-500 dark:text-[#A7C7BC] mt-0.5 truncate">
              {opportunity.industry || (isHackathon ? 'College Hackathon' : 'Technology & Product')}
            </p>
          </div>
        </div>

        {opportunity.companyDescription && (
          <p className="text-xs text-gray-600 dark:text-[#A7C7BC] leading-relaxed mb-4 line-clamp-3">
            {opportunity.companyDescription}
          </p>
        )}

        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-[#10372F]/60">
          {opportunity.website && (
            <a
              href={opportunity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-[#20D39B] hover:underline p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-[#10372F]/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                Visit Official Website
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {opportunity.linkedin && (
            <a
              href={opportunity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-medium text-gray-600 dark:text-[#A7C7BC] hover:text-gray-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#10372F]/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                LinkedIn Profile
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* E. Quick Actions */}
      <div className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-4 shadow-sm flex items-center justify-between gap-2">
        <button
          onClick={onToggleSave}
          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
            isSaved
              ? 'bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B] border-emerald-300 dark:border-[#159B72]'
              : 'border-gray-200 dark:border-[#10372F] text-gray-600 dark:text-[#A7C7BC] hover:bg-gray-50 dark:hover:bg-[#10372F]/50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save'}
        </button>

        <button
          onClick={onShare}
          className="flex-1 py-2 px-3 rounded-xl border border-gray-200 dark:border-[#10372F] text-xs font-semibold text-gray-600 dark:text-[#A7C7BC] hover:bg-gray-50 dark:hover:bg-[#10372F]/50 flex items-center justify-center gap-1.5 transition-all duration-200"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>

        <button
          onClick={onReport}
          className="py-2 px-3 rounded-xl border border-gray-200 dark:border-[#10372F] text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-center gap-1.5 transition-all duration-200"
          title="Report this opportunity"
        >
          <Flag className="w-3.5 h-3.5" />
          <span className="sr-only">Report</span>
        </button>
      </div>
    </aside>
  );
}
