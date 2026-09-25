"use client";

import { User, AtSign, Briefcase, Quote, AlertCircle } from "lucide-react";

export default function EditProfileIdentity({
  name,
  username,
  headline,
  quote,
  errors = {},
  onChangeField,
}) {
  return (
    <div id="section-identity" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-5">
      <div className="pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
          Display Identity & Headline
        </h2>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
          Your public name, handle, and professional summary visible across the student directory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-name"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Display Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
            <input
              id="input-name"
              type="text"
              value={name || ""}
              onChange={(e) => onChangeField("name", e.target.value)}
              placeholder="Your full name"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all ${
                errors.name
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Username / Handle */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-username"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Campus Handle
          </label>
          <div className="relative">
            <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
            <input
              id="input-username"
              type="text"
              value={username ? username.replace(/^@/, "") : ""}
              onChange={(e) => {
                const val = e.target.value.replace(/^@/, "").replace(/\s+/g, "").toLowerCase();
                onChangeField("username", `@${val}`);
              }}
              placeholder="username"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
            />
          </div>
          <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
            Used for mentions in discussions and project contributor credits.
          </p>
        </div>
      </div>

      {/* Professional Headline */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="input-headline"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Professional Headline
          </label>
          <span
            className={`text-[11px] font-mono ${
              (headline?.length || 0) > 120
                ? "text-rose-500 font-semibold"
                : "text-[#06241F]/60 dark:text-[#D8E8E2]/60"
            }`}
          >
            {headline?.length || 0} / 120
          </span>
        </div>
        <div className="relative">
          <Briefcase className="absolute left-3.5 top-3 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
          <input
            id="input-headline"
            type="text"
            value={headline || ""}
            onChange={(e) => onChangeField("headline", e.target.value)}
            placeholder="e.g. Full Stack Developer | Open Source Enthusiast | Hackathon Finalist"
            maxLength={130}
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all ${
              errors.headline
                ? "border-rose-500 focus:border-rose-500"
                : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
            }`}
          />
        </div>
        {errors.headline && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.headline}
          </p>
        )}
      </div>

      {/* Motivational Quote */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="input-quote"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Profile Quote / Motto
          </label>
          <span
            className={`text-[11px] font-mono ${
              (quote?.length || 0) > 150
                ? "text-rose-500 font-semibold"
                : "text-[#06241F]/60 dark:text-[#D8E8E2]/60"
            }`}
          >
            {quote?.length || 0} / 150
          </span>
        </div>
        <div className="relative">
          <Quote className="absolute left-3.5 top-3 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
          <input
            id="input-quote"
            type="text"
            value={quote || ""}
            onChange={(e) => onChangeField("quote", e.target.value)}
            placeholder="e.g. Small steps every day lead to big results."
            maxLength={160}
            className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all ${
              errors.quote
                ? "border-rose-500 focus:border-rose-500"
                : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
            }`}
          />
        </div>
        {errors.quote && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.quote}
          </p>
        )}
        <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 italic">
          Displayed prominently on your profile banner and peer hover cards.
        </p>
      </div>
    </div>
  );
}
