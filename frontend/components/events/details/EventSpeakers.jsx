"use client";

import { UserCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function EventSpeakers({ speakers }) {
  const [imgErrors, setImgErrors] = useState({});

  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Speakers & Mentors
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Industry practitioners, domain researchers, and hackathon evaluators
          </p>
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {speakers.map((spk) => (
          <div
            key={spk.id}
            className="p-4 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-3">
              {/* Avatar & Role Header */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-emerald-100 dark:bg-[#06241F] border border-emerald-200 dark:border-[#10372F] shrink-0">
                  {!imgErrors[spk.id] && spk.avatar ? (
                    <Image
                      src={spk.avatar}
                      alt={spk.name}
                      fill
                      className="object-cover"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [spk.id]: true }))
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-700 dark:text-[#20D39B] font-bold text-sm">
                      {spk.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug truncate">
                    {spk.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-[#20D39B] truncate">
                    {spk.role}
                  </p>
                  <p className="text-[10px] text-[#658278] dark:text-[#789991] truncate">
                    {spk.track}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#55786B] dark:text-[#8AA89F] leading-relaxed line-clamp-3">
                {spk.bio}
              </p>
            </div>

            {/* LinkedIn CTA */}
            {spk.linkedin && (
              <a
                href={spk.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-[#20D39B] hover:underline pt-1"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
