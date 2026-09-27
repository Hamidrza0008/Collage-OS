"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { ALL_EVENTS } from "@/components/events/eventsData";

export default function CommunityGroupEvents({ linkedEventIds = [] }) {
  const events = linkedEventIds
    .map((id) => ALL_EVENTS.find((e) => e.id === id))
    .filter(Boolean);

  if (events.length === 0) {
    return (
      <div className="py-12 px-4 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-center flex flex-col items-center justify-center">
        <Calendar className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] opacity-50 mb-2" />
        <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          No upcoming community events
        </h4>
        <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
          New workshop and meetup schedules will be posted here soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Community Events &amp; Workshops ({events.length})
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] overflow-hidden shadow-xs hover:border-[#159B72]/50 transition-all flex flex-col justify-between group"
          >
            {/* Event Image */}
            <div className="relative w-full h-36 bg-[#021512] overflow-hidden">
              {evt.image ? (
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-r from-[#0B3024] to-[#159B72] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white/50" />
                </div>
              )}
              <div className="absolute top-2.5 right-2.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#06241F]/80 backdrop-blur-md text-[#20D39B] border border-[#20D39B]/30">
                  {evt.category}
                </span>
              </div>
            </div>

            {/* Event Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors line-clamp-1">
                  {evt.title}
                </h4>
                <div className="space-y-1 mt-2 text-xs text-[#658278] dark:text-[#789991]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#159B72]" />
                    <span>{evt.date || "Upcoming"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#658278]" />
                    <span className="truncate">{evt.location || evt.venue || "Campus Venue"}</span>
                  </div>
                </div>
              </div>

              {/* View Event Canonical CTA */}
              <Link
                href={`/student/events/${evt.id}`}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl bg-[#DDF3EB] dark:bg-[#073327] text-[#159B72] dark:text-[#20D39B] hover:bg-[#cceedf] dark:hover:bg-[#0a4433] transition-colors shadow-2xs mt-2"
              >
                <span>View Event &amp; Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
