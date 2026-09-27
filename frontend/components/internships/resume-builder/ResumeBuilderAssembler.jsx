"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Eye, Printer, Save, Sparkles } from "lucide-react";

import ResumeBuilderHeader from "./ResumeBuilderHeader";
import ResumeIdentityCard from "./ResumeIdentityCard";
import JobDescriptionAnalyzer from "./JobDescriptionAnalyzer";
import SmartAssistantPanel from "./SmartAssistantPanel";
import SectionManager from "./SectionManager";
import HeaderSectionEditor from "./HeaderSectionEditor";
import SummarySectionEditor from "./SummarySectionEditor";
import SkillsSectionEditor from "./SkillsSectionEditor";
import ProjectsSectionEditor from "./ProjectsSectionEditor";
import ExperienceSectionEditor from "./ExperienceSectionEditor";
import EducationSectionEditor from "./EducationSectionEditor";
import AchievementsAndMoreEditor from "./AchievementsAndMoreEditor";
import ResumeQualityCard from "./ResumeQualityCard";
import LiveResumePreview from "./LiveResumePreview";
import DeleteVersionModal from "./DeleteVersionModal";
import MobilePreviewModal from "./MobilePreviewModal";

import {
  getDefaultResumeFromProfile,
  getStoredResumeVersions,
  saveAllResumeVersions,
  createNewResumeVersion,
  duplicateResumeVersion,
  deleteResumeVersion,
  detectProfileDifferences,
  syncResumeWithProfileData,
  analyzeJobKeywords,
} from "./resumeBuilderData";
import { DEFAULT_EDIT_PROFILE_DATA, loadProfileEditState } from "@/components/profile/edit/editProfileData";

export default function ResumeBuilderAssembler() {
  const initialProfile = DEFAULT_EDIT_PROFILE_DATA;
  const initialResume = getDefaultResumeFromProfile(initialProfile);

  const [profile, setProfile] = useState(initialProfile);
  const [allVersions, setAllVersions] = useState([initialResume]);
  const [activeVersionId, setActiveVersionId] = useState(initialResume.id);
  const [resume, setResume] = useState(initialResume);
  const [saveStatus, setSaveStatus] = useState("saved"); // 'saved' | 'saving' | 'unsaved'
  const [activeSectionId, setActiveSectionId] = useState("header");
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Initialize on mount from profile data & local storage
  useEffect(() => {
    const studentProfile = loadProfileEditState();
    setProfile(studentProfile);

    const versions = getStoredResumeVersions(studentProfile);
    setAllVersions(versions);
    if (versions.length > 0) {
      setActiveVersionId(versions[0].id);
      setResume(versions[0]);
    }
  }, []);

  // Check for profile differences
  const profileDiff = useMemo(() => {
    if (!resume || !profile) return { hasDifferences: false };
    return detectProfileDifferences(resume, profile);
  }, [resume, profile]);

  // Keyword analysis for active resume
  const keywordAnalysis = useMemo(() => {
    if (!resume) return { hasTarget: false, matched: [], missing: [], coverage: 0 };
    return analyzeJobKeywords(resume.jobDescriptionText, resume);
  }, [resume]);

  // Handle local edits to active resume
  const handleUpdateResume = (updated) => {
    setResume(updated);
    setSaveStatus("unsaved");
  };

  // Switch active version
  const handleSelectVersion = (versionId) => {
    // Auto-save current if unsaved
    if (saveStatus === "unsaved" && resume) {
      handleSave();
    }
    const target = allVersions.find((v) => v.id === versionId);
    if (target) {
      setActiveVersionId(target.id);
      setResume(target);
      setSaveStatus("saved");
      showToast(`Switched to "${target.name}".`);
    }
  };

  // Create new version
  const handleCreateVersion = () => {
    if (!profile) return;
    const newVersion = createNewResumeVersion(
      `Resume for ${resume?.targetRole || "Software Role"} (${allVersions.length + 1})`,
      resume?.targetRole || "Full Stack Developer",
      profile
    );
    const updated = [...allVersions, newVersion];
    setAllVersions(updated);
    setActiveVersionId(newVersion.id);
    setResume(newVersion);
    setSaveStatus("saved");
    showToast(`Created new version: "${newVersion.name}".`);
  };

  // Duplicate current version
  const handleDuplicateVersion = () => {
    if (!resume || !profile) return;
    const duplicated = duplicateResumeVersion(resume.id, profile);
    if (duplicated) {
      const updated = [...allVersions, duplicated];
      setAllVersions(updated);
      setActiveVersionId(duplicated.id);
      setResume(duplicated);
      setSaveStatus("saved");
      showToast(`Duplicated version: "${duplicated.name}".`);
    }
  };

  // Delete version confirm
  const handleDeleteVersionConfirm = () => {
    if (!resume || !profile) return;
    const res = deleteResumeVersion(resume.id, profile);
    if (!res.success) {
      showToast(res.message);
      return;
    }
    setAllVersions(res.remaining);
    setActiveVersionId(res.remaining[0].id);
    setResume(res.remaining[0]);
    setSaveStatus("saved");
    showToast("Resume version deleted.");
  };

  // Save active resume
  const handleSave = () => {
    if (!resume) return;
    setSaveStatus("saving");

    setTimeout(() => {
      const updatedVersions = allVersions.map((v) =>
        v.id === resume.id ? { ...resume, updatedAt: new Date().toISOString() } : v
      );
      setAllVersions(updatedVersions);
      saveAllResumeVersions(updatedVersions);
      setSaveStatus("saved");
      showToast("Resume version saved successfully.");
    }, 400);
  };

  // Sync profile data
  const handleSyncProfile = () => {
    if (!resume || !profile) return;
    const merged = syncResumeWithProfileData(resume, profile);
    setResume(merged);
    setSaveStatus("unsaved");
    showToast(`Synced ${profileDiff.count} new items from profile without overwriting custom edits.`);
  };

  // Print / Save as PDF
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Use for application
  const handleUseForApplication = () => {
    showToast(`"${resume.name}" selected for upcoming internship application!`);
  };

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-[#F1FAF6] dark:bg-[#021512] text-emerald-950 dark:text-emerald-50 transition-colors py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-900 text-white dark:bg-emerald-800 rounded-2xl shadow-2xl border border-emerald-700/50 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Embedded Print Stylesheet */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav,
          header,
          footer,
          aside,
          .print\\:hidden {
            display: none !important;
          }
          #college-os-resume-document {
            transform: none !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ResumeBuilderHeader
          resume={resume}
          allVersions={allVersions}
          activeVersionId={activeVersionId}
          onSelectVersion={handleSelectVersion}
          onCreateVersion={handleCreateVersion}
          onDuplicateVersion={handleDuplicateVersion}
          onDeleteVersionClick={() => setIsDeleteModalOpen(true)}
          onSave={handleSave}
          saveStatus={saveStatus}
          profileDiff={profileDiff}
          onSyncProfile={handleSyncProfile}
          onPrint={handlePrint}
          onUseForApplication={handleUseForApplication}
        />

        {/* Workspace Grid: Left Editor (2/3) + Right Preview (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Editor (7/12 on lg, 8/12 on xl) */}
          <main className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Identity & Template Card */}
            <ResumeIdentityCard
              resume={resume}
              onChangeResume={handleUpdateResume}
            />

            {/* Job Description Analyzer (Keyword Match) */}
            <JobDescriptionAnalyzer
              resume={resume}
              onChangeResume={handleUpdateResume}
            />

            {/* Smart Assistant Suggestions Panel */}
            <SmartAssistantPanel
              resume={resume}
              onChangeResume={handleUpdateResume}
              profile={profile}
            />

            {/* Section Manager (Reorder & Visibility) */}
            <SectionManager
              resume={resume}
              onChangeResume={handleUpdateResume}
              activeSectionId={activeSectionId}
              onSelectSection={setActiveSectionId}
            />

            {/* Section Editors */}
            <div className="space-y-6">
              <HeaderSectionEditor
                resume={resume}
                onChangeResume={handleUpdateResume}
              />

              {resume.visibleSections?.summary !== false && (
                <SummarySectionEditor
                  resume={resume}
                  onChangeResume={handleUpdateResume}
                  profile={profile}
                />
              )}

              {resume.visibleSections?.skills !== false && (
                <SkillsSectionEditor
                  resume={resume}
                  onChangeResume={handleUpdateResume}
                  matchedKeywords={keywordAnalysis.matched}
                />
              )}

              {resume.visibleSections?.experience !== false && (
                <ExperienceSectionEditor
                  resume={resume}
                  onChangeResume={handleUpdateResume}
                />
              )}

              {resume.visibleSections?.projects !== false && (
                <ProjectsSectionEditor
                  resume={resume}
                  onChangeResume={handleUpdateResume}
                />
              )}

              {resume.visibleSections?.education !== false && (
                <EducationSectionEditor
                  resume={resume}
                  onChangeResume={handleUpdateResume}
                />
              )}

              <AchievementsAndMoreEditor
                resume={resume}
                onChangeResume={handleUpdateResume}
              />
            </div>
          </main>

          {/* Right Rail: Quality Card + Live A4 Document Preview (5/12 on lg, 4/12 on xl) */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 space-y-6">
            {/* Quality & Readiness Card */}
            <ResumeQualityCard
              resume={resume}
              keywordAnalysis={keywordAnalysis}
            />

            {/* Live Document Preview */}
            <div className="hidden sm:block">
              <LiveResumePreview
                resume={resume}
                onPrint={handlePrint}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Floating Preview Button */}
      <div className="sm:hidden fixed bottom-6 left-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsMobilePreviewOpen(true)}
          className="flex-1 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Preview Resume Document</span>
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-3 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] font-bold text-xs shadow-xl cursor-pointer"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      {/* Modals */}
      <DeleteVersionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteVersionConfirm}
        versionName={resume.name}
      />

      <MobilePreviewModal
        isOpen={isMobilePreviewOpen}
        onClose={() => setIsMobilePreviewOpen(false)}
        resume={resume}
        onPrint={handlePrint}
      />
    </div>
  );
}
