"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { getSubjectDetails } from "./subjectDetailsData";
import SubjectHero from "./SubjectHero";
import SyllabusBrowser from "./SyllabusBrowser";
import CourseResources from "./CourseResources";
import CourseAssignments from "./CourseAssignments";
import AttendanceCard from "./AttendanceCard";
import InternalMarksCard from "./InternalMarksCard";
import SubjectFacultyCard from "./SubjectFacultyCard";
import ExamInfoCard from "./ExamInfoCard";
import AskFacultyModal from "./AskFacultyModal";
import SubjectNotFound from "./SubjectNotFound";
import SubjectDetailsSkeleton from "./SubjectDetailsSkeleton";

export default function SubjectDetailsAssembler({ code, isLoading = false }) {
  if (isLoading) return <SubjectDetailsSkeleton />;

  const subject = getSubjectDetails(code);

  if (!subject) return <SubjectNotFound code={code} />;

  // ── Local State ─────────────────────────────────────────────────────────
  const [isSaved, setIsSaved] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      showToast(next ? `${subject.name} saved to bookmarks.` : "Removed from saved subjects.");
      return next;
    });
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: subject.fullName, text: `Check out ${subject.fullName} — ${subject.code}`, url: window.location.href })
        .catch(() => {
          navigator.clipboard?.writeText(window.location.href);
          showToast("Subject link copied to clipboard.");
        });
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Subject link copied to clipboard.");
    }
  };

  const handleDownloadBundle = () => {
    showToast(`Downloading complete course bundle for "${subject.name}"...`);
  };

  const handleDownloadResource = (name) => {
    showToast(`Downloading "${name}"...`);
  };

  const handleAskFacultySubmit = ({ subject: subj, message }) => {
    showToast(`Question on "${subj}" sent to ${subject.faculty.name}!`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-20 lg:pb-12 space-y-5">
      {/* ─── 1. Subject Hero (full width above the 2-column grid) ─────────── */}
      <SubjectHero
        subject={subject}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={handleShare}
        onDownloadBundle={handleDownloadBundle}
      />

      {/* ─── 2. Master 2-Column Grid ──────────────────────────────────────── */}
      {/* Main 2/3 col (lg:col-span-8) + Right sticky 1/3 col (lg:col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MAIN COLUMN: Syllabus → Resources → Assignments                  */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-8 space-y-5">
          {/* 2a. Unit-wise Syllabus Browser */}
          <SyllabusBrowser units={subject.units} />

          {/* 2b. Lecture Notes & Course Materials */}
          <CourseResources
            resources={subject.resources}
            onDownload={handleDownloadResource}
          />

          {/* 2c. Course Assignments List */}
          <CourseAssignments
            assignments={subject.assignments}
            subjectName={subject.name}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* STICKY RIGHT SIDEBAR: Attendance → Internal Marks → Faculty → Exam */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* 3a. Subject Attendance Gauge */}
          <AttendanceCard attendance={subject.attendance} />

          {/* 3b. Internal Assessment Marks Breakdown */}
          <InternalMarksCard internalMarks={subject.internalMarks} />

          {/* 3c. Faculty Contact + Office Hours */}
          <SubjectFacultyCard
            faculty={subject.faculty}
            onAskFaculty={() => setIsAskModalOpen(true)}
          />

          {/* 3d. Upcoming Exam Info */}
          <ExamInfoCard exam={subject.exam} />
        </div>
      </div>

      {/* ─── Toast Notification ────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#06241F] text-white dark:bg-[#20D39B] dark:text-[#06241F] text-xs font-semibold shadow-xl border border-white/10 dark:border-black/10 animate-in fade-in slide-in-from-bottom-4 pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#06241F] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── Ask Faculty Modal ─────────────────────────────────────────────── */}
      <AskFacultyModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        facultyName={subject.faculty.name}
        subjectName={subject.name}
        onSubmit={handleAskFacultySubmit}
      />
    </div>
  );
}
