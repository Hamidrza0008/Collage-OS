import {
  Home,
  Search,
  Sparkles,
  Layers,
  ClipboardCheck,
  Bell,
  Calendar,
  LayoutGrid,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  User,
  Settings,
  Bookmark,
  FileText,
  CheckCircle2,
  Award,
  Clock,
  BookOpen,
  GraduationCap,
  ExternalLink,
  UserCheck,
  BellRing,
} from "lucide-react";

export const COMMAND_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "navigate", label: "Navigate" },
  { id: "actions", label: "Quick Actions" },
  { id: "academic", label: "Academics" },
  { id: "career", label: "Career" },
  { id: "campus", label: "Campus" },
  { id: "account", label: "Account" },
];

export const COMMAND_ITEMS = [
  // ─── NAVIGATE ───
  {
    id: "nav-home",
    label: "Home Dashboard",
    description: "Personal academic overview, metrics, and campus pulse",
    group: "Navigate",
    category: "navigate",
    icon: Home,
    route: "/student",
    keywords: ["home", "dashboard", "main", "overview", "index", "stats"],
    shortcut: "G H",
  },
  {
    id: "nav-academics",
    label: "Academics",
    description: "Curriculum, course progress, faculty list, and credits",
    group: "Navigate",
    category: "navigate",
    icon: Layers,
    route: "/student/academics",
    keywords: ["academics", "courses", "subjects", "syllabus", "credits", "study", "modules"],
    shortcut: "G A",
  },
  {
    id: "nav-projects",
    label: "Student Projects",
    description: "Explore student software showcases, hardware builds, and open teams",
    group: "Navigate",
    category: "navigate",
    icon: LayoutGrid,
    route: "/student/projects",
    keywords: ["projects", "repos", "github", "hardware", "software", "builds", "teams"],
    shortcut: "G P",
  },
  {
    id: "nav-internships",
    label: "Internships & Hackathons",
    description: "Verified opportunities, stipend roles, and hackathon bounties",
    group: "Navigate",
    category: "navigate",
    icon: Briefcase,
    route: "/student/internships",
    keywords: ["internships", "jobs", "hackathons", "careers", "stipends", "bounties"],
    shortcut: "G I",
  },
  {
    id: "nav-events",
    label: "Events & Workshops",
    description: "Upcoming guest lectures, fests, hackathons, and technical meetups",
    group: "Navigate",
    category: "navigate",
    icon: Calendar,
    route: "/student/events",
    keywords: ["events", "workshops", "seminars", "calendar", "fests", "competitions"],
    shortcut: "G E",
  },
  {
    id: "nav-feed",
    label: "Campus Feed",
    description: "Student discussions, peer posts, polls, and community groups",
    group: "Navigate",
    category: "navigate",
    icon: MessageSquare,
    route: "/student/feed",
    keywords: ["feed", "campus feed", "discussions", "posts", "social", "clubs", "community"],
    shortcut: "G F",
  },
  {
    id: "nav-lost-and-found",
    label: "Lost & Found",
    description: "Report missing student items or browse verified recovered campus belongings",
    group: "Navigate",
    category: "navigate",
    icon: ShieldCheck,
    route: "/student/lost-and-found",
    keywords: ["lost and found", "lost", "found", "claim", "missing", "belongings", "keys", "id card"],
    shortcut: "G L",
  },
  {
    id: "nav-assignments",
    label: "Assignments & Deadlines",
    description: "Course assignment briefs, pending submissions, and faculty feedback",
    group: "Navigate",
    category: "navigate",
    icon: ClipboardCheck,
    route: "/student/assignments",
    keywords: ["assignments", "deadlines", "submissions", "homework", "tasks", "grading"],
    shortcut: "G D",
  },
  {
    id: "nav-notices",
    label: "Notices & Circulars",
    description: "Official administrative circulars, dean memos, and academic bulletins",
    group: "Navigate",
    category: "navigate",
    icon: Bell,
    route: "/student/notices",
    keywords: ["notices", "circulars", "memos", "announcements", "bulletin", "admin"],
    shortcut: "G N",
  },
  {
    id: "nav-campus-ai",
    label: "Campus AI Workspace",
    description: "Interactive AI tutor, syllabus query solver, and exam study assistant",
    group: "Navigate",
    category: "navigate",
    icon: Sparkles,
    route: "/student/campus-ai",
    keywords: ["campus ai", "ai", "assistant", "study bot", "tutor", "notes", "solve"],
    shortcut: "G C",
  },
  {
    id: "nav-search",
    label: "Global Search",
    description: "Full unified discovery across all courses, students, and opportunities",
    group: "Navigate",
    category: "navigate",
    icon: Search,
    route: "/student/search",
    keywords: ["search", "global search", "find", "explore", "directory", "discover"],
    shortcut: "G S",
  },
  {
    id: "nav-saved",
    label: "Saved Items",
    description: "Personal saved collections, bookmarked hackathons, and pinned resources",
    group: "Navigate",
    category: "navigate",
    icon: Bookmark,
    route: "/student/saved",
    keywords: ["saved", "bookmarks", "favorites", "collections", "pinned"],
    shortcut: "G B",
  },
  {
    id: "nav-notifications",
    label: "Notification Center",
    description: "Comprehensive alert log, faculty remarks, and interaction pings",
    group: "Navigate",
    category: "navigate",
    icon: BellRing,
    route: "/student/notifications",
    keywords: ["notifications", "alerts", "inbox", "updates", "activity"],
    shortcut: "G T",
  },

  // ─── CREATE / ACTIONS (QUICK ACTIONS) ───
  {
    id: "action-search",
    label: "Search College OS",
    description: "Open unified global discovery for keyword search",
    group: "Create / Actions",
    category: "actions",
    icon: Search,
    route: "/student/search",
    keywords: ["search college os", "find anything", "quick search", "query"],
    shortcut: "↵",
  },
  {
    id: "action-resume-builder",
    label: "Build Resume",
    description: "Launch AI Resume Builder to generate and export ATS-optimized CVs",
    group: "Create / Actions",
    category: "actions",
    icon: FileText,
    route: "/student/internships/resume-builder",
    keywords: ["build resume", "resume", "cv", "resume builder", "ats", "latex", "pdf export"],
    shortcut: "B R",
  },
  {
    id: "action-applications",
    label: "View Applications",
    description: "Track your active internship and hackathon application statuses",
    group: "Create / Actions",
    category: "actions",
    icon: CheckCircle2,
    route: "/student/internships/applications",
    keywords: ["view applications", "applications", "applied", "interviews", "offer letters"],
    shortcut: "V A",
  },
  {
    id: "action-notifications",
    label: "View Notifications",
    description: "Review pending alerts, assignment updates, and campus notices",
    group: "Create / Actions",
    category: "actions",
    icon: Bell,
    route: "/student/notifications",
    keywords: ["view notifications", "check alerts", "unread notifications"],
    shortcut: "V N",
  },
  {
    id: "action-saved",
    label: "View Saved Items",
    description: "Browse your bookmarked internships, project ideas, and notice circulars",
    group: "Create / Actions",
    category: "actions",
    icon: Bookmark,
    route: "/student/saved",
    keywords: ["view saved items", "saved items", "bookmarks", "my collections"],
    shortcut: "V S",
  },
  {
    id: "action-edit-profile",
    label: "Edit Profile",
    description: "Update student bio, career interests, tech stack, and portfolio links",
    group: "Create / Actions",
    category: "actions",
    icon: UserCheck,
    route: "/student/profile/edit",
    keywords: ["edit profile", "update profile", "change bio", "skills", "photo"],
    shortcut: "E P",
  },
  {
    id: "action-grade-card",
    label: "View Grade Card",
    description: "Inspect official semester SGPA, CGPA credits, and grade transcripts",
    group: "Create / Actions",
    category: "actions",
    icon: Award,
    route: "/student/academics/grade-card",
    keywords: ["view grade card", "grade card", "grades", "sgpa", "cgpa", "transcripts", "marks"],
    shortcut: "V G",
  },
  {
    id: "action-timetable",
    label: "View Timetable",
    description: "Check today's lecture schedule, lab assignments, and classrooms",
    group: "Create / Actions",
    category: "actions",
    icon: Clock,
    route: "/student/academics/timetable",
    keywords: ["view timetable", "timetable", "schedule", "routine", "lectures", "class slots"],
    shortcut: "V T",
  },

  // ─── ACADEMIC ───
  {
    id: "acad-dashboard",
    label: "Academic Curriculum",
    description: "Overview of ongoing semester courses, credit completion, and faculty contacts",
    group: "Academic",
    category: "academic",
    icon: GraduationCap,
    route: "/student/academics",
    keywords: ["academic curriculum", "academics", "courses", "semester", "credits"],
  },
  {
    id: "acad-timetable",
    label: "Timetable & Schedule",
    description: "Weekly lecture schedule, lab slots, and room locations",
    group: "Academic",
    category: "academic",
    icon: Clock,
    route: "/student/academics/timetable",
    keywords: ["timetable", "schedule", "routine", "classes", "periods", "weekly planner"],
  },
  {
    id: "acad-grade-card",
    label: "Grade Card & SGPA",
    description: "Detailed semester grade reports, CGPA metrics, and official marks",
    group: "Academic",
    category: "academic",
    icon: Award,
    route: "/student/academics/grade-card",
    keywords: ["grade card", "grades", "sgpa", "cgpa", "transcript", "results", "marks"],
  },
  {
    id: "acad-subjects",
    label: "Course Subjects & Modules",
    description: "Detailed course syllabus breakdown, reference materials, and modules",
    group: "Academic",
    category: "academic",
    icon: BookOpen,
    route: "/student/academics/subjects",
    keywords: ["subjects", "modules", "topics", "syllabus", "books", "coursework"],
  },

  // ─── CAREER ───
  {
    id: "career-internships",
    label: "Internships & Hackathons",
    description: "Browse verified opportunities, technical internships, and team bounties",
    group: "Career",
    category: "career",
    icon: Briefcase,
    route: "/student/internships",
    keywords: ["internships", "jobs", "careers", "hackathons", "bounties", "stipends"],
  },
  {
    id: "career-applications",
    label: "My Applications",
    description: "Review current hiring pipeline, interview stages, and feedback",
    group: "Career",
    category: "career",
    icon: CheckCircle2,
    route: "/student/internships/applications",
    keywords: ["my applications", "applications", "applied", "interviews", "hiring"],
  },
  {
    id: "career-resume",
    label: "Resume Builder",
    description: "Craft ATS-ready tech resumes with markdown editor and live preview",
    group: "Career",
    category: "career",
    icon: FileText,
    route: "/student/internships/resume-builder",
    keywords: ["resume builder", "resume", "cv", "ats", "latex", "pdf export"],
  },

  // ─── CAMPUS ───
  {
    id: "campus-feed",
    label: "Campus Feed",
    description: "Join peer discussions, share tech updates, and participate in campus polls",
    group: "Campus",
    category: "campus",
    icon: MessageSquare,
    route: "/student/feed",
    keywords: ["campus feed", "feed", "discussions", "community", "clubs"],
  },
  {
    id: "campus-search",
    label: "Search Campus",
    description: "Explore all students, clubs, events, and campus resources",
    group: "Campus",
    category: "campus",
    icon: Search,
    route: "/student/search",
    keywords: ["search campus", "search", "directory", "students", "faculty search"],
  },
  {
    id: "campus-events",
    label: "Events & Hackathons",
    description: "Browse upcoming college workshops, cultural fests, and hackathons",
    group: "Campus",
    category: "campus",
    icon: Calendar,
    route: "/student/events",
    keywords: ["events", "hackathons", "workshops", "meetups", "competitions"],
  },
  {
    id: "campus-notices",
    label: "Notices & Announcements",
    description: "Official notifications, examination schedules, and dean circulars",
    group: "Campus",
    category: "campus",
    icon: Bell,
    route: "/student/notices",
    keywords: ["notices", "announcements", "circulars", "administration", "exams"],
  },
  {
    id: "campus-lost-found",
    label: "Lost & Found",
    description: "Report missing items or return recovered campus possessions",
    group: "Campus",
    category: "campus",
    icon: ShieldCheck,
    route: "/student/lost-and-found",
    keywords: ["lost and found", "lost items", "found items", "claim", "belongings"],
  },
  {
    id: "campus-saved",
    label: "Saved Items",
    description: "Access bookmarked campus events, notices, and curated collections",
    group: "Campus",
    category: "campus",
    icon: Bookmark,
    route: "/student/saved",
    keywords: ["saved", "bookmarks", "collections", "pinned"],
  },

  // ─── ACCOUNT ───
  {
    id: "acc-profile",
    label: "My Profile",
    description: "View your personal student profile, verified badges, and showcase projects",
    group: "Account",
    category: "account",
    icon: User,
    route: "/student/profile",
    keywords: ["my profile", "profile", "account", "portfolio", "badges"],
  },
  {
    id: "acc-edit-profile",
    label: "Edit Profile",
    description: "Update student details, bio, tech stack skills, and social handles",
    group: "Account",
    category: "account",
    icon: UserCheck,
    route: "/student/profile/edit",
    keywords: ["edit profile", "modify profile", "skills", "bio", "avatar", "contact"],
  },
  {
    id: "acc-public-profile",
    label: "View Public Profile",
    description: "Preview how peers and external recruiters see your student profile",
    group: "Account",
    category: "account",
    icon: ExternalLink,
    route: "/student/profile/student-1",
    keywords: ["view public profile", "public profile", "portfolio preview", "student-1"],
  },
  {
    id: "acc-settings",
    label: "Settings & Preferences",
    description: "Configure dark/light theme, typography, and notification options",
    group: "Account",
    category: "account",
    icon: Settings,
    route: "/student/settings",
    keywords: ["settings", "preferences", "theme", "font", "dark mode", "account"],
  },
  {
    id: "acc-notifications",
    label: "Notifications",
    description: "Review your inbox, faculty feedback, and system announcements",
    group: "Account",
    category: "account",
    icon: BellRing,
    route: "/student/notifications",
    keywords: ["notifications", "inbox", "unread alerts", "messages"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Storage & History Helpers
// ─────────────────────────────────────────────────────────────────────────────

export const RECENT_COMMANDS_STORAGE_KEY = "college_os_command_palette_recent_v1";

const DEFAULT_RECENT_IDS = [
  "action-resume-builder",
  "acad-timetable",
  "action-saved",
  "action-applications",
];

export function getRecentCommandIds() {
  if (typeof window === "undefined") return DEFAULT_RECENT_IDS;
  try {
    const raw = localStorage.getItem(RECENT_COMMANDS_STORAGE_KEY);
    if (raw === null) {
      localStorage.setItem(RECENT_COMMANDS_STORAGE_KEY, JSON.stringify(DEFAULT_RECENT_IDS));
      return DEFAULT_RECENT_IDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function saveRecentCommandId(commandId) {
  if (typeof window === "undefined" || !commandId) return;
  try {
    const current = getRecentCommandIds();
    const updated = [commandId, ...current.filter((id) => id !== commandId)].slice(0, 8);
    localStorage.setItem(RECENT_COMMANDS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Failed to persist recent command:", err);
  }
}

export function clearRecentCommandIds() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RECENT_COMMANDS_STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.warn("Failed to clear recent commands:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Contextual Suggestions based on current route
// ─────────────────────────────────────────────────────────────────────────────

export function getContextualCommandIds(pathname = "") {
  if (!pathname) return [];

  if (pathname.startsWith("/student/projects")) {
    return ["action-search", "nav-feed", "nav-saved"];
  }
  if (pathname.startsWith("/student/internships")) {
    return ["action-resume-builder", "action-applications", "action-saved"];
  }
  if (pathname.startsWith("/student/academics")) {
    return ["acad-timetable", "acad-grade-card", "acad-subjects"];
  }
  if (pathname.startsWith("/student/feed")) {
    return ["campus-lost-found", "campus-events", "nav-saved"];
  }
  if (pathname.startsWith("/student/profile")) {
    return ["action-edit-profile", "acc-public-profile", "action-resume-builder"];
  }
  if (pathname === "/student" || pathname === "/student/") {
    return ["action-search", "action-resume-builder", "acad-timetable", "action-notifications"];
  }

  return [];
}
