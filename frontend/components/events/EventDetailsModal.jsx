"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building,
  CheckCircle2,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ATTENDEE_AVATARS } from "./eventsData";

export default function EventDetailsModal({
  event,
  onClose,
  onRegisterSuccess,
  onToggleInterested,
  isInterested,
  isRegistered,
}) {
  const [teamMembers, setTeamMembers] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const isTeam = event.participation.toLowerCase().includes("team");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onRegisterSuccess(event.id);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl max-h-[90vh] bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-gray-100 dark:bg-[#021512]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06241F] via-[#06241F]/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category & Status Overlay */}
          <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white/90 dark:bg-[#0B3024]/90 text-[#0B3024] dark:text-[#20D39B] backdrop-blur-xs shadow-xs">
                {event.category}
              </span>
              {event.isPopular && (
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-orange-500 text-white shadow-xs">
                  🔥 Popular
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              +{isInterested ? event.goingCount + 1 : event.goingCount} attending
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {event.title}
              </h2>
              <p className="text-xs sm:text-[13px] text-[#55786B] dark:text-[#8FAFA4] mt-1.5 leading-relaxed">
                {event.description}
              </p>
            </div>
            <Link
              href={`/student/events/${event.id}`}
              onClick={onClose}
              className="shrink-0 text-xs font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 mt-1 bg-[#DDF4EB]/60 dark:bg-[#082A24] px-2.5 py-1.5 rounded-lg border border-[#159B72]/20"
            >
              <span>Full Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-2xl bg-gray-50 dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#10372F]">
            <div className="flex items-center gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5]">
              <Calendar className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>{event.fullDate || event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5]">
              <Clock className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>{event.time || "Full Day"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5]">
              <MapPin className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5]">
              <Users className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>{event.participation}</span>
            </div>
            <div className="col-span-1 sm:col-span-2 flex items-center gap-2 text-xs text-[#36594C] dark:text-[#B5CCC5] pt-1 border-t border-gray-200/60 dark:border-[#10372F]">
              <Building className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>Organized by: <strong className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{event.organizer}</strong></span>
            </div>
          </div>

          {/* Registration Section */}
          <div className="pt-2">
            {isRegistered ? (
              <div className="p-4 rounded-2xl bg-[#DDF4EB] dark:bg-[#0A3D30] border border-[#159B72]/30 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    You are registered for this event!
                  </h4>
                  <p className="text-[11px] text-[#36594C] dark:text-[#B5CCC5] mt-0.5">
                    We sent your pass to your student email. Make sure to arrive 15 minutes before start.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                  Quick Event Registration
                </h4>
                {isTeam && (
                  <div>
                    <label className="block text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] mb-1">
                      Team Member Names / Roll Numbers:
                    </label>
                    <input
                      type="text"
                      required
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                      placeholder="e.g. Hamid Rza (21BCSE042), Sara Khan (21BCSE019)..."
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] mb-1">
                    Special Inquiries or Requirements (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any diet preferences, laptop requirements, etc."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{submitting ? "Registering..." : "Confirm Registration"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleInterested(event.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isInterested
                        ? "bg-[#DDF4EB] dark:bg-[#0B3D30] text-[#159B72] dark:text-[#20D39B] border-[#159B72]"
                        : "border-[#D8E8E2] dark:border-[#10372F] text-[#36594C] dark:text-[#B5CCC5] hover:bg-gray-50"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isInterested ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
