"use client";

import { useState, useMemo } from "react";
import ProjectsHero from "./ProjectsHero";
import ProjectTabsAndFilters from "./ProjectTabsAndFilters";
import ProjectCategories from "./ProjectCategories";
import ProjectGrid from "./ProjectGrid";
import ProjectPagination from "./ProjectPagination";
import ProjectStatsCard from "./ProjectStatsCard";
import TopProjectsCard from "./TopProjectsCard";
import ProjectQuickActionsCard from "./ProjectQuickActionsCard";
import CollaborationCard from "./CollaborationCard";
import ProjectIdeaCta from "./ProjectIdeaCta";
import ProjectDetailsModal from "./ProjectDetailsModal";
import CreateProjectModal from "./CreateProjectModal";
import ProjectsSkeleton from "./ProjectsSkeleton";
import { INITIAL_PROJECTS, CURRENT_STUDENT } from "./projectsData";
import { CheckCircle2 } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function Projects({ isLoading = false }) {
  // Master projects dataset state
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // Filter & Toolbar States
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'my-projects' | 'liked' | 'my-team'
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'most-liked' | 'most-discussed' | 'oldest'
  const [currentPage, setCurrentPage] = useState(1);

  // Interaction States: Likes & Bookmarks
  const [likedIds, setLikedIds] = useState(
    new Set(INITIAL_PROJECTS.filter((p) => p.isLiked).map((p) => p.id))
  );
  const [bookmarkedIds, setBookmarkedIds] = useState(
    new Set(INITIAL_PROJECTS.filter((p) => p.isBookmarked).map((p) => p.id))
  );

  // Modal States
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isIdeaMode, setIsIdeaMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Dynamic counts for tab badges
  const counts = useMemo(() => {
    const all = projects.length;
    const my = projects.filter(
      (p) => p.isMyProject || p.author === CURRENT_STUDENT.name
    ).length;
    const liked = likedIds.size;
    const team = projects.filter(
      (p) =>
        p.isTeamProject &&
        p.members?.some((m) => m.name === CURRENT_STUDENT.name)
    ).length;
    return { all, my, liked, team };
  }, [projects, likedIds]);

  // Derived stats for ProjectStatsCard
  const projectStats = useMemo(() => {
    const totalProjects = Math.max(48, projects.length);
    const myProjects = Math.max(12, counts.my);
    const totalTeams = Math.max(28, counts.team);
    const totalLikes = 156 + (likedIds.size - 3);
    return { totalProjects, myProjects, totalTeams, totalLikes };
  }, [projects.length, counts.my, counts.team, likedIds.size]);

  // =========================================================================
  // Strict Filter Pipeline: Tab -> Branch -> Category -> Search -> Sort
  // =========================================================================
  const filteredAndSortedProjects = useMemo(() => {
    // 1. Tab Filter
    let list = projects.filter((project) => {
      if (activeTab === "my-projects") {
        return project.isMyProject || project.author === CURRENT_STUDENT.name;
      }
      if (activeTab === "liked") {
        return likedIds.has(project.id);
      }
      if (activeTab === "my-team") {
        return (
          project.isTeamProject &&
          project.members?.some((m) => m.name === CURRENT_STUDENT.name)
        );
      }
      return true; // "all"
    });

    // 2. Branch Filter
    if (selectedBranch !== "all") {
      list = list.filter(
        (p) => p.branch?.toLowerCase() === selectedBranch.toLowerCase()
      );
    }

    // 3. Category Filter
    if (selectedCategory !== "All") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 4. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchBranch = p.branch?.toLowerCase().includes(q);
        const matchTech = p.tech?.some((t) => t.toLowerCase().includes(q));
        const matchMembers = p.members?.some((m) =>
          m.name.toLowerCase().includes(q)
        );
        return (
          matchTitle ||
          matchDesc ||
          matchCat ||
          matchBranch ||
          matchTech ||
          matchMembers
        );
      });
    }

    // 5. Sorting
    list = [...list].sort((a, b) => {
      if (sortBy === "most-liked") {
        return b.likes - a.likes;
      }
      if (sortBy === "most-discussed") {
        const commA = a.commentsCount || (a.comments ? a.comments.length : 0);
        const commB = b.commentsCount || (b.comments ? b.comments.length : 0);
        return commB - commA;
      }
      if (sortBy === "oldest") {
        return (a.timestamp || 0) - (b.timestamp || 0);
      }
      // 'latest' default
      return (b.timestamp || 0) - (a.timestamp || 0);
    });

    return list;
  }, [projects, activeTab, selectedBranch, selectedCategory, searchQuery, sortBy, likedIds]);

  // =========================================================================
  // Real Pagination Derivations (Strict max 9 per page)
  // =========================================================================
  const totalPages = Math.ceil(filteredAndSortedProjects.length / ITEMS_PER_PAGE);
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedProjects = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProjects, safeCurrentPage]);

  // =========================================================================
  // Handlers with mandatory Page 1 Reset
  // =========================================================================
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedBranch("all");
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("latest");
    setCurrentPage(1);
    showToast("Reset all project filters");
  };

  // Interactions: Like toggle
  const handleToggleLike = (projectId) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      const isAlreadyLiked = next.has(projectId);

      if (isAlreadyLiked) {
        next.delete(projectId);
        showToast("Removed project from your likes");
      } else {
        next.add(projectId);
        showToast("Added project to your liked list! ❤️");
      }

      // Update likes count on project
      setProjects((currentProjects) =>
        currentProjects.map((p) => {
          if (p.id === projectId) {
            return {
              ...p,
              likes: isAlreadyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
            };
          }
          return p;
        })
      );

      return next;
    });
  };

  // Interactions: Bookmark toggle
  const handleToggleBookmark = (projectId) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
        showToast("Project removed from bookmarks");
      } else {
        next.add(projectId);
        showToast("Project bookmarked successfully! 🔖");
      }
      return next;
    });
  };

  // Interactions: Add Comment
  const handleAddComment = (projectId, commentText) => {
    const newCommentObj = {
      id: `c-${Date.now()}`,
      author: CURRENT_STUDENT.name,
      text: commentText,
      time: "Just now",
    };

    setProjects((currentProjects) =>
      currentProjects.map((p) => {
        if (p.id === projectId) {
          const updatedComments = [...(p.comments || []), newCommentObj];
          return {
            ...p,
            comments: updatedComments,
            commentsCount: updatedComments.length,
          };
        }
        return p;
      })
    );

    // Keep selectedProject in sync
    setSelectedProject((prev) => {
      if (prev && prev.id === projectId) {
        const updated = [...(prev.comments || []), newCommentObj];
        return {
          ...prev,
          comments: updated,
          commentsCount: updated.length,
        };
      }
      return prev;
    });

    showToast("Comment posted successfully!");
  };

  // Quick Action Handler
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "create-project":
        setIsIdeaMode(false);
        setIsCreateModalOpen(true);
        break;
      case "browse-all":
        handleResetFilters();
        break;
      case "my-projects":
        handleTabChange("my-projects");
        break;
      case "my-team":
        handleTabChange("my-team");
        break;
      case "view-liked":
        handleTabChange("liked");
        break;
      case "project-ideas":
        setIsIdeaMode(true);
        setIsCreateModalOpen(true);
        break;
      default:
        break;
    }
  };

  // Project Creation Callback
  const handleProjectCreated = (newProject, isIdea) => {
    setProjects((prev) => [newProject, ...prev]);
    setActiveTab("my-projects");
    setCurrentPage(1);
    showToast(
      isIdea
        ? `Project idea "${newProject.title}" posted to student feed!`
        : `Project "${newProject.title}" published successfully!`
    );
  };

  const handleSelectSidebarProject = (projId) => {
    const found = projects.find((p) => p.id === projId);
    if (found) {
      setSelectedProject(found);
    }
  };

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  return (
    <div className="w-full min-h-screen pb-12 transition-colors">
      {/* ========================================================================= */}
      {/* Master 2-Column Desktop Grid: Main 2/3 + Right Sidebar 1/3                */}
      {/* Both columns start at the EXACT SAME TOP VERTICAL LEVEL                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* MAIN 2/3 COLUMN: Hero + Tabs + Categories + 3-Col Grid + Pagination + CTA */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Projects Hero (Restricted strictly to 2/3 column) */}
          <ProjectsHero />

          {/* 2. Navigation Tabs + Search + Branch Dropdown */}
          <ProjectTabsAndFilters
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedBranch={selectedBranch}
            onBranchChange={handleBranchChange}
            counts={counts}
          />

          {/* 3. Category Filter Chips + Sort Dropdown */}
          <ProjectCategories
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          {/* 4. Three-Column Project Cards Grid (Paginated max 9 per page) */}
          <div id="projects-grid-container" className="space-y-4">
            <ProjectGrid
              projects={paginatedProjects}
              activeTab={activeTab}
              searchQuery={searchQuery}
              onViewDetails={(proj) => setSelectedProject(proj)}
              onToggleLike={handleToggleLike}
              onToggleBookmark={handleToggleBookmark}
              likedIds={likedIds}
              bookmarkedIds={bookmarkedIds}
              onResetFilters={handleResetFilters}
              onOpenCreateModal={() => {
                setIsIdeaMode(false);
                setIsCreateModalOpen(true);
              }}
            />

            {/* 5. Real Pagination (Hidden when filtered items <= 9) */}
            {filteredAndSortedProjects.length > ITEMS_PER_PAGE && (
              <ProjectPagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedProjects.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  const el = document.getElementById("projects-grid-container");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            )}
          </div>

          {/* 6. Have a Project Idea CTA Banner */}
          <ProjectIdeaCta
            onOpenModal={() => {
              setIsIdeaMode(true);
              setIsCreateModalOpen(true);
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT 1/3 SIDEBAR: Starts at TOP level beside Projects Hero               */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Project Stats Card */}
          <ProjectStatsCard
            stats={projectStats}
            onViewAll={() => handleTabChange("all")}
          />

          {/* 2. Top Projects (This Week) Card */}
          <TopProjectsCard
            onSelectProject={handleSelectSidebarProject}
            onViewAll={() => {
              handleSortChange("most-liked");
              const el = document.getElementById("projects-grid-container");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />

          {/* 3. Quick Actions Card */}
          <ProjectQuickActionsCard onAction={handleQuickAction} />

          {/* 4. Collaboration CTA Card */}
          <CollaborationCard
            onExplore={() => {
              handleResetFilters();
              const el = document.getElementById("projects-grid-container");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Interactive Modals & Toast Notification                                    */}
      {/* ========================================================================= */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          isLiked={likedIds.has(selectedProject.id)}
          isBookmarked={bookmarkedIds.has(selectedProject.id)}
          onAddComment={handleAddComment}
        />
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleProjectCreated}
        isIdeaMode={isIdeaMode}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
