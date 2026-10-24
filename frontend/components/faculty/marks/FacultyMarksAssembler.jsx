"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import MarksHeroBanner from "./MarksHeroBanner";
import MarksKPICards from "./MarksKPICards";
import MarksFilterBar from "./MarksFilterBar";
import MarksEntryTable from "./MarksEntryTable";
import MarksAnalyticsSidebar from "./MarksAnalyticsSidebar";
import MarksPublishModal from "./MarksPublishModal";
import { CheckCircle2 } from "lucide-react";
import {
  ASSIGNED_COURSES,
  EXAM_TYPES,
  INITIAL_STUDENT_ROSTER,
  calculateGrade,
  exportMarksToCSV,
} from "./facultyMarksData";

const STORAGE_KEY = "college_os_faculty_marks_v1";

export default function FacultyMarksAssembler() {
  const [selectedCourseId, setSelectedCourseId] = useState(ASSIGNED_COURSES[0].id);
  const [selectedExamId, setSelectedExamId] = useState(EXAM_TYPES[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [lockedExams, setLockedExams] = useState({});

  // Keyed marks storage by `${courseId}_${examId}`
  const [rosterStore, setRosterStore] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (err) {
        console.warn("Failed to load marks storage:", err);
      }
    }
    // Default initial seed for dsa + mid1
    return {
      [`${ASSIGNED_COURSES[0].id}_${EXAM_TYPES[0].id}`]: INITIAL_STUDENT_ROSTER,
    };
  });

  const activeStoreKey = `${selectedCourseId}_${selectedExamId}`;

  // Current active students list
  const currentStudents = useMemo(() => {
    if (rosterStore[activeStoreKey]) {
      return rosterStore[activeStoreKey];
    }
    // Seed new combinations with template roster
    return INITIAL_STUDENT_ROSTER.map((s) => ({
      ...s,
      marks: null,
      status: "Unentered",
    }));
  }, [rosterStore, activeStoreKey]);

  // Active course and exam objects
  const activeCourse = useMemo(() => {
    return ASSIGNED_COURSES.find((c) => c.id === selectedCourseId) || ASSIGNED_COURSES[0];
  }, [selectedCourseId]);

  const activeExam = useMemo(() => {
    return EXAM_TYPES.find((e) => e.id === selectedExamId) || EXAM_TYPES[0];
  }, [selectedExamId]);

  const maxMarks = activeExam.maxMarks;
  const isAssessmentLocked = Boolean(lockedExams[activeStoreKey] || activeExam.isLocked);

  // Validation errors map: { [roll]: "Error message" }
  const validationErrors = useMemo(() => {
    const errors = {};
    currentStudents.forEach((student) => {
      if (student.status === "Absent") return;
      if (student.marks === null || student.marks === undefined || student.marks === "") {
        return; // Empty is pending, not a hard error unless published
      }
      const num = Number(student.marks);
      if (isNaN(num)) {
        errors[student.roll] = "Invalid numeric mark";
      } else if (num < 0) {
        errors[student.roll] = "Score cannot be negative";
      } else if (num > maxMarks) {
        errors[student.roll] = `Exceeds max (${maxMarks})`;
      }
    });
    return errors;
  }, [currentStudents, maxMarks]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalStudents = currentStudents.length;
    const gradedList = currentStudents.filter(
      (s) => s.status === "Graded" && s.marks !== null && !isNaN(Number(s.marks)) && Number(s.marks) >= 0 && Number(s.marks) <= maxMarks
    );
    const absentCount = currentStudents.filter((s) => s.status === "Absent").length;
    const pendingCount = totalStudents - gradedList.length - absentCount;
    const gradedCount = gradedList.length;

    let averageMarks = 0;
    let averagePercentage = 0;
    let highestMarks = null;
    let highestPercentage = null;
    let topStudent = null;
    let passCount = 0;

    const gradeDistribution = {
      O: 0,
      "A+": 0,
      A: 0,
      "B+": 0,
      B: 0,
      C: 0,
      F: 0,
      AB: absentCount,
    };

    if (gradedList.length > 0) {
      let sum = 0;
      gradedList.forEach((s) => {
        const mark = Number(s.marks);
        sum += mark;
        if (highestMarks === null || mark > highestMarks) {
          highestMarks = mark;
          topStudent = s;
        }
        const gradeInfo = calculateGrade(mark, maxMarks);
        if (gradeDistribution[gradeInfo.grade] !== undefined) {
          gradeDistribution[gradeInfo.grade] += 1;
        }
        if (mark >= maxMarks * 0.4) {
          passCount += 1;
        }
      });
      averageMarks = Number((sum / gradedList.length).toFixed(1));
      averagePercentage = Number(((averageMarks / maxMarks) * 100).toFixed(0));
      highestPercentage = Number(((highestMarks / maxMarks) * 100).toFixed(0));
    }

    const passPercentage = totalStudents > 0 ? Number(((passCount / totalStudents) * 100).toFixed(0)) : 0;
    const evaluationPercentage = totalStudents > 0 ? Number((((gradedCount + absentCount) / totalStudents) * 100).toFixed(0)) : 0;

    return {
      totalStudents,
      gradedCount,
      pendingCount,
      absentCount,
      evaluationPercentage,
      averageMarks,
      averagePercentage,
      highestMarks,
      highestPercentage,
      topStudent,
      gradeDistribution,
      passPercentage,
    };
  }, [currentStudents, maxMarks]);

  // Toast trigger
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Persist roster changes to state & localStorage
  const updateCurrentRoster = useCallback((newStudents) => {
    setRosterStore((prev) => {
      const updated = {
        ...prev,
        [activeStoreKey]: newStudents,
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
          console.warn("Storage sync failed:", err);
        }
      }
      return updated;
    });
  }, [activeStoreKey]);

  // Individual mark edit
  const handleMarkChange = (roll, rawValue) => {
    const updated = currentStudents.map((s) => {
      if (s.roll !== roll) return s;
      if (rawValue === "") {
        return { ...s, marks: null, status: "Unentered" };
      }
      const num = Number(rawValue);
      const isInvalid = isNaN(num) || num < 0 || num > maxMarks;
      const status = isInvalid ? "Needs Review" : "Graded";
      return { ...s, marks: rawValue, status };
    });
    updateCurrentRoster(updated);
  };

  // Toggle absent status
  const handleToggleAbsent = (roll) => {
    const updated = currentStudents.map((s) => {
      if (s.roll !== roll) return s;
      const willBeAbsent = s.status !== "Absent";
      return {
        ...s,
        status: willBeAbsent ? "Absent" : "Unentered",
        marks: willBeAbsent ? null : s.marks,
      };
    });
    updateCurrentRoster(updated);
    showToast(`Updated student status for ${roll}.`);
  };

  // Reset student score
  const handleResetStudent = (roll) => {
    const updated = currentStudents.map((s) => {
      if (s.roll !== roll) return s;
      return { ...s, marks: null, status: "Unentered" };
    });
    updateCurrentRoster(updated);
    showToast(`Score reset for roll ${roll}.`);
  };

  // Bulk: Quick Fill Max Marks
  const handleQuickFillAll = () => {
    const updated = currentStudents.map((s) => {
      if (s.status === "Absent") return s;
      return { ...s, marks: maxMarks, status: "Graded" };
    });
    updateCurrentRoster(updated);
    showToast("Filled maximum marks for all present students.");
  };

  // Bulk: Clear all marks
  const handleClearAllUnsaved = () => {
    const updated = currentStudents.map((s) => ({
      ...s,
      marks: null,
      status: "Unentered",
    }));
    updateCurrentRoster(updated);
    showToast("Cleared all entered marks for this assessment.");
  };

  // Export to CSV
  const handleExportCSV = () => {
    exportMarksToCSV({
      students: currentStudents,
      course: activeCourse,
      exam: activeExam,
      maxMarks,
    });
    showToast(`Exported ${activeCourse.code} marks to CSV.`);
  };

  // Publish and Lock
  const handleConfirmPublish = () => {
    setLockedExams((prev) => ({ ...prev, [activeStoreKey]: true }));
    showToast(`Assessment published and locked for ${activeCourse.code}!`);
  };

  // AI Action mock handler
  const handleAIAction = (prompt) => {
    showToast(`Campus AI: Processing "${prompt}" for ${activeCourse.shortName}...`);
  };

  // Filtered students for display
  const filteredStudents = useMemo(() => {
    return currentStudents.filter((s) => {
      // Search filter
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Status tab filter
      if (statusFilter === "all") return true;
      if (statusFilter === "Graded") return s.status === "Graded";
      if (statusFilter === "Pending") return s.status === "Unentered" || s.status === "Needs Review";
      if (statusFilter === "Absent") return s.status === "Absent";
      return true;
    });
  }, [currentStudents, searchTerm, statusFilter]);

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 1. Hero Banner */}
      <MarksHeroBanner
        selectedCourse={activeCourse}
        selectedExam={activeExam}
      />

      {/* 2. KPI Summary Cards */}
      <MarksKPICards
        stats={stats}
        maxMarks={maxMarks}
      />

      {/* 3. Filter Controls Bar */}
      <MarksFilterBar
        selectedCourseId={selectedCourseId}
        onCourseChange={(id) => setSelectedCourseId(id)}
        selectedExamId={selectedExamId}
        onExamChange={(id) => setSelectedExamId(id)}
        searchTerm={searchTerm}
        onSearchChange={(val) => setSearchTerm(val)}
        statusFilter={statusFilter}
        onStatusFilterChange={(val) => setStatusFilter(val)}
        counts={{
          total: stats.totalStudents,
          graded: stats.gradedCount,
          pending: stats.pendingCount,
          absent: stats.absentCount,
        }}
      />

      {/* 4. 2-Column Responsive Layout: Left (Table) + Right (Sidebar) */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Marks Entry Table */}
        <div className="flex-1 w-full min-w-0">
          <MarksEntryTable
            students={filteredStudents}
            maxMarks={maxMarks}
            validationErrors={validationErrors}
            onMarkChange={handleMarkChange}
            onToggleAbsent={handleToggleAbsent}
            onResetStudent={handleResetStudent}
            onQuickFillAll={handleQuickFillAll}
            onClearAllUnsaved={handleClearAllUnsaved}
            isLocked={isAssessmentLocked}
          />
        </div>

        {/* Right Column: Actions, Distribution, AI */}
        <div className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0">
          <MarksAnalyticsSidebar
            course={activeCourse}
            exam={activeExam}
            stats={stats}
            isLocked={isAssessmentLocked}
            onExportCSV={handleExportCSV}
            onOpenPublishModal={() => setIsPublishModalOpen(true)}
            onAIAction={handleAIAction}
          />
        </div>
      </div>

      {/* Publish & Lock Confirmation Modal */}
      <MarksPublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        course={activeCourse}
        exam={activeExam}
        stats={stats}
        onConfirmPublish={handleConfirmPublish}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063327] text-white border border-emerald-500/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
