"use client";

import { MapPin, Navigation, Building2, Compass } from "lucide-react";

export default function EventVenue({ venueDetails, onGetDirections }) {
  if (!venueDetails) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Venue & Location
            </h2>
            <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
              Physical building, hall room number, and campus entrance directions
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onGetDirections}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-[#06241F] text-emerald-700 dark:text-[#20D39B] border border-emerald-200 dark:border-[#10372F] text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Get Directions →</span>
        </button>
      </div>

      {/* Grid: Details Left + Static Stylized Campus Map Graphic Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left Information */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2 text-xs">
            <div>
              <span className="text-[10.5px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
                Primary Facility
              </span>
              <p className="text-sm font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                {venueDetails.title}
              </p>
              <p className="text-xs text-[#55786B] dark:text-[#8AA89F]">
                {venueDetails.institution}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-[#10372F]">
              <div>
                <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase">
                  Building
                </span>
                <p className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  {venueDetails.building}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase">
                  Room / Floor
                </span>
                <p className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  {venueDetails.room}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-[#10372F]">
              <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase">
                Campus Address
              </span>
              <p className="font-medium text-[#35574C] dark:text-[#C5DCD4]">
                {venueDetails.address}
              </p>
            </div>
          </div>

          {venueDetails.directions && (
            <p className="text-xs text-[#55786B] dark:text-[#8AA89F] leading-relaxed italic pl-1">
              "Note: {venueDetails.directions}"
            </p>
          )}
        </div>

        {/* Right: Stylized Polished Campus Map Graphic Card */}
        <div className="md:col-span-5 h-48 sm:h-52 rounded-xl overflow-hidden relative border border-[#D8E8E2] dark:border-[#16463D] bg-gradient-to-br from-emerald-950 via-[#031A16] to-[#0A261F] flex flex-col items-center justify-center p-4 text-center text-white shadow-inner group">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#159B72_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

          {/* Map Pin Marker */}
          <div className="relative z-10 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>

          <div className="relative z-10 mt-2.5">
            <h4 className="text-xs font-bold tracking-tight text-white">
              Campus Navigator
            </h4>
            <p className="text-[10.5px] text-emerald-300 font-medium">
              {venueDetails.title} • Central Wing
            </p>
          </div>

          <button
            type="button"
            onClick={onGetDirections}
            className="relative z-10 mt-3 px-3 py-1 rounded-lg text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
          >
            Open Campus Route
          </button>
        </div>
      </div>
    </div>
  );
}
