// =============================================================================
// College OS - Projects Persistence Store & Canonical State Layer
// Synchronizes project listing, project details, user profile, and saved items.
// =============================================================================

import { INITIAL_PROJECTS, CURRENT_STUDENT } from "./projectsData";

export const PROJECTS_STORAGE_KEY = "college_os_projects_v1";
export const PROJECT_DETAILS_STORAGE_KEY = "college_os_project_details_v1";
export const PROJECTS_UPDATED_EVENT = "college_os_projects_updated";

/**
 * Canonical student roster for collaborator management across College OS.
 * Sourced from verified public profiles, campus directory, and department records.
 */
export const CANONICAL_STUDENT_ROSTER = [
  {
    id: "student-1",
    studentId: "student-hamid",
    name: "Hamid Rza",
    username: "@hamidrza",
    rollNumber: "22CS087",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Sem",
    avatar: "/assets/layout/profile-avatar.jpg",
    defaultRole: "Lead Full-Stack Developer",
    isCurrentUser: true,
  },
  {
    id: "student-2",
    studentId: "student-priya",
    name: "Priya Patel",
    username: "@priyapatel",
    rollNumber: "22CS091",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-1.jpg",
    defaultRole: "UI/UX Designer",
    isCurrentUser: false,
  },
  {
    id: "student-3",
    studentId: "student-aryan",
    name: "Aryan Verma",
    username: "@aryanverma",
    rollNumber: "22CS104",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-2.jpg",
    defaultRole: "Backend & Cloud Engineer",
    isCurrentUser: false,
  },
  {
    id: "student-4",
    studentId: "student-aditya",
    name: "Aditya Singh",
    username: "@adityasingh",
    rollNumber: "22EC055",
    department: "Electronics & Communication",
    branch: "ECE",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-2.jpg",
    defaultRole: "Embedded & IoT Developer",
    isCurrentUser: false,
  },
  {
    id: "student-5",
    studentId: "student-ananya",
    name: "Ananya Sharma",
    username: "@ananyasharma",
    rollNumber: "23DS019",
    department: "Data Science & AI",
    branch: "DS",
    semester: "5th Sem",
    avatar: "/assets/events/avatars/avatar-1.jpg",
    defaultRole: "Data Scientist & ML Researcher",
    isCurrentUser: false,
  },
  {
    id: "student-6",
    studentId: "student-rohan",
    name: "Rohan Deshmukh",
    username: "@rohandeshmukh",
    rollNumber: "23CS076",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "5th Sem",
    avatar: "/assets/events/avatars/avatar-3.jpg",
    defaultRole: "Mobile App Developer",
    isCurrentUser: false,
  },
  {
    id: "student-7",
    studentId: "student-neha",
    name: "Neha Gupta",
    username: "@nehagupta",
    rollNumber: "23IT042",
    department: "Information Technology",
    branch: "IT",
    semester: "5th Sem",
    avatar: "/assets/events/avatars/avatar-4.jpg",
    defaultRole: "Frontend Developer",
    isCurrentUser: false,
  },
  {
    id: "student-8",
    studentId: "student-vikram",
    name: "Vikram Joshi",
    username: "@vikramjoshi",
    rollNumber: "22CS014",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-3.jpg",
    defaultRole: "DevOps & Cloud Engineer",
    isCurrentUser: false,
  },
  {
    id: "student-9",
    studentId: "student-kavya",
    name: "Kavya Menon",
    username: "@kavyamenon",
    rollNumber: "22CS058",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-1.jpg",
    defaultRole: "ML & Data Engineer",
    isCurrentUser: false,
  },
  {
    id: "student-10",
    studentId: "student-sameer",
    name: "Sameer Sen",
    username: "@sameersen",
    rollNumber: "22IT033",
    department: "Information Technology",
    branch: "IT",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-2.jpg",
    defaultRole: "Systems & Security Analyst",
    isCurrentUser: false,
  },
];

/**
 * Evaluates whether the current student is the verified author or lead owner of a project.
 */
export function isProjectOwner(project, studentName = CURRENT_STUDENT.name) {
  if (!project) return false;

  // Direct boolean flags
  if (project.isMyProject) return true;

  // Author match
  if (project.author && project.author.toLowerCase() === studentName.toLowerCase()) {
    return true;
  }

  // Check in project members / team array
  const teamList = project.team || project.members || [];
  const foundUser = teamList.find(
    (m) =>
      (m.name && m.name.toLowerCase() === studentName.toLowerCase()) ||
      m.id === "student-1" ||
      m.id === "student-hamid"
  );

  if (foundUser) {
    if (foundUser.isLead) return true;
    const roleLower = (foundUser.role || "").toLowerCase();
    if (
      roleLower.includes("lead") ||
      roleLower.includes("creator") ||
      roleLower.includes("author") ||
      roleLower.includes("owner")
    ) {
      return true;
    }
  }

  // Fallback: proj-1 is canonically owned by Hamid Rza in College OS
  if (project.id === "proj-1" || project.slug === "college-os") {
    return true;
  }

  return false;
}

/**
 * Retrieves the stored projects summary list from localStorage, falling back to INITIAL_PROJECTS.
 */
export function getStoredProjects() {
  if (typeof window === "undefined") {
    return INITIAL_PROJECTS;
  }

  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) {
      return INITIAL_PROJECTS;
    }
    const stored = JSON.parse(raw);
    if (!Array.isArray(stored) || stored.length === 0) {
      return INITIAL_PROJECTS;
    }

    // Merge stored projects with INITIAL_PROJECTS to ensure no deletions occurred
    const storedMap = new Map(stored.map((p) => [p.id, p]));
    const merged = stored.slice();

    // Ensure any INITIAL_PROJECTS not in stored are retained
    INITIAL_PROJECTS.forEach((initP) => {
      if (!storedMap.has(initP.id)) {
        merged.push(initP);
      }
    });

    return merged;
  } catch (err) {
    console.error("Error reading stored projects:", err);
    return INITIAL_PROJECTS;
  }
}

/**
 * Retrieves stored detailed project overrides from localStorage.
 */
export function getStoredProjectDetailsMap() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(PROJECT_DETAILS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Error reading stored project details map:", err);
    return {};
  }
}

/**
 * Saves an edited project to the canonical storage layer.
 * Updates both the summary listing and the detailed representation.
 */
export function saveProject(updatedData) {
  if (!updatedData || !updatedData.id) {
    return { success: false, error: "Project ID is required." };
  }

  if (typeof window === "undefined") {
    return { success: false, error: "Cannot save project outside browser environment." };
  }

  try {
    // 1. Load current stored projects
    const currentProjects = getStoredProjects();
    const existingIndex = currentProjects.findIndex((p) => p.id === updatedData.id);

    // Prepare updated summary
    const techArray = Array.isArray(updatedData.tech)
      ? updatedData.tech
      : typeof updatedData.techStack === "string"
      ? updatedData.techStack.split(",").map((s) => s.trim()).filter(Boolean)
      : Array.isArray(updatedData.techStack)
      ? updatedData.techStack.map((t) => (typeof t === "string" ? t : t.name))
      : ["React", "Node.js"];

    const membersArray = Array.isArray(updatedData.members)
      ? updatedData.members
      : Array.isArray(updatedData.team)
      ? updatedData.team.map((m) => ({
          name: m.name,
          avatar: m.avatar || "/assets/layout/profile-avatar.jpg",
          role: m.role || "Member",
        }))
      : [];

    const summaryUpdate = {
      ...(existingIndex >= 0 ? currentProjects[existingIndex] : {}),
      id: updatedData.id,
      title: updatedData.title.trim(),
      category: updatedData.category || "Web Development",
      description: updatedData.description?.trim() || updatedData.tagline?.trim() || "",
      tech: techArray,
      type: updatedData.type || "Team Project",
      membersCount: membersArray.length || 1,
      members: membersArray,
      githubUrl: updatedData.githubUrl ? updatedData.githubUrl.trim() : "",
      demoUrl: updatedData.demoUrl ? updatedData.demoUrl.trim() : "",
      status: updatedData.status || "In Development",
      visibility: updatedData.visibility || "Public",
      updatedAt: "Just now",
      timestamp: Date.now(),
      author: updatedData.author || CURRENT_STUDENT.name,
      isMyProject: true,
      highlights: updatedData.highlights || [],
    };

    let updatedProjectsList;
    if (existingIndex >= 0) {
      updatedProjectsList = [...currentProjects];
      updatedProjectsList[existingIndex] = summaryUpdate;
    } else {
      updatedProjectsList = [summaryUpdate, ...currentProjects];
    }

    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjectsList));

    // 2. Update detailed project records in PROJECT_DETAILS_STORAGE_KEY
    const detailsMap = getStoredProjectDetailsMap();
    const existingDetail = detailsMap[updatedData.id] || {};

    const fullDetailUpdate = {
      ...existingDetail,
      ...updatedData,
      id: updatedData.id,
      title: updatedData.title.trim(),
      tagline: updatedData.description?.trim() || updatedData.tagline?.trim() || "",
      category: updatedData.category || "Web Development",
      type: updatedData.type || "Team Project",
      status: updatedData.status || "In Development",
      visibility: updatedData.visibility || "Public",
      githubUrl: updatedData.githubUrl ? updatedData.githubUrl.trim() : "",
      demoUrl: updatedData.demoUrl ? updatedData.demoUrl.trim() : "",
      docUrl: updatedData.docUrl ? updatedData.docUrl.trim() : "",
      updatedAt: "Just now",
      tech: techArray,
      techStack: techArray.map((t) => ({
        name: t,
        category: "Core Technology",
        type: "tech",
        badge: t,
      })),
      team: Array.isArray(updatedData.team) ? updatedData.team : membersArray,
      overview: {
        ...(existingDetail.overview || {}),
        problem: updatedData.overview?.problem || updatedData.problem || "",
        solution: updatedData.overview?.solution || updatedData.solution || updatedData.description || "",
        highlights: updatedData.highlights || existingDetail.overview?.highlights || [],
      },
    };

    detailsMap[updatedData.id] = fullDetailUpdate;
    localStorage.setItem(PROJECT_DETAILS_STORAGE_KEY, JSON.stringify(detailsMap));

    // 3. Dispatch broadcast event for real-time reactivity across active tabs & components
    window.dispatchEvent(
      new CustomEvent(PROJECTS_UPDATED_EVENT, {
        detail: {
          projectId: updatedData.id,
          project: fullDetailUpdate,
          summary: summaryUpdate,
        },
      })
    );

    return { success: true, project: fullDetailUpdate };
  } catch (err) {
    console.error("Error saving project:", err);
    return { success: false, error: err.message || "Failed to persist project changes." };
  }
}

/**
 * Saves a newly created project from CreateProjectModal into canonical storage.
 */
export function saveNewProject(newProject) {
  if (!newProject || !newProject.id) return;
  return saveProject(newProject);
}

/**
 * Subscribes to real-time project updates across components and browser windows.
 */
export function subscribeToProjectChanges(callback) {
  if (typeof window === "undefined") return () => {};

  const handleCustomEvent = (e) => {
    if (callback) callback(e.detail);
  };

  const handleStorageEvent = (e) => {
    if (
      e.key === PROJECTS_STORAGE_KEY ||
      e.key === PROJECT_DETAILS_STORAGE_KEY
    ) {
      if (callback) callback({ key: e.key });
    }
  };

  window.addEventListener(PROJECTS_UPDATED_EVENT, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(PROJECTS_UPDATED_EVENT, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
  };
}

/**
 * Search the canonical student roster by name, username, roll number, or department.
 */
export function searchStudentRoster(query) {
  if (!query || !query.trim()) {
    return CANONICAL_STUDENT_ROSTER;
  }
  const q = query.trim().toLowerCase().replace(/^@/, "");
  return CANONICAL_STUDENT_ROSTER.filter((s) => {
    return (
      s.name.toLowerCase().includes(q) ||
      s.username.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q) ||
      s.branch.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
    );
  });
}
