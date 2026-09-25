"use client";

import { Ticket, Users, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export default function RegistrationCard({
  event,
  isRegistered,
  registrationId,
  onOpenRegisterModal,
  onScrollToTicket,
}) {
  const seatsTotal = event.seatsTotal || 500;
  const seatsFilled = isRegistered ? (event.seatsFilled || 248) + 1 : (event.seatsFilled || 248);
  const percentage = Math.min(100, Math.round((seatsFilled / seatsTotal) * 100));

  if (isRegistered) {
    return (
      <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-emerald-300 dark:border-emerald-800 rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Registration Status
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-[#20D39B]">
            Confirmed
          </span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-[#06241F] border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#20D39B] shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
              You're Registered ✓
            </span>
            <span className="text-[11px] text-[#55786B] dark:text-[#8AA89F] block truncate">
              ID: {registrationId || "EVT-2025-00482"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onScrollToTicket}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>View Event Pass →</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-all space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Ticket className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Register for this Event
          </h3>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-[#20D39B] border border-emerald-200 dark:border-emerald-800">
          Open
        </span>
      </div>

      {/* Seats Meter */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#55786B] dark:text-[#8AA89F] flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
            <span>Seats Filled</span>
          </span>
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            {seatsFilled} / {seatsTotal} ({percentage}%)
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-[#06241F] overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Deadline Info */}
      <div className="flex items-center gap-1.5 text-xs text-[#55786B] dark:text-[#8AA89F] p-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F]">
        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B] shrink-0" />
        <span>Deadline: {event.registrationDeadline || "20 Aug 2025"}</span>
      </div>

      {/* Register CTA */}
      <button
        type="button"
        onClick={onOpenRegisterModal}
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <span>Register Now</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
