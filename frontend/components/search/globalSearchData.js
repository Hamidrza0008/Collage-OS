// ─────────────────────────────────────────────────────────────────────────────
// globalSearchData.js
// Normalized search index & deterministic relevance resolver for College OS
// ─────────────────────────────────────────────────────────────────────────────

import { PUBLIC_STUDENT_PROFILES } from "@/components/profile/public/publicStudentProfileData";
import { INITIAL_PROJECTS } from "@/components/projects/projectsData";
import { DETAILED_PROJECTS } from "@/components/projects/details/projectDetailsData";
import { INITIAL_INTERNSHIPS, INITIAL_HACKATHONS } from "@/components/internships/internshipsData";
import { ALL_EVENTS } from "@/components/events/eventsData";
import { ALL_NOTICES } from "@/components/notices/noticesData";
import { INITIAL_ASSIGNMENTS } from "@/components/assignments/assignmentsData";
import { SUBJECT_DETAILS_MAP } from "@/components/academics/subject-details/subjectDetailsData";
import { INITIAL_POSTS } from "@/components/campus-feed/feedData";
import { INITIAL_LOST_FOUND_ITEMS } from "@/components/lost-and-found/lostFoundData";

// Search categories metadata
export const SEARCH_CATEGORIES = [
  { id: "all", label: "All Results" },
  { id: "students", label: "Students" },
  { id: "projects", label: "Projects" },
  { id: "opportunities", label: "Opportunities" },
  { id: "events", label: "Events" },
  { id: "notices", label: "Notices" },
  { id: "assignments", label: "Assignments" },
  { id: "courses", label: "Courses" },
  { id: "feed", label: "Campus Feed" },
  { id: "lost-found", label: "Lost & Found" },
];

export const POPULAR_SKILLS = [
  "React",
  "Next.js",
  "Python",
  "Node.js",
  "Tailwind CSS",
  "Machine Learning",
  "Data Structures",
  "Docker",
  "TypeScript",
  "PostgreSQL",
];

export const POPULAR_CAMPUS_TOPICS = [
  "Hackathon 2025",
  "Placement Drive",
  "Mid-Sem Exam",
  "Web Development",
  "DBMS",
  "Final Year Project",
  "Open Source",
  "Library Timings",
];

export const QUICK_DISCOVERY_CATEGORIES = [
  {
    type: "students",
    title: "Student Builders",
    description: "Connect with undergraduate engineers, designers, and open-source contributors.",
    icon: "Users",
    accent: "emerald",
    query: "student",
  },
  {
    type: "projects",
    title: "Campus Projects",
    description: "Explore tech stacks, repos, and live demos built by peers.",
    icon: "LayoutGrid",
    accent: "purple",
    query: "web",
  },
  {
    type: "opportunities",
    title: "Internships & Hackathons",
    description: "Discover curated corporate drives, developer hackathons, and stipends.",
    icon: "Briefcase",
    accent: "blue",
    query: "internship",
  },
  {
    type: "events",
    title: "Events & Workshops",
    description: "Find speaker panels, coding contests, campus fests, and workshops.",
    icon: "Calendar",
    accent: "amber",
    query: "hackathon",
  },
  {
    type: "courses",
    title: "Curriculum Courses",
    description: "Inspect course syllabi, professors, credits, and internal marks criteria.",
    icon: "BookOpen",
    accent: "teal",
    query: "CSE",
  },
  {
    type: "notices",
    title: "Official Notices",
    description: "Read university circulars, exam schedules, and administration updates.",
    icon: "Bell",
    accent: "rose",
    query: "exam",
  },
];

export const SEARCH_TIPS = [
  "Search by course codes like 'CSE-302' or 'MAT-101'.",
  "Look for specific technologies like 'React', 'Docker', or 'Python'.",
  "Search companies like 'Google', 'Microsoft', or 'TCS' for opportunities.",
  "Filter by department or category using the filter tabs above.",
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "alphabetical", label: "Alphabetical (A–Z)" },
];

export const ITEMS_PER_PAGE = {
  all: 20,
  students: 6,
  projects: 9,
  opportunities: 6,
  events: 6,
  notices: 6,
  assignments: 6,
  courses: 6,
  feed: 6,
  "lost-found": 6,
};

/**
 * Builds the comprehensive normalized search index.
 * Strips all private data (marks, attendance, personal applications, private reports).
 */
export function buildNormalizedSearchIndex() {
  const index = [];

  // 1. STUDENTS (Public profiles only)
  Object.values(PUBLIC_STUDENT_PROFILES).forEach((student) => {
    if (!student || !student.id) return;
    const skillsList = [
      ...(student.skills?.primary?.map((s) => s.name) || []),
      ...(student.skills?.tools?.map((s) => s.name) || []),
    ];

    index.push({
      id: student.id,
      type: "students",
      typeLabel: "Student",
      title: student.name,
      subtitle: `${student.username} • ${student.branch || student.department}`,
      description: student.headline || student.bio || "",
      image: student.avatar || "/assets/profile/avatar.jpg",
      tags: skillsList.slice(0, 5),
      department: student.department || student.branch || "Engineering",
      category: student.semester || "Undergraduate",
      route: `/student/profile/${student.id}`,
      visibility: "public",
      date: student.batch || "2022–2026",
      metadata: {
        isVerified: student.isVerified || false,
        skills: skillsList.slice(0, 4),
        headline: student.headline,
        semester: student.semester,
        branch: student.branch,
      },
    });
  });

  // 2. PROJECTS (Public showcase)
  // Use INITIAL_PROJECTS and merge detailed where available
  INITIAL_PROJECTS.forEach((proj) => {
    if (!proj || !proj.id) return;
    const detailed = DETAILED_PROJECTS[proj.id];
    const techStack = proj.technologies || detailed?.tags || [];

    index.push({
      id: proj.id,
      type: "projects",
      typeLabel: "Project",
      title: proj.title,
      subtitle: `${proj.category} • ${proj.type || "Showcase Project"}`,
      description: proj.description || detailed?.overview?.problem || "",
      image: proj.banner || "/assets/projects/light/hero-banner.jpg",
      tags: techStack,
      department: proj.branch || "Computer Science",
      category: proj.category || "Web Development",
      route: `/student/projects/${proj.id}`,
      visibility: "public",
      date: proj.updatedAt || "Recent",
      metadata: {
        likes: proj.likes || detailed?.likes || 0,
        stars: detailed?.githubStats?.stars || proj.likes || 0,
        author: proj.author || "Student Team",
        status: proj.status || "Active",
      },
    });
  });

  // 3. OPPORTUNITIES (Internships & Hackathons - Public items only)
  INITIAL_INTERNSHIPS.forEach((opp) => {
    if (!opp || !opp.id) return;
    index.push({
      id: opp.id,
      type: "opportunities",
      typeLabel: "Internship",
      title: opp.title,
      subtitle: `${opp.company} • ${opp.type || "Internship"}`,
      description: opp.description || opp.aboutRole || "",
      image: opp.logo || null,
      tags: opp.skills || opp.tags || [],
      department: opp.companyType || "Technology",
      category: "Internship",
      route: `/student/internships/${opp.id}`,
      visibility: "public",
      date: opp.deadline ? `Deadline: ${opp.deadline}` : "Open",
      metadata: {
        company: opp.company,
        location: opp.location || "Remote",
        workMode: opp.workMode || "Hybrid",
        stipend: opp.stipend || "Competitive",
        duration: opp.duration,
      },
    });
  });

  INITIAL_HACKATHONS.forEach((hack) => {
    if (!hack || !hack.id) return;
    index.push({
      id: hack.id,
      type: "opportunities",
      typeLabel: "Hackathon",
      title: hack.title,
      subtitle: `${hack.organizer || "Campus Partner"} • ${hack.prizes || "Prizes"}`,
      description: hack.description || "",
      image: hack.banner || null,
      tags: hack.tags || ["Hackathon", "Coding", "Innovation"],
      department: "Hackathon",
      category: "Hackathon",
      route: `/student/internships/${hack.id}`,
      visibility: "public",
      date: hack.date || "Upcoming",
      metadata: {
        company: hack.organizer,
        workMode: hack.mode || "Online",
        stipend: hack.prizes,
      },
    });
  });

  // 4. EVENTS (Campus Workshops, Contests, Talks)
  ALL_EVENTS.forEach((event) => {
    if (!event || !event.id) return;
    index.push({
      id: event.id,
      type: "events",
      typeLabel: "Event",
      title: event.title,
      subtitle: `${event.category} • ${event.date || event.venue}`,
      description: event.subtitle || event.description || "",
      image: event.image || "/assets/events/hackathon.jpg",
      tags: [event.category, ...(event.badges || [])],
      department: event.category,
      category: event.category,
      route: `/student/events/${event.id}`,
      visibility: "public",
      date: event.date,
      metadata: {
        venue: event.venue || "Main Auditorium",
        status: event.status || "Upcoming",
        seatsFilled: event.seatsFilled,
        seatsTotal: event.seatsTotal,
      },
    });
  });

  // 5. NOTICES (Public Circulars & Announcements)
  ALL_NOTICES.forEach((notice) => {
    if (!notice || !notice.id) return;
    index.push({
      id: notice.id,
      type: "notices",
      typeLabel: "Notice",
      title: notice.title,
      subtitle: `${notice.department} • ${notice.date}`,
      description: notice.description || "",
      image: null,
      tags: [notice.category, notice.department],
      department: notice.department,
      category: notice.category,
      route: `/student/notices/${notice.id}`,
      visibility: "public",
      date: notice.date,
      metadata: {
        pinned: notice.pinned || false,
        filesCount: notice.filesCount || 0,
        department: notice.department,
      },
    });
  });

  // 6. ASSIGNMENTS (Public Coursework Prompts - No private student grades/submissions)
  INITIAL_ASSIGNMENTS.forEach((asg) => {
    if (!asg || !asg.id) return;
    index.push({
      id: asg.id,
      type: "assignments",
      typeLabel: "Assignment",
      title: asg.title,
      subtitle: `${asg.subject} • ${asg.dueStatus}`,
      description: asg.description || "",
      image: null,
      tags: asg.tags || [asg.subject],
      department: asg.subject,
      category: asg.subject,
      route: `/student/assignments/${asg.id}`,
      visibility: "public",
      date: asg.dueDate,
      metadata: {
        subject: asg.subject,
        dueDate: asg.dueDate,
        priority: asg.priority,
        marks: asg.marks ? `${asg.marks} Marks` : null,
      },
    });
  });

  // 7. COURSES / SUBJECTS (Curriculum Catalog)
  Object.values(SUBJECT_DETAILS_MAP).forEach((course) => {
    if (!course || !course.code) return;
    const slug = course.slug || course.code;

    index.push({
      id: `course-${course.code}`,
      type: "courses",
      typeLabel: "Course",
      title: `${course.name} (${course.code})`,
      subtitle: `${course.department} • Semester ${course.semester}`,
      description: `Credits: ${course.credits} • ${course.type} • Faculty: ${course.faculty?.name || "Department Faculty"} • Room: ${course.lectureRoom || "Campus Block"}`,
      image: null,
      tags: [course.code, course.type, `${course.credits} Credits`],
      department: course.department,
      category: `Semester ${course.semester}`,
      route: `/student/academics/subjects/${slug}`,
      visibility: "public",
      date: `Sem ${course.semester}`,
      metadata: {
        code: course.code,
        credits: course.credits,
        faculty: course.faculty?.name,
        semester: course.semester,
      },
    });
  });

  // 8. CAMPUS FEED (Public Community Posts)
  INITIAL_POSTS.forEach((post) => {
    if (!post || !post.id) return;
    index.push({
      id: post.id,
      type: "feed",
      typeLabel: "Feed Post",
      title: `${post.author?.name} (${post.type || "Discussion"})`,
      subtitle: `${post.author?.department} • ${post.createdAt}`,
      description: post.content || "",
      image: post.author?.avatar || null,
      tags: [post.type || "Campus", post.source || "College"],
      department: post.author?.department || "Campus",
      category: post.type || "Community",
      route: `/student/feed/${post.id}`,
      visibility: "public",
      date: post.createdAt,
      metadata: {
        author: post.author?.name,
        likesCount: post.likesCount || 0,
        commentsCount: post.commentsCount || 0,
      },
    });
  });

  // 9. LOST & FOUND (Public hub items only - Excludes /my-reports personal claims)
  INITIAL_LOST_FOUND_ITEMS.forEach((item) => {
    if (!item || !item.id) return;
    index.push({
      id: item.id,
      type: "lost-found",
      typeLabel: item.status === "Lost" ? "Lost Item" : "Found Item",
      title: item.title,
      subtitle: `${item.status} at ${item.location} • ${item.date}`,
      description: item.description || "",
      image: item.image || null,
      tags: item.tags || [item.category],
      department: item.locationCategory || "Campus",
      category: item.category || "General",
      route: `/student/lost-and-found`,
      visibility: "public",
      date: item.date,
      metadata: {
        status: item.status,
        location: item.location,
        reportedBy: item.reportedBy,
      },
    });
  });

  return index;
}

// Cached index in memory
let _searchIndexCache = null;
export function getSearchIndex() {
  if (!_searchIndexCache) {
    _searchIndexCache = buildNormalizedSearchIndex();
  }
  return _searchIndexCache;
}

/**
 * Deterministic search and scoring function.
 */
export function performGlobalSearch(rawQuery, activeCategory = "all", options = {}) {
  const index = getSearchIndex();
  const query = (rawQuery || "").trim().toLowerCase();
  const { sort = "relevance", departmentFilter = "all", workModeFilter = "all" } = options;

  if (!query) {
    // Return empty results object if query is empty
    return {
      query: "",
      totalResults: 0,
      resultsByCategory: {},
      results: [],
      categoriesWithResults: [],
    };
  }

  const queryTerms = query.split(/\s+/).filter(Boolean);

  // Score each item deterministically
  const scored = [];

  index.forEach((item) => {
    // Category pre-filter
    if (activeCategory !== "all" && item.type !== activeCategory) {
      return;
    }

    // Secondary filters
    if (departmentFilter !== "all" && item.department && item.department !== departmentFilter) {
      return;
    }
    if (
      workModeFilter !== "all" &&
      item.metadata?.workMode &&
      item.metadata.workMode.toLowerCase() !== workModeFilter.toLowerCase()
    ) {
      return;
    }

    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const tagsLower = item.tags.map((t) => t.toLowerCase());
    const deptLower = (item.department || "").toLowerCase();
    const subLower = (item.subtitle || "").toLowerCase();

    let score = 0;

    // Exact title match: Highest
    if (titleLower === query) {
      score += 150;
    } else if (titleLower.startsWith(query)) {
      score += 90;
    } else if (titleLower.includes(query)) {
      score += 60;
    }

    // Check tags / skills
    if (tagsLower.includes(query)) {
      score += 50;
    } else if (tagsLower.some((t) => t.includes(query))) {
      score += 35;
    }

    // Subtitle / department / code
    if (subLower.includes(query) || deptLower.includes(query)) {
      score += 30;
    }

    // Description text match
    if (descLower.includes(query)) {
      score += 15;
    }

    // Multi-word partial matching
    if (queryTerms.length > 1) {
      let matchedTerms = 0;
      queryTerms.forEach((term) => {
        if (
          titleLower.includes(term) ||
          descLower.includes(term) ||
          tagsLower.some((t) => t.includes(term))
        ) {
          matchedTerms += 1;
        }
      });
      if (matchedTerms === queryTerms.length) {
        score += 40;
      } else if (matchedTerms > 0) {
        score += matchedTerms * 10;
      }
    }

    if (score > 0) {
      scored.push({
        ...item,
        _score: score,
      });
    }
  });

  // Sort
  if (sort === "newest") {
    scored.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } else if (sort === "alphabetical") {
    scored.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Relevance default
    scored.sort((a, b) => b._score - a._score);
  }

  // Group by category for 'all' tab
  const resultsByCategory = {};
  SEARCH_CATEGORIES.forEach((cat) => {
    if (cat.id !== "all") {
      resultsByCategory[cat.id] = [];
    }
  });

  scored.forEach((item) => {
    if (resultsByCategory[item.type]) {
      resultsByCategory[item.type].push(item);
    }
  });

  const categoriesWithResults = Object.keys(resultsByCategory).filter(
    (key) => resultsByCategory[key].length > 0
  );

  return {
    query,
    totalResults: scored.length,
    resultsByCategory,
    results: scored,
    categoriesWithResults,
  };
}

/**
 * Autocomplete suggestions generator while typing.
 */
export function getSearchSuggestions(rawQuery) {
  const query = (rawQuery || "").trim().toLowerCase();
  if (!query || query.length < 2) return [];

  const suggestions = new Set();
  const index = getSearchIndex();

  // 1. Matches in Popular Topics/Skills
  POPULAR_SKILLS.forEach((skill) => {
    if (skill.toLowerCase().includes(query)) {
      suggestions.add(skill);
    }
  });

  POPULAR_CAMPUS_TOPICS.forEach((topic) => {
    if (topic.toLowerCase().includes(query)) {
      suggestions.add(topic);
    }
  });

  // 2. Exact or prefix matches in entities
  for (const item of index) {
    if (suggestions.size >= 8) break;
    const titleLower = item.title.toLowerCase();
    if (titleLower.includes(query)) {
      suggestions.add(item.title);
    }
    for (const tag of item.tags) {
      if (suggestions.size >= 8) break;
      if (tag.toLowerCase().includes(query)) {
        suggestions.add(tag);
      }
    }
  }

  return Array.from(suggestions).slice(0, 6);
}
