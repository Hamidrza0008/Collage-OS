"use client";

import { useState } from "react";
import { X, Calendar, MapPin, CheckCircle2, Ticket } from "lucide-react";

export default function EventRegisterModal({
  isOpen,
  onClose,
  eventData,
  onRegisterConfirm,
}) {
  const [selectedTrack, setSelectedTrack] = useState("Competitive Coding & Hackathon");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!isOpen || !eventData) return null;

  const event = eventData.eventDetails || {
    title: "Campus Event",
    date: "Upcoming",
    location: "Campus Ground",
  };

  const tracks = [
    "Competitive Coding & Hackathon",
    "Esports & Gaming Championship",
    "Band Wars & Solo Music",
    "Robotics & Drone Racing",
    "General Attendee Pass",
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistered(true);
      setTimeout(() => {
        onRegisterConfirm(event.title, selectedTrack);
        setRegistered(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Ticket className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Event Registration
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {registered ? (
          <div className="py-8 text-center flex flex-col items-center space-y-2 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Registration Confirmed! 🎉
            </h4>
            <p className="text-xs text-[#658278] dark:text-[#789991] max-w-xs">
              You are registered for <strong>{event.title}</strong> ({selectedTrack}). Your e-pass has been linked to your student ID.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="mt-3.5 space-y-4">
            {/* Event Summary Card */}
            <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] space-y-1.5">
              <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {event.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-[#658278] dark:text-[#789991]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Student Participant */}
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-between text-xs">
              <span className="text-[#658278] dark:text-[#789991]">Participant:</span>
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Hamid Rza (B.Tech • 7th Sem)
              </span>
            </div>

            {/* Track Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                Select Competition / Track:
              </label>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {tracks.map((t) => (
                  <label
                    key={t}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedTrack === t
                        ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold"
                        : "border-[#D8E8E2] dark:border-[#16463D] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="eventTrack"
                      value={t}
                      checked={selectedTrack === t}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="accent-emerald-600 cursor-pointer"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#D8E8E2] dark:border-[#16463D]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                {isSubmitting ? "Registering..." : "Confirm Free Registration"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
