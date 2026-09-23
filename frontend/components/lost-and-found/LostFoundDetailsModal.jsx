"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Calendar,
  User,
  Eye,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { STATUS_STYLES } from "./lostFoundData";

export default function LostFoundDetailsModal({
  item,
  isOpen,
  onClose,
  onContactOwner,
  onMarkResolved,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isLost = item.status.toLowerCase() === "lost";
  const isFound = item.status.toLowerCase() === "found";
  const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES.Lost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              {item.status}
            </span>
            <span className="text-xs text-[#658278] dark:text-[#789991]">
              Ref ID: #{item.id}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#082A24] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Main Visual Image */}
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-gray-50 dark:bg-[#082A24]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
              {item.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#55786B] dark:text-[#9FB7AD] mt-2 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-[#082A24] border border-[#E0EBE6] dark:border-[#16463D] text-xs">
            <div className="flex items-center gap-2 text-[#55786B] dark:text-[#9FB7AD]">
              <MapPin className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>
                <strong>Location:</strong> {item.location}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#55786B] dark:text-[#9FB7AD]">
              <Calendar className="w-4 h-4 text-[#85A297] dark:text-[#65857B] shrink-0" />
              <span>
                <strong>Date &amp; Time:</strong> {item.date}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#55786B] dark:text-[#9FB7AD]">
              <User className="w-4 h-4 text-[#85A297] dark:text-[#65857B] shrink-0" />
              <span>
                <strong>{isLost ? "Reported By:" : "Found By:"}</strong>{" "}
                {item.reportedBy}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#55786B] dark:text-[#9FB7AD]">
              <ShieldCheck className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0" />
              <span>
                <strong>Category:</strong> {item.category}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#658278] dark:text-[#789991]">
              Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.tags?.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#F1F8F5] dark:bg-[#0A2E27] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Views & Comments Stats */}
          <div className="flex items-center gap-4 text-xs text-[#658278] dark:text-[#789991] pt-2 border-t border-[#D8E8E2] dark:border-[#16463D]">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#85A297] dark:text-[#65857B]" />
              <span>{item.views} people viewed this listing</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#85A297] dark:text-[#65857B]" />
              <span>{item.commentsCount} student inquiries</span>
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-t border-[#D8E8E2] dark:border-[#16463D] bg-gray-50/50 dark:bg-[#082A24]/50">
          <div className="text-xs text-[#658278] dark:text-[#789991]">
            Contact available for registered campus students
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {item.status !== "Resolved" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContactOwner(item);
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{isFound ? "Claim / Contact Finder" : "Contact Owner"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
