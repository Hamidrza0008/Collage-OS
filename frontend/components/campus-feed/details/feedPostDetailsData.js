// Canonical data model and resolver for Campus Feed Post Discussion (/student/feed/[id])
import { INITIAL_POSTS } from "../feedData";

const FEED_INTERACTIONS_STORAGE_KEY = "college_os_feed_interactions_v1";

// Resolve author to public student profile data
export function resolveAuthorProfile(author) {
  if (!author) return null;
  const name = author.name?.toLowerCase() || "";

  if (name.includes("hamid")) {
    return {
      id: "student-1",
      name: "Hamid Rza",
      role: "Undergraduate Student",
      department: "Computer Science & Engineering",
      semester: "7th Sem",
      avatar: "/assets/profile/avatar.jpg",
      headline: "Full Stack Engineer & Open Source Builder",
      skills: ["React & Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
      projectsCount: 8,
      followersCount: 142,
      isVerified: true,
    };
  }
  if (name.includes("rohan")) {
    return {
      id: "student-3",
      name: "Rohan Verma",
      role: "Student Builder",
      department: "CSE",
      semester: "6th Sem",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      headline: "DevOps Enthusiast & Distributed Systems Learner",
      skills: ["Docker", "Kubernetes", "Go", "PostgreSQL"],
      projectsCount: 4,
      followersCount: 96,
      isVerified: false,
    };
  }
  if (name.includes("priya")) {
    return {
      id: "student-5",
      name: "Priya Sharma",
      role: "Student",
      department: "IT",
      semester: "5th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      headline: "UI/UX Designer & Frontend Developer",
      skills: ["Figma", "Tailwind CSS", "React", "Design Systems"],
      projectsCount: 5,
      followersCount: 118,
      isVerified: true,
    };
  }
  if (name.includes("aarav") || name.includes("alex")) {
    return {
      id: "student-2",
      name: author.name || "Aarav Sharma",
      role: "Student Builder",
      department: author.department || "CSE",
      semester: author.semester || "5th Sem",
      avatar: author.avatar || "/assets/events/avatars/avatar-2.jpg",
      headline: "Competitive Programmer & Systems Architect",
      skills: ["C++", "Algorithms", "Python", "Data Structures"],
      projectsCount: 6,
      followersCount: 105,
      isVerified: true,
    };
  }
  if (name.includes("sneha") || name.includes("sarah")) {
    return {
      id: "student-4",
      name: author.name || "Sneha Patel",
      role: "Student",
      department: author.department || "IT",
      semester: author.semester || "6th Sem",
      avatar: author.avatar || "/assets/events/avatars/avatar-1.jpg",
      headline: "Cloud & Security Researcher",
      skills: ["AWS", "Python", "Network Security"],
      projectsCount: 3,
      followersCount: 78,
      isVerified: false,
    };
  }

  // Fallback for official / faculty / club accounts
  return {
    id: author.id || "student-1",
    name: author.name || "Campus Community",
    role: author.role || "Campus Member",
    department: author.department || "General",
    semester: author.semester || "",
    avatar: author.avatar || "/assets/layout/profile-avatar.jpg",
    headline: `${author.role || "Campus Member"} • ${author.department || "College OS"}`,
    skills: ["Campus Leadership", "Community Organising"],
    projectsCount: 2,
    followersCount: 64,
    isVerified: author.role === "Faculty" || author.role === "Official",
  };
}

// Map canonical linked entities for connected graph navigation
export function getLinkedEntityForPost(post) {
  if (!post) return null;

  if (post.id === "post-1") {
    return {
      type: "course",
      typeLabel: "Referenced Course",
      title: "Data Structures & Advanced Algorithms",
      code: "CS301",
      route: "/student/academics/subjects/CS301",
      subtitle: "Computer Science & Engineering • 4 Credits",
      actionText: "Open Subject Details →",
    };
  }

  if (post.id === "post-2" || post.type === "Event" || post.eventDetails) {
    return {
      type: "event",
      typeLabel: "Campus Event",
      title: post.eventDetails?.title || "TechVibe 2025 Flagship Fest",
      route: "/student/events/evt-1",
      subtitle: "Main Ground • Aug 22-24, 2025",
      actionText: "View Event & Pass →",
    };
  }

  if (post.id === "post-4" || post.type === "Announcement") {
    return {
      type: "notice",
      typeLabel: "Official Circular",
      title: "Mid-Term Examination Schedule - 2026",
      route: "/student/notices/not-2",
      subtitle: "Academic Affairs • Dean of Academics",
      actionText: "Read Official Notice →",
    };
  }

  if (post.id === "post-5" || post.id === "post-15" || post.type === "Placement") {
    return {
      type: "opportunity",
      typeLabel: "Placement Drive",
      title: post.placementInfo?.company || "TCS Digital & Ninja Recruitment",
      route: "/student/internships/int-2",
      subtitle: "Batch 2026 • Engineering Systems",
      actionText: "View Drive Details →",
    };
  }

  if (post.id === "post-11") {
    return {
      type: "project",
      typeLabel: "Open Source Project",
      title: "Campus Companion (College OS)",
      route: "/student/projects/proj-1",
      subtitle: "Full-Stack • Next.js & Tailwind CSS",
      actionText: "Explore Project Repo →",
    };
  }

  if (post.id === "post-12") {
    return {
      type: "lost-found",
      typeLabel: "Campus Notice",
      title: "Lost Scientific Calculator (Casio fx-991EX)",
      route: "/student/lost-and-found",
      subtitle: "Workshop Block 2 • Reported Lost",
      actionText: "Check Lost & Found Hub →",
    };
  }

  return null;
}

// Generate rich seed comments for each post
function getSeedCommentsForPost(postId) {
  const now = Date.now();
  const MIN = 60 * 1000;
  const HOUR = 60 * MIN;

  // Rich discussion comments customized for Post 1
  if (postId === "post-1") {
    return [
      {
        id: "c-101",
        author: {
          id: "student-3",
          name: "Rohan Verma",
          avatar: "/assets/events/avatars/avatar-3.jpg",
          role: "Student",
          department: "CSE",
        },
        createdAt: "1h ago",
        timestamp: now - 65 * MIN,
        text: "The graph traversal problem took up almost 25 minutes of my time! Did anyone use BFS or Dijkstra for the shortest path sub-part?",
        likesCount: 14,
        isLiked: false,
        isOwn: false,
        replies: [
          {
            id: "r-101-1",
            author: {
              id: "student-2",
              name: "Aarav Sharma",
              avatar: "/assets/events/avatars/avatar-2.jpg",
              role: "Student",
              department: "CSE",
            },
            createdAt: "45m ago",
            timestamp: now - 45 * MIN,
            text: "Dijkstra was required because edges had non-negative weights. If you used plain BFS you might lose a few test cases.",
            likesCount: 8,
            isLiked: false,
            isOwn: false,
          },
          {
            id: "r-101-2",
            author: {
              id: "student-5",
              name: "Priya Sharma",
              avatar: "/assets/events/avatars/avatar-1.jpg",
              role: "Student",
              department: "IT",
            },
            createdAt: "30m ago",
            timestamp: now - 30 * MIN,
            text: "Yes, our professor mentioned weighted adjacency lists will be tested in Section B!",
            likesCount: 3,
            isLiked: false,
            isOwn: false,
          },
        ],
      },
      {
        id: "c-102",
        author: {
          id: "student-1",
          name: "Hamid Rza",
          avatar: "/assets/profile/avatar.jpg",
          role: "Student",
          department: "CSE",
        },
        createdAt: "50m ago",
        timestamp: now - 50 * MIN,
        text: "I implemented standard Dijkstra with a min-heap priority queue. Let me know if anyone wants to compare code snippets later today at the lab.",
        likesCount: 19,
        isLiked: true,
        isOwn: true,
        replies: [],
      },
      {
        id: "c-103",
        author: {
          id: "student-4",
          name: "Sneha Patel",
          avatar: "/assets/events/avatars/avatar-1.jpg",
          role: "Student",
          department: "IT",
        },
        createdAt: "40m ago",
        timestamp: now - 40 * MIN,
        text: "The dynamic programming problem was directly taken from Assignment 3 sheet! Glad I revised the memoization tables yesterday night.",
        likesCount: 11,
        isLiked: false,
        isOwn: false,
        replies: [],
      },
      {
        id: "c-104",
        author: {
          id: "student-6",
          name: "Kevin Patel",
          avatar: "/assets/events/avatars/avatar-2.jpg",
          role: "Student",
          department: "CSE",
        },
        createdAt: "25m ago",
        timestamp: now - 25 * MIN,
        text: "Results will be published on the Academics grade portal by Monday evening according to TA Tanmay.",
        likesCount: 6,
        isLiked: false,
        isOwn: false,
        replies: [],
      },
    ];
  }

  // Rich discussion comments for Post 2 (TechVibe Fest)
  if (postId === "post-2") {
    return [
      {
        id: "c-201",
        author: {
          id: "student-2",
          name: "Aarav Sharma",
          avatar: "/assets/events/avatars/avatar-2.jpg",
          role: "Student",
          department: "CSE",
        },
        createdAt: "3h ago",
        timestamp: now - 180 * MIN,
        text: "Can students from outside colleges participate in the 24-hour Hackathon track?",
        likesCount: 18,
        isLiked: false,
        isOwn: false,
        replies: [
          {
            id: "r-201-1",
            author: {
              id: "student-4",
              name: "Sneha Patel",
              avatar: "/assets/events/avatars/avatar-1.jpg",
              role: "Organiser",
              department: "IT",
            },
            createdAt: "2h ago",
            timestamp: now - 120 * MIN,
            text: "Yes, external teams are warmly welcome! Just make sure your team lead registers on the College OS events portal with college ID cards.",
            likesCount: 12,
            isLiked: false,
            isOwn: false,
          },
        ],
      },
      {
        id: "c-202",
        author: {
          id: "student-1",
          name: "Hamid Rza",
          avatar: "/assets/profile/avatar.jpg",
          role: "Student",
          department: "CSE",
        },
        createdAt: "2h ago",
        timestamp: now - 110 * MIN,
        text: "Looking for 2 teammates (one frontend designer and one backend engineer) for the Web3 & Open Source track. DM me or connect via profile!",
        likesCount: 22,
        isLiked: true,
        isOwn: true,
        replies: [],
      },
      {
        id: "c-203",
        author: {
          id: "student-3",
          name: "Rohan Verma",
          avatar: "/assets/events/avatars/avatar-3.jpg",
          role: "Student",
          department: "CSE",
        },
        createdAt: "1h ago",
        timestamp: now - 60 * MIN,
        text: "Are accommodation arrangements provided in the campus guest house for outstation hackathon participants?",
        likesCount: 7,
        isLiked: false,
        isOwn: false,
        replies: [],
      },
    ];
  }

  // Default seed discussion for other posts
  return [
    {
      id: `c-${postId}-1`,
      author: {
        id: "student-2",
        name: "Aarav Sharma",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        role: "Student",
        department: "CSE",
      },
      createdAt: "3h ago",
      timestamp: now - 180 * MIN,
      text: "Thanks for sharing this campus update! Very helpful context for our upcoming study plans.",
      likesCount: 9,
      isLiked: false,
      isOwn: false,
      replies: [
        {
          id: `r-${postId}-1-1`,
          author: {
            id: "student-5",
            name: "Priya Sharma",
            avatar: "/assets/events/avatars/avatar-1.jpg",
            role: "Student",
            department: "IT",
          },
          createdAt: "2h ago",
          timestamp: now - 120 * MIN,
          text: "Agreed, keeping track of deadlines has been much smoother this term.",
          likesCount: 4,
          isLiked: false,
          isOwn: false,
        },
      ],
    },
    {
      id: `c-${postId}-2`,
      author: {
        id: "student-3",
        name: "Rohan Verma",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        role: "Student",
        department: "CSE",
      },
      createdAt: "1h ago",
      timestamp: now - 60 * MIN,
      text: "Has anyone reached out to the department office for further confirmation on timings?",
      likesCount: 5,
      isLiked: false,
      isOwn: false,
      replies: [],
    },
  ];
}

// Local storage interactions loader
function getStoredInteractions() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(FEED_INTERACTIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Save local interactions (likes, bookmarks, comments)
export function saveStoredInteraction(postId, data) {
  if (typeof window === "undefined") return;
  try {
    const all = getStoredInteractions();
    all[postId] = { ...(all[postId] || {}), ...data };
    localStorage.setItem(FEED_INTERACTIONS_STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error("Failed to save feed interaction:", err);
  }
}

// Comprehensive post resolver by ID
export function getFeedPostById(postId) {
  if (!postId) return null;

  // 1. Look up in INITIAL_POSTS
  const found = INITIAL_POSTS.find((p) => p.id === postId);
  if (!found) return null;

  // 2. Retrieve local persisted overrides
  const localInteractions = getStoredInteractions()[postId] || {};

  // 3. Resolve author profile
  const authorProfile = resolveAuthorProfile(found.author);

  // 4. Resolve linked entity
  const linkedEntity = getLinkedEntityForPost(found);

  // 5. Resolve comments
  const defaultComments = getSeedCommentsForPost(postId);
  const activeComments = localInteractions.comments || defaultComments;

  // Calculate live comments and replies count
  const totalReplies = activeComments.reduce(
    (acc, c) => acc + (c.replies ? c.replies.length : 0),
    0
  );
  const totalDiscussionCount = activeComments.length + totalReplies;

  // Calculate likes
  const isLiked =
    typeof localInteractions.isLiked === "boolean"
      ? localInteractions.isLiked
      : found.isLiked || false;

  const likesCount =
    typeof localInteractions.likesCount === "number"
      ? localInteractions.likesCount
      : isLiked
      ? (found.likesCount || 0) + 1
      : found.likesCount || 0;

  const isSaved =
    typeof localInteractions.isSaved === "boolean"
      ? localInteractions.isSaved
      : found.isSaved || false;

  return {
    ...found,
    isLiked,
    likesCount,
    isSaved,
    commentsCount: totalDiscussionCount,
    comments: activeComments,
    authorProfile,
    linkedEntity,
    visibility: found.visibility || "Campus Wide",
    tags: found.tags || [found.type || "General", found.source || "Campus", "CollegeOS"],
  };
}

// Retrieve 3–4 related posts matching category, department, or tags
export function getRelatedPosts(currentPost, limit = 3) {
  if (!currentPost) return [];

  const candidates = INITIAL_POSTS.filter((p) => p.id !== currentPost.id);

  // Sort candidates by relevance to currentPost
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.type?.toLowerCase() === currentPost.type?.toLowerCase()) score += 3;
    if (p.author?.department === currentPost.author?.department) score += 2;
    if (p.source === currentPost.source) score += 1;
    return { post: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => ({
    id: s.post.id,
    type: s.post.type,
    author: s.post.author,
    content: s.post.content,
    createdAt: s.post.createdAt,
    likesCount: s.post.likesCount,
    commentsCount: s.post.commentsCount,
    route: `/student/feed/${s.post.id}`,
  }));
}
