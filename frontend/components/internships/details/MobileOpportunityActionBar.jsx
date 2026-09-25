'use client';

import React from 'react';
import { Bookmark, Share2, ArrowRight, CheckCircle, FileCheck } from 'lucide-react';

export default function MobileOpportunityActionBar({
  opportunity,
  isSaved,
  onToggleSave,
  onShare,
  onApply,
  userApplication,
  onViewApplication
}) {
  const isHackathon = opportunity.type === 'Hackathon' || opportunity.type === 'Competition';
  const isClosed = opportunity.applicationStatus === 'Closed';
  const hasApplied = Boolean(userApplication);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#021512]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#10372F] p-3 shadow-lg">
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        <button
          onClick={onToggleSave}
          aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
          className={`p-3 rounded-xl border text-sm flex items-center justify-center transition-colors ${
            isSaved
              ? 'bg-emerald-50 dark:bg-[#10372F] text-emerald-600 dark:text-[#20D39B] border-emerald-300 dark:border-[#159B72]'
              : 'border-gray-200 dark:border-[#10372F] text-gray-600 dark:text-[#A7C7BC]'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={onShare}
          aria-label="Share opportunity"
          className="p-3 rounded-xl border border-gray-200 dark:border-[#10372F] text-gray-600 dark:text-[#A7C7BC] flex items-center justify-center transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {hasApplied ? (
          <button
            onClick={onViewApplication}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            <span>View Application</span>
          </button>
        ) : isClosed ? (
          <button
            disabled
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gray-200 dark:bg-[#10372F]/50 text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <span>Applications Closed</span>
          </button>
        ) : (
          <button
            onClick={onApply}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <span>{isHackathon ? 'Register' : 'Apply Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
