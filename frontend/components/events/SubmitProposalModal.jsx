"use client";

import { useState } from "react";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { CATEGORIES_LIST } from "./eventsData";

export default function SubmitProposalModal({ isOpen, onClose, onSubmitSuccess }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Workshop");
  const [dates, setDates] = useState("");
  const [venue, setVenue] = useState("");
  const [expectedAttendees, setExpectedAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSubmitSuccess({ title, category, dates, venue, description });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl shadow-2xl p-5 sm:p-6 transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#10372F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#DDF4EB] dark:bg-[#0B3D30] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Propose a College Event
              </h3>
              <p className="text-[11.5px] text-[#55786B] dark:text-[#8FAFA4]">
                Bring your idea to life with support from student council & faculty
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#082A24] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Web3 Security & Smart Contract Audit Hackathon"
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              >
                {CATEGORIES_LIST.filter((c) => c !== "All Categories").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] mb-1">
                Proposed Date(s) *
              </label>
              <input
                type="text"
                required
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. 15–16 Oct 2025"
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] mb-1">
                Preferred Venue *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Main Auditorium / Seminar Hall"
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] mb-1">
                Expected Attendees
              </label>
              <input
                type="text"
                value={expectedAttendees}
                onChange={(e) => setExpectedAttendees(e.target.value)}
                placeholder="e.g. ~150 students"
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] mb-1">
              Event Description & Learning Outcomes *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the goals, workshop agenda, speaker requirements, and benefits for students..."
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#36594C] dark:text-[#B5CCC5] hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Proposal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
