"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Bookmark,
  Share2,
  MoreVertical,
  CheckCircle2,
  ArrowRight,
  Ticket,
  HelpCircle,
  CalendarPlus,
} from "lucide-react";

export default function EventHero({
  event,
  isBookmarked,
  isRegistered,
  onToggleBookmark,
  onShare,
  onOpenRegisterModal,
  onOpenAskModal,
  onScrollToTicket,
  onScrollToRegister,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusBadge = () => {
    if (isRegistered) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-[#20D39B] border border-emerald-300 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Registered</span>
        </span>
      );
    }
    if (event.rawStatus === "ongoing") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Event Live</span>
        </span>
      );
    }
    if (event.rawStatus === "past") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-[#06241F] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#10372F]">
          <span>Event Completed</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-[#20D39B] border border-emerald-200/80 dark:border-emerald-800/80">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Registration Open</span>
      </span>
    );
  };

  const getPrimaryCta = () => {
    if (isRegistered) {
      return {
        label: "View Ticket Pass",
        icon: Ticket,
        onClick: onScrollToTicket,
      };
    }
    if (event.rawStatus === "past") {
      return {
        label: "Event Completed",
        icon: CheckCircle2,
        onClick: () => {},
        disabled: true,
      };
    }
    return {
      label: "Register Now",
      icon: ArrowRight,
      onClick: onOpenRegisterModal,
    };
  };

  const cta = getPrimaryCta();
  const CtaIcon = cta.icon;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs overflow-hidden transition-all">
      {/* Visual Hero Banner */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 bg-black overflow-hidden group">
        {/* Light & Dark Hero Artworks */}
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet={event.bannerDark || event.image} />
          <Image
            src={event.bannerLight || event.image}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
          />
        </picture>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Floating Top Header on Banner */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
          {/* Category Chip & Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
              {event.category}
            </span>

            {event.isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                Featured
              </span>
            )}

            {event.isPopular && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/90 backdrop-blur-md text-white border border-orange-400/40">
                🔥 Popular
              </span>
            )}
          </div>

          {/* Quick Actions (Bookmark, Share, More) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleBookmark}
              className={`p-2 rounded-xl backdrop-blur-md text-white border transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-emerald-600/90 border-emerald-400 text-white"
                  : "bg-black/40 hover:bg-black/60 border-white/20 text-white"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark event"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            </button>

            <button
              type="button"
              onClick={onShare}
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 transition-colors cursor-pointer"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* 3-Dot Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 transition-colors cursor-pointer"
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleBookmark();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-emerald-50 dark:hover:bg-[#082A24]"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
                    <span>{isBookmarked ? "Remove Bookmark" : "Bookmark Event"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onShare();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-emerald-50 dark:hover:bg-[#082A24]"
                  >
                    <Share2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Copy Event Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenAskModal();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-emerald-50 dark:hover:bg-[#082A24]"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
                    <span>Ask Organizer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Bottom Info on Banner */}
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white space-y-1">
          <div className="flex items-center gap-2">{getStatusBadge()}</div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {event.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 font-medium line-clamp-1 max-w-2xl drop-shadow-sm">
            {event.subtitle}
          </p>
        </div>
      </div>

      {/* Meta Specs & CTA Strip */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Event Key Facts */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap text-xs font-semibold text-[#35574C] dark:text-[#C5DCD4]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-[#06241F] text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0 border border-emerald-100 dark:border-[#10372F]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-[#06241F] text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0 border border-emerald-100 dark:border-[#10372F]">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-[#06241F] text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0 border border-emerald-100 dark:border-[#10372F]">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span>{event.time}</span>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          disabled={cta.disabled}
          onClick={cta.onClick}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
        >
          <span>{cta.label}</span>
          <CtaIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
