"use client";

import { useState, useMemo } from "react";
import SubjectCatalogHeader from "./SubjectCatalogHeader";
import SubjectCatalogFilters from "./SubjectCatalogFilters";
import SubjectCatalogGrid from "./SubjectCatalogGrid";
import { CATALOG_SUBJECTS } from "./subjectCatalogData";

export default function SubjectCatalogAssembler() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Summary counts
  const totalCount = CATALOG_SUBJECTS.length;
  const currentCount = useMemo(
    () => CATALOG_SUBJECTS.filter((s) => s.semester === 7).length,
    []
  );
  const completedCount = useMemo(
    () => CATALOG_SUBJECTS.filter((s) => s.status === "Completed").length,
    []
  );

  // Filter evaluation
  const filteredSubjects = useMemo(() => {
    return CATALOG_SUBJECTS.filter((subject) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesCode = subject.code.toLowerCase().includes(query);
        const matchesName = subject.name.toLowerCase().includes(query);
        const matchesDept = subject.department.toLowerCase().includes(query);
        const matchesFullName = subject.fullName?.toLowerCase().includes(query);
        if (!matchesCode && !matchesName && !matchesDept && !matchesFullName) {
          return false;
        }
      }

      // 2. Semester Filter
      if (selectedSemester !== "all") {
        if (String(subject.semester) !== String(selectedSemester)) {
          return false;
        }
      }

      // 3. Type Filter
      if (selectedType !== "all") {
        if (subject.type !== selectedType) {
          return false;
        }
      }

      // 4. Department Filter
      if (selectedDepartment !== "all") {
        if (subject.department !== selectedDepartment) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSemester, selectedType, selectedDepartment]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      selectedSemester !== "all" ||
      selectedType !== "all" ||
      selectedDepartment !== "all"
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSemester("all");
    setSelectedType("all");
    setSelectedDepartment("all");
  };

  return (
    <div className="w-full min-h-screen py-6 space-y-5">
      {/* 1. Catalog Page Header */}
      <SubjectCatalogHeader
        totalCount={totalCount}
        currentCount={currentCount}
        completedCount={completedCount}
      />

      {/* 2. Interactive Search & Filters */}
      <SubjectCatalogFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSemester={selectedSemester}
        onSemesterChange={setSelectedSemester}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        resultCount={filteredSubjects.length}
      />

      {/* 3. Responsive Subjects Grid */}
      <SubjectCatalogGrid
        subjects={filteredSubjects}
        onResetFilters={hasActiveFilters ? handleResetFilters : null}
      />
    </div>
  );
}
