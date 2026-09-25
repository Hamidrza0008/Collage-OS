"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, X, ExternalLink } from "lucide-react";

import EditProfileHeader from "./EditProfileHeader";
import EditProfilePhoto from "./EditProfilePhoto";
import EditProfileIdentity from "./EditProfileIdentity";
import EditProfileAbout from "./EditProfileAbout";
import EditProfileSkills from "./EditProfileSkills";
import EditProfileSocialLinks from "./EditProfileSocialLinks";
import EditProfilePortfolio from "./EditProfilePortfolio";
import EditProfileAchievements from "./EditProfileAchievements";
import EditProfileCampusContributions from "./EditProfileCampusContributions";
import EditProfileAcademicSnapshot from "./EditProfileAcademicSnapshot";
import EditProfileVisibility from "./EditProfileVisibility";
import EditProfileLivePreview from "./EditProfileLivePreview";
import MobileEditProfileActionBar from "./MobileEditProfileActionBar";

import {
  DEFAULT_EDIT_PROFILE_DATA,
  loadProfileEditState,
  saveProfileEditState,
  validateProfile,
} from "./editProfileData";

export default function EditProfileAssembler() {
  const router = useRouter();

  // Primary form state
  const [profileState, setProfileState] = useState(DEFAULT_EDIT_PROFILE_DATA);
  const [initialSavedState, setInitialSavedState] = useState(DEFAULT_EDIT_PROFILE_DATA);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    const loaded = loadProfileEditState();
    setProfileState(loaded);
    setInitialSavedState(loaded);
  }, []);

  // Dirty check whenever profileState changes
  useEffect(() => {
    const isDifferent =
      JSON.stringify(profileState) !== JSON.stringify(initialSavedState);
    setIsDirty(isDifferent);
  }, [profileState, initialSavedState]);

  // Window beforeunload warning when dirty
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // State mutators
  const handleChangeField = (field, value) => {
    setProfileState((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleChangeAvatar = (newAvatarUrl) => {
    setProfileState((prev) => ({
      ...prev,
      avatar: newAvatarUrl,
    }));
  };

  const handleChangeSkills = (newSkills) => {
    setProfileState((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleChangeLink = (platform, url) => {
    setProfileState((prev) => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {}),
        [platform]: url,
      },
    }));
    if (errors[platform]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[platform];
        return copy;
      });
    }
  };

  const handleChangeProjects = (newProjects) => {
    setProfileState((prev) => ({
      ...prev,
      projects: newProjects,
    }));
  };

  const handleChangeAchievements = (newAchievements) => {
    setProfileState((prev) => ({
      ...prev,
      achievements: newAchievements,
    }));
  };

  const handleChangeContributions = (newContributions) => {
    setProfileState((prev) => ({
      ...prev,
      campusContributions: newContributions,
    }));
  };

  const handleChangeVisibility = (newVisibility) => {
    setProfileState((prev) => ({
      ...prev,
      visibility: newVisibility,
    }));
  };

  // Save handler
  const handleSave = () => {
    const validation = validateProfile(profileState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast("Please correct the errors in the form before saving.", "error");

      // Scroll to first invalid field if possible
      const firstKey = Object.keys(validation.errors)[0];
      const targetElement = document.getElementById(`input-${firstKey}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.focus();
      }
      return;
    }

    setErrors({});
    setIsSaving(true);

    setTimeout(() => {
      saveProfileEditState(profileState);
      setInitialSavedState(profileState);
      setIsDirty(false);
      setIsSaving(false);
      const now = new Date();
      setLastSavedTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      showToast("Changes saved successfully to your campus profile! ✓");
    }, 600);
  };

  // Discard handler
  const handlePromptReset = () => {
    if (!isDirty) return;
    setShowDiscardModal(true);
  };

  const handleConfirmDiscard = () => {
    setProfileState(initialSavedState);
    setErrors({});
    setIsDirty(false);
    setShowDiscardModal(false);
    showToast("Unsaved changes discarded.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#021512] transition-colors pb-24 md:pb-16">
      {/* 1. Sticky Professional Header */}
      <EditProfileHeader
        isDirty={isDirty}
        isSaving={isSaving}
        lastSavedTime={lastSavedTime}
        onSave={handleSave}
        onReset={handlePromptReset}
        profileId={profileState.id || "student-1"}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className={`fixed top-16 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === "error"
              ? "bg-rose-50 dark:bg-rose-950/90 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800"
              : "bg-[#06241F] text-white dark:bg-[#10372F] dark:text-[#20D39B] border-[#159B72]/40"
          }`}
        >
          {toastMessage.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#20D39B] shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 p-1 hover:opacity-75 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Master Grid Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ======================================================== */}
          {/* MAIN EDITOR COLUMN (~2/3 width -> lg:col-span-8)         */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Profile Photo */}
            <EditProfilePhoto
              avatar={profileState.avatar}
              name={profileState.name}
              onChangeAvatar={handleChangeAvatar}
            />

            {/* 2. Display Identity & Headline */}
            <EditProfileIdentity
              name={profileState.name}
              username={profileState.username}
              headline={profileState.headline}
              quote={profileState.quote}
              errors={errors}
              onChangeField={handleChangeField}
            />

            {/* 3. About & Focus */}
            <EditProfileAbout
              bio={profileState.bio}
              careerFocus={profileState.careerFocus}
              currentFocus={profileState.currentFocus}
              interests={profileState.interests}
              errors={errors}
              onChangeField={handleChangeField}
            />

            {/* 4. Skills & Expertise */}
            <EditProfileSkills
              skills={profileState.skills}
              onChangeSkills={handleChangeSkills}
            />

            {/* 5. External & Portfolio Links */}
            <EditProfileSocialLinks
              socialLinks={profileState.socialLinks}
              errors={errors}
              onChangeLink={handleChangeLink}
            />

            {/* 6. Projects Showcase Portfolio */}
            <EditProfilePortfolio
              projects={profileState.projects}
              onChangeProjects={handleChangeProjects}
            />

            {/* 7. Achievements & Recognition */}
            <EditProfileAchievements
              achievements={profileState.achievements}
              onChangeAchievements={handleChangeAchievements}
            />

            {/* 8. Campus Contributions & Leadership */}
            <EditProfileCampusContributions
              contributions={profileState.campusContributions}
              onChangeContributions={handleChangeContributions}
            />

            {/* 9. Read-Only Academic Affiliation */}
            <EditProfileAcademicSnapshot
              academic={profileState.academic}
            />

            {/* 10. Privacy & Visibility Controls */}
            <EditProfileVisibility
              visibility={profileState.visibility}
              onChangeVisibility={handleChangeVisibility}
            />
          </div>

          {/* ======================================================== */}
          {/* RIGHT PREVIEW RAIL (~1/3 width -> lg:col-span-4)         */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
            <EditProfileLivePreview
              profileState={profileState}
            />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <MobileEditProfileActionBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={handlePromptReset}
      />

      {/* Discard Confirmation Modal */}
      {showDiscardModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#06241F] dark:text-white">
                Discard unsaved edits?
              </h3>
              <button
                type="button"
                onClick={() => setShowDiscardModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 leading-relaxed">
              You have unsaved edits in your profile. Discarding will revert to your last saved state.
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowDiscardModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={handleConfirmDiscard}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-sm"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
