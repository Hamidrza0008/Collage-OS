import { ALL_EVENTS } from "../eventsData";

/**
 * Rich mock data for canonical events
 */
export const DETAILED_EVENTS = {
  "event-1": {
    id: "event-1",
    title: "College Hackathon 2025",
    subtitle: "Build innovative solutions, collaborate with peers and win exciting prizes.",
    category: "Hackathon",
    badges: ["Featured", "🔥 Popular"],
    isFeatured: true,
    isPopular: true,
    status: "Registration Open",
    rawStatus: "upcoming",
    date: "22–24 Aug 2025",
    fullDate: "August 22 – 24, 2025",
    time: "10:00 AM onwards",
    eventDuration: "48-Hour Continuous Hackathon",
    venue: "Main Auditorium",
    registrationDeadline: "20 Aug 2025 • 11:59 PM",
    seatsTotal: 500,
    seatsFilled: 248,
    participation: "Team (2–4 members)",
    eligibility: "All Students (UG & PG)",
    image: "/assets/events/hackathon.jpg",
    bannerLight: "/assets/events/light/hero-banner.jpg",
    bannerDark: "/assets/events/dark/hero-banner.jpg",
    isBookmarked: false,
    isRegistered: false,
    registrationId: null,

    overview: {
      about:
        "Build innovative solutions, collaborate with peers and win exciting prizes. Open for all branches! College Hackathon 2025 brings together developers, designers, and innovators to build rapid prototypes solving real-world challenges across healthcare, smart education, green energy, and campus life automation.",
      facts: [
        { label: "Date", value: "22–24 Aug 2025" },
        { label: "Time", value: "10:00 AM – 6:00 PM" },
        { label: "Venue", value: "Main Auditorium" },
        { label: "Participation", value: "Team (2–4 members)" },
        { label: "Eligibility", value: "All Students" },
        { label: "Organizer", value: "College Innovation Cell" },
      ],
    },

    highlights: [
      {
        icon: "Zap",
        title: "Build real-world solutions",
        desc: "Tackle authentic problem statements curated by campus labs and industry partners.",
      },
      {
        icon: "Users",
        title: "Team up with students",
        desc: "Form inter-disciplinary teams spanning developers, designers, and domain experts.",
      },
      {
        icon: "Briefcase",
        title: "Meet industry mentors",
        desc: "Receive 1-on-1 architecture feedback from senior engineers and startup founders.",
      },
      {
        icon: "Trophy",
        title: "Win exciting prizes",
        desc: "Over ₹1,00,000 in cash prizes, cloud credits, and innovation grants up for grabs.",
      },
      {
        icon: "Code2",
        title: "Add project to portfolio",
        desc: "Showcase your deployed codebase on your verified student profile and GitHub.",
      },
      {
        icon: "Award",
        title: "Get campus recognition",
        desc: "Finalists present on stage with university leadership and regional media coverage.",
      },
    ],

    schedule: [
      {
        day: "DAY 1",
        date: "22 Aug 2025",
        sessions: [
          { time: "10:00 AM", title: "Opening Ceremony & Keynote", status: "upcoming", desc: "Welcome address by Dean of Academics and keynote speaker." },
          { time: "11:00 AM", title: "Problem Statements Released", status: "upcoming", desc: "Tracks unlocked across AI, Web3, Smart Campus, and CleanTech." },
          { time: "12:00 PM", title: "Hacking Begins", status: "upcoming", desc: "Teams commence sprint 1 with high-speed campus fiber networking." },
          { time: "06:00 PM", title: "Mentor Check-in Round 1", status: "upcoming", desc: "Design validation and technical feasibility review." },
        ],
      },
      {
        day: "DAY 2",
        date: "23 Aug 2025",
        sessions: [
          { time: "10:00 AM", title: "Mentor Review Round 2", status: "upcoming", desc: "Mid-way progress evaluation and deployment sanity checks." },
          { time: "04:00 PM", title: "Submission Deadline", status: "upcoming", desc: "GitHub repositories and video demonstration links locked." },
          { time: "07:00 PM", title: "Preliminary Pitch Sessions", status: "upcoming", desc: "Judges review all submitted projects in breakout rooms." },
        ],
      },
      {
        day: "DAY 3",
        date: "24 Aug 2025",
        sessions: [
          { time: "10:00 AM", title: "Finalist Project Demos", status: "upcoming", desc: "Top 10 teams demonstrate live prototypes in the Auditorium." },
          { time: "03:00 PM", title: "Final Jury Deliberation", status: "upcoming", desc: "Scoring based on innovation, design, usability, and impact." },
          { time: "05:00 PM", title: "Winners Announcement & Valedictory", status: "upcoming", desc: "Awarding trophies, certificates, and closing banquet." },
        ],
      },
    ],

    speakers: [
      {
        id: "spk-1",
        name: "Rohan Mehta",
        role: "Founder, DevSummit",
        track: "Startup & Product Strategy",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        bio: "Serial entrepreneur with 10+ years scaling developer platforms. Angel investor and active open-source contributor.",
        linkedin: "https://linkedin.com",
      },
      {
        id: "spk-2",
        name: "Priya Sharma",
        role: "Engineering Lead, TechCorp",
        track: "Full Stack Engineering",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        bio: "Specializes in high-concurrency microservices, cloud-native deployments, and modern React architectures.",
        linkedin: "https://linkedin.com",
      },
      {
        id: "spk-3",
        name: "Aarav Kapoor",
        role: "AI Research Scientist",
        track: "Generative AI & LLMs",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        bio: "Author of peer-reviewed deep learning papers in multimodal vision models and autonomous agent workflows.",
        linkedin: "https://linkedin.com",
      },
    ],

    venueDetails: {
      title: "Main Auditorium",
      institution: "XYZ College of Engineering",
      building: "Main Block (Academic Wing A)",
      room: "Auditorium Hall, Level 2",
      address: "College Campus, Central Avenue, Mumbai",
      directions: "Enter via Gate 1, proceed 100 meters straight past the central fountain plaza. The entrance is via the East Foyer elevators.",
      mapCoordinates: { lat: 19.076, lng: 72.8777 },
    },

    organizer: {
      name: "College Innovation Cell",
      subtitle: "Student Chapter & Department of CSE",
      studentCoordinator: "Rohan Mehta",
      facultyCoordinator: "Dr. Priya Sharma",
      email: "innovation-cell@college.edu",
      phone: "+91 98765 43210",
      office: "Innovation Hub, Room 204",
      socialLinks: {
        website: "https://innovation.college.edu",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },

    attendees: {
      count: 248,
      avatars: [
        "/assets/events/avatars/avatar-1.jpg",
        "/assets/events/avatars/avatar-2.jpg",
        "/assets/events/avatars/avatar-3.jpg",
      ],
      sampleList: [
        { name: "Rohan Mehta", branch: "CSE 7th Sem", role: "Team Lead" },
        { name: "Sneha Patel", branch: "ISE 5th Sem", role: "Frontend Dev" },
        { name: "Karan Singh", branch: "ECE 7th Sem", role: "Hardware Hacker" },
        { name: "Ayesha Khan", branch: "AIML 5th Sem", role: "AI Engineer" },
        { name: "Vikram Rao", branch: "CSE 3rd Sem", role: "Backend Dev" },
        { name: "Ananya Deshmukh", branch: "Design 5th Sem", role: "UI/UX Designer" },
      ],
    },

    faqs: [
      {
        question: "Who can participate?",
        answer:
          "Any currently enrolled undergraduate or postgraduate engineering student from any year or branch is eligible to participate with a valid college ID card.",
      },
      {
        question: "Can I participate individually?",
        answer:
          "While teams of 2 to 4 members are recommended for optimal workload distribution, individual participation is also permitted. Solo participants can connect with other students during the Day 1 networking mixer.",
      },
      {
        question: "What should I bring?",
        answer:
          "Bring your college ID card, personal laptop, chargers, extension board, and any specific microcontroller boards or sensors required for your project prototype.",
      },
      {
        question: "Is there a registration fee?",
        answer:
          "No! College Hackathon 2025 is completely free for all enrolled college students. Refreshments and meals during the 48-hour event are provided courtesy of our sponsors.",
      },
      {
        question: "Where will the event happen?",
        answer:
          "The main stage and keynotes are in the Main Auditorium. Team hacking pods and sprint desks are allocated across Computer Labs 1, 2, and the Open Innovation Arena.",
      },
      {
        question: "Will participation certificates be provided?",
        answer:
          "Yes, official verifiable digital participation certificates, college academic activity credits, and College OS profile badges will be awarded to all teams submitting a working prototype.",
      },
    ],

    questions: [
      {
        id: "q-1",
        author: "Aditya Roy",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        time: "Yesterday at 4:15 PM",
        question: "Will the problem statement be given on Day 1?",
        answer:
          "Yes! All teams will receive the problem statements and judging rubric during the opening ceremony on August 22 at 11:00 AM.",
        answerBy: "Innovation Cell Coordinator",
      },
      {
        id: "q-2",
        author: "Meera Nair",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        time: "2 days ago",
        question: "Can we use pre-existing third-party APIs and libraries?",
        answer:
          "Open-source packages, standard libraries, and cloud APIs are permitted. However, core business logic and interface design must be implemented during the hackathon timeline.",
        answerBy: "Technical Committee",
      },
    ],

    relatedEventIds: ["event-2", "event-4", "event-6"],
  },
};

/**
 * Dynamic event details resolver
 * Supports:
 * - "event-1", "event-2", etc.
 * - numeric IDs: "1", "2"
 * - slugs / title matches
 * - synthesizes rich detailed view for any existing ALL_EVENTS item
 */
export function getEventDetails(idOrSlug) {
  if (!idOrSlug) return null;
  const query = String(idOrSlug).toLowerCase().trim();

  // 1. Direct match in DETAILED_EVENTS
  if (DETAILED_EVENTS[query]) {
    return DETAILED_EVENTS[query];
  }

  // 2. Normalized aliases: "1" -> "event-1"
  const normalizedId = query.startsWith("event-") ? query : `event-${query}`;
  if (DETAILED_EVENTS[normalizedId]) {
    return DETAILED_EVENTS[normalizedId];
  }

  // 3. Search in ALL_EVENTS dataset
  const match = ALL_EVENTS.find(
    (e) =>
      e.id.toLowerCase() === query ||
      e.id.toLowerCase() === normalizedId ||
      e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === query
  );

  if (!match) {
    if (query === "1" || query === "event-1") {
      return DETAILED_EVENTS["event-1"];
    }
    return null;
  }

  // 4. Synthesize complete rich structure from existing event card
  const isTeam = match.participation?.toLowerCase().includes("team");

  return {
    id: match.id,
    title: match.title,
    subtitle: match.description,
    category: match.category,
    badges: match.badges || [],
    isFeatured: Boolean(match.isFeatured),
    isPopular: Boolean(match.isPopular),
    status: match.status === "ongoing" ? "Event Started" : match.status === "past" ? "Event Completed" : "Registration Open",
    rawStatus: match.status || "upcoming",
    date: match.date,
    fullDate: match.fullDate || match.date,
    time: match.time || "10:00 AM – 4:00 PM",
    eventDuration: "Single Day Academic Event",
    venue: match.venue || "College Campus",
    registrationDeadline: "20 Aug 2025 • 11:59 PM",
    seatsTotal: 250,
    seatsFilled: match.goingCount || 120,
    participation: match.participation || "Individual",
    eligibility: "All Enrolled Students",
    image: match.image || "/assets/events/hackathon.jpg",
    bannerLight: "/assets/events/light/hero-banner.jpg",
    bannerDark: "/assets/events/dark/hero-banner.jpg",
    isBookmarked: false,
    isRegistered: false,
    registrationId: null,

    overview: {
      about: `${match.description} Organized under the auspices of ${match.organizer}. Students will gain practical exposure, network with peers, and receive recognized digital certificates.`,
      facts: [
        { label: "Date", value: match.date },
        { label: "Time", value: match.time || "10:00 AM – 4:00 PM" },
        { label: "Venue", value: match.venue },
        { label: "Participation", value: match.participation },
        { label: "Eligibility", value: "All Students" },
        { label: "Organizer", value: match.organizer || "College Event Council" },
      ],
    },

    highlights: [
      {
        icon: "Zap",
        title: "Hands-on Practical Exposure",
        desc: `Deep-dive into ${match.category} concepts through structured practical exercises.`,
      },
      {
        icon: "Users",
        title: "Peer Collaboration",
        desc: "Work alongside students across departments sharing diverse perspectives.",
      },
      {
        icon: "Award",
        title: "Verified Certificate",
        desc: "Earn an official college-endorsed digital credential upon completion.",
      },
      {
        icon: "Briefcase",
        title: "Industry Relevance",
        desc: "Learn real-world best practices directly aligned with engineering hiring.",
      },
    ],

    schedule: [
      {
        day: "DAY 1",
        date: match.date,
        sessions: [
          { time: "10:00 AM", title: "Registrations & Welcome Keynote", status: "upcoming", desc: "Attendee check-in and event briefing." },
          { time: "11:30 AM", title: "Core Workshop / Technical Session", status: "upcoming", desc: `Hands-on module in ${match.category}.` },
          { time: "02:00 PM", title: "Interactive Challenge & Review", status: "upcoming", desc: "Collaborative project work and feedback." },
          { time: "04:30 PM", title: "Q&A, Certificates & Closing", status: "upcoming", desc: "Closing remarks and networking." },
        ],
      },
    ],

    speakers: [
      {
        id: "spk-gen-1",
        name: "Dr. Priya Sharma",
        role: "Head of Academic Initiatives",
        track: match.category,
        avatar: "/assets/events/avatars/avatar-2.jpg",
        bio: `Lead faculty mentor coordinating ${match.category} events and industry university partnerships.`,
        linkedin: "https://linkedin.com",
      },
      {
        id: "spk-gen-2",
        name: "Rohan Mehta",
        role: "Student Coordinator",
        track: "Campus Outreach",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        bio: "Senior student lead organizing developer meetups and technical competitions.",
        linkedin: "https://linkedin.com",
      },
    ],

    venueDetails: {
      title: match.venue || "Main Auditorium",
      institution: "XYZ College of Engineering",
      building: "Main Academic Block",
      room: match.venue,
      address: "College Campus, Mumbai",
      directions: "Report to the registration desk in the main foyer 15 minutes prior to the start time.",
      mapCoordinates: { lat: 19.076, lng: 72.8777 },
    },

    organizer: {
      name: match.organizer || "College Innovation Cell",
      subtitle: "University Academic & Cultural Committee",
      studentCoordinator: "Rohan Mehta",
      facultyCoordinator: "Dr. Priya Sharma",
      email: "events@college.edu",
      phone: "+91 98765 43210",
      office: "Room 102, Student Activities Center",
      socialLinks: {
        website: "https://college.edu/events",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },

    attendees: {
      count: match.goingCount || 85,
      avatars: [
        "/assets/events/avatars/avatar-1.jpg",
        "/assets/events/avatars/avatar-2.jpg",
        "/assets/events/avatars/avatar-3.jpg",
      ],
      sampleList: [
        { name: "Sneha Patel", branch: "ISE 5th Sem", role: "Student Attendee" },
        { name: "Karan Singh", branch: "CSE 7th Sem", role: "Student Attendee" },
        { name: "Ayesha Khan", branch: "AIML 5th Sem", role: "Student Attendee" },
      ],
    },

    faqs: [
      {
        question: "Who can participate?",
        answer: "Any registered student of the college can attend with their valid student identity card.",
      },
      {
        question: "Is attendance marked for this event?",
        answer: "Yes, official duty leaves and academic attendance are registered for attendees.",
      },
      {
        question: "Will certificates be provided?",
        answer: "Yes, verified participation certificates are issued to all attendees.",
      },
    ],

    questions: [
      {
        id: "q-gen-1",
        author: "Campus Student",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        time: "3 days ago",
        question: "Are prerequisites required before attending?",
        answer: "No specialized prerequisites are required. All necessary starter instructions will be shared at the start.",
        answerBy: "Event Coordinator",
      },
    ],

    relatedEventIds: ALL_EVENTS.filter((e) => e.id !== match.id).slice(0, 3).map((e) => e.id),
  };
}

/**
 * Returns related events for recommendations rail
 */
export function getRelatedEvents(currentEventId) {
  const others = ALL_EVENTS.filter((e) => e.id !== currentEventId);
  return others.slice(0, 3);
}
