"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Share2,
  CalendarPlus,
  Check,
  Building,
} from "lucide-react";

export default function EventDetailsModal({ isOpen, event, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen || !event) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        typeof window !== "undefined"
          ? `${window.location.origin}/faculty/events#${event.id}`
          : ""
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case "workshop":
        return "bg-[#159B72] text-white";
      case "competition":
        return "bg-[#7C3AED] text-white";
      case "event":
        return "bg-[#2563EB] text-white";
      case "club":
        return "bg-[#E11D48] text-white";
      case "cultural":
        return "bg-[#D97706] text-white";
      case "sports":
        return "bg-[#2563EB] text-white";
      case "seminar":
        return "bg-[#7C3AED] text-white";
      default:
        return "bg-[#159B72] text-white";
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Banner Image with Badge & Close Button */}
        <div className="relative w-full h-48 sm:h-56 bg-gray-100 dark:bg-[#041D18] shrink-0 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-semibold shadow-sm ${getBadgeStyle(
                event.badgeType
              )}`}
            >
              {event.badge}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title on Banner Bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-gray-50/70 dark:bg-[#072C24]/50 rounded-xl border border-[#E5ECE8] dark:border-[#10372F]">
            <div className="flex items-center gap-2.5 text-xs text-[#0B3024] dark:text-[#E8F7F0]">
              <Calendar className="w-4 h-4 text-[#159B72] shrink-0" />
              <span>
                <span className="font-semibold">Date:</span> {event.date}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0B3024] dark:text-[#E8F7F0]">
              <Clock className="w-4 h-4 text-[#159B72] shrink-0" />
              <span>
                <span className="font-semibold">Time:</span> {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0B3024] dark:text-[#E8F7F0]">
              <MapPin className="w-4 h-4 text-[#159B72] shrink-0" />
              <span>
                <span className="font-semibold">Location:</span> {event.location}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#0B3024] dark:text-[#E8F7F0]">
              <Users className="w-4 h-4 text-[#159B72] shrink-0" />
              <span>
                <span className="font-semibold">Attendance:</span> {event.registeredCount}
              </span>
            </div>
          </div>

          {/* Organizer */}
          {event.organizer && (
            <div className="flex items-center gap-2 text-xs text-[#658278] dark:text-[#789991]">
              <Building className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
              <span>
                Organized by:{" "}
                <span className="font-semibold text-[#0B3024] dark:text-[#E8F7F0]">
                  {event.organizer}
                </span>
              </span>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] mb-1.5">
              About This Event
            </h3>
            <p className="text-[13px] text-[#0B3024] dark:text-[#E8F7F0] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] mb-2">
                Key Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-xs text-[#0B3024] dark:text-[#E8F7F0]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72] shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5ECE8] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#05211B]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-[#D8E6E0] dark:border-[#143E33] hover:bg-gray-100 dark:hover:bg-[#0A332A] text-xs font-medium text-[#0B3024] dark:text-[#E8F7F0] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
            <button
              onClick={() => alert("Added to calendar!")}
              className="px-3 py-1.5 rounded-lg border border-[#D8E6E0] dark:border-[#143E33] hover:bg-gray-100 dark:hover:bg-[#0A332A] text-xs font-medium text-[#0B3024] dark:text-[#E8F7F0] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-[#D8E6E0] dark:border-[#143E33] hover:bg-gray-100 dark:hover:bg-[#0A332A] text-xs font-medium text-[#658278] dark:text-[#789991] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleRegister}
              disabled={isRegistered}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isRegistered
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-[#159B72] hover:bg-[#11805D] text-white"
              }`}
            >
              {isRegistered ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Registered</span>
                </>
              ) : (
                <span>{event.buttonText || "Register Now →"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
