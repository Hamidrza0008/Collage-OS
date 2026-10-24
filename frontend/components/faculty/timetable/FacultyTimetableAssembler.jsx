"use client";

import React, { useState, useMemo } from "react";
import TimetableHeroBanner from "./TimetableHeroBanner";
import TimetableKPICards from "./TimetableKPICards";
import TimetableControls from "./TimetableControls";
import TimetableWeeklyView from "./TimetableWeeklyView";
import TimetableDailyView from "./TimetableDailyView";
import ClassDetailModal from "./ClassDetailModal";
import ScheduleChangeModal from "./ScheduleChangeModal";
import {
  FACULTY_PROFILE,
  MASTER_SCHEDULE,
  WEEK_DAYS,
  calculateTimetableKPIs,
  filterScheduleEntries,
} from "./facultyTimetableData";
import { CheckCircle2, Clock, CalendarClock, X } from "lucide-react";

export default function FacultyTimetableAssembler() {
  const [viewMode, setViewMode] = useState("weekly"); // "weekly" | "daily"
  const [activeDay, setActiveDay] = useState("Thursday"); // Defaults to Thursday (matching live day in AttendanceTodayClasses.jsx)
  const [weekNumber, setWeekNumber] = useState(FACULTY_PROFILE.currentWeekNumber);
  const [weekDateRange, setWeekDateRange] = useState(FACULTY_PROFILE.weekDateRange);

  // Filters
  const [filters, setFilters] = useState({
    subject: "all",
    batch: "all",
    type: "all",
    search: "",
  });

  // Modals state
  const [selectedClassForDetail, setSelectedClassForDetail] = useState(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [classForChangeModal, setClassForChangeModal] = useState(null);

  // Toast / submitted requests feedback
  const [recentNotification, setRecentNotification] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Week navigation
  const handlePrevWeek = () => {
    if (weekNumber > 1) {
      const newWeek = weekNumber - 1;
      setWeekNumber(newWeek);
      setWeekDateRange(`Week ${newWeek} • Term Oct/Nov`);
    }
  };

  const handleNextWeek = () => {
    if (weekNumber < 16) {
      const newWeek = weekNumber + 1;
      setWeekNumber(newWeek);
      setWeekDateRange(`Week ${newWeek} • Term Oct/Nov`);
    }
  };

  const handleResetToday = () => {
    setWeekNumber(FACULTY_PROFILE.currentWeekNumber);
    setWeekDateRange(FACULTY_PROFILE.weekDateRange);
    setActiveDay("Thursday");
  };

  // Dynamic calculations
  const kpis = useMemo(() => {
    return calculateTimetableKPIs(MASTER_SCHEDULE, activeDay);
  }, [activeDay]);

  // Filtered schedules for weekly & daily views
  const filteredWeeklyList = useMemo(() => {
    return filterScheduleEntries(MASTER_SCHEDULE, filters);
  }, [filters]);

  const filteredDailyList = useMemo(() => {
    return filterScheduleEntries(MASTER_SCHEDULE, {
      ...filters,
      day: activeDay,
    });
  }, [filters, activeDay]);

  // Compute count of classes per day given current filters (for day buttons)
  const dayCounts = useMemo(() => {
    const counts = {};
    WEEK_DAYS.forEach((d) => {
      counts[d.full] = filterScheduleEntries(MASTER_SCHEDULE, {
        subject: filters.subject,
        batch: filters.batch,
        search: filters.search,
        day: d.full,
      }).length;
    });
    return counts;
  }, [filters]);

  // Open modal handlers
  const handleOpenClassDetail = (cls) => {
    setSelectedClassForDetail(cls);
  };

  const handleOpenScheduleChange = (cls = null) => {
    setClassForChangeModal(cls || filteredWeeklyList[0] || MASTER_SCHEDULE[0]);
    setIsChangeModalOpen(true);
  };

  const handleScheduleRequestSubmitted = (payload) => {
    setRecentNotification({
      type: "success",
      title: "Schedule Adjustment Requested",
      message: `Request ${payload.referenceId} submitted for ${payload.classInfo?.courseCode} (${payload.classInfo?.batch}). Pending HOD authorization.`,
    });
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Toast Notification Banner */}
      {recentNotification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3 shadow-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-[13px]">
              <strong className="block font-bold">{recentNotification.title}</strong>
              <p className="mt-0.5 text-emerald-800 dark:text-emerald-300 font-medium">
                {recentNotification.message}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRecentNotification(null)}
            className="text-emerald-700 hover:text-emerald-950 dark:text-emerald-400 dark:hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Header Banner */}
      <TimetableHeroBanner
        facultyProfile={FACULTY_PROFILE}
        currentWeekNumber={weekNumber}
        weekDateRange={weekDateRange}
        todayString="Thursday, Oct 24, 2026"
        onRequestScheduleChange={() => handleOpenScheduleChange()}
      />

      {/* 2. Dynamic Schedule KPIs */}
      <TimetableKPICards
        kpis={kpis}
        onSelectToday={handleResetToday}
        onViewClassDetails={handleOpenClassDetail}
      />

      {/* 3. Timetable Controls (View Switcher, Week Navigation, Day Tabs, Subject/Batch Filters) */}
      <TimetableControls
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeDay={activeDay}
        onSelectDay={(day) => {
          setActiveDay(day);
          // If in weekly view, clicking a day pill switches to daily view or highlights that day
          if (viewMode === "weekly") {
            // keep weekly or allow smooth preview
          }
        }}
        currentWeekNumber={weekNumber}
        weekDateRange={weekDateRange}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onResetToday={handleResetToday}
        filters={filters}
        onFilterChange={handleFilterChange}
        dayCounts={dayCounts}
      />

      {/* 4. Main Views: Weekly Matrix vs Daily Timeline */}
      {viewMode === "weekly" ? (
        <TimetableWeeklyView
          scheduleList={filteredWeeklyList}
          activeDay={activeDay}
          onSelectClass={handleOpenClassDetail}
          onSelectDay={(day) => {
            setActiveDay(day);
            setViewMode("daily");
          }}
          onRequestChange={handleOpenScheduleChange}
        />
      ) : (
        <TimetableDailyView
          classes={filteredDailyList}
          activeDay={activeDay}
          onSelectClass={handleOpenClassDetail}
          onRequestChange={handleOpenScheduleChange}
        />
      )}

      {/* 5. Class Details Modal */}
      <ClassDetailModal
        isOpen={Boolean(selectedClassForDetail)}
        onClose={() => setSelectedClassForDetail(null)}
        classData={selectedClassForDetail}
        onRequestChange={handleOpenScheduleChange}
      />

      {/* 6. Schedule Adjustment Request Modal */}
      <ScheduleChangeModal
        key={classForChangeModal?.id || "default-schedule-modal"}
        isOpen={isChangeModalOpen}
        onClose={() => {
          setIsChangeModalOpen(false);
          setClassForChangeModal(null);
        }}
        initialClass={classForChangeModal}
        availableClasses={MASTER_SCHEDULE}
        onSubmitRequest={handleScheduleRequestSubmitted}
      />
    </div>
  );
}
