"use client";

import React, { useState, useMemo } from "react";
import EventsHeroBanner from "./EventsHeroBanner";
import EventsGridSection from "./EventsGridSection";
import EventsFilterSidebar from "./EventsFilterSidebar";
import EventsCalendarCard from "./EventsCalendarCard";
import UpcomingEventsCard from "./UpcomingEventsCard";
import EventDetailsModal from "./EventDetailsModal";
import { INITIAL_FACULTY_EVENTS } from "./facultyEventsData";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function FacultyEventsAssembler() {
  const [events] = useState(INITIAL_FACULTY_EVENTS);

  // Filter States
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'upcoming' | 'ongoing' | 'past'
  const [selectedType, setSelectedType] = useState("All");
  const [dateRange, setDateRange] = useState("30days");
  const [locationFilter, setLocationFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Toast Feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Tab Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (val) => {
    setDateRange(val);
    setCurrentPage(1);
  };

  const handleLocationChange = (val) => {
    setLocationFilter(val);
    setCurrentPage(1);
  };

  const handleFormatChange = (val) => {
    setFormatFilter(val);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Counts for tabs (pure calculations)
  const allCount = events.length;
  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const ongoingCount = events.filter((e) => e.status === "ongoing").length;
  const pastCount = events.filter((e) => e.status === "past").length;

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Tab filter
      if (activeTab === "upcoming" && event.status !== "upcoming") return false;
      if (activeTab === "ongoing" && event.status !== "ongoing") return false;
      if (activeTab === "past" && event.status !== "past") return false;

      // 2. Type filter
      if (selectedType !== "All") {
        const typeMatch =
          event.category?.toLowerCase() === selectedType.toLowerCase() ||
          event.badge?.toLowerCase() === selectedType.toLowerCase();
        if (!typeMatch) return false;
      }

      // 3. Location filter
      if (locationFilter !== "all") {
        const locMatch =
          event.locationType === locationFilter ||
          event.location?.toLowerCase().includes(locationFilter.toLowerCase());
        if (!locMatch) return false;
      }

      // 4. Format filter
      if (formatFilter !== "all") {
        if (event.format !== formatFilter) return false;
      }

      // 5. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title?.toLowerCase().includes(q);
        const matchesDesc = event.description?.toLowerCase().includes(q);
        const matchesLoc = event.location?.toLowerCase().includes(q);
        const matchesBadge = event.badge?.toLowerCase().includes(q);
        const matchesOrg = event.organizer?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesBadge && !matchesOrg) {
          return false;
        }
      }

      return true;
    });
  }, [events, activeTab, selectedType, locationFilter, formatFilter, searchQuery]);

  // Handle Calendar Date click
  const handleSelectDate = (dateObj) => {
    if (dateObj.hasEvent) {
      // Find matching event on this day
      const dayStr = dateObj.day.toString();
      const matched = events.find(
        (e) => e.date.includes(`Sep ${dayStr}`) || e.date.includes(`Oct ${dayStr}`)
      );
      if (matched) {
        setSelectedEvent(matched);
      }
    }
  };

  // Handle Upcoming Event quick-click
  const handleSelectUpcoming = (item) => {
    const matched = events.find((e) => e.id === item.id);
    if (matched) {
      setSelectedEvent(matched);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* 2-Column Responsive Layout matching reference screenshot */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Hero Banner + Grid (72-75% on large screens) */}
        <div className="flex-1 w-full min-w-0 space-y-5 sm:space-y-6">
          {/* Hero Banner */}
          <EventsHeroBanner />

          {/* Grid Section with Tabs, Search, and Event Cards */}
          <EventsGridSection
            events={filteredEvents}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            allCount={allCount}
            upcomingCount={upcomingCount}
            ongoingCount={ongoingCount}
            pastCount={pastCount}
            onOpenMobileFilter={() => {}}
          />
        </div>

        {/* Right Column: Utility Rail (~26-28% on xl screens) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* Card 1: Filter Events */}
          <EventsFilterSidebar
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            locationFilter={locationFilter}
            onLocationChange={handleLocationChange}
            formatFilter={formatFilter}
            onFormatChange={handleFormatChange}
          />

          {/* Card 2: Calendar */}
          <EventsCalendarCard onSelectDate={handleSelectDate} />

          {/* Card 3: Upcoming Events */}
          <UpcomingEventsCard
            onSelectEvent={handleSelectUpcoming}
            onViewAll={() => {
              setActiveTab("upcoming");
              setSelectedType("All");
              setLocationFilter("all");
              setFormatFilter("all");
              setSearchQuery("");
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#063327] dark:bg-[#031C16] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-500/50 animate-in slide-in-from-bottom-3 duration-300">
          {toastMessage.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
