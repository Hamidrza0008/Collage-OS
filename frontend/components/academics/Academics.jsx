"use client";

import { useState, useEffect } from "react";
import AcademicsHeader from "./AcademicsHeader";
import AcademicsTabs from "./AcademicsTabs";
import AcademicOverviewCard from "./AcademicOverviewCard";
import PerformanceTrendCard from "./PerformanceTrendCard";
import CurrentSemesterSubjectsCard from "./CurrentSemesterSubjectsCard";
import SemesterGradesCard from "./SemesterGradesCard";
import ResultsAndGradeCard from "./ResultsAndGradeCard";
import UpcomingExamsCard from "./UpcomingExamsCard";
import SemesterCalendarCard from "./SemesterCalendarCard";
import QuickActionsCard from "./QuickActionsCard";
import AcademicNoticesCard from "./AcademicNoticesCard";
import StudyReminderCard from "./StudyReminderCard";
import CampusAICard from "./CampusAICard";
import AcademicsSkeleton from "./AcademicsSkeleton";
import { CheckCircle2, X } from "lucide-react";

export default function Academics({ isLoading = false }) {
  const [currentSemester, setCurrentSemester] = useState(7);
  const [activeTab, setActiveTab] = useState("overview");
  const [toastMessage, setToastMessage] = useState(null);
  const [isRevaluationModalOpen, setIsRevaluationModalOpen] = useState(false);
  const [isStudyPlanModalOpen, setIsStudyPlanModalOpen] = useState(false);

  // Tab to Section element ID mapping
  const tabTargetMap = {
    overview: "academics-overview",
    marks: "academics-marks",
    attendance: "academics-attendance",
    timetable: "academics-timetable",
    assignments: "academics-timetable",
    calendar: "academics-calendar",
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const targetId = tabTargetMap[tabId];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleQuickAction = (target) => {
    if (target === "download-grade-card") {
      triggerDownloadToast("Semester 7 Grade Card (Provisional)");
    } else if (target === "revaluation-modal") {
      setIsRevaluationModalOpen(true);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (target === "academics-marks") setActiveTab("marks");
        if (target === "academics-attendance") setActiveTab("attendance");
        if (target === "academics-calendar") setActiveTab("calendar");
      }
    }
  };

  const triggerDownloadToast = (name) => {
    setToastMessage(`Downloading ${name}...`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Scroll spy to update active tab based on visible section
  useEffect(() => {
    const sections = [
      { id: "academics-overview", tab: "overview" },
      { id: "academics-attendance", tab: "attendance" },
      { id: "academics-timetable", tab: "timetable" },
      { id: "academics-marks", tab: "marks" },
      { id: "academics-calendar", tab: "calendar" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveTab(match.tab);
            }
          }
        });
      },
      { rootMargin: "-100px 0px -40% 0px", threshold: 0.15 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return <AcademicsSkeleton />;
  }

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3 Starting at the SAME TOP LEVEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Header + Tabs + Dashboard Content                         */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Academics Page Header (contained inside 2/3 column) */}
          <AcademicsHeader
            currentSemester={currentSemester}
            onSemesterChange={(sem) => {
              setCurrentSemester(sem);
              triggerDownloadToast(`Switched view to Semester ${sem}`);
            }}
          />

          {/* 2. Sleek Horizontal Navigation Tabs (contained inside 2/3 column) */}
          <AcademicsTabs activeTab={activeTab} onTabClick={handleTabClick} />

          {/* 3. Row 1: Academic Overview & Performance Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            <div className="h-full">
              <AcademicOverviewCard />
            </div>
            <div className="h-full">
              <PerformanceTrendCard />
            </div>
          </div>

          {/* 4. Row 2: Current Semester Subjects & Semester Grades */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            <div className="h-full">
              <CurrentSemesterSubjectsCard
                onViewAllSubjects={() => {
                  setToastMessage(
                    "Academic course catalog and full subject list will open here in Phase 3."
                  );
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                onSubjectClick={(sub) => {
                  setToastMessage(
                    `Course workspace for ${sub.code} (${sub.name}) will open here in Phase 3.`
                  );
                  setTimeout(() => setToastMessage(null), 3500);
                }}
              />
            </div>
            <div className="h-full">
              <SemesterGradesCard
                onViewAllMarks={() => {
                  handleTabClick("marks");
                  setToastMessage("Detailed grade card portal will connect here in Phase 3.");
                  setTimeout(() => setToastMessage(null), 3500);
                }}
              />
            </div>
          </div>

          {/* 5. Row 3: Results & Grade Card, Upcoming Exams, Semester Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 items-start">
            <div className="xl:col-span-4">
              <ResultsAndGradeCard
                onDownloadGradeCard={(sem) =>
                  triggerDownloadToast(`${sem} Grade Card`)
                }
              />
            </div>
            <div className="xl:col-span-4">
              <UpcomingExamsCard />
            </div>
            <div className="xl:col-span-4 md:col-span-2">
              <SemesterCalendarCard />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 COLUMN: Starts at TOP beside Academics Header                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <QuickActionsCard onActionClick={handleQuickAction} />
          <AcademicNoticesCard />
          <StudyReminderCard onOpenStudyPlan={() => setIsStudyPlanModalOpen(true)} />
          <CampusAICard />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Apply for Revaluation Modal */}
      {isRevaluationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Apply for Revaluation
              </h3>
              <button
                type="button"
                onClick={() => setIsRevaluationModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-3 leading-relaxed">
              You can apply for paper revaluation or answer script inspection for completed
              Semester 6 & 7 exams. A standard verification fee of ₹500 per paper applies.
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <label className="font-semibold text-[#0B3024] dark:text-[#E2F1EC] block">
                Select Subject
              </label>
              <select className="w-full p-2.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50 dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden">
                <option>Database Management Systems (CSE-302)</option>
                <option>Web Development (CSE-101)</option>
                <option>Elective / Open Elective (OEC-101)</option>
              </select>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsRevaluationModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRevaluationModalOpen(false);
                  triggerDownloadToast("Revaluation application submitted!");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:text-[#021512] cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Study Plan Modal */}
      {isStudyPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Semester 7 Study Plan
              </h3>
              <button
                type="button"
                onClick={() => setIsStudyPlanModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-[#5C786E] dark:text-[#8AA89F]">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30">
                <span className="font-bold text-[#0B3024] dark:text-emerald-300 block mb-0.5">
                  Daily Target: 2 Hours DSA + 1.5 Hours DBMS
                </span>
                <span>Focus on Dynamic Programming and SQL Indexing for upcoming 20 AUG & 28 AUG exams.</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#041D18] border border-gray-100 dark:border-[#10372F]">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
                  Next Revision Milestone: 18 August
                </span>
                <span>Complete mock lab test for Computer Networks (Lab-2).</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsStudyPlanModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:text-[#021512] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
