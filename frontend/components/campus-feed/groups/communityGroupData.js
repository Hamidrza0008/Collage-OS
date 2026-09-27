// Canonical data model and resolver for Campus Community / Club Hub (/student/feed/groups/[id])
import { INITIAL_POSTS } from "../feedData";

const COMMUNITY_STORAGE_KEY = "college_os_communities_membership_v1";

export const ALL_COMMUNITIES = [
  {
    id: "group-1",
    slug: "gdsc",
    aliases: ["c-1", "google-developer-student-club", "gdsc-campus"],
    name: "Google Developer Student Club (GDSC)",
    shortName: "GDSC Campus",
    tagline: "Connect, learn, and grow with campus student developers building solutions with Google tech.",
    description:
      "GDSC is a university-based community group for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome. By joining GDSC, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their campus community.",
    category: "Technology & Software",
    department: "Computer Science & Engineering",
    campus: "Main Campus",
    verified: true,
    officialStatus: "Recognized Student Chapter",
    membershipType: "Open", // 'Open' | 'Request' | 'Closed'
    visibility: "Campus Wide", // 'Campus Wide' | 'Department' | 'Private'
    foundedYear: 2023,
    memberCount: 420,
    eventCount: 14,
    projectCount: 9,
    activityLevel: "Very Active",
    meetingSchedule: "Every Alternate Wednesday • 5:00 PM at Seminar Hall 2",
    logo: "/assets/campus-feed/trending/techvibe-thumb.jpg",
    coverImage: "/assets/events/tech-talk.jpg",
    tags: [
      "Web Development",
      "Cloud Computing",
      "Machine Learning",
      "Android",
      "Open Source",
      "Google Cloud",
      "Flutter",
    ],
    guidelines: [
      "Be respectful and supportive of all members regardless of technical background.",
      "Share knowledge openly and credit open-source contributors.",
      "No spam or unsolicited self-promotion in technical channels.",
      "Active participation in campus hackathons and community code sprints is encouraged.",
    ],
    links: {
      website: "https://gdsc.community.dev/campus-chapter",
      github: "https://github.com/gdsc-campus-chapter",
      discord: "https://discord.gg/gdsc-campus",
      linkedin: "https://linkedin.com/company/gdsc-campus",
    },
    leaders: [
      {
        id: "student-1",
        name: "Hamid Rza",
        role: "Lead Organiser",
        department: "CSE • 7th Sem",
        avatar: "/assets/profile/avatar.jpg",
        skills: ["React & Next.js", "Systems Architecture", "Node.js"],
        isVerified: true,
      },
      {
        id: "student-2",
        name: "Alex Chen",
        role: "AI / ML Track Lead",
        department: "CSE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        skills: ["Python", "TensorFlow", "Algorithms"],
        isVerified: true,
      },
      {
        id: "student-5",
        name: "Priya Sharma",
        role: "Design & Frontend Lead",
        department: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        skills: ["Figma", "UI/UX", "Tailwind CSS"],
        isVerified: true,
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Cloud & DevOps Lead",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        skills: ["Docker", "Kubernetes", "PostgreSQL"],
        isVerified: false,
      },
    ],
    members: [
      {
        id: "student-1",
        name: "Hamid Rza",
        role: "Lead",
        department: "CSE • 7th Sem",
        avatar: "/assets/profile/avatar.jpg",
      },
      {
        id: "student-2",
        name: "Alex Chen",
        role: "Core Team",
        department: "CSE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Core Team",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
      },
      {
        id: "student-4",
        name: "Sarah Jenkins",
        role: "Member",
        department: "IT • 6th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
      },
      {
        id: "student-5",
        name: "Priya Sharma",
        role: "Core Team",
        department: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
      },
      {
        id: "student-6",
        name: "Kevin Patel",
        role: "Member",
        department: "CSE • 4th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
      {
        id: "student-7",
        name: "Aryan Verma",
        role: "Member",
        department: "ECE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
      },
      {
        id: "student-8",
        name: "Muskan Khan",
        role: "Member",
        department: "CSE • 4th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
      },
    ],
    announcements: [
      {
        id: "ann-1",
        title: "GDSC Solution Challenge 2026 Orientation Meet",
        date: "This Friday • 4:30 PM",
        author: "Hamid Rza",
        importance: "high",
        summary:
          "Kick-off session for the annual global Solution Challenge. Problem statements align with the 17 UN Sustainable Development Goals.",
        actionText: "Join Discussion",
        route: "/student/feed/post-9",
      },
      {
        id: "ann-2",
        title: "Core Team Applications Open for Winter Cohort",
        date: "Deadline: Oct 25",
        author: "Core Committee",
        importance: "normal",
        summary:
          "Open roles for Content Writing, Event Management, and Cloud Study Jam Facilitators.",
        actionText: "View Details",
        route: "/student/feed/post-9",
      },
    ],
    linkedEventIds: ["event-1", "event-2", "event-5"],
    linkedProjectIds: ["proj-1", "proj-2"],
    postIds: ["post-9", "post-1", "post-11"],
    relatedGroupIds: ["group-2", "group-3", "group-4"],
  },
  {
    id: "group-2",
    slug: "robotics-society",
    aliases: ["c-2", "robotics-iot-innovators", "robotics-club"],
    name: "Robotics & IoT Innovators Society",
    shortName: "Robotics Society",
    tagline: "Designing autonomous robots, IoT telemetry, and embedded hardware prototypes.",
    description:
      "A hands-on student society focused on autonomous robotic systems, microcontroller firmware, computer vision, and IoT edge devices. We organize hardware build jams, participate in national Robocon and line-follower competitions, and provide lab inventory for research projects.",
    category: "Hardware & Robotics",
    department: "ECE & Mechanical Engineering",
    campus: "Main Campus",
    verified: true,
    officialStatus: "Department Student Society",
    membershipType: "Request", // Requires short application
    visibility: "Campus Wide",
    foundedYear: 2022,
    memberCount: 210,
    eventCount: 11,
    projectCount: 6,
    activityLevel: "Active",
    meetingSchedule: "Every Saturday • 11:00 AM at Hardware Maker Lab (Block 2)",
    logo: "/assets/campus-feed/trending/cricket-thumb.jpg",
    coverImage: "/assets/events/robotics.jpg",
    tags: [
      "Robotics",
      "Internet of Things",
      "Arduino & ESP32",
      "ROS2",
      "CAD & 3D Printing",
      "Edge AI",
      "Automation",
    ],
    guidelines: [
      "Follow laboratory safety protocols during soldering and high-current battery testing.",
      "Clean up bench workspaces and safely store loaned components after sessions.",
      "Collaborative project teams must maintain updated bill-of-materials and Git repos.",
    ],
    links: {
      github: "https://github.com/robotics-campus-society",
      discord: "https://discord.gg/robotics-campus",
    },
    leaders: [
      {
        id: "student-4",
        name: "Sarah Jenkins",
        role: "Society President",
        department: "ECE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        skills: ["Embedded C", "Circuit Design", "ROS2"],
        isVerified: true,
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Hardware & Fabrication Lead",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        skills: ["IoT Telemetry", "Docker", "Go"],
        isVerified: false,
      },
      {
        id: "student-2",
        name: "Alex Chen",
        role: "Computer Vision Lead",
        department: "CSE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        skills: ["OpenCV", "Python", "SLAM Navigation"],
        isVerified: true,
      },
    ],
    members: [
      {
        id: "student-4",
        name: "Sarah Jenkins",
        role: "President",
        department: "ECE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Lead",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
      },
      {
        id: "student-2",
        name: "Alex Chen",
        role: "Lead",
        department: "CSE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
      {
        id: "student-7",
        name: "Tanvi Deshmukh",
        role: "Core Team",
        department: "ECE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
      },
      {
        id: "student-6",
        name: "Kevin Patel",
        role: "Member",
        department: "CSE • 4th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
    ],
    announcements: [
      {
        id: "ann-r1",
        title: "Hands-on ESP32 & ROS2 Sensor Fusion Workshop",
        date: "Saturday • 10:00 AM",
        author: "Sarah Jenkins",
        importance: "high",
        summary:
          "Free hardware kits will be provided for teams of 3. Please RSVP on the community feed.",
        actionText: "View Workshop Post",
        route: "/student/feed/post-16",
      },
    ],
    linkedEventIds: ["event-6", "event-2"],
    linkedProjectIds: ["proj-3"],
    postIds: ["post-16"],
    relatedGroupIds: ["group-1", "group-3"],
  },
  {
    id: "group-3",
    slug: "codevibe",
    aliases: ["c-3", "coding-club", "dsa-cp-pod", "codevibe-cp"],
    name: "CodeVibe - DSA & Competitive Programming Pod",
    shortName: "CodeVibe CP",
    tagline: "Peer coding pods, LeetCode sprints, and algorithmic problem-solving for placements.",
    description:
      "CodeVibe is a vibrant student-run algorithmic problem-solving community. Members participate in weekly Codeforces contests, solve curated LeetCode topical sheets, simulate technical interviews, and discuss optimal solutions for technical placement rounds.",
    category: "Academics & Placements",
    department: "Computer Science & Engineering",
    campus: "Main Campus",
    verified: true,
    officialStatus: "Student-Led Interest Group",
    membershipType: "Open",
    visibility: "Campus Wide",
    foundedYear: 2024,
    memberCount: 580,
    eventCount: 22,
    projectCount: 5,
    activityLevel: "Very Active",
    meetingSchedule: "Every Sunday • 7:00 PM (Virtual Mock Contest Review)",
    logo: "/assets/campus-feed/trending/dsa-thumb.jpg",
    coverImage: "/assets/events/hackathon.jpg",
    tags: [
      "Competitive Programming",
      "Data Structures",
      "Dynamic Programming",
      "LeetCode",
      "Codeforces",
      "Interview Prep",
    ],
    guidelines: [
      "Discussions must focus on constructive problem analysis and complexity proofs.",
      "No direct answer dumping during ongoing live rated contests.",
      "Help junior students understand fundamental algorithmic patterns with patience.",
    ],
    links: {
      github: "https://github.com/codevibe-campus",
      discord: "https://discord.gg/codevibe-dsa",
    },
    leaders: [
      {
        id: "student-6",
        name: "Kevin Patel",
        role: "CP Lead & Contest Host",
        department: "CSE • 4th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        skills: ["C++", "Number Theory", "Graph Algorithms"],
        isVerified: true,
      },
      {
        id: "student-1",
        name: "Hamid Rza",
        role: "Systems & Algorithm Mentor",
        department: "CSE • 7th Sem",
        avatar: "/assets/profile/avatar.jpg",
        skills: ["Distributed Systems", "Full-Stack", "JavaScript"],
        isVerified: true,
      },
      {
        id: "student-5",
        name: "Priya Sharma",
        role: "Placement Pod Coordinator",
        department: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        skills: ["Data Structures", "Technical Communication"],
        isVerified: true,
      },
    ],
    members: [
      {
        id: "student-6",
        name: "Kevin Patel",
        role: "Lead",
        department: "CSE • 4th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
      {
        id: "student-1",
        name: "Hamid Rza",
        role: "Mentor",
        department: "CSE • 7th Sem",
        avatar: "/assets/profile/avatar.jpg",
      },
      {
        id: "student-2",
        name: "Alex Chen",
        role: "Core Team",
        department: "CSE • 5th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Member",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
      },
    ],
    announcements: [
      {
        id: "ann-c1",
        title: "Weekly DSA Sprint: Dynamic Programming & Bitmasking",
        date: "Sunday • 7:00 PM",
        author: "Kevin Patel",
        importance: "high",
        summary:
          "5 problems from AtCoder Educational DP contest. Discussion and solution walkthrough in Discord Voice Hall A.",
        actionText: "View Discussion",
        route: "/student/feed/post-1",
      },
    ],
    linkedEventIds: ["event-1"],
    linkedProjectIds: ["proj-4", "proj-1"],
    postIds: ["post-1", "post-6", "post-14"],
    relatedGroupIds: ["group-1", "group-2"],
  },
  {
    id: "group-4",
    slug: "rangmanch",
    aliases: ["c-4", "cultural-club", "theatre-society", "drama-club"],
    name: "Rangmanch Cultural & Drama Club",
    shortName: "Rangmanch",
    tagline: "Stage plays, street theatre (Nukkad Natak), music jams, and campus arts expression.",
    description:
      "Rangmanch is the premier theatrical and cultural society of our college. We produce annual stage dramas, perform street plays on social themes, coordinate inter-college musical showcases, and manage performance stages during the annual campus festival.",
    category: "Arts & Culture",
    department: "Student Affairs",
    campus: "Main Campus",
    verified: true,
    officialStatus: "Official Cultural Society",
    membershipType: "Open",
    visibility: "Campus Wide",
    foundedYear: 2021,
    memberCount: 190,
    eventCount: 16,
    projectCount: 3,
    activityLevel: "Active",
    meetingSchedule: "Tuesday & Thursday • 5:30 PM at Open Air Theatre (OAT)",
    logo: "/assets/campus-feed/trending/techvibe-thumb.jpg",
    coverImage: "/assets/events/techvibe-banner.jpg",
    tags: [
      "Drama",
      "Theatre",
      "Nukkad Natak",
      "Music",
      "Stage Acting",
      "Cultural Festival",
      "Scriptwriting",
    ],
    guidelines: [
      "Rehearsal discipline is essential prior to college festivals and competitive events.",
      "Respect creative differences and foster an inclusive environment for new performers.",
    ],
    links: {
      website: "https://rangmanch-campus.org",
      instagram: "https://instagram.com/rangmanch_official",
    },
    leaders: [
      {
        id: "student-5",
        name: "Priya Sharma",
        role: "Cultural Secretary & Director",
        department: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        skills: ["Stage Direction", "Production Design"],
        isVerified: true,
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Production & Stage Manager",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        skills: ["Sound Engineering", "Stage Logistics"],
        isVerified: false,
      },
    ],
    members: [
      {
        id: "student-5",
        name: "Priya Sharma",
        role: "Lead",
        department: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
      },
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Core Team",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
      },
    ],
    announcements: [
      {
        id: "ann-rm1",
        title: "Auditions for 'Rangmanch' Annual Drama Night",
        date: "Tomorrow 5:00 PM",
        author: "Cultural Committee",
        importance: "high",
        summary:
          "Solo acting, musical instrument, and backstage design auditions open at the Open Air Theatre.",
        actionText: "View Fest Notice",
        route: "/student/feed/post-10",
      },
    ],
    linkedEventIds: ["event-3"],
    linkedProjectIds: [],
    postIds: ["post-10", "post-2"],
    relatedGroupIds: ["group-5", "group-1"],
  },
  {
    id: "group-5",
    slug: "sports-guild",
    aliases: ["c-5", "athletics-council", "sports-club"],
    name: "College Athletics & Sports Guild",
    shortName: "Sports Guild",
    tagline: "Inter-college championships, cricket trials, football leagues, and fitness workouts.",
    description:
      "The official campus athletics and sports council coordinating varsity teams across cricket, football, basketball, badminton, table tennis, and track-and-field. We manage intramural tournaments and practice facilities.",
    category: "Sports & Fitness",
    department: "Physical Education Department",
    campus: "Sports Complex",
    verified: true,
    officialStatus: "Official Sports Council",
    membershipType: "Open",
    visibility: "Campus Wide",
    foundedYear: 2020,
    memberCount: 340,
    eventCount: 19,
    projectCount: 2,
    activityLevel: "Very Active",
    meetingSchedule: "Daily Practice Sessions • 6:30 AM & 4:30 PM at Main Sports Arena",
    logo: "/assets/campus-feed/trending/cricket-thumb.jpg",
    coverImage: "/assets/events/football.jpg",
    tags: [
      "Cricket",
      "Football",
      "Basketball",
      "Fitness",
      "Inter-College League",
      "Athletics",
    ],
    guidelines: [
      "Mandatory attendance during tournament trial camps for team selection.",
      "Proper sportswear and college student ID cards must be presented at the sports desk.",
    ],
    links: {
      website: "https://sports.college.edu",
    },
    leaders: [
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Sports Captain",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        skills: ["Cricket Varsity Captain", "Team Strategy"],
        isVerified: true,
      },
    ],
    members: [
      {
        id: "student-3",
        name: "Rohan Verma",
        role: "Captain",
        department: "CSE • 6th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
      },
      {
        id: "student-6",
        name: "Kevin Patel",
        role: "Member",
        department: "CSE • 4th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
      },
    ],
    announcements: [
      {
        id: "ann-sp1",
        title: "Cricket Team Selection Trials for University Cup",
        date: "This Friday • 4:00 PM",
        author: "Sports Council",
        importance: "high",
        summary:
          "Trials at Main Sports Complex. Freshers and senior students are welcome with standard whites.",
        actionText: "View Announcement",
        route: "/student/feed/post-7",
      },
    ],
    linkedEventIds: ["event-4"],
    linkedProjectIds: [],
    postIds: ["post-7"],
    relatedGroupIds: ["group-4", "group-1"],
  },
  {
    id: "group-6",
    slug: "faculty-review-board",
    aliases: ["private-board", "internal-advisory"],
    name: "Internal Academic Disciplinary Committee",
    shortName: "Disciplinary Board",
    tagline: "Confidential faculty and administration review board.",
    description: "Internal restricted committee.",
    category: "Administration",
    department: "Dean Office",
    campus: "Admin Block",
    verified: true,
    officialStatus: "Confidential",
    membershipType: "Closed",
    visibility: "Private", // Strictly private!
    foundedYear: 2018,
    memberCount: 6,
    eventCount: 0,
    projectCount: 0,
    tags: ["Confidential"],
    guidelines: [],
    leaders: [],
    members: [],
    announcements: [],
    linkedEventIds: [],
    linkedProjectIds: [],
    postIds: [],
    relatedGroupIds: [],
  },
];

// Local storage membership helpers
export function getStoredCommunityMemberships() {
  if (typeof window === "undefined") {
    return {
      "group-1": { isJoined: true, isFollowing: true, status: "joined" },
      "group-3": { isJoined: true, isFollowing: true, status: "joined" },
    };
  }

  try {
    const raw = localStorage.getItem(COMMUNITY_STORAGE_KEY);
    if (!raw) {
      const initial = {
        "group-1": { isJoined: true, isFollowing: true, status: "joined" },
        "group-3": { isJoined: true, isFollowing: true, status: "joined" },
      };
      localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {
      "group-1": { isJoined: true, isFollowing: true, status: "joined" },
      "group-3": { isJoined: true, isFollowing: true, status: "joined" },
    };
  }
}

export function getCommunityMembershipState(groupId) {
  const all = getStoredCommunityMemberships();
  return all[groupId] || null;
}

export function saveCommunityMembership(groupId, data) {
  if (typeof window === "undefined") return;
  try {
    const all = getStoredCommunityMemberships();
    all[groupId] = { ...(all[groupId] || {}), ...data };
    localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("college_os_community_membership_updated"));
  } catch (err) {
    console.error("Failed to save community membership:", err);
  }
}

export const COMMUNITY_GROUPS = ALL_COMMUNITIES;

// Canonical resolver for Community Group
export function getCommunityGroupById(identifier) {
  if (!identifier) return null;
  const target = String(identifier).toLowerCase().trim();

  // Find by id, slug, or alias
  const group = ALL_COMMUNITIES.find((c) => {
    if (c.id.toLowerCase() === target) return true;
    if (c.slug.toLowerCase() === target) return true;
    if (c.aliases && c.aliases.some((a) => a.toLowerCase() === target)) return true;
    return false;
  });

  if (!group) return null;

  // Enforce privacy rule: Private groups cannot be viewed by standard student
  if (group.visibility === "Private") {
    return { isPrivateDenied: true, name: group.name };
  }

  // Merge with local membership status
  const memberships = getStoredCommunityMemberships();
  const userMembership = memberships[group.id] || {
    isJoined: false,
    isFollowing: false,
    status: "idle",
  };

  // Resolve posts
  const groupPosts = (group.postIds || [])
    .map((pId) => INITIAL_POSTS.find((p) => p.id === pId))
    .filter(Boolean);

  return {
    ...group,
    isJoined: userMembership.isJoined || false,
    isFollowing: userMembership.isFollowing || false,
    membershipStatus: userMembership.status || "idle", // 'idle' | 'joined' | 'requested'
    memberCount: userMembership.isJoined ? group.memberCount + 1 : group.memberCount,
    posts: groupPosts,
  };
}

// Get related communities (excluding current)
export function getRelatedCommunities(currentGroupId, limit = 3) {
  const current = ALL_COMMUNITIES.find((c) => c.id === currentGroupId);
  const others = ALL_COMMUNITIES.filter(
    (c) => c.id !== currentGroupId && c.visibility !== "Private"
  );

  if (!current) return others.slice(0, limit);

  // Score by shared category or tags
  const scored = others.map((other) => {
    let score = 0;
    if (other.category === current.category) score += 3;
    if (other.department === current.department) score += 2;
    const sharedTags = (other.tags || []).filter((t) => (current.tags || []).includes(t));
    score += sharedTags.length;
    return { group: other, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => ({
    id: s.group.id,
    name: s.group.name,
    shortName: s.group.shortName,
    category: s.group.category,
    memberCount: s.group.memberCount,
    logo: s.group.logo,
    verified: s.group.verified,
    route: `/student/feed/groups/${s.group.id}`,
  }));
}
