"use client";

import EventCard from "./EventCard";
import { CalendarX, RefreshCw } from "lucide-react";

export default function EventGrid({
  events,
  onViewDetails,
  onRegister,
  onToggleInterested,
  interestedIds = new Set(),
  registeredIds = new Set(),
  onResetFilters,
}) {
  if (!events || events.length === 0) {
    return (
      <div className="w-full py-12 px-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs text-center flex flex-col items-center justify-center">
        <div className="w-13 h-13 rounded-2xl bg-[#DDF4EB] dark:bg-[#0B3D31] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center mb-3.5 shadow-xs">
          <CalendarX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No Events Found
        </h3>
        <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-1 max-w-sm">
          No college events match your current search or category filter. Try refining your keywords or resetting filters.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          onToggleInterested={onToggleInterested}
          isInterested={interestedIds.has(event.id)}
          isRegistered={registeredIds.has(event.id)}
        />
      ))}
    </div>
  );
}
