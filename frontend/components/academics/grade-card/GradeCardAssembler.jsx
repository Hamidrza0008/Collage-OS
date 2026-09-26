"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, ArrowLeft, CheckCircle2, X } from "lucide-react";
import GradeCardHeader from "./GradeCardHeader";
import SemesterSelector from "./SemesterSelector";
import CurrentSemesterHero from "./CurrentSemesterHero";
import GradeTable from "./GradeTable";
import SubjectMarksModal from "./SubjectMarksModal";
import SemesterPerformanceChart from "./SemesterPerformanceChart";
import CreditSummaryCard from "./CreditSummaryCard";
import GradeScaleLegend from "./GradeScaleLegend";
import TranscriptPreviewSection from "./TranscriptPreviewSection";
import FullTranscriptModal from "./FullTranscriptModal";
import GradeCardRightSidebar from "./GradeCardRightSidebar";
import PrintableGradeCard from "./PrintableGradeCard";
import GradeCardSkeleton from "./GradeCardSkeleton";
import {
  STUDENT_PROFILE,
  SEMESTER_DATA,
  getSemesterGradeCard,
  calculateSemesterMetrics,
  getFullTranscript,
} from "./gradeCardData";

export default function GradeCardAssembler({ initialLoading = false }) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [hasError, setHasError] = useState(false);

  // Selected semester number (default 7 - current semester)
  const [selectedSemesterNumber, setSelectedSemesterNumber] = useState(7);

  // Modal states
  const [selectedSubjectForModal, setSelectedSubjectForModal] = useState(null);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState(null);

  // Active semester data resolution
  const activeSemester = useMemo(() => {
    return getSemesterGradeCard(selectedSemesterNumber);
  }, [selectedSemesterNumber]);

  // Dynamic calculated metrics for active semester
  const activeMetrics = useMemo(() => {
    return calculateSemesterMetrics(activeSemester);
  }, [activeSemester]);

  // Full transcript compilation
  const transcriptRecord = useMemo(() => {
    return getFullTranscript();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleDownloadGradeCard = () => {
    triggerToast(`Preparing official grade card for ${activeSemester.label}...`);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 600);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDownloadTranscript = () => {
    triggerToast("Generating multi-semester transcript PDF summary...");
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 600);
  };

  // Loading state
  if (isLoading) {
    return <GradeCardSkeleton />;
  }

  // Error state
  if (hasError) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Academic record couldn't be loaded.
        </h2>
        <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] max-w-sm mt-1">
          Unable to synchronize with the university results registry. Please verify your connection or try again.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => setHasError(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] text-white hover:bg-[#087A5B] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/student/academics"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#F1F8F5] dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Academics</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B3024] dark:bg-[#F1FAF6] text-[#F1FAF6] dark:text-[#0B3024] text-xs font-semibold shadow-lg animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-75 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Scoped Printable Grade Card (renders only during browser print) */}
      <PrintableGradeCard
        student={STUDENT_PROFILE}
        semester={activeSemester}
        metrics={activeMetrics}
      />

      {/* Screen Layout: Main 2/3 + Right Rail 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN COLUMN (≈ 2/3)                                                       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Page Header */}
          <GradeCardHeader
            selectedSemesterLabel={activeSemester.label}
            onDownloadGradeCard={handleDownloadGradeCard}
            onPrint={handlePrint}
            onOpenTranscript={() => setIsTranscriptModalOpen(true)}
          />

          {/* 2. Interactive Semester Progression & Selector */}
          <SemesterSelector
            semesters={SEMESTER_DATA}
            selectedSemesterNumber={selectedSemesterNumber}
            onSelectSemester={(semNum) => {
              setSelectedSemesterNumber(semNum);
            }}
          />

          {/* 3. Current Semester Hero Summary (SGPA, CGPA, Credits, Standing) */}
          <CurrentSemesterHero
            student={STUDENT_PROFILE}
            semester={activeSemester}
            metrics={activeMetrics}
          />

          {/* 4. Main Course Grade Card & Marks Table */}
          <GradeTable
            semester={activeSemester}
            subjects={activeSemester.subjects}
            onInspectSubject={(sub) => setSelectedSubjectForModal(sub)}
          />

          {/* 5. Semester Performance Progression Chart & CGPA Milestones */}
          <SemesterPerformanceChart
            semesters={SEMESTER_DATA}
            selectedSemesterNumber={selectedSemesterNumber}
            onSelectSemester={(num) => setSelectedSemesterNumber(num)}
          />

          {/* 6. Term Credits & Degree Graduation Audit */}
          <CreditSummaryCard
            student={STUDENT_PROFILE}
            semester={activeSemester}
            metrics={activeMetrics}
          />

          {/* 7. Transcript Preview Section */}
          <TranscriptPreviewSection
            semesters={SEMESTER_DATA}
            student={STUDENT_PROFILE}
            onOpenFullTranscript={() => setIsTranscriptModalOpen(true)}
          />

          {/* 8. Grade Scale Legend */}
          <GradeScaleLegend />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SUMMARY RAIL (≈ 1/3)                                                */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3">
          <GradeCardRightSidebar
            student={STUDENT_PROFILE}
            semester={activeSemester}
            metrics={activeMetrics}
            onDownloadGradeCard={handleDownloadGradeCard}
            onPrint={handlePrint}
            onOpenTranscript={() => setIsTranscriptModalOpen(true)}
          />
        </div>
      </div>

      {/* Subject Marks Breakdown Modal */}
      <SubjectMarksModal
        isOpen={!!selectedSubjectForModal}
        onClose={() => setSelectedSubjectForModal(null)}
        subject={selectedSubjectForModal}
        semesterLabel={activeSemester.label}
      />

      {/* Full Transcript Viewer Modal */}
      <FullTranscriptModal
        isOpen={isTranscriptModalOpen}
        onClose={() => setIsTranscriptModalOpen(false)}
        transcriptData={transcriptRecord}
        onPrint={handlePrint}
        onDownload={handleDownloadTranscript}
      />
    </div>
  );
}
