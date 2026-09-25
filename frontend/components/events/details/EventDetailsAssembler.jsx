"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getEventDetails, getRelatedEvents } from "./eventDetailsData";
import EventHero from "./EventHero";
import EventOverview from "./EventOverview";
import EventHighlights from "./EventHighlights";
import EventSchedule from "./EventSchedule";
import EventSpeakers from "./EventSpeakers";
import EventVenue from "./EventVenue";
import EventAttendees from "./EventAttendees";
import EventFAQs from "./EventFAQs";
import EventQuestions from "./EventQuestions";
import EventOrganizer from "./EventOrganizer";
import RegistrationCard from "./RegistrationCard";
import RegistrationModal from "./RegistrationModal";
import EventTicketCard from "./EventTicketCard";
import EventTicketModal from "./EventTicketModal";
import EventCalendarActions from "./EventCalendarActions";
import RelatedEvents from "./RelatedEvents";
import AskOrganizerModal from "./AskOrganizerModal";
import MobileEventActionBar from "./MobileEventActionBar";
import EventNotFound from "./EventNotFound";
import EventDetailsSkeleton from "./EventDetailsSkeleton";

export default function EventDetailsAssembler({ eventId, isLoading = false }) {
  if (isLoading) {
    return <EventDetailsSkeleton />;
  }

  const initialEvent = getEventDetails(eventId);

  if (!initialEvent) {
    return <EventNotFound eventId={eventId} />;
  }

  const relatedEvents = getRelatedEvents(initialEvent.id);

  // Interactive States
  const [event, setEvent] = useState(initialEvent);
  const [isBookmarked, setIsBookmarked] = useState(Boolean(initialEvent.isBookmarked));
  const [isRegistered, setIsRegistered] = useState(Boolean(initialEvent.isRegistered));
  const [registrationId, setRegistrationId] = useState(initialEvent.registrationId);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      showToast(
        next
          ? "Event bookmarked to your saved events."
          : "Event removed from your bookmarks."
      );
      return next;
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
    showToast("Event link copied to clipboard.");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: event.title,
          text: event.subtitle || event.description,
          url: window.location.href,
        })
        .catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  const handleScrollToTicket = () => {
    const el = document.getElementById("event-ticket-pass");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setIsTicketModalOpen(true);
    }
  };

  const handleScrollToRegister = () => {
    setIsRegisterModalOpen(true);
  };

  const handleRegistrationSubmit = (data) => {
    setIsRegistered(true);
    setRegistrationId(data.registrationId);
    setEvent((prev) => ({
      ...prev,
      isRegistered: true,
      registrationId: data.registrationId,
      status: "Registered",
      seatsFilled: (prev.seatsFilled || 248) + 1,
    }));
    showToast(`You're Registered! Registration ID: ${data.registrationId}`);
    setTimeout(() => {
      handleScrollToTicket();
    }, 400);
  };

  const handleDownloadPass = () => {
    showToast(`Downloading digital event pass for "${event.title}"...`);
  };

  const handleAddToWallet = () => {
    showToast("Event pass added to mobile wallet credentials.");
  };

  const handleDownloadIcs = () => {
    try {
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//College OS//Campus Events//EN",
        "BEGIN:VEVENT",
        `UID:${event.id}-2025@college.edu`,
        "DTSTAMP:20250820T000000Z",
        "DTSTART:20250822T043000Z",
        "DTEND:20250824T123000Z",
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.subtitle || event.description}`,
        `LOCATION:${event.venue}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${event.title.replace(/[^a-zA-Z0-9]/g, "_")}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Downloaded .ICS calendar file.");
    } catch {
      showToast("Generated calendar invite.");
    }
  };

  const handleGetDirections = () => {
    showToast(`Opening campus route to ${event.venue || "Main Auditorium"}...`);
  };

  const handleAskOrganizerSubmit = ({ subject }) => {
    showToast(`Question on "${subject}" sent to event coordinator!`);
  };

  const handleAskQuestion = (qText) => {
    showToast(`Question posted to public event board: "${qText.slice(0, 30)}..."`);
  };

  const handleViewOrganizerInfo = () => {
    showToast(`Viewing official profile for ${event.organizer?.name || "Organizer"}.`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-20 lg:pb-12 space-y-4">
      {/* Compact Back Navigation (Strictly no large breadcrumb) */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Events</span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* MASTER 2-COLUMN GRID (Left ~2/3 Main Content + Right ~1/3 Sticky Sidebar) */}
      {/* Both columns start at the EXACT SAME top vertical level                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero, Overview, Highlights, Schedule, Speakers, Venue,   */}
        {/* Attendees, FAQs, Questions/Discussion                                     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Event Hero */}
          <EventHero
            event={event}
            isBookmarked={isBookmarked}
            isRegistered={isRegistered}
            onToggleBookmark={handleToggleBookmark}
            onShare={handleShare}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            onOpenAskModal={() => setIsAskModalOpen(true)}
            onScrollToTicket={handleScrollToTicket}
            onScrollToRegister={handleScrollToRegister}
          />

          {/* 2. Event Overview & Facts */}
          <EventOverview overview={event.overview} />

          {/* 3. Key Highlights ("Why Attend?") */}
          <EventHighlights highlights={event.highlights} />

          {/* 4. Event Schedule & Timeline */}
          <EventSchedule schedule={event.schedule} />

          {/* 5. Speakers & Mentors */}
          <EventSpeakers speakers={event.speakers} />

          {/* 6. Venue & Location */}
          <EventVenue
            venueDetails={event.venueDetails}
            onGetDirections={handleGetDirections}
          />

          {/* 7. Attendees Directory ("Who's Going") */}
          <EventAttendees attendees={event.attendees} />

          {/* 8. Frequently Asked Questions */}
          <EventFAQs faqs={event.faqs} />

          {/* 9. Event Q&A / Discussion */}
          <EventQuestions
            initialQuestions={event.questions}
            onAskQuestion={handleAskQuestion}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Sticky desktop, begins at exact same top level as Hero */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* 1. Registration Card */}
          <RegistrationCard
            event={event}
            isRegistered={isRegistered}
            registrationId={registrationId}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            onScrollToTicket={handleScrollToTicket}
          />

          {/* 2. Ticket Pass (Shown after registration) */}
          {isRegistered && (
            <EventTicketCard
              event={event}
              registrationId={registrationId}
              studentName="Hamid Rza"
              onViewFullPass={() => setIsTicketModalOpen(true)}
              onDownloadPass={handleDownloadPass}
              onAddToWallet={handleAddToWallet}
            />
          )}

          {/* 3. Event Organizer Card */}
          <EventOrganizer
            organizer={event.organizer}
            onContactOrganizer={() => setIsAskModalOpen(true)}
            onViewOrganizerInfo={handleViewOrganizerInfo}
          />

          {/* 4. Add to Calendar Card */}
          <EventCalendarActions
            event={event}
            onDownloadIcs={handleDownloadIcs}
          />

          {/* 5. Related Events ("You May Also Like") */}
          <RelatedEvents relatedEvents={relatedEvents} />
        </div>
      </div>

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#06241F] text-white dark:bg-[#20D39B] dark:text-[#06241F] text-xs font-semibold shadow-xl border border-white/10 dark:border-black/10 animate-fade-in pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#06241F] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileEventActionBar
        event={event}
        isRegistered={isRegistered}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onScrollToTicket={handleScrollToTicket}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        event={event}
        onSubmitRegistration={handleRegistrationSubmit}
      />

      {/* Full Ticket Modal */}
      <EventTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        event={event}
        registrationId={registrationId}
        studentName="Hamid Rza"
        onDownloadPass={handleDownloadPass}
      />

      {/* Ask Organizer Modal */}
      <AskOrganizerModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        eventTitle={event.title}
        organizerName={event.organizer?.name}
        onSubmitQuestion={handleAskOrganizerSubmit}
      />
    </div>
  );
}
