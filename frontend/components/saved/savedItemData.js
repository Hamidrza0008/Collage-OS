// =============================================================================
// College OS - Saved Items & Bookmarks Hub: Canonical Data Model & Resolvers
// /student/saved
// =============================================================================

import {
  SAVED_STORAGE_KEY,
  COLLECTIONS_STORAGE_KEY,
  SAVED_UPDATED_EVENT,
  DEFAULT_COLLECTIONS,
  INITIAL_SAVED_ITEMS,
  getSavedItems,
  isSaved,
  saveItem,
  removeSavedItem,
  toggleSavedItem,
  togglePinSavedItem,
  moveItemToCollection,
  bulkRemoveSavedItems,
  bulkMoveToCollection,
  restoreSavedItem,
  getSavedCollections,
  createCollection,
  renameCollection,
  deleteCollection,
  subscribeToSavedChanges,
  migrateLegacyBookmarks,
} from "./savedItemsStore";

// Re-export store methods for unified convenience
export {
  SAVED_STORAGE_KEY,
  COLLECTIONS_STORAGE_KEY,
  SAVED_UPDATED_EVENT,
  DEFAULT_COLLECTIONS,
  INITIAL_SAVED_ITEMS,
  getSavedItems,
  isSaved,
  saveItem,
  removeSavedItem,
  toggleSavedItem,
  togglePinSavedItem,
  moveItemToCollection,
  bulkRemoveSavedItems,
  bulkMoveToCollection,
  restoreSavedItem,
  getSavedCollections,
  createCollection,
  renameCollection,
  deleteCollection,
  subscribeToSavedChanges,
  migrateLegacyBookmarks,
};

// Canonical Category Definitions
export const SAVED_CATEGORIES = [
  { id: "all", label: "All Items", entityType: null },
  { id: "projects", label: "Projects", entityType: "project" },
  { id: "opportunities", label: "Opportunities", entityType: "opportunity" },
  { id: "events", label: "Events", entityType: "event" },
  { id: "notices", label: "Notices", entityType: "notice" },
  { id: "assignments", label: "Assignments", entityType: "assignment" },
  { id: "feed", label: "Campus Feed", entityType: "feedPost" },
  { id: "communities", label: "Communities", entityType: "community" },
  { id: "courses", label: "Courses", entityType: "course" },
];

// Sort Options
export const SAVED_SORT_OPTIONS = [
  { id: "recently-saved", label: "Recently Saved" },
  { id: "oldest-saved", label: "Oldest Saved" },
  { id: "recently-updated", label: "Recently Updated" },
  { id: "alphabetical", label: "A–Z" },
];

// Resolvers for Canonical Entities
import { INITIAL_PROJECTS } from "@/components/projects/projectsData";
import { DETAILED_PROJECTS, getProjectDetails } from "@/components/projects/details/projectDetailsData";
import { INITIAL_INTERNSHIPS, INITIAL_HACKATHONS } from "@/components/internships/internshipsData";
import { getOpportunityDetails } from "@/components/internships/details/opportunityDetailsData";
import { ALL_EVENTS } from "@/components/events/eventsData";
import { getEventDetails } from "@/components/events/details/eventDetailsData";
import { ALL_NOTICES } from "@/components/notices/noticesData";
import { getNoticeDetails } from "@/components/notices/details/noticeReaderData";
import { INITIAL_ASSIGNMENTS } from "@/components/assignments/assignmentsData";
import { getAssignmentDetails } from "@/components/assignments/details/assignmentDetailsData";
import { INITIAL_POSTS } from "@/components/campus-feed/feedData";
import { getFeedPostById } from "@/components/campus-feed/details/feedPostDetailsData";
import { COMMUNITY_GROUPS, getCommunityGroupById } from "@/components/campus-feed/groups/communityGroupData";
import { SUBJECT_DETAILS_MAP, getSubjectDetails } from "@/components/academics/subject-details/subjectDetailsData";

/**
 * Resolves raw saved record into full polymorphically enriched SavedItemModel
 */
export function resolveCanonicalEntity(savedItem) {
  if (!savedItem || !savedItem.entityType || !savedItem.entityId) return null;

  const { id, entityType, entityId, savedAt, updatedAt, isPinned, collectionId } = savedItem;

  // Normalized base model
  const base = {
    id: id || `save-${entityType}-${entityId}`,
    entityId,
    entityType,
    savedAt: savedAt || new Date().toISOString(),
    updatedAt: updatedAt || savedAt || new Date().toISOString(),
    isPinned: Boolean(isPinned),
    collectionId: collectionId || null,
  };

  switch (entityType) {
    case "project": {
      const proj = getProjectDetails(entityId) || INITIAL_PROJECTS.find((p) => p.id === entityId || p.slug === entityId);
      if (!proj) {
        return {
          ...base,
          title: "Project Unavailable",
          subtitle: "Archived or Removed Project",
          description: "This project is no longer available on College OS.",
          image: null,
          route: null,
          tags: ["Project"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }
      return {
        ...base,
        title: proj.title,
        subtitle: proj.tagline || proj.category || "Student Project",
        description: proj.summary || proj.overview?.problem || "Student engineering project on College OS.",
        image: proj.thumbnail || proj.coverImage || proj.image || "/assets/projects/proj-1.jpg",
        route: `/student/projects/${proj.slug || proj.id}`,
        tags: proj.techStack || proj.tags || [proj.category || "Tech"],
        isAvailable: true,
        availability: proj.status === "Archived" ? "Archived" : "Available",
        status: proj.status || "Active",
        metadata: {
          likes: proj.likes || proj.starsCount || 0,
          teamCount: proj.team?.length || 1,
          semester: proj.semester || "Sem 7",
          category: proj.category || "Full Stack",
        },
      };
    }

    case "opportunity": {
      // Normalize "opp-1" -> "intern-1"
      const cleanId = entityId === "opp-1" ? "intern-1" : entityId;
      const opp = getOpportunityDetails(cleanId) ||
        INITIAL_INTERNSHIPS.find((i) => i.id === cleanId) ||
        INITIAL_HACKATHONS.find((h) => h.id === cleanId);

      if (!opp) {
        return {
          ...base,
          title: "Opportunity Unavailable",
          subtitle: "Career Opportunity",
          description: "This internship or hackathon listing has expired or was removed.",
          image: null,
          route: null,
          tags: ["Opportunity"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      const isHackathon = opp.type === "Hackathon" || cleanId.startsWith("hack-");
      const statusLabel = opp.status || (opp.daysLeft <= 3 ? "Closing Soon" : "Open");

      return {
        ...base,
        title: opp.title,
        subtitle: `${opp.company || opp.organizer} • ${opp.location || opp.mode || "Campus"}`,
        description: opp.description || opp.roleOverview || "Opportunities on campus.",
        image: opp.companyLogo || opp.logo || opp.image || "/assets/internships/google.svg",
        route: `/student/internships/${opp.id}`,
        tags: opp.tags || opp.skills || opp.skillsRequired || [isHackathon ? "Hackathon" : "Internship"],
        isAvailable: true,
        availability: opp.status === "Closed" ? "Closed" : "Available",
        status: statusLabel,
        metadata: {
          company: opp.company || opp.organizer,
          stipend: opp.stipend || opp.prizePool || "Stipend Provided",
          deadline: opp.deadline || "Rolling",
          type: isHackathon ? "Hackathon" : "Internship",
          workMode: opp.workMode || opp.mode || "Hybrid",
        },
      };
    }

    case "event": {
      const cleanId = entityId.startsWith("ev-") ? entityId.replace("ev-", "event-") : entityId;
      const ev = getEventDetails(cleanId) || ALL_EVENTS.find((e) => e.id === cleanId || e.id === entityId);

      if (!ev) {
        return {
          ...base,
          title: "Event Unavailable",
          subtitle: "Campus Event",
          description: "This event has ended or was cancelled.",
          image: null,
          route: null,
          tags: ["Event"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      return {
        ...base,
        title: ev.title,
        subtitle: `${ev.organizer || ev.club || "College"} • ${ev.venue || ev.location || "Main Campus"}`,
        description: ev.description || ev.shortDescription || "Campus cultural and technical event.",
        image: ev.image || ev.banner || "/assets/events/ev-1.jpg",
        route: `/student/events/${ev.id}`,
        tags: ev.tags || [ev.category || "Campus Event"],
        isAvailable: true,
        availability: ev.status === "Completed" ? "Completed" : "Available",
        status: ev.status || "Upcoming",
        metadata: {
          date: ev.date || "Upcoming",
          time: ev.time || "TBD",
          venue: ev.venue || ev.location || "Auditorium",
          category: ev.category || "Technical",
        },
      };
    }

    case "notice": {
      const not = getNoticeDetails(entityId) || ALL_NOTICES.find((n) => n.id === entityId);
      if (!not) {
        return {
          ...base,
          title: "Notice Unavailable",
          subtitle: "Official Circular",
          description: "This notice has been archived or removed from the board.",
          image: null,
          route: null,
          tags: ["Notice"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      return {
        ...base,
        title: not.title,
        subtitle: `${not.department || not.issuer || "Administration"} • Notice #${not.refNumber || not.id}`,
        description: not.summary || not.content?.slice(0, 160) || "Official university notice circular.",
        image: null,
        route: `/student/notices/${not.id}`,
        tags: not.tags || [not.category || "Notice"],
        isAvailable: true,
        availability: not.isArchived ? "Archived" : "Available",
        status: not.isImportant ? "Important" : (not.isUrgent ? "Urgent" : "Published"),
        metadata: {
          department: not.department || not.issuer || "Dean Academics",
          date: not.date || not.publishedDate || "Recent",
          isUrgent: Boolean(not.isUrgent),
          isImportant: Boolean(not.isImportant),
        },
      };
    }

    case "assignment": {
      const asg = getAssignmentDetails(entityId) || INITIAL_ASSIGNMENTS.find((a) => a.id === entityId);
      if (!asg) {
        return {
          ...base,
          title: "Assignment Unavailable",
          subtitle: "Course Assignment",
          description: "This assignment is no longer listed in active courses.",
          image: null,
          route: null,
          tags: ["Assignment"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      return {
        ...base,
        title: asg.title,
        subtitle: `${asg.subjectCode || asg.subject || "CSE"} • Due ${asg.dueDate || asg.deadline || "Soon"}`,
        description: asg.description || asg.instructions || "Course coursework and evaluation rubric.",
        image: null,
        route: `/student/assignments/${asg.id}`,
        tags: [asg.subjectCode || "Coursework", asg.type || "Assignment"],
        isAvailable: true,
        availability: asg.status === "Graded" ? "Completed" : "Available",
        status: asg.status || (asg.isSubmitted ? "Submitted" : "In Progress"),
        metadata: {
          course: asg.subjectCode || asg.subject,
          dueDate: asg.dueDate || asg.deadline,
          maxMarks: asg.maxMarks || 25,
          weightage: asg.weightage || "10%",
        },
      };
    }

    case "feedPost": {
      const post = getFeedPostById(entityId) || INITIAL_POSTS.find((p) => p.id === entityId);
      if (!post) {
        return {
          ...base,
          title: "Discussion Post Unavailable",
          subtitle: "Campus Discussion",
          description: "This post was removed or deleted by its author.",
          image: null,
          route: null,
          tags: ["Campus Feed"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      const snippet = post.content
        ? post.content.length > 75
          ? post.content.slice(0, 75) + "..."
          : post.content
        : "Campus Discussion";

      return {
        ...base,
        title: snippet,
        subtitle: `Posted by ${post.author?.name || "Student"} • ${post.category || "General"}`,
        description: post.content || "Campus peer discussion.",
        image: post.images?.[0] || null,
        route: `/student/feed/${post.id}`,
        tags: post.tags || [post.category || "Campus Feed"],
        isAvailable: true,
        availability: "Available",
        status: "Published",
        metadata: {
          author: post.author?.name,
          authorAvatar: post.author?.avatar,
          department: post.author?.department,
          likesCount: post.likesCount || 0,
          commentsCount: post.commentsCount || 0,
          timeAgo: post.timeAgo || "Recently",
        },
      };
    }

    case "community": {
      const group = getCommunityGroupById(entityId) || COMMUNITY_GROUPS.find((g) => g.id === entityId || g.slug === entityId);
      if (!group) {
        return {
          ...base,
          title: "Community Unavailable",
          subtitle: "Student Club",
          description: "This community is private or no longer active.",
          image: null,
          route: null,
          tags: ["Community"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      return {
        ...base,
        title: group.name,
        subtitle: `${group.category || "Club"} • ${group.memberCount || "150+"} Members`,
        description: group.shortDescription || group.description || "Active student campus club.",
        image: group.logo || group.avatar || "/assets/feed/gdsc-avatar.jpg",
        route: `/student/feed/groups/${group.slug || group.id}`,
        tags: group.tags || [group.category || "Club"],
        isAvailable: true,
        availability: "Available",
        status: group.isJoined ? "Joined" : "Following",
        metadata: {
          category: group.category,
          memberCount: group.memberCount,
          lead: group.leadName || group.facultyAdvisor,
          privacy: group.visibility || "Public",
        },
      };
    }

    case "course": {
      const cleanCode = entityId.replace(/^course-/, "");
      const subject = getSubjectDetails(cleanCode) ||
        SUBJECT_DETAILS_MAP[cleanCode] ||
        Object.values(SUBJECT_DETAILS_MAP).find((s) => s.code === cleanCode || s.slug === cleanCode);

      if (!subject) {
        return {
          ...base,
          title: "Course Unavailable",
          subtitle: "Academic Course",
          description: "This curriculum course could not be located.",
          image: null,
          route: null,
          tags: ["Course"],
          isAvailable: false,
          availability: "Unavailable",
          status: "Unavailable",
          metadata: {},
        };
      }

      return {
        ...base,
        title: `${subject.code}: ${subject.name}`,
        subtitle: `${subject.department || "CSE Department"} • Sem ${subject.semester} (${subject.credits} Credits)`,
        description: subject.fullName ? `${subject.fullName} syllabus with ${subject.totalLectures || 45} lectures and practical labs.` : "Curriculum subject notes, syllabus and lecture slides.",
        image: null,
        route: `/student/academics/subjects/${subject.slug || subject.code}`,
        tags: [subject.code, `Sem ${subject.semester}`, `${subject.credits} Credits`],
        isAvailable: true,
        availability: "Available",
        status: "Enrolled",
        metadata: {
          code: subject.code,
          credits: subject.credits,
          semester: subject.semester,
          faculty: subject.faculty?.name || "Dept Faculty",
          attendance: subject.attendance?.percentage || 90,
        },
      };
    }

    default:
      return null;
  }
}

/**
 * Resolves an array of stored saved items into canonical enriched entities
 */
export function resolveAllSavedItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map(resolveCanonicalEntity).filter(Boolean);
}

/**
 * Filters, searches, and sorts resolved saved items
 */
export function filterAndSortSavedItems(items, { category = "all", searchQuery = "", collectionId = null, sortBy = "recently-saved" }) {
  if (!Array.isArray(items)) return [];

  let result = [...items];

  // 1. Category Filter
  if (category && category !== "all") {
    const catDef = SAVED_CATEGORIES.find((c) => c.id === category);
    if (catDef && catDef.entityType) {
      result = result.filter((item) => item.entityType === catDef.entityType);
    }
  }

  // 2. Collection Filter
  if (collectionId) {
    result = result.filter((item) => item.collectionId === collectionId);
  }

  // 3. Local Search Query
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter((item) => {
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
      const matchMeta = Object.values(item.metadata || {}).some(
        (v) => typeof v === "string" && v.toLowerCase().includes(q)
      );
      return matchTitle || matchSubtitle || matchDesc || matchTags || matchMeta;
    });
  }

  // 4. Sorting (Pinned items float to top within current sort)
  result.sort((a, b) => {
    // Pinned priority
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }

    switch (sortBy) {
      case "oldest-saved":
        return new Date(a.savedAt || 0) - new Date(b.savedAt || 0);

      case "recently-updated":
        return new Date(b.updatedAt || b.savedAt || 0) - new Date(a.updatedAt || a.savedAt || 0);

      case "alphabetical":
        return (a.title || "").localeCompare(b.title || "");

      case "recently-saved":
      default:
        return new Date(b.savedAt || 0) - new Date(a.savedAt || 0);
    }
  });

  return result;
}

/**
 * Calculates compact dynamic metrics across all saved items
 */
export function calculateSavedMetrics(resolvedItems = []) {
  const metrics = {
    total: resolvedItems.length,
    projects: 0,
    opportunities: 0,
    events: 0,
    notices: 0,
    assignments: 0,
    feed: 0,
    communities: 0,
    courses: 0,
    pinned: 0,
  };

  resolvedItems.forEach((item) => {
    if (item.isPinned) metrics.pinned += 1;
    switch (item.entityType) {
      case "project":
        metrics.projects += 1;
        break;
      case "opportunity":
        metrics.opportunities += 1;
        break;
      case "event":
        metrics.events += 1;
        break;
      case "notice":
        metrics.notices += 1;
        break;
      case "assignment":
        metrics.assignments += 1;
        break;
      case "feedPost":
        metrics.feed += 1;
        break;
      case "community":
        metrics.communities += 1;
        break;
      case "course":
        metrics.courses += 1;
        break;
      default:
        break;
    }
  });

  return metrics;
}
