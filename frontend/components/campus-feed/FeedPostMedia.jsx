"use client";

import Image from "next/image";
import { Calendar, MapPin, CheckCircle2, Ticket, UtensilsCrossed } from "lucide-react";

export default function FeedPostMedia({ post, onRegisterEvent, onVotePoll }) {
  // 1. Rich Event Banner & Metadata Block (like Post 2 TechVibe)
  if (post.eventDetails) {
    const { title, tagline, date, location, status, buttonText, bannerImage } =
      post.eventDetails;

    return (
      <div className="mt-3 rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-[#021512] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left/Main Event Graphic */}
          <div className="relative md:col-span-7 h-44 sm:h-48 overflow-hidden bg-black flex items-center justify-center">
            {bannerImage && (
              <Image
                src={bannerImage}
                alt={title}
                fill
                className="object-cover opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="relative z-10 px-5 text-center md:text-left">
              <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Annual Flagship Fest
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
                {title}
              </h4>
              <p className="text-[11px] font-semibold tracking-wider text-emerald-200/90 mt-0.5 uppercase">
                {tagline}
              </p>
            </div>
          </div>

          {/* Right Event Metadata & CTA */}
          <div className="md:col-span-5 p-4 sm:p-5 flex flex-col justify-between space-y-3 bg-[#06241F] border-t md:border-t-0 md:border-l border-[#16463D]">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-100/90">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100/90">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Ticket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-semibold">{status}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRegisterEvent && onRegisterEvent(post)}
              className="w-full sm:w-auto self-start px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#0F8F6B] text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{buttonText || "Register Now →"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Hostel Mess Menu Card (like Post 3)
  if (post.messMenu) {
    const { week, items } = post.messMenu;

    return (
      <div className="mt-3 rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#021512] p-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Mess Menu – {week}
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            Active Schedule
          </span>
        </div>

        <div className="space-y-1.5">
          {items.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#E8F1ED] dark:border-[#10372F] gap-1"
            >
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] sm:w-24 shrink-0">
                {m.day}
              </span>
              <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-[11px] text-[#36594C] dark:text-[#B5CCC5]">
                <span>
                  <strong className="text-[#658278] dark:text-[#789991]">Lunch:</strong>{" "}
                  {m.lunch}
                </span>
                <span>
                  <strong className="text-[#658278] dark:text-[#789991]">Dinner:</strong>{" "}
                  {m.dinner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Interactive Poll Post (like Post 6 & 17)
  if (post.poll) {
    const { id, question, options, totalVotes, userVotedOption } = post.poll;
    const hasVoted = Boolean(userVotedOption);

    return (
      <div className="mt-3 p-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] space-y-3">
        <h5 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          {question}
        </h5>

        <div className="space-y-2">
          {options.map((option) => {
            const isUserSelection = userVotedOption === option.id;
            const percentage =
              totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

            return (
              <button
                key={option.id}
                type="button"
                disabled={hasVoted}
                onClick={() => onVotePoll && onVotePoll(post.id, option.id)}
                className={`relative w-full text-left p-3 rounded-xl border text-xs transition-all overflow-hidden cursor-pointer ${
                  hasVoted
                    ? isUserSelection
                      ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold"
                      : "border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5]"
                    : "border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 text-[#0B3024] dark:text-[#F1FAF6]"
                }`}
              >
                {/* Progress bar background when voted */}
                {hasVoted && (
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                      isUserSelection
                        ? "bg-emerald-500/20 dark:bg-emerald-500/30"
                        : "bg-black/5 dark:bg-white/5"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {hasVoted && isUserSelection && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    <span>{option.text}</span>
                  </div>
                  {hasVoted && (
                    <span className="text-[11px] font-bold shrink-0 text-emerald-700 dark:text-emerald-300">
                      {percentage}% ({option.votes})
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991] pt-1">
          <span>{totalVotes} total votes</span>
          <span>{hasVoted ? "Vote recorded" : "Click an option to cast vote"}</span>
        </div>
      </div>
    );
  }

  // 4. Standard Single Photo / Image
  if (post.image) {
    return (
      <div className="mt-3 relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-black/10">
        <Image src={post.image} alt="Post attachment" fill className="object-cover" />
      </div>
    );
  }

  return null;
}
