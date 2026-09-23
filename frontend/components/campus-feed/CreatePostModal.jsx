"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Image as ImageIcon,
  BarChart2,
  Megaphone,
  Calendar,
  FileText,
  Plus,
  Trash2,
  Send,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function CreatePostModal({ isOpen, onClose, onSubmit, initialTab = "text" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");

  // Poll state
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  // Announcement state
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [isOfficialNotice, setIsOfficialNotice] = useState(false);

  // Event state
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // Media preview
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || "text");
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleRemovePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handlePollOptionChange = (text, index) => {
    const updated = [...pollOptions];
    updated[index] = text;
    setPollOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && activeTab !== "poll" && activeTab !== "event") {
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: "Hamid Rza",
        role: "Student",
        department: "CSE",
        semester: "7th Sem",
        avatar: "/assets/layout/profile-avatar.jpg",
        isFollowing: true,
      },
      createdAt: "Just now",
      timestamp: Date.now(),
      source: "College",
      type:
        activeTab === "poll"
          ? "Poll"
          : activeTab === "event"
          ? "Event"
          : activeTab === "announcement"
          ? "Announcement"
          : category,
      content: content.trim(),
      likesCount: 0,
      isLiked: false,
      isSaved: false,
      commentsCount: 0,
      comments: [],
    };

    if (activeTab === "poll" && pollQuestion.trim()) {
      newPost.poll = {
        id: `poll-${Date.now()}`,
        question: pollQuestion.trim(),
        totalVotes: 0,
        userVotedOption: null,
        options: pollOptions
          .filter((opt) => opt.trim())
          .map((opt, i) => ({
            id: `opt-${i + 1}`,
            text: opt.trim(),
            votes: 0,
          })),
      };
      if (!newPost.content) {
        newPost.content = pollQuestion.trim();
      }
    }

    if (activeTab === "announcement") {
      newPost.announcementBadge = announcementTitle.trim() || "Campus Announcement";
    }

    if (activeTab === "event" && eventTitle.trim()) {
      newPost.eventDetails = {
        title: eventTitle.trim(),
        tagline: "CAMPUS EVENT",
        date: eventDate.trim() || "Upcoming",
        location: eventLocation.trim() || "Campus Ground",
        status: "Registrations Open",
        buttonText: "Register Now →",
        bannerImage: "/assets/campus-feed/techvibe-banner.jpg",
      };
    }

    if (activeTab === "media" && selectedMedia) {
      newPost.image = selectedMedia;
    }

    onSubmit(newPost);
    // Reset form
    setContent("");
    setPollQuestion("");
    setPollOptions(["", ""]);
    setAnnouncementTitle("");
    setEventTitle("");
    setEventDate("");
    setEventLocation("");
    setSelectedMedia(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Create Campus Post
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Share your updates, notices, or events with the entire campus
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info & Post Type Tabs */}
        <div className="px-5 pt-3.5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500/30">
                <Image
                  src="/assets/layout/profile-avatar.jpg"
                  alt="Hamid Rza"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Hamid Rza
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Posting to Campus Feed
                </span>
              </div>
            </div>

            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] font-medium outline-none focus:border-emerald-500"
            >
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Event">Event</option>
              <option value="Announcement">Announcement</option>
              <option value="Placement">Placement</option>
              <option value="Sports">Sports</option>
              <option value="Community">Community</option>
            </select>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "text"
                  ? "bg-white dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] shadow-xs"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Text</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "media"
                  ? "bg-white dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] shadow-xs"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("poll")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "poll"
                  ? "bg-white dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] shadow-xs"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Poll</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("announcement")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "announcement"
                  ? "bg-white dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] shadow-xs"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Announcement</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("event")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "event"
                  ? "bg-white dark:bg-[#06241F] text-[#159B72] dark:text-[#20D39B] shadow-xs"
                  : "text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="px-5 py-3 overflow-y-auto space-y-3.5 flex-1">
          {/* Main Content Textarea */}
          <div>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening on campus? Write something..."
              className="w-full p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-xs sm:text-[13px] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] resize-none outline-none focus:border-emerald-500 transition-colors"
              autoFocus
            />
          </div>

          {/* Photo Media Options */}
          {activeTab === "media" && (
            <div className="space-y-2 p-3 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20">
              <span className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
                Attach Media
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Campus Event", path: "/assets/campus-feed/techvibe-banner.jpg" },
                  { label: "Robotics Lab", path: "/assets/events/robotics.jpg" },
                  { label: "Sports Ground", path: "/assets/events/football.jpg" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMedia(item.path)}
                    className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedMedia === item.path
                        ? "border-emerald-500 ring-2 ring-emerald-500/30"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={item.path} alt={item.label} fill className="object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white py-0.5 text-center truncate px-1">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Poll Options */}
          {activeTab === "poll" && (
            <div className="space-y-2.5 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D]">
              <div>
                <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
                  Poll Question:
                </label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Which elective are you picking?"
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                  Options:
                </label>
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handlePollOptionChange(e.target.value, i)}
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePollOption(i)}
                        className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Option</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Announcement Title */}
          {activeTab === "announcement" && (
            <div className="space-y-2 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D]">
              <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                Announcement Header / Tag:
              </label>
              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="e.g. Official Department Notice"
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {/* Event Details */}
          {activeTab === "event" && (
            <div className="space-y-2.5 p-3 rounded-xl bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D]">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block">
                  Event Title:
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. HackCon 2026"
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-[#658278] dark:text-[#789991] block mb-0.5">
                    Date &amp; Time
                  </label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="25 Oct 2026, 10 AM"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#658278] dark:text-[#789991] block mb-0.5">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Auditorium / Seminar Hall"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#D8E8E2] dark:border-[#16463D]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#36594C] dark:text-[#B5CCC5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>Publish Post</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
