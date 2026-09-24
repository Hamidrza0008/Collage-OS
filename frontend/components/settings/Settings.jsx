"use client";

import { useState, useEffect } from "react";
import SettingsHero from "./SettingsHero";
import AccountSettingsCard from "./AccountSettingsCard";
import AppearanceCard from "./AppearanceCard";
import NotificationSettingsCard from "./NotificationSettingsCard";
import SecurityRegionCard from "./SecurityRegionCard";
import SettingsFooter from "./SettingsFooter";
import QuickActionsCard from "./QuickActionsCard";
import AccountProgressCard from "./AccountProgressCard";
import HelpSupportCard from "./HelpSupportCard";
import FeedbackCtaCard from "./FeedbackCtaCard";
import SettingsSkeleton from "./SettingsSkeleton";
import {
  EditProfileModal,
  ChangePasswordModal,
  LoginActivityModal,
  FaqModal,
  FeedbackModal,
} from "./SettingsModals";
import {
  INITIAL_USER_PROFILE,
  INITIAL_NOTIFICATIONS,
  ACCOUNT_PROGRESS_ITEMS,
} from "./settingsData";
import { CheckCircle2 } from "lucide-react";

export default function Settings() {
  // Page Loading State (Brief realistic mount shimmer)
  const [isLoading, setIsLoading] = useState(true);

  // User Profile State
  const [profile, setProfile] = useState(INITIAL_USER_PROFILE);

  // Appearance States
  const [accentColor, setAccentColor] = useState("emerald");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Notification Preferences
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Language & Region
  const [language, setLanguage] = useState("English");
  const [timeZone, setTimeZone] = useState("Asia/Kolkata (IST)");

  // Account Progress Checklist
  const [progressItems, setProgressItems] = useState(ACCOUNT_PROGRESS_ITEMS);

  // Modals Visibility
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLoginActivityOpen, setIsLoginActivityOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Brief mount delay to showcase skeleton transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const handleSaveProfile = (updatedData) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
    showToast("Profile details updated successfully!");
  };

  const handleToggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
    const item = notifications.find((n) => n.id === id);
    showToast(`${item.title} notifications ${!item.enabled ? "enabled" : "disabled"}`);
  };

  const handleToggleProgressItem = (id) => {
    setProgressItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleScrollToNotifications = () => {
    const el = document.getElementById("notifications-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="w-full pb-10 transition-colors">
      {/* ========================================================================= */}
      {/* 2-COLUMN GRID: MAIN 2/3 COLUMN + RIGHT 1/3 SIDEBAR                        */}
      {/* Established College OS Layout Rule: Sidebar starts at same level as Hero   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + 2x2 Grid Cards + Footer                           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          {/* 1. Settings Hero Banner (Strictly 2/3 Column) */}
          <SettingsHero />

          {/* 2. Main Content 2x2 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Left: Account Settings */}
            <AccountSettingsCard
              profile={profile}
              onEditProfile={() => setIsEditProfileOpen(true)}
            />

            {/* Top Right: Appearance (Theme, Accent Colors, Toggles) */}
            <AppearanceCard
              accentColor={accentColor}
              onSelectAccentColor={(color) => {
                setAccentColor(color);
                showToast("Accent color updated!");
              }}
              sidebarCollapsed={sidebarCollapsed}
              onToggleSidebarCollapsed={(val) => {
                setSidebarCollapsed(val);
                showToast(`Sidebar default collapse set to ${val ? "ON" : "OFF"}`);
              }}
              animationsEnabled={animationsEnabled}
              onToggleAnimations={(val) => {
                setAnimationsEnabled(val);
                showToast(`System animations ${val ? "enabled" : "disabled"}`);
              }}
            />

            {/* Bottom Left: Notifications */}
            <div id="notifications-section">
              <NotificationSettingsCard
                notifications={notifications}
                onToggleNotification={handleToggleNotification}
              />
            </div>

            {/* Bottom Right: Privacy & Security + Language & Region */}
            <SecurityRegionCard
              onChangePassword={() => setIsChangePasswordOpen(true)}
              onViewLoginActivity={() => setIsLoginActivityOpen(true)}
              onViewDataPrivacy={() => setIsFaqOpen(true)}
              language={language}
              onLanguageChange={(val) => {
                setLanguage(val);
                showToast(`Language set to ${val}`);
              }}
              timeZone={timeZone}
              onTimeZoneChange={(val) => {
                setTimeZone(val);
                showToast(`Time zone set to ${val}`);
              }}
            />
          </div>

          {/* 3. Footer Signature Banner */}
          <SettingsFooter />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at SAME TOP LEVEL beside Hero                    */}
        {/* Stack: Quick Actions -> Account Progress -> Help & Support -> Feedback CTA */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Quick Actions */}
          <QuickActionsCard
            onEditProfile={() => setIsEditProfileOpen(true)}
            onChangePassword={() => setIsChangePasswordOpen(true)}
            onNotificationSettings={handleScrollToNotifications}
            onPrivacySettings={() => setIsLoginActivityOpen(true)}
          />

          {/* 2. Account Progress */}
          <AccountProgressCard
            progressItems={progressItems}
            onToggleItem={handleToggleProgressItem}
          />

          {/* 3. Help & Support */}
          <HelpSupportCard
            onOpenFaq={() => setIsFaqOpen(true)}
            onOpenContact={() => setIsFeedbackOpen(true)}
            onOpenReportIssue={() => setIsFeedbackOpen(true)}
          />

          {/* 4. Feedback Suggestions CTA Card */}
          <FeedbackCtaCard onOpenFeedback={() => setIsFeedbackOpen(true)} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Interactive Modals                                                        */}
      {/* ========================================================================= */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onSuccess={showToast}
      />

      <LoginActivityModal
        isOpen={isLoginActivityOpen}
        onClose={() => setIsLoginActivityOpen(false)}
      />

      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B3024] dark:bg-emerald-900 text-white text-xs font-semibold shadow-xl border border-emerald-500/40 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
