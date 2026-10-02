// ─────────────────────────────────────────────────────────────────────────────
// subjectCatalogData.js
// Aggregated course catalog dataset sourced strictly from existing academic records
// (SUBJECT_DETAILS_MAP and SEMESTER_DATA) with ZERO fabricated courses.
// ─────────────────────────────────────────────────────────────────────────────

import { SUBJECT_DETAILS_MAP } from "@/components/academics/subject-details/subjectDetailsData";
import { SEMESTER_DATA } from "@/components/academics/grade-card/gradeCardData";

/**
 * Normalizes subject records across semesters into a consistent catalog format.
 */
function buildCatalog() {
  const catalog = [];
  const addedSlugs = new Set();

  // 1. First add rich Sem 7 subjects from SUBJECT_DETAILS_MAP
  Object.entries(SUBJECT_DETAILS_MAP).forEach(([slug, details]) => {
    addedSlugs.add(slug);
    catalog.push({
      id: details.id || `cat-${slug}`,
      code: details.code,
      slug: slug,
      name: details.name,
      fullName: details.fullName || details.name,
      credits: details.credits || 4,
      semester: details.semester || 7,
      type: details.type || "Theory",
      icon: details.icon || "code",
      color: details.color || "emerald",
      department: details.department || "Computer Science & Engineering",
      status: "In Progress",
      currentGrade: details.currentGrade || null,
      progress: details.progress || null,
      facultyName: details.faculty?.name || null,
      totalLectures: details.totalLectures || null,
      hasDetails: true,
    });
  });

  // 2. Add subjects from SEMESTER_DATA across all semesters (Sem 1 to 8)
  if (Array.isArray(SEMESTER_DATA)) {
    SEMESTER_DATA.forEach((sem) => {
      const semNumber = sem.number;
      const semStatus = sem.status; // "Completed" | "In Progress" | "Result Pending"

      if (Array.isArray(sem.subjects)) {
        sem.subjects.forEach((sub) => {
          // If already added via SUBJECT_DETAILS_MAP, skip duplicate
          if (addedSlugs.has(sub.slug)) return;
          addedSlugs.add(sub.slug);

          // Infer subject category from code or name
          let type = "Theory";
          let icon = "book";
          if (sub.code.toLowerCase().startsWith("lab") || sub.name.toLowerCase().includes("lab")) {
            type = "Practical";
            icon = "flask";
          } else if (sub.name.toLowerCase().includes("project") || sub.name.toLowerCase().includes("capstone")) {
            type = "Project";
            icon = "laptop";
          } else if (sub.code.startsWith("OEC") || sub.name.toLowerCase().includes("elective")) {
            type = "Elective";
            icon = "star";
          } else if (sub.code.startsWith("BS-")) {
            icon = "calculator";
          } else if (sub.code.startsWith("ES-")) {
            icon = "cpu";
          } else if (sub.code.startsWith("CSE-")) {
            icon = "code";
          }

          // Department mapping
          let department = "Computer Science & Engineering";
          if (sub.code.startsWith("BS-")) {
            department = "Basic Sciences & Humanities";
          } else if (sub.code.startsWith("ES-")) {
            department = "Engineering Sciences";
          } else if (sub.code.startsWith("OEC-")) {
            department = "Interdisciplinary Studies";
          }

          catalog.push({
            id: `cat-${semNumber}-${sub.slug || sub.code}`,
            code: sub.code,
            slug: sub.slug || sub.code,
            name: sub.name,
            fullName: sub.name,
            credits: sub.credits || 3,
            semester: semNumber,
            type,
            icon,
            color: type === "Practical" ? "teal" : type === "Project" ? "indigo" : "emerald",
            department,
            status: semStatus === "Completed" ? "Completed" : semStatus === "In Progress" ? "In Progress" : "Upcoming",
            currentGrade: sub.grade && sub.grade !== "I" ? sub.grade : null,
            progress: semStatus === "Completed" ? 100 : semStatus === "In Progress" ? 85 : 0,
            facultyName: null,
            totalLectures: null,
            hasDetails: Boolean(SUBJECT_DETAILS_MAP[sub.slug]),
          });
        });
      }
    });
  }

  // Sort by semester descending (current first, then previous), then by code
  catalog.sort((a, b) => {
    if (b.semester !== a.semester) return b.semester - a.semester;
    return a.code.localeCompare(b.code);
  });

  return catalog;
}

export const CATALOG_SUBJECTS = buildCatalog();

export const CATALOG_SEMESTERS = [
  { value: "all", label: "All Semesters" },
  { value: "7", label: "Sem 7 (Current)" },
  { value: "8", label: "Sem 8 (Upcoming)" },
  { value: "6", label: "Sem 6" },
  { value: "5", label: "Sem 5" },
  { value: "4", label: "Sem 4" },
  { value: "3", label: "Sem 3" },
  { value: "2", label: "Sem 2" },
  { value: "1", label: "Sem 1" },
];

export const CATALOG_TYPES = [
  { value: "all", label: "All Types" },
  { value: "Theory", label: "Theory" },
  { value: "Practical", label: "Practical / Lab" },
  { value: "Project", label: "Projects & Thesis" },
  { value: "Elective", label: "Open Electives" },
];

export const CATALOG_DEPARTMENTS = [
  { value: "all", label: "All Departments" },
  { value: "Computer Science & Engineering", label: "Computer Science & Engineering" },
  { value: "Basic Sciences & Humanities", label: "Basic Sciences & Humanities" },
  { value: "Engineering Sciences", label: "Engineering Sciences" },
  { value: "Interdisciplinary Studies", label: "Interdisciplinary Studies" },
];
