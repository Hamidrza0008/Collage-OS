"use client";

import Image from "next/image";
import Link from "next/link";

export default function StudentProfileCard() {
  return (
    <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs space-y-2.5">
      {/* Student Profile Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#159B72]/30 dark:border-[#20D39B]/30 shrink-0">
          <Image
            src="/assets/layout/profile-avatar.jpg"
            alt="Hamid Rza"
            width={40}
            height={40}
            className="object-cover"
            priority
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate leading-tight">
              Hamid Rza
            </h2>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9.5px] font-semibold bg-emerald-50 dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate mt-0.5">
            B.Tech &bull; 7th Sem &bull; CSE
          </p>
        </div>
      </div>

      {/* Completion Meter */}
      <div className="space-y-1 pt-1 border-t border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Profile Completion
          </span>
          <span className="font-bold text-[#159B72] dark:text-[#20D39B]">
            85%
          </span>
        </div>

        <div className="w-full h-1 bg-[#F1F8F5] dark:bg-[#0A2A24] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#159B72] dark:bg-[#20D39B] rounded-full transition-all duration-500"
            style={{ width: "85%" }}
          />
        </div>

        <div className="flex items-center justify-between text-[10.5px] text-[#658278] dark:text-[#789991] pt-0.5">
          <span className="truncate">Complete profile to unlock features</span>
          <Link
            href="/student/profile"
            className="font-semibold text-[#159B72] dark:text-[#20D39B] hover:underline shrink-0 ml-1"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
