"use client";

import { User, Mail, Phone, MapPin, Leaf } from "lucide-react";

export default function AboutMeCard({ about }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <User className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          About Me
        </h2>
      </div>

      {/* Main Body: Left Content + Right Stylized Quote Block */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch">
        {/* Left Side: Bio & Contacts */}
        <div className="flex-1 space-y-3.5 min-w-0">
          <p className="text-[11.5px] leading-relaxed text-[#36594C] dark:text-[#B5CCC5]">
            {about?.bio}
          </p>

          <div className="space-y-2 pt-1">
            {/* Email */}
            <div className="flex items-center gap-2.5 text-[11.5px]">
              <div className="w-5 h-5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                <Mail className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[#658278] dark:text-[#789991] mr-1.5">Email</span>
                <a
                  href={`mailto:${about?.email}`}
                  className="font-medium text-[#0B3024] dark:text-[#F1FAF6] hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors truncate"
                >
                  {about?.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5 text-[11.5px]">
              <div className="w-5 h-5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                <Phone className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[#658278] dark:text-[#789991] mr-1.5">Phone</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  {about?.phone}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2.5 text-[11.5px]">
              <div className="w-5 h-5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
                <MapPin className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <span className="text-[#658278] dark:text-[#789991] mr-1.5">Location</span>
                <span className="font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                  {about?.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stylized Quote Block */}
        <div className="w-full sm:w-36 md:w-38 shrink-0 rounded-xl bg-[#ECF9F4] dark:bg-[#082D25] border border-[#D8E8E2]/60 dark:border-[#16463D]/60 p-3.5 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-2xl font-serif text-[#159B72] dark:text-[#20D39B] leading-none block select-none">
              &ldquo;
            </span>
            <div className="mt-1.5 space-y-0.5">
              {about?.quoteCard?.lines?.map((line, idx) => (
                <div
                  key={idx}
                  className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight tracking-tight"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <Leaf className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
          </div>
        </div>
      </div>
    </div>
  );
}
