"use client";

import { Building2, User, Mail, Phone, Clock, MapPin, MessageSquare } from "lucide-react";

export default function NoticeAuthorityCard({ author, department, onContactDepartment }) {
  if (!author) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 transition-all">
      <div className="flex items-center gap-2 pb-3 mb-3.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="p-1.5 rounded-lg bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B]">
          <Building2 className="w-4 h-4" />
        </div>
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Issuing Authority & Office
        </h3>
      </div>

      {/* Author Profile */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center font-bold text-sm shrink-0 border border-[#159B72]/30">
          {author.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2) || "AD"}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
            {author.name}
          </h4>
          <p className="text-[11.5px] font-semibold text-[#159B72] dark:text-[#20D39B] mt-0.5">
            {author.designation}
          </p>
          <p className="text-[11px] text-[#658278] dark:text-[#789991]">
            {author.department || department}
          </p>
        </div>
      </div>

      {/* Office Details */}
      <div className="mt-4 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] space-y-2 text-xs text-[#36594C] dark:text-[#B5CCC5]">
        {author.officeLocation && (
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <span className="text-[11.5px]">{author.officeLocation}</span>
          </div>
        )}

        {author.officeHours && (
          <div className="flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <span className="text-[11.5px]">{author.officeHours}</span>
          </div>
        )}

        {author.email && (
          <div className="flex items-start gap-2">
            <Mail className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <span className="text-[11.5px] font-mono truncate">{author.email}</span>
          </div>
        )}

        {author.phone && (
          <div className="flex items-start gap-2">
            <Phone className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <span className="text-[11.5px] font-mono">{author.phone}</span>
          </div>
        )}
      </div>

      {/* Contact Department Action */}
      <button
        type="button"
        onClick={onContactDepartment}
        className="w-full mt-4 py-2 px-3 rounded-xl border border-[#159B72]/40 bg-[#DDF4EB]/40 dark:bg-[#082A24] hover:bg-[#159B72] text-[#159B72] dark:text-[#20D39B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Ask Authority / Department</span>
      </button>
    </div>
  );
}
