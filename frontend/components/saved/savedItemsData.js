// ─────────────────────────────────────────────────────────────────────────────
// savedItemsData.js
// Resolves saved items (entityType + entityId) into full canonical view models
// ─────────────────────────────────────────────────────────────────────────────

import { INITIAL_PROJECTS } from "@/components/projects/projectsData";
import { DETAILED_PROJECTS } from "@/components/projects/details/projectDetailsData";
import { INITIAL_INTERNSHIPS, INITIAL_HACKATHONS } from "@/components/internships/internshipsData";
import { ALL_EVENTS } from "@/components/events/eventsData";
import { ALL_NOTICES } from "@/components/notices/noticesData";
import { INITIAL_ASSIGNMENTS } from "@/components/assignments/assignmentsData";
import { SUBJECT_DETAILS_MAP } from "@/components/academics/subject-details/subjectDetailsData";
import { INITIAL_POSTS } from "@/components/campus-feed/feedData";
import { COMMUNITY_GROUPS } from "@/components/campus-feed/groups/communityGroupData";

export const SAVED_CATEGORIES = [
  { id: "all", label: "All Items", icon: "Bookmark" },
  { id: "project", label: "Projects", icon: "LayoutGrid" },
  { id: "opportunity", label: "Opportunities", icon: "Briefcase" },
  { id: "event", label: "Events", icon: "Calendar" },
  { id: "notice", label: "Notices", icon: "Bell" },
  { id: "assignment", label: "Assignments", icon: "ClipboardCheck" },
  { id: "feedPost", label: "Campus Feed", icon: "MessageSquare" },
  { id: "community", label: "Communities", icon: "Users" },
  { id: "course", label: "Courses", icon: "BookOpen" },
];

export const SORT_OPTIONS = [
  { value: "recently-saved", label: "Recently Saved" },
  { value: "oldest-saved", label: "Oldest Saved" },
  { value: "recently-updated", label: "Recently Updated" },
  { value: "alphabetical", label: "A–Z (Alphabetical)" },
];

/**
 * Format relative time (e.g. "Saved 2 days ago", "Saved yesterday")
 */
export function formatRelativeSavedTime(dateStr) {
  if (!dateStr) return "Saved recently";
  try {
    const then = new Date(dateStr).getTime();
    const now = Date.now();
    const diffSec = Math.floor((now - then) / 1000);

    if (diffSec < 60) return "Saved just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `Saved ${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `Saved ${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Saved yesterday";
    if (diffDays < 7) return `Saved ${diffDays}d ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `Saved ${diffWeeks}w ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "Saved recently";
  }
}

/**
 * Resolves a saved item entry into a displayable view model by looking up current canonical sources
 */
export function resolveSavedItem(savedItem, collectionsMap = {}) {
  const { id, entityType, entityId, savedAt, updatedAt, isPinned, collectionId } = savedItem;
  const collectionName = collectionId && collectionsMap[collectionId] ? collectionsMap[collectionId].name : null;

  // Base fallback for unavailable entities
  const unavailableFallback = {
    id,
    entityType,
    entityId,
    title: "Content Unavailable",
    subtitle: "Item archived or removed",
    description: "The original entity is no longer accessible on College OS.",
    image: null,
    route: null,
    tags: ["Unavailable"],
    category: "Archived",
    status: "Unavailable",
    statusType: "unavailable",
    department: null,
    savedAt,
    savedAtFormatted: formatRelativeSavedTime(savedAt),
    updatedAt: updatedAt || savedAt,
    isPinned: Boolean(isPinned),
    collectionId: collectionId || null,
    collectionName,
    isAvailable: false,
    author: null,
    company: null,
    metadata: {},
  };

  switch (entityType) {
    case "project": {
      const detailed = DETAILED_PROJECTS[entityId];
      const initial = INITIAL_PROJECTS.find((p) => p.id === entityId);
      const proj = detailed || initial;
      if (!proj) return unavailableFallback;

      const techStack = proj.technologies || detailed?.tags || [];
      return {
        id,
        entityType: "project",
        entityId,
        typeLabel: "Project",
        title: proj.title,
        subtitle: `${proj.category || "Development"} • ${proj.type || "Showcase Project"}`,
        description: proj.description || detailed?.overview?.problem || proj.tagline || "",
        image: proj.banner || "/assets/projects/light/hero-banner.jpg",
        route: `/student/projects/${entityId}`,
        tags: techStack.slice(0, 4),
        category: proj.category || "Web Development",
        status: proj.status || "Active",
        statusType: "active",
        department: proj.branch || "Computer Science",
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: proj.updatedAt || updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: proj.author || "Student Team",
        company: null,
        metadata: {
          likes: proj.likes || 0,
          stars: detailed?.githubStats?.stars || proj.likes || 0,
          teamSize: detailed?.team?.length || 3,
        },
      };
    }

    case "opportunity": {
      const opp = INITIAL_INTERNSHIPS.find((i) => i.id === entityId) || INITIAL_HACKATHONS.find((h) => h.id === entityId);
      if (!opp) return unavailableFallback;

      const isHackathon = opp.type === "Hackathon" || opp.organizer !== undefined;
      const isClosed = opp.deadline && new Date(opp.deadline) < new Date("2025-10-01"); // simulated check
      const status = isClosed ? "Closed" : (opp.deadline ? "Open" : "Active");

      return {
        id,
        entityType: "opportunity",
        entityId,
        typeLabel: isHackathon ? "Hackathon" : "Internship",
        title: opp.title,
        subtitle: `${opp.company || opp.organizer} • ${opp.type || "Opportunity"}`,
        description: opp.description || opp.aboutRole || "",
        image: opp.logo || opp.banner || null,
        route: `/student/internships/${entityId}`,
        tags: (opp.skills || opp.tags || []).slice(0, 4),
        category: isHackathon ? "Hackathon" : "Internship",
        status,
        statusType: isClosed ? "archived" : "open",
        department: opp.companyType || "Technology",
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: null,
        company: opp.company || opp.organizer,
        metadata: {
          stipend: opp.stipend || opp.prizes || "Competitive",
          location: opp.location || opp.mode || "Hybrid",
          deadline: opp.deadline || opp.date,
        },
      };
    }

    case "event": {
      const ev = ALL_EVENTS.find((e) => e.id === entityId);
      if (!ev) return unavailableFallback;

      const isCompleted = ev.status === "Completed" || (ev.date && ev.date.includes("2024"));
      return {
        id,
        entityType: "event",
        entityId,
        typeLabel: "Event",
        title: ev.title,
        subtitle: `${ev.category} • ${ev.date || ev.venue}`,
        description: ev.subtitle || ev.description || "",
        image: ev.image || "/assets/events/hackathon.jpg",
        route: `/student/events/${entityId}`,
        tags: [ev.category, ...(ev.badges || [])].slice(0, 4),
        category: ev.category,
        status: isCompleted ? "Completed" : (ev.status || "Upcoming"),
        statusType: isCompleted ? "archived" : "upcoming",
        department: ev.category,
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: null,
        company: null,
        metadata: {
          venue: ev.venue || "Campus Auditorium",
          date: ev.date,
          seatsFilled: ev.seatsFilled,
          seatsTotal: ev.seatsTotal,
        },
      };
    }

    case "notice": {
      const notice = ALL_NOTICES.find((n) => n.id === entityId);
      if (!notice) return unavailableFallback;

      return {
        id,
        entityType: "notice",
        entityId,
        typeLabel: "Notice",
        title: notice.title,
        subtitle: `${notice.department} • ${notice.date}`,
        description: notice.description || "",
        image: null,
        route: `/student/notices/${entityId}`,
        tags: [notice.category, notice.department].slice(0, 3),
        category: notice.category,
        status: notice.pinned ? "Pinned Notice" : (notice.isRead ? "Read" : "Official"),
        statusType: notice.pinned ? "pinned" : "active",
        department: notice.department,
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: notice.department,
        company: null,
        metadata: {
          date: notice.date,
          filesCount: notice.filesCount || 0,
        },
      };
    }

    case "assignment": {
      const asg = INITIAL_ASSIGNMENTS.find((a) => a.id === entityId);
      if (!asg) return unavailableFallback;

      return {
        id,
        entityType: "assignment",
        entityId,
        typeLabel: "Assignment",
        title: asg.title,
        subtitle: `${asg.subject} • Due ${asg.dueDate}`,
        description: asg.description || "",
        image: null,
        route: `/student/assignments/${entityId}`,
        tags: asg.tags || [asg.subject],
        category: asg.subject,
        status: asg.dueStatus || "In Progress",
        statusType: asg.dueStatus === "Overdue" ? "overdue" : "active",
        department: asg.subject,
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: asg.subject,
        company: null,
        metadata: {
          dueDate: asg.dueDate,
          priority: asg.priority,
          marks: asg.marks ? `${asg.marks} Marks` : null,
        },
      };
    }

    case "feedPost": {
      const post = INITIAL_POSTS.find((p) => p.id === entityId);
      if (!post) return unavailableFallback;

      return {
        id,
        entityType: "feedPost",
        entityId,
        typeLabel: "Campus Discussion",
        title: `${post.author?.name || "Campus Student"}'s Post`,
        subtitle: `${post.author?.department || "Campus"} • ${post.createdAt}`,
        description: post.content || "",
        image: post.author?.avatar || null,
        route: `/student/feed/${entityId}`,
        tags: [post.type || "Discussion", post.source || "Campus"].filter(Boolean),
        category: post.type || "Campus Feed",
        status: "Active Discussion",
        statusType: "active",
        department: post.author?.department,
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: post.author?.name,
        company: null,
        metadata: {
          likesCount: post.likesCount || 0,
          commentsCount: post.commentsCount || 0,
        },
      };
    }

    case "community": {
      const group = COMMUNITY_GROUPS.find((c) => c.id === entityId);
      if (!group) return unavailableFallback;

      return {
        id,
        entityType: "community",
        entityId,
        typeLabel: "Club / Community",
        title: group.name,
        subtitle: `${group.category} • ${group.department} • ${group.memberCount} members`,
        description: group.tagline || group.description?.mission || "",
        image: group.logo || null,
        route: `/student/feed/groups/${entityId}`,
        tags: (group.tags || [group.category, group.department]).slice(0, 3),
        category: group.category,
        status: group.isJoined ? "Joined Club" : (group.isFollowing ? "Following" : "Public Club"),
        statusType: "active",
        department: group.department,
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: null,
        company: null,
        metadata: {
          memberCount: group.memberCount,
          foundedYear: group.foundedYear,
        },
      };
    }

    case "course": {
      const code = entityId.replace(/^course-/, "");
      const course = SUBJECT_DETAILS_MAP[code];
      if (!course) return unavailableFallback;

      return {
        id,
        entityType: "course",
        entityId,
        typeLabel: "Course",
        title: `${course.name} (${course.code})`,
        subtitle: `${course.department} • Semester ${course.semester}`,
        description: `Credits: ${course.credits} • ${course.type} • Faculty: ${course.faculty?.name || "Department Faculty"} • Room: ${course.lectureRoom || "Campus Block"}`,
        image: null,
        route: `/student/academics/subjects/${course.slug || course.code}`,
        tags: [course.code, course.type, `${course.credits} Credits`],
        category: `Semester ${course.semester}`,
        status: `${course.credits} Credits`,
        statusType: "active",
        department: course.department,
        savedAt,
        savedAtFormatted: formatRelativeSavedTime(savedAt),
        updatedAt: updatedAt || savedAt,
        isPinned: Boolean(isPinned),
        collectionId: collectionId || null,
        collectionName,
        isAvailable: true,
        author: course.faculty?.name,
        company: null,
        metadata: {
          code: course.code,
          credits: course.credits,
          faculty: course.faculty?.name,
          semester: course.semester,
        },
      };
    }

    default:
      return unavailableFallback;
  }
}
