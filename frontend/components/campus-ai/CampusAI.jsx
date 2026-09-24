"use client";

import { useState, useEffect, useRef } from "react";
import CampusAIHero from "./CampusAIHero";
import AIModeTabs from "./AIModeTabs";
import AIConversation from "./AIConversation";
import AIComposer from "./AIComposer";
import AIDataSourceFooter from "./AIDataSourceFooter";
import KnowledgePanel from "./KnowledgePanel";
import HowCampusAIWorks from "./HowCampusAIWorks";
import SampleQuestions from "./SampleQuestions";
import RecentQueries from "./RecentQueries";
import CampusAICta from "./CampusAICta";
import CampusAISkeleton from "./CampusAISkeleton";
import { HowItWorksModal, ViewAllQueriesModal } from "./CampusAIModals";
import {
  INITIAL_RECENT_QUERIES,
  generateCampusAIResponse,
} from "./campusAIData";

export default function CampusAI() {
  // Page Loading State (Brief mount shimmer)
  const [isLoading, setIsLoading] = useState(true);

  // Active Mode & Context Scope
  const [activeTab, setActiveTab] = useState("chat");
  const [assistantMode, setAssistantMode] = useState("Campus AI");
  const [contextScope, setContextScope] = useState("College Data");

  // Mode Toggles in Composer
  const [collegeKnowledgeEnabled, setCollegeKnowledgeEnabled] = useState(true);
  const [generalAIEnabled, setGeneralAIEnabled] = useState(true);

  // Chat Conversation State (empty initially for clean greeting & quick prompts state)
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const thinkingTimeoutRef = useRef(null);

  // Recent Queries History
  const [recentQueries, setRecentQueries] = useState(INITIAL_RECENT_QUERIES);

  // Modals
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isViewAllQueriesOpen, setIsViewAllQueriesOpen] = useState(false);

  // Simulate fast initial load for smooth skeleton showcase
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup active thinking timeout on unmount
  useEffect(() => {
    return () => {
      if (thinkingTimeoutRef.current) {
        clearTimeout(thinkingTimeoutRef.current);
      }
    };
  }, []);

  // Handle User Message Submission
  const handleSendMessage = (text, attachment = null) => {
    if (!text?.trim() && !attachment) return;

    // Switch to Chat tab if not already active
    if (activeTab !== "chat") {
      setActiveTab("chat");
    }

    const userMessageId = `user_${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: "user",
      text: text.trim(),
      attachment,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Prepend to Recent Queries
    setRecentQueries((prev) => [
      {
        id: `rq_${Date.now()}`,
        question: text.trim(),
        timeAgo: "Just now",
        sourceType: "auto",
        sourceLabel: "Campus AI",
      },
      ...prev.filter((q) => q.question.toLowerCase() !== text.trim().toLowerCase()).slice(0, 7),
    ]);

    // Clear any previous timer
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
    }

    // Simulate AI generation thinking time
    thinkingTimeoutRef.current = setTimeout(() => {
      const responseData = generateCampusAIResponse(text.trim(), {
        collegeKnowledgeEnabled,
        generalAIEnabled,
      });

      const assistantMsg = {
        id: `bot_${Date.now()}`,
        sender: "assistant",
        text: responseData.text,
        supportingText: responseData.supportingText,
        type: responseData.type,
        sourceLabel: responseData.sourceLabel,
        chips: responseData.chips,
        isUnavailable: responseData.isUnavailable,
        originalQuery: text.trim(),
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 700);
  };

  // Stop Generation handler
  const handleStopThinking = () => {
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
    }
    setIsThinking(false);
  };

  // Start a fresh new chat without page reload
  const handleNewChat = () => {
    handleStopThinking();
    setMessages([]);
    setActiveTab("chat");
  };

  // Select Prompt from Quick Prompts, Sample Questions, or Chips
  const handleSelectPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  // Retry query
  const handleRetry = (originalQuery) => {
    if (originalQuery) {
      handleSendMessage(originalQuery);
    }
  };

  // Ask about item from Knowledge / Documents / Guidelines / Policies tab
  const handleAskAboutKnowledgeItem = (itemTitle) => {
    const query = `Tell me about: ${itemTitle}`;
    setActiveTab("chat");
    handleSendMessage(query);
  };

  if (isLoading) {
    return <CampusAISkeleton />;
  }

  return (
    <div className="w-full lg:h-[calc(100dvh-68px-3rem)] flex flex-col min-h-0 overflow-hidden transition-colors">
      {/* ========================================================================= */}
      {/* 2-COLUMN VIEWPORT-AWARE GRID: MAIN 2/3 COLUMN + RIGHT 1/3 SIDEBAR         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full min-h-0 items-stretch">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Compact Hero + Mode Tabs + Chat Workspace (or Catalog)   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-0 space-y-2.5">
          {/* 1. Compact Campus AI Hero Banner */}
          <CampusAIHero />

          {/* 2. Mode Navigation Tabs + Dropdowns + New Chat Button */}
          <AIModeTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            assistantMode={assistantMode}
            onAssistantModeChange={setAssistantMode}
            contextScope={contextScope}
            onContextScopeChange={setContextScope}
            onNewChat={handleNewChat}
          />

          {/* 3. Chat Workspace (or Knowledge Catalog) */}
          <div className="flex-1 min-h-0 rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] shadow-xs flex flex-col overflow-hidden">
            {activeTab === "chat" ? (
              <>
                {/* Independently Scrollable Conversation Area with Integrated Empty State */}
                <AIConversation
                  messages={messages}
                  isThinking={isThinking}
                  onSelectPrompt={handleSelectPrompt}
                  onSwitchTab={setActiveTab}
                  onRetry={handleRetry}
                  onStopThinking={handleStopThinking}
                  onViewAllQueries={() => setIsViewAllQueriesOpen(true)}
                />

                {/* Sticky Attached Chat Composer (Always visible at bottom) */}
                <AIComposer
                  onSendMessage={handleSendMessage}
                  isThinking={isThinking}
                  onStopThinking={handleStopThinking}
                  collegeKnowledgeEnabled={collegeKnowledgeEnabled}
                  onToggleCollegeKnowledge={setCollegeKnowledgeEnabled}
                  generalAIEnabled={generalAIEnabled}
                  onToggleGeneralAI={setGeneralAIEnabled}
                />
              </>
            ) : (
              /* Searchable Knowledge / Documents / Guidelines / Policies Catalog */
              <KnowledgePanel
                activeTab={activeTab}
                onAskAboutItem={handleAskAboutKnowledgeItem}
              />
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Independently Scrollable Column on Desktop             */}
        {/* Stack: How Campus AI Works -> Sample Questions -> Recent Queries -> CTA   */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-4 flex-col h-full min-h-0 overflow-y-auto space-y-3.5 pr-1.5 pb-8 scrollbar-thin">
          {/* 1. How Campus AI Works */}
          <div className="shrink-0">
            <HowCampusAIWorks onLearnMore={() => setIsHowItWorksOpen(true)} />
          </div>

          {/* 2. Sample Questions */}
          <div className="shrink-0">
            <SampleQuestions onSelectQuestion={handleSelectPrompt} />
          </div>

          {/* 3. Recent Queries */}
          <div className="shrink-0">
            <RecentQueries
              queries={recentQueries}
              onSelectQuery={handleSelectPrompt}
              onViewAll={() => setIsViewAllQueriesOpen(true)}
            />
          </div>

          {/* 4. Campus AI CTA Card (Last Card in Sidebar) */}
          <div className="shrink-0">
            <CampusAICta onStartChat={handleNewChat} />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE-ONLY EXTENSION: Accessible below the chat workspace on small screens */}
      {/* ========================================================================= */}
      <div className="block lg:hidden mt-6 space-y-4 pb-8">
        <HowCampusAIWorks onLearnMore={() => setIsHowItWorksOpen(true)} />
        <SampleQuestions onSelectQuestion={handleSelectPrompt} />
        <RecentQueries
          queries={recentQueries}
          onSelectQuery={handleSelectPrompt}
          onViewAll={() => setIsViewAllQueriesOpen(true)}
        />
        <CampusAICta onStartChat={handleNewChat} />
      </div>

      {/* ========================================================================= */}
      {/* Interactive Modals                                                        */}
      {/* ========================================================================= */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <ViewAllQueriesModal
        isOpen={isViewAllQueriesOpen}
        onClose={() => setIsViewAllQueriesOpen(false)}
        queries={recentQueries}
        onSelectQuery={handleSelectPrompt}
      />
    </div>
  );
}
