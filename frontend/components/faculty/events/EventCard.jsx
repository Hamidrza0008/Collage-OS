"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function EventCard({ event, onSelect }) {
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

  const getButtonClass = (buttonType) => {
    switch (buttonType) {
      case "primary":
        return "bg-[#159B72] hover:bg-[#11805D] text-white";
      case "purple":
        return "bg-[#F5EDFD] hover:bg-[#E8D4FB] text-[#7C3AED]";
      case "blue":
        return "bg-[#EBF4FE] hover:bg-[#CFE1FC] text-[#2563EB]";
      case "pink":
        return "bg-[#FEECEC] hover:bg-[#FBD0D0] text-[#DC2626]";
      case "amber":
        return "bg-[#FFF8EE] hover:bg-[#FDE7C9] text-[#D97706]";
      default:
        return "bg-[#159B72] hover:bg-[#11805D] text-white";
    }
  };

  return (
    <div
      onClick={() => onSelect(event)}
      className="group bg-white dark:bg-[#06241F] rounded-2xl border border-[#E5ECE8] dark:border-[#10372F] overflow-hidden flex flex-col justify-between hover:border-[#159B72]/50 hover:shadow-md transition-all duration-200 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      {/* Top Banner Image with Badge */}
      <div className="relative w-full h-36 sm:h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-xs ${getBadgeStyle(
              event.badgeType
            )}`}
          >
            {event.badge}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="text-[14px] sm:text-[14.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] transition-colors leading-snug line-clamp-2 min-h-[40px]">
            {event.title}
          </h3>

          {/* Date & Time Row */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-[#658278] dark:text-[#789991]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#658278]" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#658278]" />
              {event.time}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-[#658278] dark:text-[#789991]">
            <MapPin className="w-3.5 h-3.5 text-[#658278] shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Description */}
          <p className="text-[12.5px] text-[#658278] dark:text-[#789991] leading-relaxed line-clamp-2 pt-0.5">
            {event.description}
          </p>
        </div>

        {/* Footer: Registered count + Action Button */}
        <div className="pt-2.5 border-t border-[#E5ECE8]/70 dark:border-[#10372F] flex items-center justify-between gap-2 mt-auto">
          <span className="flex items-center gap-1.5 text-xs text-[#658278] dark:text-[#789991] font-normal">
            <Users className="w-3.5 h-3.5 text-[#658278]" />
            {event.registeredCount}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(event);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs ${getButtonClass(
              event.buttonType
            )}`}
          >
            {event.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
