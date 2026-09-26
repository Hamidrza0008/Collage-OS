"use client";

import Link from "next/link";
import Image from "next/image";
import {
  User,
  LayoutGrid,
  Briefcase,
  Calendar,
  Bell,
  FileText,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star,
  Heart,
  Tag,
  Paperclip,
  Award,
} from "lucide-react";

export default function SearchResultCard({ item, query = "" }) {
  if (!item) return null;

  const { type, route, title, subtitle, description, tags, image, date, metadata } = item;

  // Icon mapping
  const getTypeIcon = () => {
    switch (type) {
      case "students":
        return <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />;
      case "projects":
        return <LayoutGrid className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />;
      case "opportunities":
        return <Briefcase className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />;
      case "events":
        return <Calendar className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />;
      case "notices":
        return <Bell className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />;
      case "assignments":
        return <FileText className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />;
      case "courses":
        return <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />;
      case "feed":
        return <MessageSquare className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />;
      case "lost-found":
        return <ShieldCheck className="w-3.5 h-3.5 text-orange-700 dark:text-orange-400" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  const getTypeBadgeClass = () => {
    switch (type) {
      case "students":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "projects":
        return "bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "opportunities":
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "events":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "notices":
        return "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      case "assignments":
        return "bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800";
      case "courses":
        return "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800";
      case "feed":
        return "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
      case "lost-found":
        return "bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <Link
      href={route}
      className="group block p-4 sm:p-4.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] hover:border-emerald-400 dark:hover:border-emerald-700/80 hover:shadow-xs transition-all cursor-pointer relative"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Entity Thumbnail or Icon Badge */}
        <div className="shrink-0">
          {image && type === "students" ? (
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-gray-100 dark:bg-gray-800 relative">
              <Image
                src={image}
                alt={title}
                width={44}
                height={44}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ) : image && (type === "projects" || type === "events") ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-gray-100 dark:bg-gray-800 relative hidden sm:block">
              <Image
                src={image}
                alt={title}
                width={56}
                height={56}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#F1F8F5] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {getTypeIcon()}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Type Badge + Subtitle/Date */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getTypeBadgeClass()}`}
              >
                {item.typeLabel}
              </span>

              {metadata?.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              )}

              {metadata?.workMode && (
                <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-[#5C786E] dark:text-[#8AA89F] font-semibold">
                  {metadata.workMode}
                </span>
              )}
            </div>

            {date && (
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991] font-medium">
                {date}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] font-medium mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-xs text-[#658278] dark:text-[#789991] mt-1.5 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Tags & Metadata Strip */}
          <div className="mt-3 flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]/60">
            {/* Tag Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {tags &&
                tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F7FBF9] dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                  >
                    {tag}
                  </span>
                ))}
              {tags && tags.length > 3 && (
                <span className="text-[10px] text-[#658278] dark:text-[#789991] font-medium">
                  +{tags.length - 3} more
                </span>
              )}
            </div>

            {/* Right Meta / Action CTA */}
            <div className="flex items-center gap-3 text-xs text-[#5C786E] dark:text-[#8AA89F]">
              {metadata?.stipend && (
                <span className="font-bold text-emerald-800 dark:text-emerald-300">
                  {metadata.stipend}
                </span>
              )}
              {metadata?.likes !== undefined && (
                <span className="inline-flex items-center gap-1 text-[11px]">
                  <Heart className="w-3 h-3 text-rose-500" />
                  <span>{metadata.likes}</span>
                </span>
              )}
              {metadata?.credits && (
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-[11px]">
                  {metadata.credits} Credits
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
