"use client";

import { useState, useEffect } from "react";
import CampusAIHero from "./CampusAIHero";
import AIModeTabs from "./AIModeTabs";
import AIConversation from "./AIConversation";
import QuickPrompts from "./QuickPrompts";
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
  // Page Loading State (Brief realistic mount shimmer)
  const [isLoading, setIsLoading] = useState(true);

  // Active Mode & Context Scope
  const [activeTab, setActiveTab] = useState("chat");
  const [assistantMode, setAssistantMode] = useState("Campus AI");
  const [contextScope, setContextScope] = useState("College Data");

  // Mode Toggles in Composer
  const [collegeKnowledgeEnabled, setCollegeKnowledgeEnabled] = useState(true);
  const [generalAIEnabled, setGeneralAIEnabled] = useState(true);

  // Chat Conversation State
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  // Recent Queries History
  const [recentQueries, setRecentQueries] = useState(INITIAL_RECENT_QUERIES);

  // Modals
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isViewAllQueriesOpen, setIsViewAllQueriesOpen] = useState(false);

  // Simulate fast initial load for smooth skeleton showcase
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Handle User Message Submission
  const handleSendMessage = (text, attachment = null) => {
    if (!text.trim() && !attachment) return;

    // Switch to Chat tab if not already active
    if (activeTab !== "chat") {
      setActiveTab("chat");
    }

    const userMessageId = `user_${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: "user",
      text,
      attachment,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Prepend to Recent Queries
    setRecentQueries((prev) => [
      {
        id: `rq_${Date.now()}`,
        question: text,
        timeAgo: "Just now",
        sourceType: "auto",
        sourceLabel: "Campus AI",
      },
      ...prev.filter((q) => q.question.toLowerCase() !== text.toLowerCase()).slice(0, 7),
    ]);

    // Simulate AI generation thinking time
    setTimeout(() => {
      const responseData = generateCampusAIResponse(text, {
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
        originalQuery: text,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 750);
  };

  // Re-run or submit prompt
  const handleSelectPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  // Retry failed query
  const handleRetry = (originalQuery) => {
    if (originalQuery) {
      handleSendMessage(originalQuery);
    }
  };

  // Start new chat from CTA
  const handleStartChat = () => {
    setActiveTab("chat");
    // Scroll composer into view
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // When clicking "Ask Campus AI" from Knowledge / Documents / Policies tab
  const handleAskAboutKnowledgeItem = (itemTitle) => {
    const query = `Tell me about: ${itemTitle}`;
    setActiveTab("chat");
    handleSendMessage(query);
  };

  if (isLoading) {
    return <CampusAISkeleton />;
  }

  return (
    <div className="w-full pb-10 transition-colors">
      {/* ========================================================================= */}
      {/* 2-COLUMN GRID: MAIN 2/3 COLUMN + RIGHT 1/3 SIDEBAR                        */}
      {/* Established College OS Layout Rule: Sidebar starts at same level as Hero   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Tabs + Conversation / Knowledge + Composer + Footer */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          {/* 1. Campus AI Hero Banner (Strictly 2/3 Column) */}
          <CampusAIHero />

          {/* 2. Mode Navigation Tabs + Dropdowns */}
          <AIModeTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            assistantMode={assistantMode}
            onAssistantModeChange={setAssistantMode}
            contextScope={contextScope}
            onContextScopeChange={setContextScope}
          />

          {/* 3. Conditional Content: Chat vs Knowledge/Document/Guidelines/Policies */}
          {activeTab === "chat" ? (
            <div className="space-y-4">
              {/* Primary Chat Conversation Area */}
              <AIConversation
                messages={messages}
                isThinking={isThinking}
                onSelectPrompt={handleSelectPrompt}
                onSwitchTab={setActiveTab}
                onRetry={handleRetry}
              />

              {/* Quick Prompts (2x2 Grid) */}
              <QuickPrompts
                onSelectPrompt={handleSelectPrompt}
                onViewAll={() => setIsViewAllQueriesOpen(true)}
              />

              {/* AI Composer with Attachment, Send, and Toggles */}
              <AIComposer
                onSendMessage={handleSendMessage}
                isThinking={isThinking}
                collegeKnowledgeEnabled={collegeKnowledgeEnabled}
                onToggleCollegeKnowledge={setCollegeKnowledgeEnabled}
                generalAIEnabled={generalAIEnabled}
                onToggleGeneralAI={setGeneralAIEnabled}
              />

              {/* AI Data Source Footer Banner */}
              <AIDataSourceFooter />
            </div>
          ) : (
            /* Context-Aware Knowledge / Documents / Guidelines / Policies Catalog */
            <KnowledgePanel
              activeTab={activeTab}
              onAskAboutItem={handleAskAboutKnowledgeItem}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at SAME TOP LEVEL beside Hero                    */}
        {/* Stack: How Campus AI Works -> Sample Questions -> Recent Queries -> CTA    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. How Campus AI Works */}
          <HowCampusAIWorks onLearnMore={() => setIsHowItWorksOpen(true)} />

          {/* 2. Sample Questions */}
          <SampleQuestions onSelectQuestion={handleSelectPrompt} />

          {/* 3. Recent Queries */}
          <RecentQueries
            queries={recentQueries}
            onSelectQuery={handleSelectPrompt}
            onViewAll={() => setIsViewAllQueriesOpen(true)}
          />

          {/* 4. Campus AI CTA Card */}
          <CampusAICta onStartChat={handleStartChat} />
        </div>
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
