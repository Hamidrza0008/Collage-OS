'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

import OpportunityHero from './OpportunityHero';
import OpportunityOverview from './OpportunityOverview';
import OpportunityResponsibilities from './OpportunityResponsibilities';
import OpportunityEligibility from './OpportunityEligibility';
import OpportunitySkillsMatch from './OpportunitySkillsMatch';
import OpportunityCompensationCard from './OpportunityCompensationCard';
import OpportunitySelectionPipeline from './OpportunitySelectionPipeline';
import OpportunityDocuments from './OpportunityDocuments';
import OpportunityUtilitySidebar from './OpportunityUtilitySidebar';
import RelatedOpportunities from './RelatedOpportunities';
import MobileOpportunityActionBar from './MobileOpportunityActionBar';
import ApplyModal from './ApplyModal';
import HackathonRegisterModal from './HackathonRegisterModal';
import ApplicationSuccessModal from './ApplicationSuccessModal';
import OpportunityDocViewerModal from './OpportunityDocViewerModal';
import ReportOpportunityModal from './ReportOpportunityModal';

export default function OpportunityDetailsAssembler({ opportunity, related = [] }) {
  const [isSaved, setIsSaved] = useState(false);
  const [userApplication, setUserApplication] = useState(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const isHackathon = opportunity?.type === 'Hackathon' || opportunity?.type === 'Competition';

  // Load saved and application status from localStorage
  useEffect(() => {
    if (!opportunity?.id) return;
    try {
      // Saved state
      const savedKey = `collegeos_saved_opp_${opportunity.id}`;
      const savedVal = localStorage.getItem(savedKey);
      if (savedVal === 'true') {
        setIsSaved(true);
      }

      // Existing application state
      const appKey = `collegeos_app_${opportunity.id}`;
      const appVal = localStorage.getItem(appKey);
      if (appVal) {
        setUserApplication(JSON.parse(appVal));
      } else if (opportunity.applicationStatus === 'Applied') {
        // Fallback simulated initial application
        setUserApplication({
          id: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'Applied',
          submittedAt: 'Recently'
        });
      }
    } catch {
      // LocalStorage access fallback
    }
  }, [opportunity?.id, opportunity?.applicationStatus]);

  // Toast handler
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Save
  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    try {
      localStorage.setItem(`collegeos_saved_opp_${opportunity.id}`, String(nextSaved));
    } catch {
      // LocalStorage fallback
    }
    showToast(nextSaved ? 'Saved to your Opportunities' : 'Removed from saved opportunities');
  };

  // Share action
  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: `${opportunity.title} at ${opportunity.company}`,
      text: `Check out this ${opportunity.type} opportunity: ${opportunity.title} on College OS`,
      url: shareUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Link copied to clipboard!');
      } catch {
        showToast('Unable to copy link.');
      }
    } else {
      showToast('Link copied!');
    }
  };

  // Open appropriate apply modal
  const handleOpenApply = () => {
    if (isHackathon) {
      setIsRegisterOpen(true);
    } else {
      setIsApplyOpen(true);
    }
  };

  // Submission handler (internship/job)
  const handleApplySubmit = (appData) => {
    const record = {
      ...appData,
      status: 'Applied',
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setUserApplication(record);
    try {
      localStorage.setItem(`collegeos_app_${opportunity.id}`, JSON.stringify(record));
    } catch {
      // Ignore storage error
    }
    setIsApplyOpen(false);
    setIsSuccessOpen(true);
  };

  // Submission handler (hackathon)
  const handleRegisterSubmit = (regData) => {
    const record = {
      ...regData,
      status: 'Registered',
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setUserApplication(record);
    try {
      localStorage.setItem(`collegeos_app_${opportunity.id}`, JSON.stringify(record));
    } catch {
      // Ignore storage error
    }
    setIsRegisterOpen(false);
    setIsSuccessOpen(true);
  };

  // Document preview handler
  const handlePreviewDoc = (doc) => {
    setActiveDoc(doc);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#021512] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-6">
        {/* Compact Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/student/internships"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 dark:text-[#A7C7BC] dark:hover:text-[#20D39B] transition-colors py-1 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Opportunities</span>
          </Link>

          <span className="text-xs font-mono text-gray-400 dark:text-[#10372F] hidden sm:inline">
            ID: {opportunity.id}
          </span>
        </div>

        {/* Master Desktop Grid: 2/3 Main Content + 1/3 Right Sticky Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Column (2/3) */}
          <main className="lg:col-span-2 space-y-6">
            {/* 1. Opportunity Hero */}
            <OpportunityHero
              opportunity={opportunity}
              isSaved={isSaved}
              onToggleSave={handleToggleSave}
              onShare={handleShare}
              onReport={() => setIsReportOpen(true)}
            />

            {/* 2. Overview */}
            <OpportunityOverview opportunity={opportunity} />

            {/* 3. Responsibilities or Hackathon Challenges */}
            <OpportunityResponsibilities opportunity={opportunity} />

            {/* 4. Eligibility & Requirements */}
            <OpportunityEligibility opportunity={opportunity} />

            {/* 5. Personalized Skills Match */}
            <OpportunitySkillsMatch opportunity={opportunity} />

            {/* 6. Compensation / Stipend / Prize & Benefits */}
            <OpportunityCompensationCard opportunity={opportunity} />

            {/* 7. Selection Pipeline / Hackathon Timeline */}
            <OpportunitySelectionPipeline opportunity={opportunity} />

            {/* 8. Official Documents & Attachments */}
            <OpportunityDocuments
              opportunity={opportunity}
              onPreview={handlePreviewDoc}
            />
          </main>

          {/* Right Sidebar Rail (1/3) - Sticky on Desktop */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-6">
            <OpportunityUtilitySidebar
              opportunity={opportunity}
              isSaved={isSaved}
              onToggleSave={handleToggleSave}
              onShare={handleShare}
              onReport={() => setIsReportOpen(true)}
              onApply={handleOpenApply}
              userApplication={userApplication}
              onViewApplication={() => setIsSuccessOpen(true)}
            />
          </div>
        </div>

        {/* Related Opportunities Section */}
        {related && related.length > 0 && (
          <div className="pt-4">
            <RelatedOpportunities related={related} currentType={opportunity.type} />
          </div>
        )}
      </div>

      {/* Sticky Mobile Action Bar */}
      <MobileOpportunityActionBar
        opportunity={opportunity}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={handleShare}
        onApply={handleOpenApply}
        userApplication={userApplication}
        onViewApplication={() => setIsSuccessOpen(true)}
      />

      {/* Modals */}
      {/* 1. Internship / Job Application Modal */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        opportunity={opportunity}
        onSubmit={handleApplySubmit}
      />

      {/* 2. Hackathon / Competition Registration Modal */}
      <HackathonRegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        opportunity={opportunity}
        onSubmit={handleRegisterSubmit}
      />

      {/* 3. Submission Confirmation / View Application Modal */}
      <ApplicationSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        opportunity={opportunity}
        applicationData={userApplication}
      />

      {/* 4. Document Viewer Modal */}
      <OpportunityDocViewerModal
        isOpen={Boolean(activeDoc)}
        onClose={() => setActiveDoc(null)}
        document={activeDoc}
      />

      {/* 5. Report Opportunity Modal */}
      <ReportOpportunityModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        opportunityTitle={opportunity.title}
        companyName={opportunity.company}
      />

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white dark:bg-[#06241F] dark:text-[#D8E8E2] border border-gray-700 dark:border-[#10372F] shadow-xl text-xs font-semibold">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
