"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import EventsHero from "./EventsHero";
import EventTabsAndFilters from "./EventTabsAndFilters";
import EventGrid from "./EventGrid";
import EventPagination from "./EventPagination";
import SubmitEventCta from "./SubmitEventCta";
import EventsCalendar from "./EventsCalendar";
import UpcomingEventsCard from "./UpcomingEventsCard";
import EventCategoriesCard from "./EventCategoriesCard";
import NeverMissEventCta from "./NeverMissEventCta";
import EventDetailsModal from "./EventDetailsModal";
import SubmitProposalModal from "./SubmitProposalModal";
import EventNotificationModal from "./EventNotificationModal";
import EventsSkeleton from "./EventsSkeleton";
import { ALL_EVENTS } from "./eventsData";
import { CheckCircle2 } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Events({ isLoading = false }) {
  const router = useRouter();
  // Master event dataset state
  const [events] = useState(ALL_EVENTS);

  // Filter States
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'upcoming' | 'ongoing' | 'past'
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Interaction States
  const [interestedIds, setInterestedIds] = useState(new Set(["event-3"]));
  const [registeredIds, setRegisteredIds] = useState(new Set());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Dynamic counts for tab badges
  const upcomingCount = useMemo(
    () => events.filter((e) => e.status === "upcoming").length,
    [events]
  );
  const ongoingCount = useMemo(
    () => events.filter((e) => e.status === "ongoing").length,
    [events]
  );

  // Filter Pipeline: Tab -> Category -> Calendar Day -> Search Query
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Tab Filter
      if (activeTab !== "all" && event.status !== activeTab) {
        return false;
      }

      // 2. Category Filter
      if (
        selectedCategory !== "All Categories" &&
        selectedCategory !== "All" &&
        event.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // 3. Calendar Day Filter (if user clicked a date on the calendar)
      if (selectedCalendarDay !== null && event.dayNumber !== selectedCalendarDay) {
        return false;
      }

      // 4. Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        const matchesCat = event.category.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesOrganizer = event.organizer?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesVenue && !matchesOrganizer) {
          return false;
        }
      }

      return true;
    });
  }, [events, activeTab, selectedCategory, selectedCalendarDay, searchQuery]);

  // Pagination Derivations (Max 6 per page)
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedEvents = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, safeCurrentPage]);

  // Handlers with automatic reset to Page 1
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCalendarDaySelect = (day) => {
    setSelectedCalendarDay(day);
    setCurrentPage(1);
    if (day) {
      showToast(`Showing events for August ${day}, 2025`);
    } else {
      showToast("Showing all dates");
    }
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedCategory("All Categories");
    setSearchQuery("");
    setSelectedCalendarDay(null);
    setCurrentPage(1);
    showToast("Reset all event filters");
  };

  // Interactions
  const handleToggleInterested = (eventId) => {
    setInterestedIds((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
        showToast("Removed from your interested events.");
      } else {
        next.add(eventId);
        showToast("Marked as Interested! Added to your event watchlist.");
      }
      return next;
    });
  };

  const handleRegisterSuccess = (eventId) => {
    setRegisteredIds((prev) => new Set([...prev, eventId]));
    showToast("Registration confirmed! Check your student email for pass.");
  };

  const handleSelectSidebarEvent = (eventId) => {
    router.push(`/student/events/${eventId}`);
  };

  if (isLoading) {
    return <EventsSkeleton />;
  }

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* ========================================================================= */}
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3                */}
      {/* Both columns start at the EXACT SAME TOP VERTICAL LEVEL                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Tabs/Filters + 2-Col Event Grid + Pagination + CTA*/}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Events Hero Banner (Restricted strictly to 2/3 column) */}
          <EventsHero />

          {/* 2. Controls / Filter Navigation Bar */}
          <EventTabsAndFilters
            activeTab={activeTab}
            onTabChange={handleTabChange}
            upcomingCount={upcomingCount}
            ongoingCount={ongoingCount}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          {/* 3. Event Cards Grid (Paginated - max 6 cards per page) */}
          <div id="events-grid-container" className="space-y-4">
            <EventGrid
              events={paginatedEvents}
              onViewDetails={(ev) => router.push(`/student/events/${ev.id}`)}
              onRegister={(ev) => setSelectedEvent(ev)}
              onToggleInterested={handleToggleInterested}
              interestedIds={interestedIds}
              registeredIds={registeredIds}
              onResetFilters={handleResetFilters}
            />

            {/* 4. Real Pagination (Hidden when filtered items <= 6) */}
            {filteredEvents.length > ITEMS_PER_PAGE && (
              <EventPagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalItems={filteredEvents.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  const el = document.getElementById("events-grid-container");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            )}
          </div>

          {/* 5. Submit Event Idea CTA */}
          <SubmitEventCta
            onOpenProposalModal={() => setIsProposalModalOpen(true)}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at TOP level beside Events Hero                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. August 2025 Calendar Card */}
          <EventsCalendar
            selectedDay={selectedCalendarDay}
            onSelectDay={handleCalendarDaySelect}
          />

          {/* 2. Upcoming Events Card */}
          <UpcomingEventsCard
            onSelectEvent={handleSelectSidebarEvent}
            onViewAll={() => handleTabChange("upcoming")}
          />

          {/* 3. Event Categories Card */}
          <EventCategoriesCard
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            onViewAll={() => handleCategoryChange("All Categories")}
          />

          {/* 4. Notification CTA Card */}
          <NeverMissEventCta
            onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Modals & Feedback Notifications                                           */}
      {/* ========================================================================= */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegisterSuccess={handleRegisterSuccess}
          onToggleInterested={handleToggleInterested}
          isInterested={interestedIds.has(selectedEvent.id)}
          isRegistered={registeredIds.has(selectedEvent.id)}
        />
      )}

      <SubmitProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmitSuccess={(data) =>
          showToast(`Event proposal for "${data.title}" submitted to Student Council.`)
        }
      />

      <EventNotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onSave={() => showToast("Event alert preferences updated successfully.")}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
