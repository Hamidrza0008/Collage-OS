"use client";

import { Ticket, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MobileEventActionBar({
  event,
  isRegistered,
  onOpenRegisterModal,
  onScrollToTicket,
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#021512]/95 backdrop-blur-md border-t border-[#D8E8E2] dark:border-[#10372F] px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider block">
            {isRegistered ? "Status: Registered" : "Seats: 248 / 500"}
          </span>
          <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
            {event.date} • {event.venue}
          </span>
        </div>

        {isRegistered ? (
          <button
            type="button"
            onClick={onScrollToTicket}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-md shrink-0 cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>View Ticket</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-md shrink-0 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
