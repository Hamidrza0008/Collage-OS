"use client";

import { useState } from "react";
import {
  X,
  User,
  Lock,
  Clock,
  Shield,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import { FAQS, LOGIN_SESSIONS } from "./settingsData";

/**
 * 1. Edit Profile Modal
 */
export function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone,
    branch: profile.branch,
    semester: profile.semester,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Edit Profile
              </h3>
              <p className="text-[11px] text-[#658278]">
                Update your contact details and branch
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500/60"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500/60"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Branch / Department
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500/60"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Current Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none focus:border-emerald-500/60"
            >
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white font-semibold shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * 2. Change Password Modal
 */
export function ChangePasswordModal({ isOpen, onClose, onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    onSuccess("Password updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Change Password
              </h3>
              <p className="text-[11px] text-[#658278]">
                Ensure your account is protected
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white font-semibold shadow-xs"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * 3. Login Activity Modal
 */
export function LoginActivityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Login Sessions
              </h3>
              <p className="text-[11px] text-[#658278]">
                Devices currently authenticated into College OS
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          {LOGIN_SESSIONS.map((sess) => (
            <div
              key={sess.id}
              className="p-3 rounded-xl border border-[#D8E8E2]/60 dark:border-[#16463D]/60 bg-[#F7FBF9] dark:bg-[#0A2A24] flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
                  <span>{sess.device}</span>
                  {sess.current && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9.5px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#658278] dark:text-[#789991] mt-0.5">
                  {sess.location} • {sess.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-between items-center text-xs">
          <span className="text-[11px] text-[#658278]">
            Notice suspicious activity?
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold"
          >
            Log Out Other Sessions
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. FAQ Modal
 */
export function FaqModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Frequently Asked Questions
              </h3>
              <p className="text-[11px] text-[#658278]">
                Quick answers to common questions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 text-xs">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[#D8E8E2]/60 dark:border-[#16463D]/60 bg-[#F7FBF9] dark:bg-[#0A2A24] space-y-1.5"
            >
              <div className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {faq.question}
              </div>
              <p className="text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Feedback Modal
 */
export function FeedbackModal({ isOpen, onClose, onSubmit }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [category, setCategory] = useState("Feature Suggestion");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    onSubmit("Thank you for your feedback! Our team will review your suggestions.");
    setFeedbackText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8E8E2]/60 dark:border-[#16463D]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Share Suggestions
              </h3>
              <p className="text-[11px] text-[#658278]">
                Help us improve the College OS experience
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#658278] hover:text-[#0B3024] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Feedback Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none"
            >
              <option value="Feature Suggestion">Feature Suggestion</option>
              <option value="UI & Design Improvement">UI &amp; Design Improvement</option>
              <option value="Bug / Technical Issue">Bug / Technical Issue</option>
              <option value="Academic Portal Feedback">Academic Portal Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#658278] dark:text-[#789991] mb-1">
              Your Feedback / Suggestion
            </label>
            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="What can we do to make College OS better for you?"
              className="w-full px-3 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] outline-none resize-none"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white font-semibold shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
