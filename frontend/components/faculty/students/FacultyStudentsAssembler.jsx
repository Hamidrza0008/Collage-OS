"use client";

import React, { useState, useMemo } from "react";
import StudentsHeroBanner from "./StudentsHeroBanner";
import StudentsGridSection from "./StudentsGridSection";
import StudentsFilterSidebar from "./StudentsFilterSidebar";
import TopStudentProjectsCard from "./TopStudentProjectsCard";
import StudentsQuoteCard from "./StudentsQuoteCard";
import StudentProfileModal from "./StudentProfileModal";
import { INITIAL_FACULTY_STUDENTS } from "./facultyStudentsData";

export default function FacultyStudentsAssembler() {
  const [students, setStudents] = useState(INITIAL_FACULTY_STUDENTS);

  // Filter States
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'my_classes' | 'top_projects' | 'active_now'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [skillSearch, setSkillSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [projectStatus, setProjectStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name_asc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Tab Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setCurrentPage(1);
  };

  const handleSemesterChange = (sem) => {
    setSelectedSemester(sem);
    setCurrentPage(1);
  };

  const handleSkillSearchChange = (val) => {
    setSkillSearch(val);
    setCurrentPage(1);
  };

  const handleSkillChange = (skill) => {
    setSelectedSkill(skill);
    setCurrentPage(1);
  };

  const handleProjectStatusChange = (status) => {
    setProjectStatus(status);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleResetFilters = () => {
    setSelectedBranch("All");
    setSelectedSemester("All");
    setSkillSearch("");
    setSelectedSkill("All");
    setProjectStatus("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Follow / Unfollow toggle
  const handleToggleFollow = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent((prev) =>
        prev ? { ...prev, isFollowing: !prev.isFollowing } : null
      );
    }
  };

  // Filter and Sort Pure Logic
  const filteredAndSortedStudents = useMemo(() => {
    const result = students.filter((student) => {
      // 1. Tab filter
      if (activeTab === "my_classes" && student.semester !== "Sem 5") return false;
      if (activeTab === "top_projects" && student.projectsCount < 3) return false;
      if (activeTab === "active_now" && !student.isOnline) return false;

      // 2. Branch filter
      if (selectedBranch !== "All" && student.branch !== selectedBranch) return false;

      // 3. Semester filter
      if (selectedSemester !== "All" && student.semester !== selectedSemester) return false;

      // 4. Selected Skill pill filter
      if (selectedSkill !== "All") {
        const hasSkill = student.skills.some(
          (s) => s.toLowerCase() === selectedSkill.toLowerCase()
        );
        if (!hasSkill) return false;
      }

      // 5. Skill Search text filter
      if (skillSearch.trim()) {
        const q = skillSearch.toLowerCase().trim();
        const hasMatchingSkill = student.skills.some((s) =>
          s.toLowerCase().includes(q)
        );
        if (!hasMatchingSkill) return false;
      }

      // 6. Project Status filter
      if (projectStatus === "Has Projects" && student.projectsCount === 0) return false;
      if (projectStatus === "No Projects" && student.projectsCount > 0) return false;

      // 7. General Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = student.name.toLowerCase().includes(q);
        const matchRoll = student.rollNo.toLowerCase().includes(q);
        const matchBranch = student.branch.toLowerCase().includes(q);
        const matchBio = student.bio.toLowerCase().includes(q);
        const matchSkill = student.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchRoll && !matchBranch && !matchBio && !matchSkill) {
          return false;
        }
      }

      return true;
    });

    // Sort result
    return result.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "roll_asc":
          return a.rollNo.localeCompare(b.rollNo);
        case "projects_desc":
          return b.projectsCount - a.projectsCount;
        case "likes_desc":
          return b.likesCount - a.likesCount;
        default:
          return 0;
      }
    });
  }, [
    students,
    activeTab,
    selectedBranch,
    selectedSemester,
    selectedSkill,
    skillSearch,
    projectStatus,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* 2-Column Responsive Layout matching reference screenshot */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Hero Banner + Students Section (72-75% on large screens) */}
        <div className="flex-1 w-full min-w-0 space-y-5 sm:space-y-6">
          {/* Hero Banner */}
          <StudentsHeroBanner />

          {/* Grid Section with Tabs, Search, Toolbar, 12 Cards, and Pagination */}
          <StudentsGridSection
            students={filteredAndSortedStudents}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            onSelectStudent={(stu) => setSelectedStudent(stu)}
            onToggleFollow={handleToggleFollow}
            allCount={156}
            myClassesCount={42}
            topProjectsCount={28}
            activeNowCount={12}
            onOpenFilter={() => {}}
          />
        </div>

        {/* Right Column: Utility Rail (~25-28% on xl screens) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* Card 1: Filter & Search */}
          <StudentsFilterSidebar
            selectedBranch={selectedBranch}
            onBranchChange={handleBranchChange}
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
            skillSearch={skillSearch}
            onSkillSearchChange={handleSkillSearchChange}
            selectedSkill={selectedSkill}
            onSkillChange={handleSkillChange}
            projectStatus={projectStatus}
            onProjectStatusChange={handleProjectStatusChange}
            onResetFilters={handleResetFilters}
          />

          {/* Card 2: Top Student Projects */}
          <TopStudentProjectsCard
            onViewAll={() => handleTabChange("top_projects")}
            onSelectProject={(proj) => {
              // Quick filter by project
              handleSearchChange(proj.name);
            }}
          />

          {/* Card 3: Inspirational Quote Card */}
          <StudentsQuoteCard />
        </div>
      </div>

      {/* Student Profile Drawer / Modal */}
      <StudentProfileModal
        isOpen={!!selectedStudent}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onToggleFollow={handleToggleFollow}
      />
    </div>
  );
}
