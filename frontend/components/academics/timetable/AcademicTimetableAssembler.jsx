"use client";

import { useState, useEffect, useMemo } from "react";
import TimetableHeader from "./TimetableHeader";
import CalendarFilters from "./CalendarFilters";
import TimetableLegend from "./TimetableLegend";
import WeekView from "./WeekView";
import DayView from "./DayView";
import MonthView from "./MonthView";
import AgendaView from "./AgendaView";
import NextClassCard from "./NextClassCard";
import TodayScheduleCard from "./TodayScheduleCard";
import UpcomingExamSidebar from "./UpcomingExamSidebar";
import NextDeadlineCard from "./NextDeadlineCard";
import CalendarSummaryCard from "./CalendarSummaryCard";
import CalendarItemPopover from "./CalendarItemPopover";
import AddReminderModal from "./AddReminderModal";
import MobileAcademicCalendarFilterDrawer from "./MobileAcademicCalendarFilterDrawer";
import AcademicTimetableSkeleton from "./AcademicTimetableSkeleton";
import {
  INITIAL_REMINDERS,
  formatDateKey,
  getMondayOfWeek,
  getWeekDates,
  formatWeekRangeLabel,
  formatMonthLabel,
  formatDayLabel,
  getItemsForDate,
  computeClassStatus,
  getPressureForDate,
} from "./timetableData";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AcademicTimetableAssembler({ initialLoading = false }) {
  // ─────────────────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [hasError, setHasError] = useState(false);

  // Default to Day on mobile (<1024px) or Week on desktop
  const [viewMode, setViewMode] = useState("week");

  // Current active date anchor (defaults to 2026-09-25 or real Date)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 8, 25)); // Sep 25, 2026

  // Filters
  const [activeType, setActiveType] = useState("all");
  const [activeSubject, setActiveSubject] = useState("all");

  // Reminders (local state with starter items)
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  // Modals & Popovers
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [selectedItemForPopover, setSelectedItemForPopover] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Mobile detection for default view reflow
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setViewMode("day");
    }
  }, []);

  // Today key
  const todayDateObj = useMemo(() => new Date(2026, 8, 25), []);
  const todayKey = useMemo(() => formatDateKey(todayDateObj), [todayDateObj]);
  const currentDateKey = useMemo(() => formatDateKey(currentDate), [currentDate]);

  // Active Monday for the current date's week
  const activeMonday = useMemo(() => getMondayOfWeek(currentDate), [currentDate]);

  // 7 days of the active week (Mon-Sun)
  const weekDays = useMemo(() => getWeekDates(activeMonday, true), [activeMonday]);

  // Is today currently selected
  const isTodayActive = useMemo(() => {
    if (viewMode === "day") return currentDateKey === todayKey;
    if (viewMode === "week" || viewMode === "agenda") {
      return weekDays.some((d) => formatDateKey(d) === todayKey);
    }
    if (viewMode === "month") {
      return (
        currentDate.getFullYear() === todayDateObj.getFullYear() &&
        currentDate.getMonth() === todayDateObj.getMonth()
      );
    }
    return false;
  }, [viewMode, currentDateKey, todayKey, weekDays, currentDate, todayDateObj]);

  // ─────────────────────────────────────────────────────────────────────────
  // DATE NAVIGATION HANDLERS
  // ─────────────────────────────────────────────────────────────────────────
  const handlePrevDate = () => {
    const next = new Date(currentDate);
    if (viewMode === "day") {
      next.setDate(next.getDate() - 1);
    } else if (viewMode === "month") {
      next.setMonth(next.getMonth() - 1);
    } else {
      // Week or Agenda
      next.setDate(next.getDate() - 7);
    }
    setCurrentDate(next);
  };

  const handleNextDate = () => {
    const next = new Date(currentDate);
    if (viewMode === "day") {
      next.setDate(next.getDate() + 1);
    } else if (viewMode === "month") {
      next.setMonth(next.getMonth() + 1);
    } else {
      // Week or Agenda
      next.setDate(next.getDate() + 7);
    }
    setCurrentDate(next);
  };

  const handleToday = () => {
    setCurrentDate(new Date(todayDateObj));
  };

  // Header period label
  const currentDateLabel = useMemo(() => {
    if (viewMode === "day") {
      return formatDayLabel(currentDate);
    }
    if (viewMode === "month") {
      return formatMonthLabel(currentDate);
    }
    // Week & Agenda
    return formatWeekRangeLabel(activeMonday);
  }, [viewMode, currentDate, activeMonday]);

  // ─────────────────────────────────────────────────────────────────────────
  // DATA FILTERING PIPELINE
  // ─────────────────────────────────────────────────────────────────────────
  const filterItem = (item) => {
    // 1. Type filter
    if (activeType !== "all" && item.type !== activeType) {
      return false;
    }

    // 2. Subject filter
    if (activeSubject !== "all") {
      // Match by subjectSlug or subjectCode
      const matchesSubject =
        item.subjectSlug === activeSubject ||
        item.subjectCode === activeSubject;

      // Allow holidays or campus-wide events only if not strictly filtering for courses
      if (!matchesSubject) {
        return false;
      }
    }

    return true;
  };

  // Precompute items for the current week days
  const itemsByDate = useMemo(() => {
    const map = {};

    // Populate for weekDays
    weekDays.forEach((d) => {
      const key = formatDateKey(d);
      const allDayItems = getItemsForDate(key, reminders);
      map[key] = allDayItems.filter(filterItem);
    });

    // If day view is outside weekDays, ensure it's populated
    if (!map[currentDateKey]) {
      const allDayItems = getItemsForDate(currentDateKey, reminders);
      map[currentDateKey] = allDayItems.filter(filterItem);
    }

    // If month view, populate month dates
    if (viewMode === "month") {
      const y = currentDate.getFullYear();
      const m = currentDate.getMonth();
      const numDays = new Date(y, m + 1, 0).getDate();
      for (let day = 1; day <= numDays; day++) {
        const dObj = new Date(y, m, day);
        const k = formatDateKey(dObj);
        if (!map[k]) {
          const items = getItemsForDate(k, reminders);
          map[k] = items.filter(filterItem);
        }
      }
    }

    return map;
  }, [weekDays, currentDateKey, currentDate, viewMode, reminders, activeType, activeSubject]);

  // Items for today (unfiltered by subject for sidebar accuracy)
  const todayRawItems = useMemo(() => {
    return getItemsForDate(todayKey, reminders);
  }, [todayKey, reminders]);

  const todayClasses = useMemo(() => {
    return todayRawItems.filter((i) => i.type === "class");
  }, [todayRawItems]);

  const { currentClass, nextClass } = useMemo(() => {
    // Deterministic simulation around 10:30 AM for current class / next class
    return computeClassStatus(todayClasses, "10:30");
  }, [todayClasses]);

  // Next Upcoming Exam for sidebar
  const upcomingExam = useMemo(() => {
    const allItems = Object.values(itemsByDate).flat();
    return allItems.find((i) => i.type === "exam") || null;
  }, [itemsByDate]);

  // Next Pending Deadline (assignment or notice) for sidebar
  const pendingDeadline = useMemo(() => {
    const allItems = Object.values(itemsByDate).flat();
    return allItems.find((i) => i.type === "assignment" || (i.type === "notice" && i.status === "Deadline")) || null;
  }, [itemsByDate]);

  // Agenda Date Groups (for Agenda view)
  const agendaDateGroups = useMemo(() => {
    return weekDays
      .map((d) => {
        const key = formatDateKey(d);
        const items = itemsByDate[key] || [];
        const pressure = getPressureForDate(items);
        return { dateKey: key, items, pressure };
      })
      .filter((g) => g.items.length > 0);
  }, [weekDays, itemsByDate]);

  // Summary counts
  const summaryStats = useMemo(() => {
    const classesToday = todayClasses.length;
    let classesWeek = 0;
    let assessments = 0;
    let deadlines = 0;

    Object.values(itemsByDate).forEach((dayItems) => {
      dayItems.forEach((item) => {
        if (item.type === "class") classesWeek++;
        if (item.type === "exam") assessments++;
        if (item.type === "assignment" || (item.type === "notice" && item.status?.includes("Deadline"))) {
          deadlines++;
        }
      });
    });

    return { classesToday, classesWeek, assessments, deadlines };
  }, [todayClasses, itemsByDate]);

  // Active filter count for mobile badge
  const activeFilterCount = (activeType !== "all" ? 1 : 0) + (activeSubject !== "all" ? 1 : 0);

  // ─────────────────────────────────────────────────────────────────────────
  // REMINDER ACTIONS
  // ─────────────────────────────────────────────────────────────────────────
  const handleSaveReminder = (reminder) => {
    setReminders((prev) => {
      const exists = prev.some((r) => r.id === reminder.id);
      if (exists) {
        return prev.map((r) => (r.id === reminder.id ? reminder : r));
      }
      return [reminder, ...prev];
    });
  };

  const handleDeleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResetFilters = () => {
    setActiveType("all");
    setActiveSubject("all");
  };

  // ─────────────────────────────────────────────────────────────────────────
  // ERROR & LOADING RENDERING
  // ─────────────────────────────────────────────────────────────────────────
  if (isLoading) {
    return <AcademicTimetableSkeleton />;
  }

  if (hasError) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-center justify-center mx-auto text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Calendar couldn&apos;t be loaded.
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F]">
            An unexpected error occurred while compiling your academic timetable. Please try again or return to the Academics hub.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/student/academics"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-gray-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Academics</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MASTER WORKSPACE LAYOUT: 2/3 Main + 1/3 Right Rail
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN COLUMN ≈ 2/3 (8 cols lg, 9 cols xl)                                  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* 1. Header with View Controls, Date Navigation & Add Reminder */}
          <TimetableHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            currentDateLabel={currentDateLabel}
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
            onToday={handleToday}
            isTodayActive={isTodayActive}
            onOpenReminderModal={() => {
              setEditingReminder(null);
              setIsReminderModalOpen(true);
            }}
            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {/* 2. Filter Bar (Subjects & Categories) */}
          <CalendarFilters
            activeType={activeType}
            onTypeChange={setActiveType}
            activeSubject={activeSubject}
            onSubjectChange={setActiveSubject}
            onResetFilters={handleResetFilters}
          />

          {/* 3. Color & Type Legend */}
          <TimetableLegend />

          {/* 4. Active View Mode Body */}
          {viewMode === "week" && (
            <WeekView
              weekDays={weekDays}
              itemsByDate={itemsByDate}
              todayKey={todayKey}
              onSelectItem={(item) => setSelectedItemForPopover(item)}
            />
          )}

          {viewMode === "day" && (
            <DayView
              selectedDate={currentDate}
              items={itemsByDate[currentDateKey] || []}
              isToday={currentDateKey === todayKey}
              onSelectItem={(item) => setSelectedItemForPopover(item)}
              onOpenReminderModal={() => {
                setEditingReminder(null);
                setIsReminderModalOpen(true);
              }}
            />
          )}

          {viewMode === "month" && (
            <MonthView
              activeMonthDate={currentDate}
              itemsByDate={itemsByDate}
              todayKey={todayKey}
              selectedDateKey={currentDateKey}
              onSelectDate={(key) => {
                // Keep selected date updated
              }}
              onSelectItem={(item) => setSelectedItemForPopover(item)}
            />
          )}

          {viewMode === "agenda" && (
            <AgendaView
              dateGroups={agendaDateGroups}
              todayKey={todayKey}
              onSelectItem={(item) => setSelectedItemForPopover(item)}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDEBAR ≈ 1/3 (4 cols lg, 3 cols xl) - Sticky Top-20               */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-20">
          {/* A. Next / Ongoing Class */}
          <NextClassCard
            currentClass={currentClass}
            nextClass={nextClass}
            onSelectItem={(item) => setSelectedItemForPopover(item)}
          />

          {/* B. Today's Schedule */}
          <TodayScheduleCard
            todayItems={todayRawItems}
            onSelectItem={(item) => setSelectedItemForPopover(item)}
            onViewTodayFull={() => {
              handleToday();
              setViewMode("day");
            }}
          />

          {/* C. Upcoming Exam */}
          <UpcomingExamSidebar
            exam={upcomingExam}
            onSelectItem={(item) => setSelectedItemForPopover(item)}
          />

          {/* D. Next Deadline */}
          <NextDeadlineCard
            deadlineItem={pendingDeadline}
            onSelectItem={(item) => setSelectedItemForPopover(item)}
          />

          {/* E. Calendar Summary & Quick Actions */}
          <CalendarSummaryCard
            classesTodayCount={summaryStats.classesToday}
            classesWeekCount={summaryStats.classesWeek}
            assessmentsCount={summaryStats.assessments}
            deadlinesCount={summaryStats.deadlines}
            onGoToToday={handleToday}
            onOpenReminderModal={() => {
              setEditingReminder(null);
              setIsReminderModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────── */}
      {/* MODALS & DRAWERS                                                          */}
      {/* ───────────────────────────────────────────────────────────────────────── */}

      {/* Item Detail Popover / Modal */}
      {selectedItemForPopover && (
        <CalendarItemPopover
          item={selectedItemForPopover}
          onClose={() => setSelectedItemForPopover(null)}
        />
      )}

      {/* Add / Edit Personal Reminder Modal */}
      <AddReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => {
          setIsReminderModalOpen(false);
          setEditingReminder(null);
        }}
        onSaveReminder={handleSaveReminder}
        editingReminder={editingReminder}
        onDeleteReminder={handleDeleteReminder}
      />

      {/* Mobile Filter Drawer */}
      <MobileAcademicCalendarFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeSubject={activeSubject}
        onSubjectChange={setActiveSubject}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
