// Comprehensive mock data for College OS Campus Feed
export const INITIAL_POSTS = [
  {
    id: "post-1",
    author: {
      name: "Aarav Sharma",
      role: "Student",
      department: "CSE",
      semester: "5th Sem",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      isFollowing: true,
    },
    createdAt: "2h ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    source: "College",
    type: "Academic",
    content:
      "Just finished the Data Structures test! 😅\n\nIt was tougher than I expected but overall it went well. Hoping for a good score!",
    likesCount: 48,
    isLiked: false,
    isSaved: false,
    commentsCount: 12,
    latestComment: {
      author: "Rohan Mehta",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      text: "Same here! That last question was tricky.",
      time: "1h ago",
    },
    comments: [
      {
        id: "c-1",
        author: "Rohan Mehta",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        text: "Same here! That last question was tricky.",
        time: "1h ago",
      },
      {
        id: "c-2",
        author: "Priya Nair",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Graph traversal problem took most of my time!",
        time: "45m ago",
      },
    ],
  },
  {
    id: "post-2",
    author: {
      name: "Sneha Patel",
      role: "Student",
      department: "IT",
      semester: "6th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: false,
    },
    createdAt: "4h ago",
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    source: "College",
    type: "Event",
    content:
      "Our college fest 'TechVibe 2025' is going to be on 22–24 Aug! 🎉\n\nRegistrations are live now. Don't miss it. There are so many events — coding, gaming, music, and more!",
    eventDetails: {
      title: "TechVibe 2025",
      tagline: "CODE | CREATE | CELEBRATE",
      date: "22 - 24 Aug 2025",
      location: "College Ground",
      status: "Registrations Open",
      buttonText: "Register Now →",
      bannerImage: "/assets/campus-feed/techvibe-banner.jpg",
    },
    likesCount: 96,
    isLiked: false,
    isSaved: false,
    commentsCount: 24,
    latestComment: {
      author: "Karan Singh",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      text: "Can we register for both coding and gaming?",
      time: "3h ago",
    },
    comments: [
      {
        id: "c-3",
        author: "Karan Singh",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        text: "Can we register for both coding and gaming?",
        time: "3h ago",
      },
      {
        id: "c-4",
        author: "Sneha Patel",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Yes, multi-track registration is fully supported!",
        time: "2h ago",
      },
    ],
  },
  {
    id: "post-3",
    author: {
      name: "Ritika Verma",
      role: "Student",
      department: "ECE",
      semester: "4th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: true,
    },
    createdAt: "6h ago",
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    source: "Hostel",
    type: "General",
    content:
      "Hostel mess menu for this week is out! 🍽️\n\nLooks decent this time. What do you guys think?",
    messMenu: {
      week: "Week 3",
      items: [
        { day: "Monday", lunch: "Rajma Chawal, Raita", dinner: "Paneer Butter Masala, Roti" },
        { day: "Tuesday", lunch: "Dal Tadka, Jeera Rice", dinner: "Aloo Gobhi, Mix Dal" },
        { day: "Wednesday", lunch: "Chole Bhature", dinner: "Special Kadhai Paneer, Gulab Jamun" },
        { day: "Thursday", lunch: "Kadhi Pakora, Rice", dinner: "Egg Curry / Malai Kofta" },
        { day: "Friday", lunch: "Sambhar Vada, Pulao", dinner: "Biryani & Veg Raita" },
      ],
    },
    likesCount: 35,
    isLiked: false,
    isSaved: false,
    commentsCount: 18,
    latestComment: {
      author: "Aditya Singh",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      text: "Paneer on Wednesday night is a huge win!",
      time: "4h ago",
    },
    comments: [
      {
        id: "c-5",
        author: "Aditya Singh",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        text: "Paneer on Wednesday night is a huge win!",
        time: "4h ago",
      },
    ],
  },
  {
    id: "post-4",
    author: {
      name: "Prof. Rajesh Gupta",
      role: "Faculty",
      department: "CSE",
      semester: "HOD Academics",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: true,
    },
    createdAt: "8h ago",
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    source: "Department",
    type: "Announcement",
    content:
      "📢 Mid-Term examination schedule for 3rd, 5th, and 7th semester B.Tech students has been finalized.\n\nStudents are advised to check the Academics tab for detailed subject-wise room allocations and reporting timings.",
    announcementBadge: "Official Academic Notice",
    likesCount: 72,
    isLiked: false,
    isSaved: false,
    commentsCount: 9,
    latestComment: {
      author: "Muskan Khan",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      text: "Are scientific calculators permitted in the DSP exam?",
      time: "6h ago",
    },
    comments: [
      {
        id: "c-6",
        author: "Muskan Khan",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Are scientific calculators permitted in the DSP exam?",
        time: "6h ago",
      },
    ],
  },
  {
    id: "post-5",
    author: {
      name: "Placement Cell",
      role: "Official",
      department: "Career Development",
      semester: "Campus Cell",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: true,
    },
    createdAt: "10h ago",
    timestamp: Date.now() - 10 * 60 * 60 * 1000,
    source: "Placement",
    type: "Placement",
    content:
      "🚀 TCS National Qualifier Test (NQT) & Digital hiring drive registrations are now live for the 2026 graduating batch!\n\nEligible branches: CSE, IT, ECE, EE. CTC range: 3.6 LPA (Ninja) to 7.2 LPA (Digital). Register on NextStep before Sept 30.",
    placementInfo: {
      company: "Tata Consultancy Services (TCS)",
      roles: "Ninja & Digital Systems Engineer",
      package: "₹3.6 - 7.2 LPA",
      deadline: "30 Sept 2026",
    },
    likesCount: 142,
    isLiked: false,
    isSaved: false,
    commentsCount: 38,
    latestComment: {
      author: "Hamid Rza",
      avatar: "/assets/layout/profile-avatar.jpg",
      text: "Is there any CGPA relaxation for students with certifications?",
      time: "7h ago",
    },
    comments: [
      {
        id: "c-7",
        author: "Hamid Rza",
        avatar: "/assets/layout/profile-avatar.jpg",
        text: "Is there any CGPA relaxation for students with certifications?",
        time: "7h ago",
      },
    ],
  },
  {
    id: "post-6",
    author: {
      name: "Vikram Aditya",
      role: "Student",
      department: "CSE",
      semester: "6th Sem",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      isFollowing: false,
    },
    createdAt: "12h ago",
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    source: "College",
    type: "Poll",
    content:
      "Which domain are you preparing for this semester? Looking to form peer study pods for mutual interview prep and project building! 💡",
    poll: {
      id: "poll-1",
      question: "Primary focus for summer 2026 internships / placements?",
      totalVotes: 152,
      userVotedOption: null,
      options: [
        { id: "opt-1", text: "Full Stack Web & Mobile", votes: 64 },
        { id: "opt-2", text: "AI / ML & Data Engineering", votes: 55 },
        { id: "opt-3", text: "Cloud, DevOps & Systems", votes: 21 },
        { id: "opt-4", text: "Cybersecurity & Web3", votes: 12 },
      ],
    },
    likesCount: 58,
    isLiked: false,
    isSaved: false,
    commentsCount: 16,
    latestComment: {
      author: "Pooja Reddy",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      text: "Count me in for the AI/ML study group!",
      time: "8h ago",
    },
    comments: [
      {
        id: "c-8",
        author: "Pooja Reddy",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Count me in for the AI/ML study group!",
        time: "8h ago",
      },
    ],
  },
  {
    id: "post-7",
    author: {
      name: "Sports Council",
      role: "Club",
      department: "Athletics",
      semester: "Inter-College",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: false,
    },
    createdAt: "1d ago",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    source: "Sports",
    type: "Sports",
    content:
      "🏏 Selection trials for the College Cricket Team start this Friday at 4 PM at the Main Sports Complex. Bring your own white kit and student ID card.",
    image: "/assets/events/football.jpg",
    likesCount: 67,
    isLiked: false,
    isSaved: false,
    commentsCount: 14,
    latestComment: {
      author: "Aryan Verma",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      text: "Can 1st year freshers participate?",
      time: "18h ago",
    },
    comments: [
      {
        id: "c-9",
        author: "Aryan Verma",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        text: "Can 1st year freshers participate?",
        time: "18h ago",
      },
    ],
  },
  {
    id: "post-8",
    author: {
      name: "Ananya Roy",
      role: "Student",
      department: "CSE",
      semester: "4th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: true,
    },
    createdAt: "1d ago",
    timestamp: Date.now() - 26 * 60 * 60 * 1000,
    source: "Library",
    type: "Academic",
    content:
      "Shared my handwritten revision notes for Operating Systems (Process Scheduling, Deadlocks, and Paging) in our batch drive. Hope it helps everyone with mid-terms! 📚✨",
    likesCount: 110,
    isLiked: false,
    isSaved: false,
    commentsCount: 22,
    latestComment: {
      author: "Siddharth Sen",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      text: "These diagrams are lifesavers, thank you!",
      time: "20h ago",
    },
    comments: [
      {
        id: "c-10",
        author: "Siddharth Sen",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        text: "These diagrams are lifesavers, thank you!",
        time: "20h ago",
      },
    ],
  },
  {
    id: "post-9",
    author: {
      name: "Priya Nair",
      role: "Student",
      department: "IT",
      semester: "5th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: false,
    },
    createdAt: "1d ago",
    timestamp: Date.now() - 28 * 60 * 60 * 1000,
    source: "Club",
    type: "Community",
    content:
      "🌟 Google Developer Student Clubs (GDSC) Campus Chapter is hosting an open brainstorm meet this Thursday at Seminar Hall 2. Bring your project ideas!",
    image: "/assets/events/tech-talk.jpg",
    likesCount: 84,
    isLiked: false,
    isSaved: false,
    commentsCount: 11,
    latestComment: {
      author: "Aditya Kumar",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      text: "Will there be hands-on workshops too?",
      time: "22h ago",
    },
    comments: [
      {
        id: "c-11",
        author: "Aditya Kumar",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        text: "Will there be hands-on workshops too?",
        time: "22h ago",
      },
    ],
  },
  {
    id: "post-10",
    author: {
      name: "Cultural Committee",
      role: "Club",
      department: "Student Affairs",
      semester: "Annual Fest",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: true,
    },
    createdAt: "2d ago",
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    source: "College",
    type: "Event",
    content:
      "🎭 Auditions for 'Rangmanch' Annual Inter-College Drama & Music Night start tomorrow 5 PM at the Open Air Theatre! Solo and band performances welcome.",
    likesCount: 91,
    isLiked: false,
    isSaved: false,
    commentsCount: 15,
    latestComment: {
      author: "Sonali Rao",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      text: "Can acoustic instruments be plugged into the sound system?",
      time: "1d ago",
    },
    comments: [
      {
        id: "c-12",
        author: "Sonali Rao",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Can acoustic instruments be plugged into the sound system?",
        time: "1d ago",
      },
    ],
  },
  {
    id: "post-11",
    author: {
      name: "Hamid Rza",
      role: "Student",
      department: "CSE",
      semester: "7th Sem",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: true,
    },
    createdAt: "2d ago",
    timestamp: Date.now() - 50 * 60 * 60 * 1000,
    source: "Lab 4",
    type: "Academic",
    content:
      "Published a boilerplate starter template for Major Projects with Next.js 16, Tailwind CSS v4, and MongoDB. Includes auth and clean layout structure. Check it out on GitHub!",
    likesCount: 134,
    isLiked: false,
    isSaved: false,
    commentsCount: 29,
    latestComment: {
      author: "Aryan Verma",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      text: "Starring this right now! Thanks Hamid bhai.",
      time: "1d ago",
    },
    comments: [
      {
        id: "c-13",
        author: "Aryan Verma",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        text: "Starring this right now! Thanks Hamid bhai.",
        time: "1d ago",
      },
    ],
  },
  {
    id: "post-12",
    author: {
      name: "Rahul Bhatia",
      role: "Student",
      department: "ME",
      semester: "5th Sem",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      isFollowing: false,
    },
    createdAt: "2d ago",
    timestamp: Date.now() - 52 * 60 * 60 * 1000,
    source: "Workshop",
    type: "General",
    content:
      "Has anyone seen a black Casio scientific calculator (fx-991EX) in Workshop Block 2? Left it on bench 4 after the CAD lab today. 🥺",
    likesCount: 19,
    isLiked: false,
    isSaved: false,
    commentsCount: 8,
    latestComment: {
      author: "Karan Singh",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      text: "Check with the lab assistant, he collected leftover gear.",
      time: "1d ago",
    },
    comments: [
      {
        id: "c-14",
        author: "Karan Singh",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        text: "Check with the lab assistant, he collected leftover gear.",
        time: "1d ago",
      },
    ],
  },
  {
    id: "post-13",
    author: {
      name: "Dr. Sunita Mehra",
      role: "Faculty",
      department: "ECE",
      semester: "Dean Research",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: true,
    },
    createdAt: "3d ago",
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    source: "Department",
    type: "Announcement",
    content:
      "🔬 Distinguished Guest Lecture: 'Next-Gen Semiconductor Design and RISC-V Architectures' by Dr. Arun Varma, Principal Engineer at Intel. Thursday 3 PM, Auditorium.",
    announcementBadge: "Research Seminar",
    likesCount: 88,
    isLiked: false,
    isSaved: false,
    commentsCount: 14,
    latestComment: {
      author: "Ritika Verma",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      text: "Is attendance compulsory for 3rd year ECE students?",
      time: "2d ago",
    },
    comments: [
      {
        id: "c-15",
        author: "Ritika Verma",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Is attendance compulsory for 3rd year ECE students?",
        time: "2d ago",
      },
    ],
  },
  {
    id: "post-14",
    author: {
      name: "Karan Singh",
      role: "Student",
      department: "CSE",
      semester: "6th Sem",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      isFollowing: false,
    },
    createdAt: "3d ago",
    timestamp: Date.now() - 76 * 60 * 60 * 1000,
    source: "Hostel 3",
    type: "General",
    content:
      "Late night coding session at Central Library 2nd floor reading room. Who's pulling an all-nighter for DBMS queries and indexing? ☕💻",
    likesCount: 42,
    isLiked: false,
    isSaved: false,
    commentsCount: 19,
    latestComment: {
      author: "Aarav Sharma",
      avatar: "/assets/events/avatars/avatar-2.jpg",
      text: "Grabbing my coffee and heading there right away!",
      time: "2d ago",
    },
    comments: [
      {
        id: "c-16",
        author: "Aarav Sharma",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        text: "Grabbing my coffee and heading there right away!",
        time: "2d ago",
      },
    ],
  },
  {
    id: "post-15",
    author: {
      name: "Placement Cell",
      role: "Official",
      department: "Career Development",
      semester: "Campus Cell",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: true,
    },
    createdAt: "4d ago",
    timestamp: Date.now() - 96 * 60 * 60 * 1000,
    source: "Placement",
    type: "Placement",
    content:
      "🎉 Heartiest congratulations to 18 of our 7th semester students for bagging Summer Analyst internship offers at Amazon and Microsoft! Total stipend up to ₹1.2 Lakh/month.",
    likesCount: 220,
    isLiked: false,
    isSaved: false,
    commentsCount: 45,
    latestComment: {
      author: "Priya Nair",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      text: "Super proud of the senior batch! Huge inspiration.",
      time: "3d ago",
    },
    comments: [
      {
        id: "c-17",
        author: "Priya Nair",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Super proud of the senior batch! Huge inspiration.",
        time: "3d ago",
      },
    ],
  },
  {
    id: "post-16",
    author: {
      name: "Tanvi Deshmukh",
      role: "Student",
      department: "ECE",
      semester: "5th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: false,
    },
    createdAt: "4d ago",
    timestamp: Date.now() - 100 * 60 * 60 * 1000,
    source: "Club",
    type: "Community",
    content:
      "🤖 Robotics Society is hosting a hands-on workshop on Arduino, ESP32, and ROS2 sensor fusion this Saturday. Free hardware kits provided for team builds!",
    image: "/assets/events/robotics.jpg",
    likesCount: 76,
    isLiked: false,
    isSaved: false,
    commentsCount: 13,
    latestComment: {
      author: "Hamid Rza",
      avatar: "/assets/layout/profile-avatar.jpg",
      text: "Awesome initiative, look forward to seeing the line-follower bots!",
      time: "3d ago",
    },
    comments: [
      {
        id: "c-18",
        author: "Hamid Rza",
        avatar: "/assets/layout/profile-avatar.jpg",
        text: "Awesome initiative, look forward to seeing the line-follower bots!",
        time: "3d ago",
      },
    ],
  },
  {
    id: "post-17",
    author: {
      name: "Muskan Khan",
      role: "Student",
      department: "CSE",
      semester: "4th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      isFollowing: true,
    },
    createdAt: "5d ago",
    timestamp: Date.now() - 120 * 60 * 60 * 1000,
    source: "Hostel",
    type: "Poll",
    content:
      "Should the Central Library reading halls stay open until 2:00 AM during mid-term and semester exam months? Please cast your vote!",
    poll: {
      id: "poll-2",
      question: "Library extended timing during exam month:",
      totalVotes: 230,
      userVotedOption: null,
      options: [
        { id: "p2-opt-1", text: "Yes, extend till 2:00 AM", votes: 165 },
        { id: "p2-opt-2", text: "Keep current 11:00 PM timing", votes: 28 },
        { id: "p2-opt-3", text: "Make it 24/7 round the clock", votes: 37 },
      ],
    },
    likesCount: 95,
    isLiked: false,
    isSaved: false,
    commentsCount: 31,
    latestComment: {
      author: "Aditya Singh",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      text: "24/7 during final week would be a game changer.",
      time: "4d ago",
    },
    comments: [
      {
        id: "c-19",
        author: "Aditya Singh",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        text: "24/7 during final week would be a game changer.",
        time: "4d ago",
      },
    ],
  },
  {
    id: "post-18",
    author: {
      name: "Campus Green Society",
      role: "Club",
      department: "Sustainability",
      semester: "Green Campus",
      avatar: "/assets/layout/profile-avatar.jpg",
      isFollowing: false,
    },
    createdAt: "5d ago",
    timestamp: Date.now() - 124 * 60 * 60 * 1000,
    source: "Campus Green",
    type: "General",
    content:
      "🌿 Join us this Sunday 8 AM for the Annual Monsoon Tree Plantation drive along the South Quad! 200+ native saplings to plant. Refreshments and certificates provided for all student volunteers.",
    likesCount: 104,
    isLiked: false,
    isSaved: false,
    commentsCount: 21,
    latestComment: {
      author: "Sneha Patel",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      text: "Registered my squad! See you all Sunday morning.",
      time: "4d ago",
    },
    comments: [
      {
        id: "c-20",
        author: "Sneha Patel",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        text: "Registered my squad! See you all Sunday morning.",
        time: "4d ago",
      },
    ],
  },
];

// Trending on Campus items (Ranked 1-5 matching reference exactly)
export const TRENDING_ITEMS = [
  {
    rank: 1,
    title: "TechVibe 2025 - Registration Open",
    category: "Event",
    views: "2.4k views",
    time: "12h ago",
    thumbnail: "/assets/campus-feed/trending/techvibe-thumb.jpg",
    filterType: "Event",
    searchKey: "TechVibe",
  },
  {
    rank: 2,
    title: "Placement Drive - TCS",
    category: "Placement",
    views: "1.8k views",
    time: "1d ago",
    thumbnail: "/assets/campus-feed/trending/tcs-thumb.jpg",
    filterType: "Placement",
    searchKey: "TCS",
  },
  {
    rank: 3,
    title: "Study Group - DSA (CSE)",
    category: "Academic",
    views: "1.2k views",
    time: "2d ago",
    thumbnail: "/assets/campus-feed/trending/dsa-thumb.jpg",
    filterType: "Academic",
    searchKey: "Data Structures",
  },
  {
    rank: 4,
    title: "Hostel Mess Menu Update",
    category: "Notice",
    views: "980 views",
    time: "3d ago",
    thumbnail: "/assets/campus-feed/trending/mess-thumb.jpg",
    filterType: "General",
    searchKey: "mess menu",
  },
  {
    rank: 5,
    title: "College Cricket Team - Trials",
    category: "Sports",
    views: "856 views",
    time: "4d ago",
    thumbnail: "/assets/campus-feed/trending/cricket-thumb.jpg",
    filterType: "Sports",
    searchKey: "Cricket",
  },
];

// People You May Know (Matching reference exactly)
export const PEOPLE_YOU_MAY_KNOW = [
  {
    id: "user-1",
    name: "Rohan Mehta",
    department: "CSE",
    semester: "6th Sem",
    avatar: "/assets/events/avatars/avatar-3.jpg",
    isFollowing: false,
  },
  {
    id: "user-2",
    name: "Priya Nair",
    department: "IT",
    semester: "5th Sem",
    avatar: "/assets/events/avatars/avatar-1.jpg",
    isFollowing: false,
  },
  {
    id: "user-3",
    name: "Aditya Singh",
    department: "ECE",
    semester: "7th Sem",
    avatar: "/assets/events/avatars/avatar-2.jpg",
    isFollowing: false,
  },
  {
    id: "user-4",
    name: "Muskan Khan",
    department: "CSE",
    semester: "4th Sem",
    avatar: "/assets/events/avatars/avatar-1.jpg",
    isFollowing: false,
  },
];

// Post Type Categories for the dropdown
export const POST_CATEGORIES = [
  "All Posts",
  "Academic",
  "Event",
  "Announcement",
  "General",
  "Placement",
  "Sports",
  "Community",
  "Poll",
];

// Pure filter function
export function filterFeedPosts(posts, { tab = "for-you", category = "All Posts", search = "" }) {
  return posts.filter((post) => {
    // 1. Tab filtering
    if (tab === "following") {
      if (!post.author.isFollowing) return false;
    } else if (tab === "latest") {
      // Latest posts (sorted by timestamp already or filtered)
    }

    // 2. Category filtering
    if (category && category !== "All Posts") {
      if (post.type.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
    }

    // 3. Search query
    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      const matchAuthor = post.author?.name?.toLowerCase().includes(q);
      const matchContent = post.content?.toLowerCase().includes(q);
      const matchType = post.type?.toLowerCase().includes(q);
      const matchEvent = post.eventDetails?.title?.toLowerCase().includes(q);
      const matchPoll = post.poll?.question?.toLowerCase().includes(q);
      if (!matchAuthor && !matchContent && !matchType && !matchEvent && !matchPoll) {
        return false;
      }
    }

    return true;
  });
}
