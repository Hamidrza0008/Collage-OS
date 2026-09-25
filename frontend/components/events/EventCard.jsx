"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  User,
  Bookmark,
  Check,
  ArrowRight,
} from "lucide-react";
import { ATTENDEE_AVATARS } from "./eventsData";

export default function EventCard({
  event,
  onViewDetails,
  onRegister,
  onToggleInterested,
  isInterested = false,
  isRegistered = false,
}) {
  const isIndividual =
    event.participation.toLowerCase().includes("individual");

  return (
    <div
      onClick={() => onViewDetails(event)}
      className="group relative flex flex-col sm:flex-row gap-3.5 p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs hover:shadow-md hover:border-[#159B72]/50 dark:hover:border-[#20D39B]/50 transition-all duration-200 cursor-pointer h-full"
    >
      {/* Event Thumbnail Container */}
      <div className="relative w-full sm:w-[136px] md:w-[144px] h-40 sm:h-auto sm:min-h-[148px] shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#031A16]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 160px, 180px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Featured / Live Badge Overlay */}
        {event.hasImageOverlayBadge && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold tracking-wide bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
              {event.hasImageOverlayBadge}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Category & Badges Row */}
          <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold border ${
                event.categoryTheme
                  ? `${event.categoryTheme.bg} ${event.categoryTheme.text} ${event.categoryTheme.border}`
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40"
              }`}
            >
              {event.category}
            </span>

            {event.isPopular && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/40">
                🔥 Popular
              </span>
            )}
          </div>

          {/* Event Title */}
          <Link
            href={`/student/events/${event.id}`}
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <h3 className="text-[14.5px] sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors leading-snug line-clamp-1">
              {event.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-[12px] text-[#55786B] dark:text-[#8FAFA4] mt-1 line-clamp-2 leading-relaxed font-normal">
            {event.description}
          </p>

          {/* Event Details: Date, Venue, Participation */}
          <div className="mt-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#426659] dark:text-[#9FBDB4]">
              <Calendar className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="truncate">{event.date} {event.time ? `• ${event.time}` : ""}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11.5px] text-[#426659] dark:text-[#9FBDB4]">
              <MapPin className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11.5px] text-[#426659] dark:text-[#9FBDB4]">
              {isIndividual ? (
                <User className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              ) : (
                <Users className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              )}
              <span className="truncate">{event.participation}</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Attendees + CTA */}
        <div className="pt-3 mt-3 border-t border-gray-100 dark:border-[#10372F] flex items-center justify-between gap-2">
          {/* Left: Overlapping Avatars + Going count */}
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="flex -space-x-1.5 shrink-0">
              {ATTENDEE_AVATARS.map((avatar, idx) => (
                <div
                  key={idx}
                  className="relative w-5.5 h-5.5 rounded-full ring-2 ring-white dark:ring-[#06241F] overflow-hidden bg-emerald-100"
                >
                  <Image
                    src={avatar}
                    alt="Attendee"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-[11px] font-semibold text-[#55786B] dark:text-[#8FAFA4] whitespace-nowrap">
              +{isInterested ? event.goingCount + 1 : event.goingCount} going
            </span>
          </div>

          {/* Right: CTA Button */}
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            {event.actionType === "interested" ? (
              <button
                type="button"
                onClick={() => onToggleInterested(event.id)}
                className={`flex items-center gap-1 px-3 py-1.2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isInterested
                    ? "bg-[#159B72] text-white shadow-xs"
                    : "border border-[#159B72]/40 bg-[#DDF4EB]/50 dark:bg-[#073D30] text-[#159B72] dark:text-[#20D39B] hover:bg-[#159B72] hover:text-white"
                }`}
              >
                {isInterested ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
                <span>{isInterested ? "Interested" : "Interested"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onRegister(event)}
                className={`flex items-center gap-1 px-3.5 py-1.2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isRegistered
                    ? "bg-emerald-700 dark:bg-emerald-500 text-white"
                    : "bg-[#159B72] hover:bg-[#0F805D] text-white shadow-xs"
                }`}
              >
                <span>{isRegistered ? "Registered" : "Register Now"}</span>
                {!isRegistered && <ArrowRight className="w-3 h-3 ml-0.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
