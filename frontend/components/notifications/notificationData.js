// Canonical notification data model, seed records, and local persistence store for College OS
// Supports real-time badge sync with Navbar via localStorage and Window CustomEvents

export const NOTIFICATION_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "action_required", label: "Action Required" },
  { id: "academic", label: "Academics" },
  { id: "assignment", label: "Assignments" },
  { id: "event", label: "Events" },
  { id: "opportunity", label: "Opportunities" },
  { id: "application", label: "Applications" },
  { id: "project", label: "Projects" },
  { id: "social", label: "Campus Feed" },
  { id: "lost-found", label: "Lost & Found" },
  { id: "system", label: "System" },
];

export const NOTIFICATION_PRIORITIES = {
  urgent: {
    label: "Urgent",
    badgeClass: "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60",
    dotClass: "bg-rose-500",
  },
  "action-required": {
    label: "Action Required",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60",
    dotClass: "bg-amber-500",
  },
  important: {
    label: "Important",
    badgeClass: "bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60",
    dotClass: "bg-sky-500",
  },
  normal: {
    label: "Standard",
    badgeClass: "bg-[#E8F1ED] text-[#36594C] dark:bg-[#10372F] dark:text-[#A3BFB5] border border-transparent",
    dotClass: "bg-emerald-500",
  },
};

const STORAGE_KEY = "college_os_notifications_store_v1";

// Helper to calculate realistic relative timestamps based on current session time
function createTimestamps() {
  const now = Date.now();
  const HOUR = 3600 * 1000;
  const DAY = 24 * HOUR;

  return {
    t_1h: new Date(now - 1.5 * HOUR).toISOString(),
    t_3h: new Date(now - 3.2 * HOUR).toISOString(),
    t_5h: new Date(now - 5.5 * HOUR).toISOString(),
    t_7h: new Date(now - 7.1 * HOUR).toISOString(),
    t_9h: new Date(now - 9.4 * HOUR).toISOString(),
    t_11h: new Date(now - 11.2 * HOUR).toISOString(),
    // Yesterday
    y_26h: new Date(now - 26 * HOUR).toISOString(),
    y_29h: new Date(now - 29.5 * HOUR).toISOString(),
    y_33h: new Date(now - 33 * HOUR).toISOString(),
    y_37h: new Date(now - 37 * HOUR).toISOString(),
    // This Week
    w_3d: new Date(now - 3.2 * DAY).toISOString(),
    w_4d: new Date(now - 4.5 * DAY).toISOString(),
    w_5d: new Date(now - 5.2 * DAY).toISOString(),
    w_6d: new Date(now - 6.1 * DAY).toISOString(),
    // Earlier
    e_9d: new Date(now - 9.5 * DAY).toISOString(),
    e_12d: new Date(now - 12.3 * DAY).toISOString(),
    e_15d: new Date(now - 15.8 * DAY).toISOString(),
    e_18d: new Date(now - 18.4 * DAY).toISOString(),
    e_22d: new Date(now - 22.1 * DAY).toISOString(),
  };
}

export function generateSeedNotifications() {
  const ts = createTimestamps();

  return [
    {
      id: "notif-1",
      type: "assignment",
      priority: "urgent",
      title: "Assignment 4 Due in 24 Hours: Database Systems",
      message: "Cloud Database Query Optimization problem submission closes tomorrow at 11:59 PM.",
      source: "Faculty",
      createdAt: ts.t_1h,
      read: false,
      actionRequired: true,
      actionLabel: "Open Assignment",
      entityType: "assignment",
      entityId: "asg-1",
      route: "/student/assignments/asg-1",
      metadata: {
        subject: "Database Management Systems",
        code: "CS401",
        deadlineText: "Tomorrow, 11:59 PM",
      },
      tags: ["dbms", "assignment", "deadline", "sql", "cs401"],
    },
    {
      id: "notif-2",
      type: "event",
      priority: "important",
      title: "Aarohan 2025 Registrations Open",
      message: "Annual flagship campus cultural & tech fest registration has commenced. Early bird passes available.",
      source: "Campus Events",
      createdAt: ts.t_3h,
      read: false,
      actionRequired: true,
      actionLabel: "View Event",
      entityType: "event",
      entityId: "evt-1",
      route: "/student/events/evt-1",
      metadata: {
        venue: "Main Campus Auditorium",
        date: "October 18-20, 2026",
      },
      tags: ["aarohan", "fest", "events", "campus", "hackathon"],
    },
    {
      id: "notif-3",
      type: "opportunity",
      priority: "urgent",
      title: "Google STEP Internship Deadline Approaching",
      message: "Summer 2026 software engineering opportunity closing in 48 hours for pre-final years.",
      source: "Placement Cell",
      createdAt: ts.t_5h,
      read: false,
      actionRequired: true,
      actionLabel: "View Opportunity",
      entityType: "opportunity",
      entityId: "int-1",
      route: "/student/internships/int-1",
      metadata: {
        company: "Google",
        role: "Software Engineering Intern",
        stipend: "Competitive",
      },
      tags: ["google", "internship", "step", "placement", "careers"],
    },
    {
      id: "notif-4",
      type: "application",
      priority: "urgent",
      title: "Interview Scheduled: Amazon SDE Summer 2026",
      message: "Your virtual technical interview round has been scheduled. Review your application details.",
      source: "Placement Cell",
      createdAt: ts.t_7h,
      read: false,
      actionRequired: true,
      actionLabel: "View Application",
      entityType: "application",
      entityId: "app-1",
      route: "/student/internships/applications",
      metadata: {
        company: "Amazon",
        status: "Interview Scheduled",
      },
      tags: ["amazon", "interview", "application", "placement"],
    },
    {
      id: "notif-5",
      type: "social",
      priority: "normal",
      title: "Sarah Chen mentioned you in Campus Feed",
      message: "Check out the discussion on 'Next.js 15 Server Actions best practices' in the developer circle.",
      source: "Student Community",
      createdAt: ts.t_9h,
      read: false,
      actionRequired: false,
      actionLabel: "View Discussion",
      entityType: "feed",
      entityId: "post-1",
      route: "/student/feed",
      metadata: {
        author: "Sarah Chen",
        channel: "#development",
      },
      tags: ["community", "feed", "mention", "discussion"],
    },
    {
      id: "notif-6",
      type: "project",
      priority: "normal",
      title: "Campus Companion Project Received 12 Upvotes",
      message: "Your open-source project reached the trending showcase on the student developer board.",
      source: "Student Community",
      createdAt: ts.t_11h,
      read: true,
      actionRequired: false,
      actionLabel: "Open Project",
      entityType: "project",
      entityId: "proj-1",
      route: "/student/projects/proj-1",
      metadata: {
        projectName: "Campus Companion",
        stats: "128 Stars • 24 Forks",
      },
      tags: ["project", "showcase", "open-source", "upvotes"],
    },
    {
      id: "notif-7",
      type: "academic",
      priority: "important",
      title: "Mid-Semester Examination Schedule Published",
      message: "Official examination dates for Semester 7 have been released by the Academic Affairs committee.",
      source: "Academics",
      createdAt: ts.y_26h,
      read: false,
      actionRequired: true,
      actionLabel: "Read Notice",
      entityType: "notice",
      entityId: "not-2",
      route: "/student/notices/not-2",
      metadata: {
        category: "Exams",
        office: "Dean of Academics",
      },
      tags: ["exams", "academics", "schedule", "notices", "mid-sem"],
    },
    {
      id: "notif-8",
      type: "lost-found",
      priority: "action-required",
      title: "Potential Match Found for Lost Calculator",
      message: "An item matching your Casio fx-991EX report was deposited at the Engineering Block desk.",
      source: "Lost & Found",
      createdAt: ts.y_29h,
      read: false,
      actionRequired: true,
      actionLabel: "Review Match",
      entityType: "lost-found-report",
      entityId: "lf-rep-1",
      route: "/student/lost-and-found/my-reports",
      metadata: {
        item: "Casio fx-991EX Scientific Calculator",
        location: "Room 304, Lab Block",
      },
      tags: ["lost", "found", "calculator", "claims"],
    },
    {
      id: "notif-9",
      type: "assignment",
      priority: "normal",
      title: "New Assignment Published: Distributed Systems Lab 2",
      message: "Consensus Algorithms implementation problem statement is now accessible on the portal.",
      source: "Faculty",
      createdAt: ts.y_33h,
      read: true,
      actionRequired: false,
      actionLabel: "Open Assignment",
      entityType: "assignment",
      entityId: "asg-4",
      route: "/student/assignments/asg-4",
      metadata: {
        subject: "Distributed Computing",
        code: "CS402",
        due: "Oct 24, 2026",
      },
      tags: ["distributed", "assignment", "raft", "lab"],
    },
    {
      id: "notif-10",
      type: "application",
      priority: "important",
      title: "Application Shortlisted: Razorpay Frontend Fellow",
      message: "Congratulations! Your profile has progressed to the take-home technical challenge stage.",
      source: "Placement Cell",
      createdAt: ts.y_37h,
      read: true,
      actionRequired: true,
      actionLabel: "View Application",
      entityType: "application",
      entityId: "app-2",
      route: "/student/internships/applications",
      metadata: {
        company: "Razorpay",
        stage: "Technical Assessment",
      },
      tags: ["razorpay", "shortlisted", "internship", "applications"],
    },
    {
      id: "notif-11",
      type: "academic",
      priority: "normal",
      title: "Advanced Algorithms (CS301) Syllabus Revised",
      message: "Lecture modules 4 & 5 updated to include Dynamic Programming heuristics & Bellman-Ford proofs.",
      source: "Faculty",
      createdAt: ts.w_3d,
      read: true,
      actionRequired: false,
      actionLabel: "Open Course",
      entityType: "course",
      entityId: "CS301",
      route: "/student/academics/subjects/CS301",
      metadata: {
        code: "CS301",
        faculty: "Dr. Arvind Rao",
      },
      tags: ["algorithms", "syllabus", "cs301", "academics"],
    },
    {
      id: "notif-12",
      type: "event",
      priority: "important",
      title: "Smart India Hackathon Orientation Tomorrow",
      message: "Join the virtual briefing session on problem statement selection and mentor allocations.",
      source: "Campus Events",
      createdAt: ts.w_4d,
      read: true,
      actionRequired: false,
      actionLabel: "Event Details",
      entityType: "event",
      entityId: "evt-2",
      route: "/student/events/evt-2",
      metadata: {
        platform: "Auditorium Hall A & Online",
        time: "4:00 PM - 6:00 PM",
      },
      tags: ["sih", "hackathon", "innovation", "events"],
    },
    {
      id: "notif-13",
      type: "opportunity",
      priority: "important",
      title: "Microsoft Software Engineer Intern 2026 Live",
      message: "Applications open for Bengaluru and Hyderabad engineering centers. Minimum CGPA threshold applies.",
      source: "Placement Cell",
      createdAt: ts.w_5d,
      read: true,
      actionRequired: false,
      actionLabel: "View Details",
      entityType: "opportunity",
      entityId: "int-2",
      route: "/student/internships/int-2",
      metadata: {
        company: "Microsoft",
        batch: "2026 Graduating",
      },
      tags: ["microsoft", "internship", "placement", "careers"],
    },
    {
      id: "notif-14",
      type: "system",
      priority: "normal",
      title: "College OS 2.4 Released with Global Search",
      message: "Discover campus projects, courses, notices, and peers instantly with the unified ⌘K search experience.",
      source: "System",
      createdAt: ts.w_6d,
      read: true,
      actionRequired: false,
      actionLabel: "Explore Search",
      entityType: "search",
      entityId: "global-search",
      route: "/student/search",
      metadata: {
        version: "v2.4.0",
        feature: "Omni-search & filter shortcuts",
      },
      tags: ["system", "release", "search", "updates"],
    },
    {
      id: "notif-15",
      type: "academic",
      priority: "important",
      title: "Grade Card Updated for Previous Semester",
      message: "Verified semester performance records and official credit evaluations are ready for download.",
      source: "Academics",
      createdAt: ts.e_9d,
      read: true,
      actionRequired: false,
      actionLabel: "View Grade Card",
      entityType: "grade-card",
      entityId: "transcript-sem6",
      route: "/student/academics/grade-card",
      metadata: {
        term: "Semester 6",
        status: "Certified",
      },
      tags: ["grade-card", "transcript", "results", "academics"],
    },
    {
      id: "notif-16",
      type: "project",
      priority: "normal",
      title: "Rohan Verma joined your project 'DevSync'",
      message: "New collaborator accepted your invitation to contribute to the API Gateway module.",
      source: "Student Community",
      createdAt: ts.e_12d,
      read: true,
      actionRequired: false,
      actionLabel: "View Project",
      entityType: "project",
      entityId: "proj-2",
      route: "/student/projects/proj-2",
      metadata: {
        collaborator: "Rohan Verma",
        role: "Backend Contributor",
      },
      tags: ["devsync", "collaboration", "project", "team"],
    },
    {
      id: "notif-17",
      type: "lost-found",
      priority: "normal",
      title: "Item Deposited at Central Library Desk",
      message: "A black laptop charger with college sticker was turned in. Check public catalog if missing.",
      source: "Lost & Found",
      createdAt: ts.e_15d,
      read: true,
      actionRequired: false,
      actionLabel: "View Public Hub",
      entityType: "lost-found-public",
      entityId: "lf-pub-1",
      route: "/student/lost-and-found",
      metadata: {
        location: "Central Library",
      },
      tags: ["lost-found", "library", "catalog"],
    },
    {
      id: "notif-18",
      type: "system",
      priority: "normal",
      title: "Profile Completeness: Add your GitHub Link",
      message: "Complete your developer profile showcase to unlock verified builder recommendations on campus.",
      source: "System",
      createdAt: ts.e_18d,
      read: true,
      actionRequired: false,
      actionLabel: "Edit Profile",
      entityType: "profile",
      entityId: "student-1",
      route: "/student/profile/edit",
      metadata: {
        strength: "85% Complete",
      },
      tags: ["profile", "portfolio", "github", "builder"],
    },
    {
      id: "notif-19",
      type: "assignment",
      priority: "normal",
      title: "Feedback Available for Machine Learning Assignment",
      message: "Detailed grading rubrics and comments for Neural Networks assignment have been uploaded.",
      source: "Faculty",
      createdAt: ts.e_22d,
      read: true,
      actionRequired: false,
      actionLabel: "View Assignment",
      entityType: "assignment",
      entityId: "asg-7",
      route: "/student/assignments/asg-7",
      metadata: {
        subject: "Machine Learning",
        code: "CS403",
      },
      tags: ["ml", "grades", "assignment", "rubrics"],
    },
  ];
}

// Group calculation helper
export function getDateGroup(timestamp) {
  const itemDate = new Date(timestamp);
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const thisWeekStart = todayStart - 6 * 24 * 60 * 60 * 1000;

  const itemTime = itemDate.getTime();
  if (itemTime >= todayStart) {
    return "today";
  } else if (itemTime >= yesterdayStart) {
    return "yesterday";
  } else if (itemTime >= thisWeekStart) {
    return "thisWeek";
  } else {
    return "earlier";
  }
}

// Relative time formatter
export function formatNotificationTime(timestamp) {
  const now = Date.now();
  const date = new Date(timestamp);
  const diffMs = now - date.getTime();
  const diffMins = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (3600 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 3600 * 1000));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}

// Dispatches real-time window notification event for state synchronization
function broadcastNotificationChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("college_os_notifications_updated"));
  }
}

// Fetch stored notifications or initialize with seeds
export function getStoredNotifications() {
  if (typeof window === "undefined") {
    return generateSeedNotifications();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = generateSeedNotifications();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = generateSeedNotifications();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch {
    return generateSeedNotifications();
  }
}

// Save notifications to localStorage & broadcast
export function saveStoredNotifications(notifications) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    broadcastNotificationChange();
  } catch (err) {
    console.error("Failed to save notifications to localStorage:", err);
  }
}

// Mark single notification as read
export function markNotificationAsRead(id) {
  const items = getStoredNotifications();
  const updated = items.map((item) =>
    item.id === id ? { ...item, read: true } : item
  );
  saveStoredNotifications(updated);
  return updated;
}

// Mark single notification as unread
export function markNotificationAsUnread(id) {
  const items = getStoredNotifications();
  const updated = items.map((item) =>
    item.id === id ? { ...item, read: false } : item
  );
  saveStoredNotifications(updated);
  return updated;
}

// Mark all notifications as read
export function markAllNotificationsAsRead() {
  const items = getStoredNotifications();
  const updated = items.map((item) => ({ ...item, read: true }));
  saveStoredNotifications(updated);
  return updated;
}

// Clear only read notifications (preserves unread)
export function clearReadNotifications() {
  const items = getStoredNotifications();
  const updated = items.filter((item) => !item.read);
  saveStoredNotifications(updated);
  return updated;
}

// Reset store to fresh seed notifications (useful for testing or recovering demo)
export function resetNotificationsToSeed() {
  const seeds = generateSeedNotifications();
  saveStoredNotifications(seeds);
  return seeds;
}

// Compute dynamic metrics
export function getNotificationCounts(notifications = []) {
  const unread = notifications.filter((n) => !n.read).length;
  const actionRequired = notifications.filter((n) => n.actionRequired).length;
  const today = notifications.filter((n) => getDateGroup(n.createdAt) === "today").length;
  const total = notifications.length;

  return {
    unread,
    today,
    actionRequired,
    total,
  };
}
