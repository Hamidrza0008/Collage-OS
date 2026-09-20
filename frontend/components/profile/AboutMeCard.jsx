"use client";

import { User, Mail, Phone, MapPin, Leaf } from "lucide-react";

export default function AboutMeCard({ about }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            About Me
          </h2>
        </div>

        {/* Top: Description Paragraph with full card width */}
        <p className="text-[11.5px] leading-relaxed text-[#36594C] dark:text-[#B5CCC5] mb-3.5">
          {about?.bio}
        </p>
      </div>

      {/* Bottom Area: Contact Details (Left) + Stylized Quote Card (Right) */}
      <div className="flex items-end justify-between gap-3 pt-2 border-t border-[#E8F1ED]/70 dark:border-[#10372F]/70">
        {/* Contact Info (Stacked Vertically on Left) */}
        <div className="space-y-2 min-w-0 flex-1">
          {/* Email */}
          <div className="flex items-center gap-2 text-[11px] sm:text-[11.5px]">
            <div className="w-5 h-5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <Mail className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex items-center gap-1 overflow-hidden">
              <span className="text-[#658278] dark:text-[#789991] shrink-0">Email</span>
              <a
                href={`mailto:${about?.email}`}
                className="font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors truncate"
                title={about?.email}
              >
                {about?.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-[11px] sm:text-[11.5px]">
            <div className="w-5 h-5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <Phone className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex items-center gap-1 overflow-hidden">
              <span className="text-[#658278] dark:text-[#789991] shrink-0">Phone</span>
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {about?.phone}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-[11px] sm:text-[11.5px]">
            <div className="w-5 h-5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3" />
            </div>
            <div className="min-w-0 flex items-center gap-1 overflow-hidden">
              <span className="text-[#658278] dark:text-[#789991] shrink-0">Location</span>
              <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {about?.location}
              </span>
            </div>
          </div>
        </div>

        {/* Quote Card (Clean, Fixed-Width, Self-Contained Box on Right) */}
        <div className="w-28 sm:w-32 shrink-0 rounded-xl bg-[#ECF9F4] dark:bg-[#082D25] border border-[#D8E8E2]/70 dark:border-[#16463D]/70 p-2.5 flex flex-col justify-between shadow-2xs select-none">
          <div>
            <span className="text-xl font-serif text-[#159B72] dark:text-[#20D39B] leading-none block">
              &ldquo;
            </span>
            <div className="mt-1 space-y-0.5">
              {about?.quoteCard?.lines?.map((line, idx) => (
                <div
                  key={idx}
                  className="text-[11px] sm:text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight tracking-tight"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Leaf className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          </div>
        </div>
      </div>
    </div>
  );
}
