"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getProjectDetails, getRelatedProjects } from "./projectDetailsData";
import ProjectHero from "./ProjectHero";
import ProjectMetaChips from "./ProjectMetaChips";
import ProjectOverview from "./ProjectOverview";
import ProjectDocumentation from "./ProjectDocumentation";
import ProjectPreview from "./ProjectPreview";
import ProjectTechStack from "./ProjectTechStack";
import ProjectArchitecture from "./ProjectArchitecture";
import ProjectRoadmap from "./ProjectRoadmap";
import ProjectTeam from "./ProjectTeam";
import ProjectLinks from "./ProjectLinks";
import ProjectDiscussion from "./ProjectDiscussion";
import ProjectQuickFacts from "./ProjectQuickFacts";
import GithubStatsCard from "./GithubStatsCard";
import LiveDemoCtaCard from "./LiveDemoCtaCard";
import RelatedProjectsCard from "./RelatedProjectsCard";
import RequestJoinTeamModal from "./RequestJoinTeamModal";
import ReportProjectModal from "./ReportProjectModal";
import MobileActionBar from "./MobileActionBar";
import ProjectNotFound from "./ProjectNotFound";
import ProjectDetailsSkeleton from "./ProjectDetailsSkeleton";

export default function ProjectDetailsAssembler({ projectId, isLoading = false }) {
  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  const project = getProjectDetails(projectId);

  if (!project) {
    return <ProjectNotFound projectId={projectId} />;
  }

  const relatedProjects = getRelatedProjects(project.id);
  const router = useRouter();

  // Interactive States
  const [isLiked, setIsLiked] = useState(Boolean(project.isLiked));
  const [likesCount, setLikesCount] = useState(project.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(Boolean(project.isBookmarked));
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      setLikesCount((curr) => (next ? curr + 1 : Math.max(0, curr - 1)));
      showToast(next ? "Project starred! Added to your liked list." : "Removed star from project.");
      return next;
    });
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      showToast(next ? "Project bookmarked to your saved items." : "Project removed from bookmarks.");
      return next;
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
    showToast("Project link copied to clipboard.");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: project.title,
        text: project.tagline || project.description,
        url: window.location.href,
      }).catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  const handleJoinSubmit = ({ role }) => {
    showToast(`Join request for "${role}" sent to project lead!`);
  };

  const handleReportSubmit = ({ reason }) => {
    showToast(`Report received for "${reason}". Campus admins will review.`);
  };

  const handleMemberClick = (member) => {
    if (!member) return;
    const studentId = member.id || (member.name ? member.name.toLowerCase().replace(/\s+/g, "-") : "student-1");
    router.push(`/student/profile/${studentId}`);
  };

  const handleJumpToComments = () => {
    const el = document.getElementById("project-discussion");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-16 lg:pb-12 space-y-4">
      {/* Compact Back Navigation Action */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* MASTER 2-COLUMN GRID (Left ~2/3 Main Content + Right ~1/3 Sticky Sidebar) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN COLUMN (lg:col-span-8): Hero, Overview, Docs, Previews, Tech, Team... */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Project Hero Banner & Top Actions */}
          <ProjectHero
            project={project}
            isLiked={isLiked}
            likesCount={likesCount}
            onToggleLike={handleToggleLike}
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
            onOpenJoinModal={() => setIsJoinModalOpen(true)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onCopyLink={handleCopyLink}
            onShare={handleShare}
          />

          {/* 2. Metadata Chips */}
          <ProjectMetaChips project={project} />

          {/* 3. Project Overview / Problem & Solution */}
          <ProjectOverview
            overview={project.overview}
            projectTitle={project.title}
          />

          {/* 4. README & Technical Documentation */}
          <ProjectDocumentation documentation={project.documentation} />

          {/* 5. Live Showcase & Interface Previews */}
          <ProjectPreview
            previews={project.previews}
            demoUrl={project.demoUrl}
            githubUrl={project.githubUrl}
          />

          {/* 6. Tech Stack & Architectural Modules */}
          <ProjectTechStack techStack={project.techStack} />

          {/* 7. System Architecture Diagram */}
          <ProjectArchitecture architecture={project.architecture} />

          {/* 8. Project Roadmap & Releases */}
          <ProjectRoadmap roadmap={project.roadmap} />

          {/* 9. Project Team & Contributions */}
          <ProjectTeam
            team={project.team}
            contributionsBreakdown={project.contributionsBreakdown}
            onMemberClick={handleMemberClick}
            onOpenJoinModal={() => setIsJoinModalOpen(true)}
          />

          {/* 10. Official Links & Repositories */}
          <ProjectLinks links={project.links} />

          {/* 11. Discussion & Peer Reviews */}
          <ProjectDiscussion
            initialComments={project.discussion}
            onMemberClick={handleMemberClick}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDEBAR (lg:col-span-4): Sticky on desktop, starts at Hero level    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* 1. Project Quick Facts */}
          <ProjectQuickFacts project={project} />

          {/* 2. GitHub Stats Card */}
          <GithubStatsCard
            stats={project.githubStats}
            githubUrl={project.githubUrl}
          />

          {/* 3. Live Demo CTA Card */}
          <LiveDemoCtaCard demoUrl={project.demoUrl} />

          {/* 4. Related Projects */}
          <RelatedProjectsCard relatedProjects={relatedProjects} />
        </div>
      </div>

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#06241F] text-white dark:bg-[#20D39B] dark:text-[#06241F] text-xs font-semibold shadow-xl border border-white/10 dark:border-black/10 animate-fade-in pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#06241F] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileActionBar
        isLiked={isLiked}
        likesCount={likesCount}
        onToggleLike={handleToggleLike}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
        demoUrl={project.demoUrl}
        onJumpToComments={handleJumpToComments}
      />

      {/* Request to Join Team Modal */}
      <RequestJoinTeamModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        projectTitle={project.title}
        onSubmit={handleJoinSubmit}
      />

      {/* Report Project Modal */}
      <ReportProjectModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        projectTitle={project.title}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
